import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
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
      paymentMethod
    } = req.body;

    console.log("=== PAYMENT VERIFY DEBUG ===");
    console.log("order_id:", razorpay_order_id);
    console.log("payment_id:", razorpay_payment_id);
    console.log("signature:", razorpay_signature);
    console.log("secret loaded:", !!process.env.RAZORPAY_KEY_SECRET);

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

    // ✅ SAVE ORDER TO DATABASE
    
    // Format delivery address as a string
    const formattedAddress = deliveryAddress 
      ? `${deliveryAddress.fullName || ''}, ${deliveryAddress.house || ''}, ${deliveryAddress.pincode || ''}, ${deliveryAddress.contact || ''}`
      : "";

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
      deliveryAddress: formattedAddress
    });

    res.json({
      success: true,
      order: newOrder
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};