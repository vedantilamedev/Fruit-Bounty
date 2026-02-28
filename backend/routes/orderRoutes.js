import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getMySubscriptions,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  updateSubscriptionStatus,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

// Customer
// ✅ FIXED orderRoutes.js
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/mysubscriptions", protect, getMySubscriptions);

// Customer: Update own subscription status (pause/resume)
router.patch("/:id/subscription-status", protect, updateSubscriptionStatus);

// Admin routes BEFORE /:id
router.get("/", protect, admin, getAllOrders);           // ← move up
router.put("/:id/status", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);

// Dynamic :id routes LAST
router.get("/:id", protect, getOrderById);
router.put("/cancel/:id", protect, cancelOrder);

export default router;