import User from "../models/User.js";
import Order from "../models/Order.js";
import Package from "../models/Package.js";
import Fruit from "../models/Fruit.js";


//  Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalPackages = await Package.countDocuments();
    const totalFruits = await Fruit.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalPackages,
        totalFruits
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};