import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import Delivery from "../models/Delivery.js";
import crypto from "crypto";

// Get all payments (for admin panel)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Order.find()
      .populate("user_id", "name email phone")
      .sort({ createdAt: -1 });

    // Transform data to match frontend expected format
    const transformedPayments = payments.map((payment, index) => ({
      id: `PAY-${1001 + index}`,
      customer: payment.user_id?.name || "Unknown",
      email: payment.user_id?.email || "",
      phone: payment.user_id?.phone || "",
      amount: payment.total_amount,
      method: payment.payment_method || "Card",
      status: payment.payment_status,
      date: payment.createdAt ? payment.createdAt.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      orderId: payment._id
    }));

    // Calculate summary statistics
    const totalEarnings = payments
      .filter(p => p.payment_status === "Paid")
      .reduce((sum, p) => sum + (p.total_amount || 0), 0);

    const paidOrders = payments.filter(p => p.payment_status === "Paid").length;
    const codOrders = payments.filter(p => p.payment_method === "COD").length;
    const failedPayments = payments.filter(p => p.payment_status === "Failed").length;
    const pendingOrders = payments.filter(p => p.payment_status === "Pending" || p.payment_status === "pending").length;
    const totalOrders = payments.length;

    // console.log("Payment statuses found:", payments.map(p => p.payment_status));
    // console.log("Summary:", { totalEarnings, paidOrders, codOrders, failedPayments, pendingOrders, totalOrders });

    res.json({
      success: true,
      data: transformedPayments,
      summary: {
        totalEarnings,
        paidOrders,
        codOrders,
        failedPayments,
        pendingOrders,
        totalOrders
      }
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // paisa
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      isSubscription,
      subscriptionType,
      deliverySchedule,
      startDate,
      endDate
    } = req.body;

    console.log("=== PAYMENT VERIFY DEBUG ===");
    console.log("order_id:", razorpay_order_id);
    console.log("payment_id:", razorpay_payment_id);
    console.log("signature:", razorpay_signature);
    console.log("secret loaded:", !!process.env.RAZORPAY_KEY_SECRET);
    console.log("isSubscription:", isSubscription);

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    console.log("expected:", expectedSign);
    console.log("received:", razorpay_signature);
    console.log("match:", expectedSign === razorpay_signature);
    console.log("============================");

    if (expectedSign !== razorpay_signature) {
      console.error("Signature verification failed!");
      return res.status(400).json({ success: false, message: "Payment signature verification failed" });
    }

    // Store the full delivery address object
    const orderDeliveryAddress = deliveryAddress 
      ? {
          fullName: deliveryAddress.fullName || '',
          house: deliveryAddress.house || '',
          pincode: deliveryAddress.pincode || '',
          contact: deliveryAddress.contact || ''
        }
      : null;

    // Check if this is a subscription order (has meals in cart items)
    const hasMeals = cartItems && cartItems.some(item => item.meals && Object.keys(item.meals).length > 0);
    
    // Determine if it's a subscription based on explicit flag or meals data
    const isSubscriptionOrder = isSubscription || hasMeals;

    // Calculate subscription details if it's a subscription
    let subscription_type = null;
    let delivery_schedule = null;
    let start_date = null;
    let end_date = null;
    let isRecurring = false;

    if (isSubscriptionOrder) {
      // Parse duration from cart item name (e.g., "Individual 30-Day Plan")
      const firstItem = cartItems[0];
      const nameMatch = firstItem?.name?.match(/(\d+)-?Day/i);
      const durationDays = nameMatch ? parseInt(nameMatch[1]) : 30;

      // Determine subscription type based on duration
      if (durationDays >= 30) {
        subscription_type = "monthly";
      } else if (durationDays >= 7) {
        subscription_type = "weekly";
      }

      delivery_schedule = deliverySchedule || "daily";
      start_date = startDate ? new Date(startDate) : new Date();
      end_date = endDate ? new Date(endDate) : new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
      isRecurring = true;
    }

    // Create the order
    const newOrder = await Order.create({
      user_id: req.user?.id,
      total_amount: totalAmount,
      delivery_date: new Date(),
      order_status: "Confirmed",
      payment_status: "Paid",
      payment_method: paymentMethod || "Card",
      razorpay_order_id,
      razorpay_payment_id,
      items: cartItems,
      deliveryAddress: orderDeliveryAddress,
      // Subscription fields
      subscription_type: subscription_type,
      delivery_schedule: delivery_schedule,
      start_date: start_date,
      end_date: end_date,
      isRecurring: isRecurring,
      next_delivery_date: start_date
    });

    // Update user's totalOrders and totalSpent
    if (req.user?.id) {
      try {
        const User = (await import("../models/User.js")).default;
        await User.findByIdAndUpdate(req.user.id, {
          $inc: { totalOrders: 1, totalSpent: totalAmount },
          // Also update address if not set
          $setOnInsert: {
            phone: orderDeliveryAddress?.contact || "-",
            address: {
              flatBuilding: orderDeliveryAddress?.house || "-",
              fullName: orderDeliveryAddress?.fullName || "-",
              pincode: orderDeliveryAddress?.pincode || "-",
              contact: orderDeliveryAddress?.contact || "-",
              fullAddress: orderDeliveryAddress?.house 
                ? `${orderDeliveryAddress.house}${orderDeliveryAddress.pincode ? ', ' + orderDeliveryAddress.pincode : ''}`
                : "-"
            }
          }
        }, { upsert: true });
      } catch (userError) {
        console.error("Error updating user stats:", userError);
      }
    }

    // Create delivery schedule for subscriptions
    if (isRecurring && start_date && end_date && delivery_schedule) {
      try {
        const deliveries = [];
        let current = new Date(start_date);
        const end = new Date(end_date);

        while (current <= end) {
          deliveries.push({
            user_id: req.user?.id,
            order_id: newOrder._id,
            delivery_date: new Date(current),
            delivery_status: "scheduled"
          });

          if (delivery_schedule === "daily") {
            current.setDate(current.getDate() + 1);
          } else if (delivery_schedule === "weekly") {
            current.setDate(current.getDate() + 7);
          }
        }

        if (deliveries.length > 0) {
          await Delivery.insertMany(deliveries);
          console.log(`Created ${deliveries.length} delivery schedules for subscription`);
        }
      } catch (deliveryError) {
        console.error("Error creating delivery schedule:", deliveryError);
        // Don't fail the order if delivery creation fails
      }
    }

    res.json({
      success: true,
      order: newOrder
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};