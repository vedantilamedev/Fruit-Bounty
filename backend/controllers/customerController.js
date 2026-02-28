import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Order from "../models/Order.js";

// @desc    Get all customers
// @route   GET /api/admin/customers
// @access  Admin
export const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({ role: "customer" }).select("-password");

  // For each customer, get their latest order to extract delivery address and calculate stats
  const customersWithDefaults = await Promise.all(customers.map(async (c) => {
    // Calculate orders and spent from Order collection if not set in User
    const userOrders = await Order.find({ user_id: c._id, payment_status: "Paid" }).lean();
    const calculatedOrders = userOrders.length;
    const calculatedSpent = userOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    
    // Use User's values if set, otherwise use calculated values
    const totalOrders = (c.totalOrders > 0) ? c.totalOrders : calculatedOrders;
    const totalSpent = (c.totalSpent > 0) ? c.totalSpent : calculatedSpent;

    // Try to get delivery address from their latest order
    let displayAddress = c.address?.fullAddress || c.address?.flatBuilding || "-";
    let displayPhone = c.phone || c.address?.contact || "-";
    
    // If no address, try to get from latest order
    if (displayAddress === "-" || !c.address?.flatBuilding) {
      const latestOrder = await Order.findOne({ user_id: c._id })
        .sort({ createdAt: -1 })
        .select("deliveryAddress")
        .lean();
      
      if (latestOrder?.deliveryAddress) {
        const da = latestOrder.deliveryAddress;
        const addressParts = [];
        if (da.house) addressParts.push(da.house);
        if (da.pincode) addressParts.push(da.pincode);
        displayAddress = addressParts.length > 0 ? addressParts.join(", ") : "-";
        displayPhone = da.contact || displayPhone;
      }
    }

    return {
      _id: c._id,
      name: c.name,
      email: c.email,
      role: c.role,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      // Use flatBuilding if available, otherwise use fullAddress or old format
      address: c.address?.flatBuilding 
        ? `${c.address.flatBuilding}${c.address.pincode ? ', ' + c.address.pincode : ''}`
        : displayAddress,
      phone: displayPhone,
      totalOrders: totalOrders,
      totalSpent: totalSpent,
      type: c.type || "Regular",
    };
  }));

  res.json({
    success: true,
    data: customersWithDefaults,
  });
});