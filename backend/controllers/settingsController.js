import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ===============================
// UPDATE PROFILE
// ===============================
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = firstName + " " + lastName;
    user.email = email;
    user.phone = phone;

    await user.save();

    res.status(200).json({ success: true, message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// UPDATE NOTIFICATIONS
// ===============================
export const updateNotifications = async (req, res) => {
  try {
    const { order, stock, payment, subscription, email, whatsapp, sms } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // You can add a notifications field in User schema if not present
    user.notifications = { order, stock, payment, subscription, email, whatsapp, sms };

    await user.save();

    res.status(200).json({ success: true, message: "Notifications updated", notifications: user.notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// UPDATE PASSWORD
// ===============================
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Current password is incorrect" });

    user.password = newPassword; // Will be hashed by pre-save hook
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};