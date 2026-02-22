import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },

    bowl_type: {
      type: String,
      enum: ["regular", "custom"],
      default: "regular",
    },

    fruits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fruit",
      },
    ],

    total_amount: {
      type: Number,
      required: true,
    },

    start_date: {
      type: Date,
      required: true,
    },

    end_date: {
      type: Date,
      required: true,
    },

    delivery_schedule: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily",
    },

    subscription_type: {
      type: String,
      enum: ["weekly", "monthly", "one-time"],
      default: "one-time",
    },

    next_delivery_date: {
      type: Date,
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    order_status: {
      type: String,
      enum: ["pending", "active", "paused", "completed", "cancelled"],
      default: "pending",
    },

    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);