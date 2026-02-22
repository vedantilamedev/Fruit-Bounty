import express from "express";
import { 
  createOrder, 
  getAllOrders, 
  updateOrderStatus, 
  getMyOrders, 
  getOrderById, 
  getMySubscriptions 
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer routes
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/mysubscriptions", protect, getMySubscriptions);
router.get("/:id", protect, getOrderById);

// Admin routes
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;