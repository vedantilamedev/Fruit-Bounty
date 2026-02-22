import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        item_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        type: { type: String, enum: ["fruit", "package"], required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);