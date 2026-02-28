import express from "express";
import { createOrder, verifyPayment, getAllPayments } from "../controllers/paymentController.js";
import protect from "../middleware/authMiddleware.js";
import { admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/payments", protect, admin, getAllPayments);
router.post("/create-order", createOrder);
// Verify payment doesn't require auth - signature verification is done server-side
router.post("/verify", verifyPayment);

export default router;