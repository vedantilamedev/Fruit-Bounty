import express from "express";
import { createOrder, verifyPayment, getAllPayments } from "../controllers/paymentController.js";
import protect from "../middleware/authMiddleware.js";
import { admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/payments", protect, admin, getAllPayments);
router.post("/create-order", createOrder);
router.post("/verify", protect, verifyPayment);

export default router;