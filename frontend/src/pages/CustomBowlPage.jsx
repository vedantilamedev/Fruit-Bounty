import { useState } from "react";
import { useCart } from "../context/CartContext";

// Fruits with nutrition (approx values per serving)
const fruits = [
  { id: 1, name: "Berries", price: 40, calories: 50, protein: 1, image: "/images/berries.png" },
  { id: 2, name: "Banana", price: 30, calories: 105, protein: 1.3, image: "/images/banana.png" },
  { id: 3, name: "Grapes", price: 120, calories: 62, protein: 0.6, image: "/images/grapes.png" },
  { id: 4, name: "Pineapple", price: 60, calories: 82, protein: 0.9, image: "/images/pinapple.png" },
  { id: 5, name: "Watermelon", price: 150, calories: 46, protein: 0.9, image: "/images/watermelon.png" },
  { id: 6, name: "Strawberries", price: 100, calories: 49, protein: 1, image: "/images/strawberries.png" },
  { id: 7, name: "Mango", price: 80, calories: 99, protein: 1.4, image: "/images/mango.png" },
  { id: 8, name: "Papaya", price: 50, calories: 59, protein: 0.9, image: "/images/papaya.png" },
  { id: 9, name: "Kiwi", price: 140, calories: 42, protein: 0.8, image: "/images/kiwi.png" },
  { id: 10, name: "Orange", price: 60, calories: 62, protein: 1.2, image: "/images/oranges.png" },
  { id: 11, name: "Blueberries", price: 200, calories: 84, protein: 1.1, image: "/images/blueberries.png" },
  { id: 12, name: "Pomegranate", price: 90, calories: 83, protein: 1.7, image: "/images/pomegranate.png" },
  { id: 13, name: "Guava", price: 40, calories: 68, protein: 2.6, image: "/images/guava.png" },
  { id: 14, name: "Dragon Fruit", price: 180, calories: 60, protein: 1.2, image: "/images/dragonfruit.png" },
  { id: 15, name: "Pear", price: 70, calories: 96, protein: 0.6, image: "/images/pear.png" },
  { id: 16, name: "Cherries", price: 220, calories: 87, protein: 1.4, image: "/images/cherries.png" },
  { id: 17, name: "Lychee", price: 160, calories: 66, protein: 0.8, image: "/images/lychee.png" },
  { id: 18, name: "Plum", price: 90, calories: 30, protein: 0.5, image: "/images/plum.png" },
  { id: 19, name: "Apricot", price: 130, calories: 48, protein: 1.4, image: "/images/apricot.png" },
  { id: 20, name: "Blackberries", price: 210, calories: 43, protein: 1.4, image: "/images/blackberries.png" },
];

// TOPPINGS
const toppings = [
  { id: 1, name: "Nuts", price: 30 },
  { id: 2, name: "Honey", price: 20 },
  { id: 3, name: "Dry Fruits", price: 40 },
  { id: 4, name: "Yogurt", price: 50 },
];

// SIZES
const sizes = [
  { id: "small", name: "Small", multiplier: 1 },
  { id: "medium", name: "Medium", multiplier: 1.3 },
  { id: "large", name: "Large", multiplier: 1.6 },
  { id: "family", name: "Family Size", multiplier: 2 },
];

function CustomBowlPage() {
  const { addToCart } = useCart();

  const [selectedFruits, setSelectedFruits] = useState({});
  const [selectedToppings, setSelectedToppings] = useState({});
  const [selectedSize, setSelectedSize] = useState("small");

  const toggleFruit = (id) => {
    setSelectedFruits((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTopping = (id) => {
    setSelectedToppings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // PRICE CALCULATION
  const fruitTotal = fruits.reduce((sum, fruit) => {
    return selectedFruits[fruit.id] ? sum + fruit.price : sum;
  }, 0);

  const toppingsTotal = toppings.reduce((sum, topping) => {
    return selectedToppings[topping.id] ? sum + topping.price : sum;
  }, 0);

  const sizeMultiplier = sizes.find((s) => s.id === selectedSize)?.multiplier || 1;
  const total = Math.round((fruitTotal + toppingsTotal) * sizeMultiplier);

  const addCustomBowl = () => {
    if (fruitTotal === 0) return alert("Select at least one fruit 🍓");

    addToCart({
      name: `Custom Bowl (${selectedSize})`,
      price: total,
      quantity: 1,
    });

    alert("Custom bowl added to cart 🛒");
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 py-10 bg-[#FBF8F2] min-h-screen">
      {/* HEADING */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        Build Your Custom Bowl 🥗
      </h1>

      {/* FRUITS - NO CARDS, BIG IMAGES */}
      <h2 className="text-2xl font-semibold mb-6">Select Fruits</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
       {fruits.map((fruit) => (
         <div
           key={fruit.id}
           onClick={() => toggleFruit(fruit.id)}
           className="cursor-pointer text-center relative"
         >
           {/* Image */}
           <img
             src={fruit.image}
             alt={fruit.name}
             className="w-48 h-48 md:w-64 md:h-64 mx-auto object-contain"

           />

           {/* Check Icon */}
           {selectedFruits[fruit.id] && (
             <div className="absolute top-2 right-4 bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow-md">
               ✓
             </div>
           )}

           {/* Name */}
           <p className="mt-3 font-semibold text-lg">{fruit.name}</p>

           {/* Price */}
           <p className="text-green-700 font-bold">₹{fruit.price}</p>

           {/* Nutrition */}
           <p className="text-sm text-gray-600">🔥 {fruit.calories} kcal</p>
           <p className="text-sm text-gray-600">💪 {fruit.protein}g protein</p>
         </div>
       ))}

      </div>

      {/* TOPPINGS */}
      <h2 className="text-2xl font-semibold mb-4">Choose Toppings</h2>
      <div className="flex flex-wrap gap-4 mb-10">
        {toppings.map((topping) => (
          <button
            key={topping.id}
            onClick={() => toggleTopping(topping.id)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedToppings[topping.id]
                ? "bg-green-700 text-white"
                : "bg-white"
            }`}
          >
            {topping.name} (+₹{topping.price})
          </button>
        ))}
      </div>

      {/* SIZE */}
      <h2 className="text-2xl font-semibold mb-4">Select Size</h2>
      <div className="flex flex-wrap gap-4 mb-10">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => setSelectedSize(size.id)}
            className={`px-5 py-2 rounded-full border transition ${
              selectedSize === size.id
                ? "bg-green-700 text-white"
                : "bg-white"
            }`}
          >
            {size.name}
          </button>
        ))}
      </div>

      {/* TOTAL */}
      <div className="text-center text-2xl font-bold">
        Total Price: <span className="text-green-700">₹{total}</span>
      </div>

      {/* ADD BUTTON */}
      <div className="flex justify-center mt-6">
        <button
          onClick={addCustomBowl}
          className="bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 shadow-md"
        >
          Add Custom Bowl to Cart 🛒
        </button>
      </div>
    </div>
  );
}

export default CustomBowlPage;
