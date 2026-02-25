import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

// Get profile
router.get("/profile", protect, getProfile);

// Update profile
router.put("/profile", protect, updateProfile);

router.get("/my-orders", protect, getUserOrders);

export default router;