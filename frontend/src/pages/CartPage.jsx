import { useCart } from "../context/CartContext";

function CartPage() {
  const { cart, removeFromCart, updateQty, total } = useCart();

  return (
    <div className="px-6 md:px-16 lg:px-24 py-10 bg-[#FBF8F2] min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty 😢</p>
      ) : (
        <>
          {/* Items */}
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
              >
                {/* Name */}
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-green-700 font-bold">₹{item.price}</p>
                </div>

                {/* Quantity */}
                <input
                  type="number"
                  min="1"
                  value={item.quantity || 1}
                  onChange={(e) =>
                    updateQty(index, Number(e.target.value))
                  }
                  className="w-20 border rounded-lg px-2 py-1"
                />

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 font-semibold"
                >
                  Remove ❌
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-8 text-xl font-bold">
            Total: <span className="text-green-700">₹{total}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
