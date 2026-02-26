import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package"
    },

    fruits: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fruit"
    }],

    bowl_type: {
      type: String,
      enum: ["regular", "custom"],
      default: "regular"
    },

    subscription_type: {
      type: String,
      enum: ["weekly", "monthly", null],
      default: null
    },

    delivery_schedule: {
      type: String,
      enum: ["daily", "weekly", null],
      default: null
    },

    start_date: {
      type: Date
    },

    end_date: {
      type: Date
    },

    total_amount: {
      type: Number,
      required: true
    },

    order_date: {
      type: Date,
      default: Date.now
    },

    delivery_date: {
      type: Date
    },

    next_delivery_date: {
      type: Date
    },

    isRecurring: {
      type: Boolean,
      default: false
    },

    order_status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Confirmed", "Delivered", "Cancelled"],
      default: "Pending"
    },

    payment_status: {
      type: String,
      enum: ["Paid", "Pending", "Failed", "COD"],
      default: "Pending"
    },

    payment_method: {
      type: String,
      enum: ["Card", "Wallet", "COD", "UPI", "Bank Transfer"],
      default: null
    },

    razorpay_order_id: {
      type: String
    },

    razorpay_payment_id: {
      type: String
    },

    items: {
      type: Array,
      default: []
    },

    deliveryAddress: {
      type: String
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
//code
export default Order