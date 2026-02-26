import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Get all customers
// @route   GET /api/admin/customers
// @access  Admin
export const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({ role: "customer" }).select("-password");

  // Add default fields for frontend
  const customersWithDefaults = customers.map((c) => ({
    _id: c._id,
    name: c.name,
    email: c.email,
    role: c.role,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    // Defaults for dashboard
    address: c.address || "-",
    totalOrders: c.totalOrders || 0,
    totalSpent: c.totalSpent || 0,
    type: c.type || "Regular",
  }));

  res.json({
    success: true,
    data: customersWithDefaults,
  });
});