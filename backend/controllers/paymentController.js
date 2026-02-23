import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";


// ===============================
// Get Razorpay Instance
// ===============================
const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay keys are missing in environment variables");
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
};



// ===============================
// CREATE RAZORPAY ORDER
// ===============================
export const createRazorpayOrder = async (req, res) => {
  try {
    const razorpay = getRazorpayInstance();
    const { order_id } = req.body;

    // 1️⃣ Get order from DB (secure)
    const order = await Order.findById(order_id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (order.payment_status === "paid") {
      return res.status(400).json({
        success: false,
        message: "Order already paid"
      });
    }

    const options = {
      amount: order.total_amount * 100, // secure amount
      currency: "INR",
      receipt: "receipt_" + order._id
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      razorpayOrder
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ===============================
// VERIFY PAYMENT
// ===============================
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    // 2️⃣ Activate order after payment success
    await Order.findByIdAndUpdate(order_id, {
      payment_status: "paid",
      order_status: "active"
    });

    res.status(200).json({
      success: true,
      message: "Payment verified and order activated"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};