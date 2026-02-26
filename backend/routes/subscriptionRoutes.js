import express from "express";
import { getAllSubscriptions } from "../controllers/subscriptionController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Only admin
router.get("/", protect, async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }
  next();
}, getAllSubscriptions);

export default router;