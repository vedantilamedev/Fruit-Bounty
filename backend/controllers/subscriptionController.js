import asyncHandler from "express-async-handler";
import Subscription from "../models/subscriptionModel.js";
import Order from "../models/Order.js";

// @desc    Get all subscriptions (from Order model with isRecurring)
// @route   GET /api/admin/subscriptions
// @access  Admin
export const getAllSubscriptions = asyncHandler(async (req, res) => {
  try {
    // Fetch orders that are subscriptions (isRecurring = true)
    const subscriptions = await Order.find({ isRecurring: true })
      .populate("user_id", "name email phone")
      .populate("package_id")
      .sort({ createdAt: -1 });

    // Transform to match frontend expected format
    const transformedSubscriptions = subscriptions.map(sub => {
      // Calculate days remaining
      let daysRemaining = 0;
      if (sub.end_date) {
        const endDate = new Date(sub.end_date);
        const today = new Date();
        daysRemaining = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
      }

      return {
        _id: sub._id,
        customer: sub.user_id || { name: "Unknown" },
        plan: sub.subscription_type === "monthly" ? "Individual" : sub.subscription_type === "weekly" ? "Corporate" : "Individual",
        duration: sub.duration || (sub.subscription_type === "monthly" ? "1 Month" : "1 Week"),
        deliveryDays: sub.delivery_schedule || "Mon, Wed, Fri",
        daysRemaining: daysRemaining,
        amount: sub.total_amount || 0,
        status: sub.order_status === "active" ? "Active" : sub.order_status === "paused" ? "Paused" : "Active",
        order_id: sub._id,
        start_date: sub.start_date,
        end_date: sub.end_date
      };
    });

    res.json({
      success: true,
      data: transformedSubscriptions,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create new subscription
// @route   POST /api/admin/subscriptions
// @access  Admin
export const createSubscription = asyncHandler(async (req, res) => {
  try {
    const { customer, plan, duration, deliveryDays, amount, start_date, end_date } = req.body;

    const subscription = await Subscription.create({
      customer,
      plan,
      duration,
      deliveryDays,
      amount,
      status: "Active"
    });

    await subscription.populate("customer", "name email");

    res.status(201).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update subscription status (pause/resume)
// @route   PATCH /api/admin/subscriptions/:id/status
// @access  Admin
export const updateSubscriptionStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the order (subscription)
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    // Toggle status between active and paused
    const newStatus = order.order_status === "active" ? "paused" : "active";
    order.order_status = newStatus;
    await order.save();

    res.json({
      success: true,
      message: `Subscription ${newStatus === "paused" ? "paused" : "resumed"} successfully`,
      subscription: {
        _id: order._id,
        status: newStatus === "active" ? "Active" : "Paused"
      }
    });
  } catch (error) {
    console.error("Error updating subscription status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete subscription
// @route   DELETE /api/admin/subscriptions/:id
// @access  Admin
export const deleteSubscription = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    const subscription = await Subscription.findByIdAndDelete(id);
    
    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    res.json({
      success: true,
      message: "Subscription deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});