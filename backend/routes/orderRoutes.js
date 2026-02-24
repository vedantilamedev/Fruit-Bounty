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
} from "../controllers/orderController.js";

const router = express.Router();

// Customer
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/mysubscriptions", protect, getMySubscriptions);
router.get("/:id", protect, getOrderById);
router.put("/cancel/:id", protect, cancelOrder);

// Admin
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;