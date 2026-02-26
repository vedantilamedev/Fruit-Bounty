import asyncHandler from "express-async-handler";
import Subscription from "../models/subscriptionModel.js";

// @desc    Get all subscriptions
// @route   GET /api/admin/subscriptions
// @access  Admin
export const getAllSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await Subscription.find().populate("customer", "name email");
  res.json({
    success: true,
    data: subscriptions,
  });
});