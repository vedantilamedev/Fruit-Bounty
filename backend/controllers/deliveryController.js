import Delivery from "../models/Delivery.js";

// Get all deliveries
export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate("user_id", "name email").populate("order_id").sort({ delivery_date: 1 });
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update delivery status
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { delivery_status } = req.body;
    const allowed = ["scheduled", "out_for_delivery", "delivered", "failed", "cancelled"];
    if (!allowed.includes(delivery_status)) return res.status(400).json({ message: "Invalid status" });

    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ message: "Delivery not found" });

    delivery.delivery_status = delivery_status;
    await delivery.save();
    res.status(200).json({ success: true, message: "Delivery updated", delivery });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};