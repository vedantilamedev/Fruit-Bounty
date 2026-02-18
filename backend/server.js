import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import fruitRoutes from "./routes/fruitRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();


// ✅ Middlewares
app.use(cors());
app.use(express.json());


// ✅ Base Route
app.get("/", (req, res) => {
  res.send("FruitsBounty API is running...");
});


// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/fruits", fruitRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);


// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// ✅ Global Error Handler (Recommended)
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});