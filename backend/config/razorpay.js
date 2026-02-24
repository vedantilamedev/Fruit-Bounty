import Razorpay from "razorpay";
import dotenv from "dotenv";

// ✅ Load env variables here
dotenv.config();

// Optional debug (remove later)
console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID ? "Loaded" : "Missing");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;