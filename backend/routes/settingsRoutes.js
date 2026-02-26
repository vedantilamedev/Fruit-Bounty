import express from "express";
import { updateProfile, updateNotifications, updatePassword } from "../controllers/settingsController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes need user authentication
router.put("/profile", protect, updateProfile);
router.put("/notifications", protect, updateNotifications);
router.put("/password", protect, updatePassword);

export default router;