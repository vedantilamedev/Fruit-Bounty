import User from "../models/User.js";
import Order from "../models/Order.js";
import Delivery from "../models/Delivery.js";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.body.email) {
      const existingEmail = await User.findOne({ email: req.body.email });
      if (existingEmail && existingEmail._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = req.body.email;
    }

    user.name = req.body.name || user.name;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Order.find({
      user_id: req.user._id,
      isRecurring: true
    }).populate("package_id");

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Subscription not found" });

    if (order.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    order.order_status = "cancelled";
    await order.save();

    res.json({ message: "Subscription cancelled successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      user_id: req.user._id
    })
      .populate("order_id")
      .sort({ delivery_date: 1 });

    res.json(deliveries);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};