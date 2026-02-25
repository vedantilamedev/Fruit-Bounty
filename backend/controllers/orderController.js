import Order from "../models/Order.js";

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user_id package_id");

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { order_status: req.body.order_status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Orders of Logged-in User
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user._id })
      .populate("package_id")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    // Always log the full error during development
    console.error("getUserOrders error:", error.message);
    res.status(500).json({ message: error.message });
  }
};