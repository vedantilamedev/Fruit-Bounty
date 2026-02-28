import Order from "../models/Order.js";
import Package from "../models/Package.js";
import Fruit from "../models/Fruit.js";
import Delivery from "../models/Delivery.js";
import { sendWhatsAppMessage } from "../services/whatsappService.js";
// ===============================
// CREATE ORDER (Customer)
// ===============================
export const createOrder = async (req, res) => {
  try {
    const {
      package_id,
      subscription_type,
      delivery_schedule,
      bowl_type,
      fruits, // array of fruit IDs
      start_date,
      end_date,
    } = req.body;

    if (!package_id || !start_date || !end_date) {  
      return res.status(400).json({ message: "All fields are required" });  
    }  

    const start = new Date(start_date);  
    const end = new Date(end_date);  

    if (end <= start) {  
      return res.status(400).json({ message: "End date must be after start date" });  
    }  

    const pkg = await Package.findById(package_id);  
    if (!pkg) return res.status(404).json({ message: "Package not found" });  

    // Bowl validation  
    if (bowl_type === "regular" && fruits.length > 5) {  
      return res.status(400).json({ message: "Maximum 5 fruits allowed for regular bowl" });  
    }  
    if (bowl_type === "custom" && fruits.length > 8) {  
      return res.status(400).json({ message: "Maximum 8 fruits allowed for custom bowl" });  
    }  

    const isRecurring = subscription_type === "weekly" || subscription_type === "monthly";  

    // Prevent multiple active subscriptions  
    if (isRecurring) {  
      const activeSub = await Order.findOne({  
        user_id: req.user._id,  
        isRecurring: true,  
        order_status: "active",  
      });  
      if (activeSub) return res.status(400).json({ message: "Active subscription already exists" });  
    }  

    // Calculate total amount  
    const fruitData = await Fruit.find({ _id: { $in: fruits } });  
    const fruitPrice = fruitData.reduce((sum, f) => sum + f.price, 0);  
    const totalAmount = pkg.price_per_day * ((end - start) / (1000 * 60 * 60 * 24)) + fruitPrice;  

    // Create Order  
    const order = await Order.create({  
      user_id: req.user._id,  
      package_id,  
      bowl_type,  
      fruits,  
      total_amount: totalAmount,  
      start_date: start,  
      end_date: end,  
      subscription_type,  
      delivery_schedule,  
      isRecurring,  
      next_delivery_date: start,  
      order_status: "active",  
      payment_status: "Paid",  
    });  

    // Create delivery schedule  
    if (isRecurring) {  
      let current = new Date(start);  
      const deliveries = [];  
      while (current <= end) {  
        deliveries.push({  
          user_id: req.user._id,  
          order_id: order._id,  
          delivery_date: new Date(current),  
          delivery_status: "scheduled",  
        });  

        if (delivery_schedule === "daily") current.setDate(current.getDate() + 1);  
        else if (delivery_schedule === "weekly") current.setDate(current.getDate() + 7);  
      }  
      await Delivery.insertMany(deliveries);  
    }  

    // =========================
    // WhatsApp notification
    // =========================
    const message = `Hi! Your order #${order._id} has been created successfully. Total Amount: ₹${totalAmount}. Start Date: ${start.toDateString()}.`;
    await sendWhatsAppMessage(req.user.phone, message);

    res.status(201).json({ success: true, message: "Order created", order });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET MY ORDERS (Customer)
// ===============================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user._id })
      .populate("package_id")
      .populate("fruits");

    res.status(200).json({ success: true, data: orders });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET MY SUBSCRIPTIONS (Customer)
// ===============================
export const getMySubscriptions = async (req, res) => {
  try {
    const subs = await Order.find({ user_id: req.user._id, isRecurring: true })
      .populate("package_id")
      .populate("fruits");
    res.status(200).json({ success: true, data: subs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// PAUSE / CANCEL SUBSCRIPTION
// ===============================
export const updateSubscriptionStatus = async (req, res) => {
  try {
    const { order_status } = req.body;
    // Map frontend values to model enum values
    const statusMap = {
      'active': 'Confirmed',
      'paused': 'Pending',
      'cancelled': 'Cancelled'
    };
    const mappedStatus = statusMap[order_status];
    const allowed = ['active', 'paused', 'cancelled'];
    if (!allowed.includes(order_status)) return res.status(400).json({ message: 'Invalid status' });

    const order = await Order.findById(req.params.id).populate('user_id');  
    if (!order) return res.status(404).json({ message: "Order not found" });  

    order.order_status = mappedStatus;  
    await order.save();  

    // Cancel all future deliveries if cancelled  
    if (order_status === "cancelled") {  
      await Delivery.updateMany(  
        { order_id: order._id, delivery_date: { $gte: new Date() }, delivery_status: "scheduled" },  
        { delivery_status: "cancelled" }  
      );  
    }  

    // =========================
    // WhatsApp notification
    // =========================
    const msg = `Your subscription #${order._id} has been updated. New status: ${order_status}.`;
    if (order.user_id?.phone) {
      await sendWhatsAppMessage(order.user_id.phone, msg);
    }

    res.status(200).json({ success: true, message: "Subscription updated", order });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET ALL ORDERS (Admin)
// ===============================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user_id")
      .populate("package_id")
      .populate("fruits")
      .sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// UPDATE ORDER STATUS (Admin)
// ===============================
export const updateOrderStatus = async (req, res) => {
  try {
    // Use updateOne with explicit $set to avoid validation issues
    const result = await Order.updateOne(
      { _id: req.params.id },
      { $set: { order_status: req.body.order_status } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Fetch the updated order
    const order = await Order.findById(req.params.id);
    
    if (!order) return res.status(404).json({ message: "Order not found" });

    // =========================
    // WhatsApp notification (wrapped in try-catch to prevent failures)
    // =========================
    // try {
    //   if (order.user_id && order.user_id.phone && order.user_id.phone !== "-") {
    //     const msg = `Hi! Your order #${order._id} status has been updated to "${order.order_status}".`;
    //     await sendWhatsAppMessage(order.user_id.phone, msg);
    //   }
    // } catch (waError) {
    //   console.error("WhatsApp notification failed:", waError.message);
    //   // Continue even if WhatsApp fails - status update is more important
    // }

    res.status(200).json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
    // console.log("updateOrderStatus error:", error.message);
  }
};

// ===============================
// GET SINGLE ORDER (Customer)
// ===============================
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("package_id")
      .populate("fruits");

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel order (User)
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.order_status == "Delivered") {
      return res.status(400).json({ message: "Cannot cancel this order" });
    }

    order.order_status = "Cancelled";
    await order.save();

    // =========================
    // WhatsApp notification
    // =========================
    const cancelMsg = `Your order #${order._id} has been cancelled successfully.`;
    await sendWhatsAppMessage(order.user_id.phone, cancelMsg);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Orders of Logged-in User
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user._id })
      .populate("package_id")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    // Always log the full error during development
    console.error("getUserOrders error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// DELETE ORDER (Admin)
// ===============================
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Delete associated deliveries
    await Delivery.deleteMany({ order_id: req.params.id });

    // Delete the order
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};