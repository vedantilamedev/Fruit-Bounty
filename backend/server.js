import dotenv from "dotenv";
dotenv.config();   // ✅ LOAD ENV HERE

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
import deliveryRoutes from "./routes/deliveryRoutes.js"; // 
import { sendWhatsAppMessage } from "./services/whatsappService.js";

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FruitsBounty API is running 🚀",
  });
});

app.get("/send", async (req, res) => {
  try {
    await sendWhatsAppMessage("918436430197", "I am just testing!");
    res.status(200).json({
      success: true,
      message: "Successfully sending"
    })
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "not sending"
    })
  }
})

// ===============================
// API Routes
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/fruits", fruitRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

// Customer Routes
app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/custom-bowls", customBowlRoutes);
app.use("/api/delivery", deliveryRoutes); // 

// ===============================
// 404 Route Not Found
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found ",
  });
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
  console.log(`Server running on port ${PORT}`);
});