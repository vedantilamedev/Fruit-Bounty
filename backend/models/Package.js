import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    package_type: {
      type: String,
      enum: ["Individual", "Corporate"],
      required: true
    },

    number_of_people: {
      type: Number,
      required: true
    },

    duration_type: {
      type: String,
      enum: ["weekly", "monthly", "multi-month"],
      required: true
    },

    duration_value: {
      type: Number, // Example: 1 month, 3 months, 6 months
      required: true
    },

    fruits_included: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fruit"
      }
    ],

    price: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },

    isRecurring: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;