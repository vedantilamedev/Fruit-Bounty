import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, required: true }, // e.g., Individual, Corporate
    duration: { type: String, required: true }, // e.g., "1 Month"
    deliveryDays: { type: String }, // e.g., "Mon, Wed, Fri"
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Active", "Paused"], default: "Active" }
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;