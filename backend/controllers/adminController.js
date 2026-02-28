import User from "../models/User.js";
import Order from "../models/Order.js";
import Package from "../models/Package.js";
import Fruit from "../models/Fruit.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// ===============================
// ADMIN AUTH
// ===============================
export const adminRegister = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Invalid secret key" });
    }

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new User({
      name,
      email,
      password,
      role: "admin",
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials(no admin)" });
    }

    const isMatch = await admin.matchPassword(password); // ✅ use model method
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials(password not matched)" });
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
// DASHBOARD STATS (REAL DATA)
// ===============================
export const getDashboardStats = async (req, res) => {
  try {
    // ---- Metric Cards ----
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ order_status: "Pending" });

    const revenueAgg = await Order.aggregate([
      { $match: { payment_status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$total_amount" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    // ---- Revenue Trend (daily - last 7 days) ----
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const dailyRevenue = await Order.aggregate([
      { $match: { payment_status: "Paid", createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          revenue: { $sum: "$total_amount" },
          date: { $first: "$createdAt" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // ---- Revenue Trend (weekly - last 4 weeks) ----
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 27);

    const weeklyRevenue = await Order.aggregate([
      { $match: { payment_status: "Paid", createdAt: { $gte: fourWeeksAgo } } },
      {
        $group: {
          _id: { $week: "$createdAt" },
          revenue: { $sum: "$total_amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // ---- Revenue Trend (monthly) ----
    const monthlyRevenue = await Order.aggregate([
      { $match: { payment_status: "Paid" } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          revenue: { $sum: "$total_amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 12 },
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // ---- Total cumulative revenue ----
    let cumulative = 0;
    const totalRevenueData = monthlyRevenue.map((m) => {
      cumulative += m.revenue;
      return {
        name: monthNames[m._id.month - 1],
        revenue: cumulative,
      };
    });

    // ---- Peak Order Times ----
    const peakTimes = await Order.aggregate([
      {
        $group: {
          _id: { $hour: "$createdAt" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { orders: -1 } },
      { $limit: 5 },
      { $sort: { "_id": 1 } },
    ]);

    const formatHour = (h) => {
      if (h === 0) return "12 AM";
      if (h < 12) return `${h} AM`;
      if (h === 12) return "12 PM";
      return `${h - 12} PM`;
    };

    // ---- Order Type Distribution ----
    const recurringOrders = await Order.countDocuments({ isRecurring: true });
    const normalOrders = await Order.countDocuments({ isRecurring: false });
    const total = recurringOrders + normalOrders || 1;

    res.status(200).json({
      success: true,
      data: {
        metrics: {
          totalOrders,
          totalRevenue,
          pendingOrders,
        },
        revenueData: {
          daily: dailyRevenue.map((d) => ({
            name: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d._id - 1],
            revenue: d.revenue,
          })),
          weekly: weeklyRevenue.map((w, i) => ({
            name: `W${i + 1}`,
            revenue: w.revenue,
          })),
          monthly: monthlyRevenue.map((m) => ({
            name: monthNames[m._id.month - 1],
            revenue: m.revenue,
          })),
          total: totalRevenueData,
        },
        peakOrderTimes: peakTimes.map((p) => ({
          time: formatHour(p._id),
          orders: p.orders,
        })),
        orderTypeDistribution: [
          {
            name: "Normal",
            value: Math.round((normalOrders / total) * 100),
            count: normalOrders,
          },
          {
            name: "Subscription",
            value: Math.round((recurringOrders / total) * 100),
            count: recurringOrders,
          },
        ],
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};