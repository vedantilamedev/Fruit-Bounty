import express from "express";
import { getAllSubscriptions, createSubscription, updateSubscriptionStatus, deleteSubscription } from "../controllers/subscriptionController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes for subscription management
// GET /api/admin/subscriptions - Get all subscriptions
router.get("/", protect, async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }
  next();
}, getAllSubscriptions);

// POST /api/admin/subscriptions - Create new subscription
router.post("/", protect, async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }
  next();
}, createSubscription);

// PATCH /api/admin/subscriptions/:id/status - Update subscription status (pause/resume)
router.patch("/:id/status", protect, async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }
  next();
}, updateSubscriptionStatus);

// DELETE /api/admin/subscriptions/:id - Delete subscription
router.delete("/:id", protect, async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }
  next();
}, deleteSubscription);

export default router;