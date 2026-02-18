import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    fruit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fruit",
      required: true
    },

    quantity: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;