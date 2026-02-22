import Order from "../models/Order.js";
import Package from "../models/Package.js";
import Fruit from "../models/Fruit.js";
import Delivery from "../models/Delivery.js";

// ===============================
// CREATE ORDER (Customer)
// ===============================
export const createOrder = async (req, res) => {
  try {
    const {
      package_id,
      subscription_type,
      delivery_schedule,
      bowl_type = "regular",
      fruits,
      start_date,
      end_date,
    } = req.body;

    // ----------------------------
    // BASIC VALIDATION
    // ----------------------------
    if (!package_id || !start_date || !end_date) {
      return res.status(400).json({ message: "package_id, start_date and end_date are required" });
    }

    if (!Array.isArray(fruits) || fruits.length === 0) {
      return res.status(400).json({ message: "Select at least one fruit" });
    }

    // ----------------------------
    // DATE VALIDATION
    // ----------------------------
    const start = new Date(start_date);
    const end = new Date(end_date);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    if (end <= start) {
      return res.status(400).json({ message: "End date must be after start date" });
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return res.status(400).json({ message: "Invalid subscription duration" });
    }

    // ----------------------------
    // PACKAGE VALIDATION
    // ----------------------------
    const pkg = await Package.findById(package_id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (typeof pkg.price !== "number") {
      return res.status(400).json({ message: "Invalid package price configuration" });
    }

    // ----------------------------
    // BOWL VALIDATION
    // ----------------------------
    if (bowl_type === "regular" && fruits.length > 5) {
      return res.status(400).json({ message: "Maximum 5 fruits allowed for regular bowl" });
    }

    if (bowl_type === "custom" && fruits.length > 8) {
      return res.status(400).json({ message: "Maximum 8 fruits allowed for custom bowl" });
    }

    // ----------------------------
    // FRUIT VALIDATION
    // ----------------------------
    const fruitData = await Fruit.find({ _id: { $in: fruits } });

    if (fruitData.length !== fruits.length) {
      return res.status(400).json({ message: "Some fruits not found" });
    }

    const fruitPrice = fruitData.reduce((sum, f) => {
      if (typeof f.price !== "number") {
        throw new Error("Invalid fruit price detected");
      }
      return sum + f.price;
    }, 0);

    // ----------------------------
    // SUBSCRIPTION CHECK
    // ----------------------------
    const isRecurring =
      subscription_type === "weekly" || subscription_type === "monthly";

    if (isRecurring) {
      const activeSub = await Order.findOne({
        user_id: req.user._id,
        isRecurring: true,
        order_status: "active",
      });

      if (activeSub) {
        return res.status(400).json({ message: "Active subscription already exists" });
      }
    }

    // ----------------------------
    // TOTAL CALCULATION
    // ----------------------------
    // Package price is base price
    // Fruits are extra (added once)
    const totalAmount = Number(pkg.price) + fruitPrice;

    if (isNaN(totalAmount)) {
      return res.status(400).json({ message: "Failed to calculate total amount" });
    }

    // ----------------------------
    // CREATE ORDER
    // ----------------------------
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
      payment_status: "paid",
    });

    // ----------------------------
    // CREATE DELIVERY SCHEDULE
    // ----------------------------
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

        if (delivery_schedule === "daily") {
          current.setDate(current.getDate() + 1);
        } else if (delivery_schedule === "weekly") {
          current.setDate(current.getDate() + 7);
        } else {
          break;
        }
      }

      if (deliveries.length > 0) {
        await Delivery.insertMany(deliveries);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({ message: error.message });
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
    const allowed = ["active", "paused", "cancelled"];
    if (!allowed.includes(order_status)) return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findById(req.params.id);  
    if (!order) return res.status(404).json({ message: "Order not found" });  

    order.order_status = order_status;  
    await order.save();  

    // Cancel all future deliveries if cancelled  
    if (order_status === "cancelled") {  
      await Delivery.updateMany(  
        { order_id: order._id, delivery_date: { $gte: new Date() }, delivery_status: "scheduled" },  
        { delivery_status: "cancelled" }  
      );  
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
      .populate("fruits");
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
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.order_status = req.body.order_status;
    await order.save();
    res.status(200).json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
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