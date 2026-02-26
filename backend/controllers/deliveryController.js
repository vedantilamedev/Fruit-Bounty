import Delivery from "../models/Delivery.js";
import Order from "../models/Order.js";

// Get all deliveries
export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate({
        path: "user_id",
        select: "name email phone address"
      })
      .populate({
        path: "order_id",
        populate: [
          { path: "package_id", select: "name price" },
          { path: "fruits", select: "name" }
        ]
      })
      .sort({ delivery_date: 1 });

    // Transform data to match frontend expectations
    const transformedDeliveries = deliveries.map(delivery => {
      const user = delivery.user_id;
      const order = delivery.order_id;
      
      return {
        id: delivery._id,
        deliveryId: `DEL-${delivery._id.toString().slice(-6).toUpperCase()}`,
        customer: user?.name || "Unknown",
        phone: user?.phone || user?.address?.phone || "N/A",
        address: order?.deliveryAddress || user?.address?.street || "N/A",
        time: delivery.delivery_date ? new Date(delivery.delivery_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "N/A",
        type: order?.subscription_type ? "Subscription" : (order?.isRecurring ? "Corporate" : "Normal"),
        status: delivery.delivery_status.charAt(0).toUpperCase() + delivery.delivery_status.slice(1),
        bowlsDetail: order?.items?.map(item => ({
          name: item.name || item.bowl_type || "Custom Bowl",
          fruits: item.fruits || [],
          toppings: item.toppings || []
        })) || [],
        delivery_date: delivery.delivery_date,
        order_id: order?._id,
        user_id: user?._id
      };
    });

    res.status(200).json(transformedDeliveries);
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