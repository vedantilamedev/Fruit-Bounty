import Order from "../models/Order.js";
import Fruit from "../models/Fruit.js";

// ======================================
// GET MONTHLY HARVEST + DELIVERY DATA
// ======================================
export const getMonthlyCalendar = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        message: "Month and year are required"
      });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // 1️⃣ Get User Deliveries in Selected Month
    const deliveries = await Order.find({
      user_id: req.user.id,
      next_delivery_date: {
        $gte: startDate,
        $lte: endDate
      }
    }).select("next_delivery_date subscription_type");

    // 2️⃣ Get Fruits Available in Selected Month
    const fruits = await Fruit.find({
      availability: {
        $elemMatch: {
          start_date: { $lte: endDate },
          end_date: { $gte: startDate }
        }
      }
    }).select("name availability image");

    res.status(200).json({
      success: true,
      month,
      year,
      deliveries,
      fruits
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ======================================
// GET DATA FOR A SINGLE SELECTED DATE
// ======================================
export const getDateDetails = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const selectedDate = new Date(date);

    // Deliveries on this date
    const deliveries = await Order.find({
      user_id: req.user.id,
      next_delivery_date: selectedDate
    }).populate("package_id");

    // Fruits available on this date
    const fruits = await Fruit.find({
      availability: {
        $elemMatch: {
          start_date: { $lte: selectedDate },
          end_date: { $gte: selectedDate }
        }
      }
    });

    res.status(200).json({
      success: true,
      date: selectedDate,
      deliveries,
      fruits
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};