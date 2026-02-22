import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
    getMyOrders
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Customer creates order
router.post("/", authMiddleware, createOrder);

router.get("/my", authMiddleware, getMyOrders);   // 👈 NEW

router.get("/", authMiddleware, roleMiddleware("admin"), getAllOrders);

router.put("/:id", authMiddleware, roleMiddleware("admin"), updateOrderStatus);

export default router;