import Cart from "../models/Cart.js";

// Add item to cart
export const addItemToCart = async (req, res) => {
  try {
    const { item_id, type, quantity } = req.body;

    if (!item_id || !type) {
      return res.status(400).json({ message: "Item ID and type are required" });
    }

    let cart = await Cart.findOne({ user_id: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user_id: req.user._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (i) => i.item_id.toString() === item_id && i.type === type
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ item_id, type, quantity: quantity || 1 });
    }

    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get cart items for user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user._id });
    res.status(200).json({ success: true, data: cart || { items: [] } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update item quantity in cart
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user_id: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.item_id.toString() === itemId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user_id: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.item_id.toString() !== itemId);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};