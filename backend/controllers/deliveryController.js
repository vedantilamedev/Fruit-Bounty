import Delivery from "../models/Delivery.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

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
      
      // Safely get address from user or order
      let address = "N/A";
      try {
        if (order?.deliveryAddress) {
          const da = order.deliveryAddress;
          const parts = [];
          if (da.house) parts.push(da.house);
          if (da.fullName) parts.push(da.fullName);
          if (da.pincode) parts.push(da.pincode);
          if (da.contact) parts.push(da.contact);
          address = parts.length > 0 ? parts.join(", ") : "N/A";
        } else if (user?.address) {
          const userAddr = String(user.address).trim();
          address = (userAddr && userAddr !== "-" && userAddr !== "null" && userAddr !== "undefined") ? userAddr : "N/A";
        }
      } catch (e) {
        console.error("Error getting address:", e);
        address = "N/A";
      }
      
      // Get phone from user
      let phone = "N/A";
      try {
        if (user?.phone) {
          const userPhone = String(user.phone).trim();
          phone = (userPhone && userPhone !== "-" && userPhone !== "null" && userPhone !== "undefined") ? userPhone : "N/A";
        } else if (order?.deliveryAddress?.contact) {
          phone = String(order.deliveryAddress.contact);
        }
      } catch (e) {
        console.error("Error getting phone:", e);
        phone = "N/A";
      }
      
      // Get customer name
      let customer = "Unknown Customer";
      try {
        if (user?.name) {
          customer = String(user.name).trim() || "Unknown Customer";
        } else if (order?.deliveryAddress?.fullName) {
          customer = String(order.deliveryAddress.fullName).trim() || "Unknown Customer";
        }
      } catch (e) {
        console.error("Error getting customer:", e);
        customer = "Unknown Customer";
      }
      
      // Determine delivery type
      let type = "Normal";
      if (order?.subscription_type) {
        type = "Subscription";
      } else if (order?.isRecurring) {
        type = "Corporate";
      }
      
      // Get time from delivery_date
      let time = "N/A";
      if (delivery.delivery_date) {
        try {
          time = new Date(delivery.delivery_date).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          });
        } catch (e) {
          time = "N/A";
        }
      }
      
      // Get status safely
      let status = "Scheduled";
      if (delivery.delivery_status) {
        status = delivery.delivery_status.charAt(0).toUpperCase() + delivery.delivery_status.slice(1);
      }
      
      // Build bowlsDetail from order items or fallback to package/fruits
      let bowlsDetail = [];
      
      if (order?.items && Array.isArray(order.items) && order.items.length > 0) {
        bowlsDetail = order.items.map(item => {
          // Try to get fruits and toppings from arrays first
          let fruits = Array.isArray(item.fruits) ? item.fruits : [];
          let toppings = Array.isArray(item.toppings) ? item.toppings : [];
          
          // If not in arrays, try to parse from description
          if ((!fruits || fruits.length === 0) && item.description) {
            // Match pattern: "Fruits: Apple, Banana | Toppings: Honey, Nuts"
            const fruitMatch = item.description.match(/Fruits:\s*([^|]+?)(?:\s*\|\s*Toppings:|$)/i);
            const toppingMatch = item.description.match(/Toppings:\s*(.+)$/i);
            
            if (fruitMatch && fruitMatch[1]) {
              const fruitStr = fruitMatch[1].trim();
              fruits = fruitStr !== "None" ? [fruitStr] : [];
            }
            if (toppingMatch && toppingMatch[1]) {
              const toppingStr = toppingMatch[1].trim();
              toppings = toppingStr !== "None" ? [toppingStr] : [];
            }
          }

          // For subscription orders with meals, extract base fruits from meals
          if (item.meals && typeof item.meals === 'object') {
            const mealValues = Object.values(item.meals);
            const mealFruits = [];
            const mealToppings = [];
            
            mealValues.forEach(meal => {
              // Add individual fruits if available
              if (Array.isArray(meal.fruits)) {
                meal.fruits.forEach(f => {
                  if (typeof f === 'string') {
                    mealFruits.push(f);
                  } else if (f && f.name) {
                    mealFruits.push(f.name);
                  }
                });
              }
              // Add toppings if available
              if (Array.isArray(meal.toppings)) {
                meal.toppings.forEach(t => {
                  if (typeof t === 'string') {
                    mealToppings.push(t);
                  } else if (t && t.name) {
                    mealToppings.push(t.name);
                  }
                });
              }
            });
            
            // Filter unique values only
            const uniqueFruits = [...new Set(mealFruits)];
            const uniqueToppings = [...new Set(mealToppings)];
            
            if (uniqueFruits.length > 0) {
              fruits = uniqueFruits;
            }
            if (uniqueToppings.length > 0) {
              toppings = uniqueToppings;
            }
          }
          
          return {
            name: item.name || item.bowl_type || "Custom Bowl",
            fruits: fruits,
            toppings: toppings
          };
        });
      } else if (order?.package_id) {
        // Fallback to package info
        bowlsDetail = [{
          name: order.package_id?.name || "Standard Bowl",
          fruits: order.fruits?.map(f => f.name || f) || [],
          toppings: []
        }];
      } else if (order?.fruits && Array.isArray(order.fruits) && order.fruits.length > 0) {
        // Fallback to fruits directly
        bowlsDetail = [{
          name: "Fruit Bowl",
          fruits: order.fruits.map(f => f.name || f) || [],
          toppings: []
        }];
      }
      
      // If still empty, provide a default entry
      if (bowlsDetail.length === 0) {
        bowlsDetail = [{
          name: "Standard Bowl",
          fruits: [],
          toppings: []
        }];
      }
      
      return {
        id: delivery._id,
        deliveryId: `DEL-${delivery._id.toString().slice(-6).toUpperCase()}`,
        customer,
        phone,
        address,
        time,
        type,
        status,
        bowlsDetail,
        delivery_date: delivery.delivery_date,
        order_id: order?._id,
        user_id: user?._id
      };
    });

    res.status(200).json(transformedDeliveries);
  } catch (error) {
    console.error("Error fetching deliveries:", error);
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