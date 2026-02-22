import CustomBowl from "../models/CustomBowl.js";
import Fruit from "../models/Fruit.js";

// ===============================
// CREATE CUSTOM BOWL
// ===============================
export const createCustomBowl = async (req, res) => {
  try {
    const { name, items, isFullCustom, days, dailyBowlSelection } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Add at least one fruit" });
    }

    const maxFruits = isFullCustom ? 8 : 5;
    if (items.length > maxFruits) {
      return res.status(400).json({
        message: `Maximum ${maxFruits} fruits allowed in a bowl`
      });
    }

    // Calculate total price for single bowl
    let totalPrice = 0;
    for (let item of items) {
      const fruit = await Fruit.findById(item.fruit_id);
      if (!fruit) return res.status(404).json({ message: `Fruit not found: ${item.fruit_id}` });
      totalPrice += fruit.price * item.quantity;
    }

    const bowls = [];

    // Multiple-day selection
    if (days && dailyBowlSelection && dailyBowlSelection.length === days) {
      for (let i = 0; i < days; i++) {
        const dayItems = dailyBowlSelection[i];

        if (!dayItems || dayItems.length === 0)
          return res.status(400).json({ message: `Add at least one fruit for day ${i + 1}` });

        if (dayItems.length > maxFruits)
          return res.status(400).json({ message: `Max ${maxFruits} fruits per day allowed` });

        // Calculate total price for day
        let dayPrice = 0;
        for (let item of dayItems) {
          const fruit = await Fruit.findById(item.fruit_id);
          if (!fruit) return res.status(404).json({ message: `Fruit not found: ${item.fruit_id}` });
          dayPrice += fruit.price * item.quantity;
        }

        const bowl = await CustomBowl.create({
          user_id: req.user.id,
          name: `${name} - Day ${i + 1}`,
          items: dayItems,
          total_price: dayPrice,
          isFullCustom
        });

        bowls.push(bowl);
      }
    } else {
      // Single bowl (same bowl for all days)
      const bowl = await CustomBowl.create({
        user_id: req.user.id,
        name,
        items,
        total_price: totalPrice,
        isFullCustom
      });
      bowls.push(bowl);
    }

    res.status(201).json({
      success: true,
      data: bowls
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET ALL CUSTOM BOWLS FOR CUSTOMER
// ===============================
export const getMyCustomBowls = async (req, res) => {
  try {
    const bowls = await CustomBowl.find({ user_id: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bowls });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};