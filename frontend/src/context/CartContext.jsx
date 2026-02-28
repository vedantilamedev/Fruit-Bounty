import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add item (handles quantity automatically)
  const addToCart = (fruit) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === fruit.id);

      if (exist) {
        return prev.map((item) =>
          item.id === fruit.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...prev, { ...fruit, quantity: 1 }];
    });
  };

  // ✅ Remove item by ID
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // ✅ Update quantity
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // ✅ Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, total, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
