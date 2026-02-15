import { useState } from "react";
import { useCart } from "../context/CartContext";

const fruits = [
  { id: 1, name: "Grapes", price: 120, image: "/images/grapes.png" },
  { id: 2, name: "Pineapple", price: 60, image: "/images/pinapple.png" },
  { id: 3, name: "Watermelon", price: 150, image: "/images/watermelon.png" },
  { id: 5, name: "Strawberries", price: 100, image: "/images/strawberries.png" },
];

function CustomBowlPage() {
  const { addToCart } = useCart();

  const [selected, setSelected] = useState({});
  const [quantities, setQuantities] = useState({});

  const toggleFruit = (fruit) => {
    setSelected((prev) => ({
      ...prev,
      [fruit.id]: !prev[fruit.id],
    }));
  };

  const changeQty = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const total = fruits.reduce((sum, fruit) => {
    if (selected[fruit.id]) {
      const qty = quantities[fruit.id] || 1;
      return sum + fruit.price * qty;
    }
    return sum;
  }, 0);

  const addCustomBowl = () => {
    if (total === 0) return alert("Select at least one fruit 🍓");

    addToCart({
      name: "Custom Fruit Bowl 🥗",
      price: total,
      quantity: 1,
    });

    alert("Custom bowl added to cart 🛒");
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 py-10 bg-[#FBF8F2] min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Build Your Custom Bowl 🥗
      </h1>

      {/* GRID CARDS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            className={`bg-white rounded-2xl shadow-md p-5 text-center transition hover:shadow-xl ${
              selected[fruit.id] ? "border-2 border-green-600" : ""
            }`}
          >
            {/* Select Checkbox */}
            <input
              type="checkbox"
              checked={selected[fruit.id] || false}
              onChange={() => toggleFruit(fruit)}
              className="mb-3 w-5 h-5"
            />

            {/* Image */}
            <img
              src={fruit.image}
              alt={fruit.name}
              className="w-24 h-24 mx-auto object-contain"
            />

            {/* Name */}
            <p className="font-semibold mt-3">{fruit.name}</p>

            {/* Price */}
            <p className="text-green-700 font-bold text-lg">
              ₹{fruit.price}
            </p>

            {/* Quantity Input */}
            {selected[fruit.id] && (
              <input
                type="number"
                min="1"
                value={quantities[fruit.id] || 1}
                onChange={(e) =>
                  changeQty(fruit.id, Number(e.target.value))
                }
                className="mt-3 w-20 border rounded-lg px-2 py-1 text-center"
              />
            )}
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-10 text-xl font-bold text-center">
        Total Price:{" "}
        <span className="text-green-700 text-2xl">₹{total}</span>
      </div>

      {/* BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={addCustomBowl}
          className="mt-6 bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 shadow-md"
        >
          Add Custom Bowl to Cart 🛒
        </button>
      </div>
    </div>
  );
}

export default CustomBowlPage;
