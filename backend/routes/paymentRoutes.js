import express from "express";
import {
  createRazorpayOrder,
  verifyPayment
} from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


// ✅ Create Razorpay Order (Customer)
router.post(
  "/create-order",
  authMiddleware,
  createRazorpayOrder
);


// ✅ Verify Payment (Customer after payment)
router.post(
  "/verify",
  authMiddleware,
  verifyPayment
);


// ✅ Admin: View all payments (optional if needed later)
// You can move this to adminController if preferred
router.get(
  "/all",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const orders = await import("../models/Order.js").then(m => m.default.find({}));

      res.status(200).json({
        success: true,
        data: orders
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;