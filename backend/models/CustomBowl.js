import mongoose from "mongoose";

const customBowlSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    items: [
      {
        fruit_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Fruit",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    total_price: {
      type: Number,
      required: true
    },
    isFullCustom: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("CustomBowl", customBowlSchema);