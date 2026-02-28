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
      default: ""          // made optional so admin can add fruits without image
    },

    stock: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    },

    // ✅ NEW — needed by CustomizeBowl admin panel
    type: {
      type: String,
      enum: ["Free", "Premium"],
      default: "Free"
    },

    available: {
      type: Boolean,
      default: true
    },

    // Bowl-specific fields
    isBowl: {
      type: Boolean,
      default: false
    },

    weight: {
      type: Number,
      default: null
    },

    description: {
      type: String,
      default: ""
    },

    ingredients: [{
      type: String,
      trim: true
    }],

    salesCount: {
      type: Number,
      default: 0
    },

    images: [{
      type: String
    }]
  },
  { timestamps: true }
);

const Fruit = mongoose.model("Fruit", fruitSchema);

export default Fruit;