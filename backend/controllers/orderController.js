 import Order from "../models/Order.js";

//  Create Order
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      user_id: req.user.id
    });

    res.status(201).json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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

//  Get Logged-in User Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user._id })
      .sort({ createdAt: -1 })
      .populate("package_id");

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