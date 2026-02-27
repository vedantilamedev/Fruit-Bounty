import "./config/env.js"

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// ===============================
// Load ENV Variables
// ===============================
// ===============================
// Initialize App
// ===============================
const app = express();

// ===============================
// Middlewares
// ===============================

// CORS Configuration for Vercel deployment
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // Also allow localhost for development
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://localhost:5173',
      'https://localhost:3000',
      'https"//fruit-bounty-git-main-fruitsbountyshop-5632s-projects.vercel.app',
      'https://fruit-bounty-n2cybwjg1-fruitsbountyshop-5632s-projects.vercel.app',
      'https://fruit-bounty.vercel.app',
      // Add your Vercel frontend URL here after deployment
      // Format: 'https://your-project-name.vercel.app'
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===============================
// Routes Import
// ===============================
import authRoutes from "./routes/authRoutes.js";
import fruitRoutes from "./routes/fruitRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import customBowlRoutes from "./routes/customBowlRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js"; 
import whatsappRoutes from "./routes/whatsappRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

// ===============================
// Base Route
// ===============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FruitsBounty API is running 🚀",
  });
});

// Add temporarily to server.js
app.get("/api/test-secret", (req, res) => {
  res.json({ secret: process.env.JWT_SECRET });
});
// ===============================
// API Routes
// ===============================
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/fruits", fruitRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/customers", customerRoutes);
app.use("/api/admin/subscriptions", subscriptionRoutes);

// Customer Routes
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/custom-bowls", customBowlRoutes);
app.use("/api/delivery", deliveryRoutes); // 
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/settings", settingsRoutes);


// ===============================
// 404 Route Not Found
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found ",
  });
});

app.get("/api/test-jwt", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.json({ error: "no token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, decoded });
  } catch (e) {
    res.json({ error: e.message });
  }
});

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});