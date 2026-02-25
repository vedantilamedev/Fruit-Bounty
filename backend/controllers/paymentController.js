import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // paisa
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      totalAmount,
      deliveryAddress
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.json({ success: false });
    }

    // ✅ SAVE ORDER TO DATABASE

    const newOrder = await Order.create({
      user_id: req.user?.id, // if using auth middleware
      total_amount: totalAmount,
      delivery_date: new Date(),
      order_status: "Confirmed",
      payment_status: "Paid",
      items: cartItems,
      deliveryAddress: deliveryAddress
    });

    res.json({
      success: true,
      order: newOrder
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};