import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">🛒 Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Shop Fruits
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
          >
            {/* Left side */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain"
              />

              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() =>
                      updateQty(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="bg-gray-200 px-2 rounded"
                  >
                    −
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQty(item.id, item.quantity + 1)
                    }
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="text-right">
              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm mt-2"
              >
                Remove ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ₹{total}</h2>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
