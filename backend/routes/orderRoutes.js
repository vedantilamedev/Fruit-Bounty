import express from "express";
import Order from "../models/Order.js";
import Package from "../models/Package.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // use your middleware

const router = express.Router();

// ===============================
// CREATE ORDER (Customer)
// ===============================
router.post("/", protect, async (req, res) => {
  try {
    const { package_id, delivery_schedule, subscription_type } = req.body;

    if (!package_id) {
      return res.status(400).json({ message: "Package ID is required" });
    }

    const pkg = await Package.findById(package_id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    const totalAmount = pkg.price_per_day * pkg.duration_days;
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + pkg.duration_days * 24 * 60 * 60 * 1000);

    const isRecurring = subscription_type === "weekly" || subscription_type === "monthly";

    let nextDeliveryDate = startDate;
    if (isRecurring && subscription_type === "weekly") {
      nextDeliveryDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
    if (isRecurring && subscription_type === "monthly") {
      nextDeliveryDate = new Date(startDate);
      nextDeliveryDate.setMonth(nextDeliveryDate.getMonth() + 1);
    }

    const order = await Order.create({
      user_id: req.user.id,
      package_id: pkg._id,
      total_amount: totalAmount,
      start_date: startDate,
      end_date: endDate,
      delivery_schedule: delivery_schedule || "daily",
      subscription_type: subscription_type || "one-time",
      isRecurring,
      next_delivery_date: nextDeliveryDate,
      order_status: "pending",
      payment_status: "pending"
    });

    res.status(201).json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// GET ALL ORDERS (Admin)
// ===============================
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user_id")
      .populate("package_id");

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// UPDATE ORDER STATUS (Admin)
// ===============================
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { order_status: req.body.order_status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// GET MY ORDERS (Customer)
// ===============================
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id })
      .populate("package_id");

    const updatedOrders = orders.map(order => {
      const today = new Date();

      const durationDays = Math.ceil(
        (order.end_date - order.start_date) / (1000 * 60 * 60 * 24)
      );

      const remainingDays = Math.max(
        0,
        Math.ceil((order.end_date - today) / (1000 * 60 * 60 * 24))
      );

      return {
        ...order.toObject(),
        package_duration_days: durationDays,
        remaining_days: remainingDays
      };
    });

    res.status(200).json({
      success: true,
      data: updatedOrders
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// GET SINGLE ORDER (Customer)
// ===============================
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("package_id");

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const today = new Date();

    const durationDays = Math.ceil(
      (order.end_date - order.start_date) / (1000 * 60 * 60 * 24)
    );

    const remainingDays = Math.max(
      0,
      Math.ceil((order.end_date - today) / (1000 * 60 * 60 * 24))
    );

    const response = {
      ...order.toObject(),
      package_duration_days: durationDays,
      remaining_days: remainingDays
    };

    res.status(200).json({
      success: true,
      data: response
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// GET MY SUBSCRIPTIONS (Customer)
// ===============================
router.get("/mysubscriptions", protect, async (req, res) => {
  try {
    const subscriptions = await Order.find({
      user_id: req.user.id,
      isRecurring: true
    }).populate("package_id");

    res.status(200).json({
      success: true,
      data: subscriptions
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;