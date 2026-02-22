import User from "../models/User.js";
import Order from "../models/Order.js";
import Package from "../models/Package.js";
import Fruit from "../models/Fruit.js";
import Delivery from "../models/Delivery.js";

// Dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalPackages = await Package.countDocuments();
    const totalFruits = await Fruit.countDocuments();
    const totalDeliveries = await Delivery.countDocuments();
    const activeSubscriptions = await Order.countDocuments({ isRecurring: true, order_status: "active" });
    const revenueData = await Order.aggregate([{ $match: { payment_status: "paid" } }, { $group: { _id: null, totalRevenue: { $sum: "$total_amount" } } }]);
    const totalRevenue = revenueData.length ? revenueData[0].totalRevenue : 0;

    res.status(200).json({ success: true, data: { totalUsers, totalOrders, totalPackages, totalFruits, totalDeliveries, activeSubscriptions, totalRevenue } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user_id", "name email").populate("package_id").populate("fruits").sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subscriptions
export const getAllSubscriptions = async (req, res) => {
  try {
    const subs = await Order.find({ isRecurring: true }).populate("user_id", "name email").populate("package_id").populate("fruits").sort({ createdAt: -1 });
    res.status(200).json(subs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};