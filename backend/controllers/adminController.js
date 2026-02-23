import User from "../models/User.js";
import Order from "../models/Order.js";
import Package from "../models/Package.js";
import Fruit from "../models/Fruit.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ===============================
// ADMIN REGISTER
// ===============================
export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// ADMIN LOGIN
// ===============================
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      admin,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// DASHBOARD STATS
// ===============================
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
        totalFruits,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};