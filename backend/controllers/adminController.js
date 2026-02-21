import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";
import Package from "../models/Package.js";
import Fruit from "../models/Fruit.js";


// =============================
// 🔐 ADMIN REGISTER
// =============================
export const adminRegister = async (req, res) => {
  const { name, email, password, secretKey } = req.body;

  try {
    // Optional: Secret key protection
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(400).json({ message: "Invalid Admin Secret Key" });
    }

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: "admin" // 🔥 important
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =============================
// 🔐 ADMIN LOGIN
// =============================
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email, role: "admin" });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =============================
// 📊 ADMIN DASHBOARD
// =============================
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