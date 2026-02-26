import express from "express";
import { getAllDeliveries, updateDeliveryStatus } from "../controllers/deliveryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes (for the Deliveries page)
router.get("/", protect, admin, getAllDeliveries);
router.put("/:id/status", protect, admin, updateDeliveryStatus);
// router.post("/", protect, admin, createDelivery);

export default router;