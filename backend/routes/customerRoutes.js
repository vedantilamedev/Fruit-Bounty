import express from "express";
import { getAllCustomers } from "../controllers/customerController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }
  next();
}, getAllCustomers);

export default router;