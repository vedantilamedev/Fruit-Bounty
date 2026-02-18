import mongoose from "mongoose";

const fruitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    stock: {
      type: Number,
      required: true,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Fruit = mongoose.model("Fruit", fruitSchema);

export default Fruit;