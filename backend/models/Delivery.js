import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    delivery_date: {
      type: Date,
      required: true,
    },

    delivery_status: {
      type: String,
      enum: ["scheduled", "out_for_delivery", "delivered", "failed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Delivery", deliverySchema);