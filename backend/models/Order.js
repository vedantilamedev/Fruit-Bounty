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

    total_amount: {
      type: Number,
      required: true
    },

    order_date: {
      type: Date,
      default: Date.now
    },

    delivery_date: {
      type: Date,
      required: true
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
      enum: ["Pending", "Confirmed", "Delivered","Cancelled"],
      default: "Pending"
    },

    payment_status: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
//code
export default Order