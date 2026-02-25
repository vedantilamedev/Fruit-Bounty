import express from "express";
import {
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// // Customer creates order
// router.post("/", authMiddleware, createOrder);

// Admin views all orders
router.get("/", authMiddleware, roleMiddleware("admin"), getAllOrders);

// Admin updates order status
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateOrderStatus);

export default router;