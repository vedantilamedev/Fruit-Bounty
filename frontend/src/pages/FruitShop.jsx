import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    title: "Small Bowl",
    weight: "250g",
    price: 199,
    rating: 4.7,
    calories: "320 kcal",
    protein: "12g Protein",
    ingredients: ["Apple", "Banana", "Granola", "Honey"],
    toppings: ["Chia Seeds", "Almonds", "Pumpkin Seeds"],
    description: "Perfect for a light and healthy snack.",
    image: "/images/smallBowl.png",
  },
  {
    id: 2,
    title: "Medium Bowl",
    weight: "400g",
    price: 299,
    rating: 4.9,
    calories: "480 kcal",
    protein: "18g Protein",
    ingredients: ["Strawberry", "Blueberry", "Chia", "Almond"],
    toppings: ["Coconut Flakes", "Dark Chocolate", "Peanut Butter"],
    description: "Balanced nutrition with great taste.",
    image: "/images/mediumBowl.png",
  },
  {
    id: 3,
    title: "Large Bowl",
    weight: "900g",
    price: 449,
    rating: 5.0,
    calories: "720 kcal",
    protein: "25g Protein",
    ingredients: ["Mixed Fruits", "Seeds", "Nuts", "Honey"],
    toppings: ["Cashews", "Walnuts", "Honey Drizzle"],
    description: "Ideal for sharing with friends and family.",
    image: "/images/largeBowl.png",
  },
  {
    id: 4,
    title: "Protein Power Bowl",
    weight: "500g",
    price: 349,
    rating: 4.8,
    calories: "550 kcal",
    protein: "28g Protein",
    ingredients: ["Banana", "Oats", "Peanut Butter", "Dates"],
    toppings: ["Whey Protein", "Flax Seeds", "Choco Chips"],
    description: "High protein bowl for gym lovers.",
    image: "/images/proteinBowl.png",
  },
  {
    id: 5,
    title: "Berry Blast Bowl",
    weight: "350g",
    price: 279,
    rating: 4.6,
    calories: "410 kcal",
    protein: "14g Protein",
    ingredients: ["Strawberry", "Raspberry", "Blueberry"],
    toppings: ["Mint Leaves", "Honey", "Granola"],
    description: "Loaded with antioxidants and freshness.",
    image: "/images/berryBowl.png",
  },
  {
    id: 6,
    title: "Tropical Delight",
    weight: "450g",
    price: 329,
    rating: 4.9,
    calories: "500 kcal",
    protein: "16g Protein",
    ingredients: ["Mango", "Pineapple", "Coconut"],
    toppings: ["Coconut Chips", "Chia Seeds", "Cashew Crumble"],
    description: "A tropical escape in every bite.",
    image: "/images/tropicalBowl.png",
  },
  {
    id: 7,
    title: "Green Detox Bowl",
    weight: "300g",
    price: 259,
    rating: 4.5,
    calories: "350 kcal",
    protein: "13g Protein",
    ingredients: ["Spinach", "Kiwi", "Apple", "Mint"],
    toppings: ["Sunflower Seeds", "Honey", "Granola"],
    description: "Clean and refreshing detox bowl.",
    image: "/images/greenBowl.png",
  },
  {
    id: 8,
    title: "Chocolate Crunch Bowl",
    weight: "420g",
    price: 319,
    rating: 4.8,
    calories: "530 kcal",
    protein: "20g Protein",
    ingredients: ["Banana", "Cocoa", "Oats"],
    toppings: ["Dark Chocolate", "Almond Butter", "Choco Chips"],
    description: "For chocolate lovers with healthy twist.",
    image: "/images/chocoBowl.png",
  },
  {
    id: 9,
    title: "Classic Yogurt Bowl",
    weight: "300g",
    price: 229,
    rating: 4.4,
    calories: "340 kcal",
    protein: "15g Protein",
    ingredients: ["Greek Yogurt", "Honey", "Granola"],
    toppings: ["Strawberry", "Blueberry", "Pumpkin Seeds"],
    description: "Simple, creamy and delicious.",
    image: "/images/yogurtBowl.png",
  },
  {
    id: 10,
    title: "Nutty Delight Bowl",
    weight: "380g",
    price: 309,
    rating: 4.7,
    calories: "490 kcal",
    protein: "19g Protein",
    ingredients: ["Banana", "Peanut Butter", "Dates"],
    toppings: ["Walnuts", "Almonds", "Chia Seeds"],
    description: "Crunchy and protein rich bowl.",
    image: "/images/nuttyBowl.png",
  },
  {
    id: 11,
    title: "Summer Special Bowl",
    weight: "360g",
    price: 289,
    rating: 4.6,
    calories: "420 kcal",
    protein: "14g Protein",
    ingredients: ["Watermelon", "Mango", "Mint"],
    toppings: ["Coconut Flakes", "Honey", "Chia Seeds"],
    description: "Refreshing summer fruit combo.",
    image: "/images/summerBowl.png",
  },
  {
    id: 12,
    title: "Energy Boost Bowl",
    weight: "480g",
    price: 359,
    rating: 4.9,
    calories: "600 kcal",
    protein: "22g Protein",
    ingredients: ["Oats", "Banana", "Dates", "Almond Milk"],
    toppings: ["Peanut Butter", "Cashews", "Dark Chocolate"],
    description: "Power packed bowl for busy days.",
    image: "/images/energyBowl.png",
  },
];
function FruitShop() {
  const { addToCart } = useCart();
  const [selectedBowls, setSelectedBowls] = useState([]);

  const toggleSelection = (product) => {
    const exists = selectedBowls.find((item) => item.id === product.id);
    if (exists) {
      setSelectedBowls(selectedBowls.filter((item) => item.id !== product.id));
    } else {
      setSelectedBowls([...selectedBowls, product]);
    }
  };

  const totalSelectedPrice = selectedBowls.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const handleBulkAddToCart = () => {
    selectedBowls.forEach((item) =>
      addToCart({ ...item, quantity: 1 })
    );
    alert(`${selectedBowls.length} items added to your cart! 🥗`);
    setSelectedBowls([]);
  };

  return (
    <div className="min-h-screen font-sans 
bg-[url('/images/fruitBackground.png')] 
bg-cover bg-center bg-no-repeat bg-fixed relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <header className="py-20 text-center">
          <span className="text-green-700 font-bold tracking-widest uppercase text-sm">
            Fresh • Organic • Healthy
          </span>

          <h1 className="text-5xl font-black text-gray-900 mt-3">
            Build Your <span className="text-orange-500">Perfect Bowl</span>
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            100% Natural Ingredients | No Preservatives | Same Day Delivery
          </p>
        </header>

        {/* PRODUCT GRID */}
        <section className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {products.map((product, index) => {
            const isSelected = selectedBowls.some(
              (item) => item.id === product.id
            );

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                onClick={() => toggleSelection(product)}
                className={`rounded-3xl p-6 cursor-pointer border-2 transition-all duration-300 flex flex-col
                ${isSelected
                    ? "border-green-600 bg-white shadow-2xl"
                    : "bg-white shadow-lg hover:shadow-2xl"
                  }`}
              >
                {/* IMAGE */}
                <div className="relative bg-orange-50 rounded-2xl h-52 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-40 object-contain"
                  />

                  {/* Badge */}
                  {product.rating >= 4.9 && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                      Best Seller
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="mt-5 flex flex-col flex-grow">

                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black">
                      {product.title}
                    </h3>
                    <span className="text-green-700 text-sm font-bold">
                      {product.weight}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mt-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mt-3 text-yellow-500 text-sm">
                    ⭐ {product.rating}
                  </div>

                  {/* Nutrition */}
                  <div className="flex gap-4 mt-3 text-xs text-gray-600">
                    <span>🔥 {product.calories}</span>
                    <span>💪 {product.protein}</span>
                  </div>

                  {/* Ingredients Capsules */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.ingredients.map((item, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Price + Button */}
                  <div className="flex justify-between items-center mt-auto pt-6">
                    <span className="text-2xl font-black">
                      ₹{product.price}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({ ...product, quantity: 1 });
                        alert(`${product.title} added!`);
                      }}
                      className="bg-green-700 hover:bg-green-800 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* WHY CHOOSE US */}
        <section className="mt-32 text-center">
          <h2 className="text-4xl font-black mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Farm Fresh Ingredients 🥗",
              "Fast 30-Min Delivery ⚡",
              "High Protein & Nutrition ❤️",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-3xl shadow-xl"
              >
                <p className="font-bold text-lg">{item}</p>
              </div>
            ))}
          </div>
        </section>
        {/* CUSTOMER TESTIMONIALS */}
        <section className="mt-32 text-center">
          <h2 className="text-4xl font-black mb-12">
            What Our Customers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Rahul Sharma",
                review: "Best healthy bowls I’ve ever had! Fresh and delicious.",
              },
              {
                name: "Priya Mehta",
                review: "Perfect for my gym diet. High protein and tasty!",
              },
              {
                name: "Arjun Verma",
                review: "Fast delivery and amazing quality. Highly recommend!",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-xl"
              >
                <p className="text-yellow-500 mb-4">⭐⭐⭐⭐⭐</p>
                <p className="text-gray-600 italic">"{item.review}"</p>
                <p className="mt-4 font-bold text-gray-900">
                  - {item.name}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* DELIVERY INFORMATION */}
        <section className="mt-32 bg-white rounded-3xl shadow-xl p-12">
          <div className="grid md:grid-cols-3 gap-10 text-center">

            <div>
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-bold text-lg">Fast Delivery</h3>
              <p className="text-gray-500 mt-2">
                Delivered within 30 minutes in your area.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-4">🥗</div>
              <h3 className="font-bold text-lg">Fresh Ingredients</h3>
              <p className="text-gray-500 mt-2">
                100% natural and farm-fresh ingredients.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-4">💳</div>
              <h3 className="font-bold text-lg">Secure Payment</h3>
              <p className="text-gray-500 mt-2">
                Multiple payment options available.
              </p>
            </div>

          </div>
        </section>


        {/* SUBSCRIPTION OFFER */}
        <section className="mt-32 bg-gradient-to-r from-green-700 to-orange-500 text-white rounded-3xl p-16 text-center shadow-2xl">
          <h2 className="text-4xl font-black mb-6">
            Subscribe & Save 20%
          </h2>

          <p className="text-lg mb-8">
            Get weekly healthy bowls delivered to your doorstep.
            Cancel anytime.
          </p>

          <button className="bg-white text-green-700 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition">
            Subscribe Now
          </button>
        </section>


        {/* CONTACT / FOOTER */}
        <footer className="mt-32 pb-20 text-center">
          <h2 className="text-3xl font-black mb-6">
            Get In Touch
          </h2>

          <p className="text-white mb-4">
            📍 Mumbai, India
          </p>

          <p className="text-white mb-4">
            📞 +91 98765 43210
          </p>

          <p className="text-white mb-8">
            📧 support@fruitbowl.com
          </p>

          <div className="flex justify-center gap-6 text-2xl">
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
          </div>

          <p className="text-yellow-300 mt-10 text-sm">
            © 2026 Fruit Bowl. All rights reserved.
          </p>
        </footer>

        {/* FLOATING ORDER BAR */}
        <AnimatePresence>
          {selectedBowls.length > 0 && (
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              className="fixed bottom-10 left-0 right-0 px-6 flex justify-center z-50"
            >
              <div className="bg-green-900 text-white px-8 py-5 rounded-3xl shadow-xl flex justify-between items-center w-full max-w-4xl">
                <div>
                  <p>{selectedBowls.length} items selected</p>
                  <p className="font-bold text-xl">
                    ₹{totalSelectedPrice}
                  </p>
                </div>

                <button
                  onClick={handleBulkAddToCart}
                  className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-xl font-bold transition"
                >
                  Order Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default FruitShop;