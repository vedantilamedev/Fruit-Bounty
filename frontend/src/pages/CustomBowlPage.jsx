import { useState, useMemo, useEffect } from "react";
import { useCart } from "../context/CartContext";
import {
  CheckCircle,
  ChevronRight,
  Sparkles,
  Leaf,
  Zap,
  Lock,
  Salad,
} from "lucide-react";
import { motion } from "framer-motion";

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

const toppings = [
  { id: 1, name: "Nuts", price: 30 },
  { id: 2, name: "Honey", price: 20 },
  { id: 3, name: "Dry Fruits", price: 40 },
  { id: 4, name: "Yogurt", price: 50 },
];

const sizes = [
  { id: "small", name: "Small", multiplier: 1, desc: "Perfect for a quick, vitamin-rich refreshment." },
  { id: "medium", name: "Medium", multiplier: 1.3, desc: "Our most popular balanced meal size." },
  { id: "large", name: "Large", multiplier: 1.6, desc: "High-fiber powerhouse for active days." },
  { id: "family", name: "Family Size", multiplier: 2, desc: "Shared health for the whole family." },
];

const portionHighlights = {
  small: "Light and quick choice",
  medium: "Most loved balanced bowl",
  large: "Built for active days",
  family: "Perfect for sharing",
};

function SectionHeading({ step, title, desc }) {
  return (
    <div className="mb-8 md:mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-green-800 font-black text-[10px] bg-green-100 px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
          {step}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-green-300/60 to-transparent"></div>
      </div>
      <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{title}</h3>
      {desc && <p className="text-gray-500 mt-2 text-sm md:text-base max-w-3xl">{desc}</p>}
    </div>
  );
}

function CustomBowlPage() {
  const { addToCart } = useCart();
  const [selectedFruits, setSelectedFruits] = useState({});
  const [selectedToppings, setSelectedToppings] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectedSizeInfo = useMemo(
    () => sizes.find((size) => size.id === selectedSize),
    [selectedSize],
  );
  const normalFruits = useMemo(() => fruits.filter((fruit) => fruit.price <= 100), []);
  const premiumFruits = useMemo(() => fruits.filter((fruit) => fruit.price > 100), []);

  const toggleFruit = (id) => {
    if (!selectedSize) {
      alert("Please select a Bowl Size first to start building your bowl.");
      return;
    }
    setSelectedFruits((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTopping = (id) => {
    if (!selectedSize) {
      alert("Please select a Bowl Size first to add toppings.");
      return;
    }
    setSelectedToppings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const stats = useMemo(() => {
    if (!selectedSize) return { total: 0, fruitCount: 0, toppingCount: 0, calories: 0, protein: 0 };

    const fruitTotal = fruits.reduce((sum, fruit) => (selectedFruits[fruit.id] ? sum + fruit.price : sum), 0);
    const toppingsTotal = toppings.reduce((sum, topping) => (selectedToppings[topping.id] ? sum + topping.price : sum), 0);
    const multiplier = selectedSizeInfo?.multiplier || 1;

    const calories = fruits.reduce((sum, fruit) => (selectedFruits[fruit.id] ? sum + fruit.calories : sum), 0);
    const protein = fruits.reduce((sum, fruit) => (selectedFruits[fruit.id] ? sum + fruit.protein : sum), 0);

    return {
      total: Math.round((fruitTotal + toppingsTotal) * multiplier),
      fruitCount: Object.values(selectedFruits).filter(Boolean).length,
      toppingCount: Object.values(selectedToppings).filter(Boolean).length,
      calories: Math.round(calories * multiplier),
      protein: Number((protein * multiplier).toFixed(1)),
    };
  }, [selectedFruits, selectedToppings, selectedSize, selectedSizeInfo]);

  return (
    <div className="relative bg-[#FBF8F2] min-h-screen overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "url('/images/main-background.png')",
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef7ef]/80 via-transparent to-[#fbf8f2]"></div>
      </div>

      <section className="relative z-10 py-16 md:py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto rounded-[2.5rem] border border-[#d8d2a0] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#184f2f] via-[#1f6b37] to-[#b7862c]"></div>
          <div className="absolute -top-24 -left-16 w-72 h-72 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center px-6 py-12 md:px-10 md:py-14 lg:px-14">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.22em] flex items-center gap-2">
                  <Leaf size={12} /> Farm Fresh Daily
                </span>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.22em] flex items-center gap-2">
                  <Sparkles size={12} /> Fully Customizable
                </span>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.22em] flex items-center gap-2">
                  <Zap size={12} /> Natural Energy
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                Build Your <span className="text-[#C9C27A]">Custom Bowl</span>
              </h1>
              <p className="text-white/90 text-sm md:text-lg mt-5 max-w-2xl leading-relaxed font-medium">
                Pick a portion, hand-select fruits, add toppings, and create a bowl that matches your taste and nutrition goals.
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 max-w-3xl">
                {[
                  { label: "Fruit Choices", value: `${fruits.length}+` },
                  { label: "Toppings", value: `${toppings.length}+` },
                  { label: "Sizes", value: `${sizes.length}` },
                  { label: "No Preservatives", value: "100%" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/15 rounded-2xl px-3 py-4 border border-white/20">
                    <p className="text-xl md:text-2xl font-black text-white">{item.value}</p>
                    <p className="text-[11px] uppercase tracking-wider text-white/80 font-bold">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative w-full max-w-md mx-auto"
            >
              <div className="absolute top-3 right-3 bg-[#ffe6a9] text-[#1b4f2f] px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-black shadow-lg">
                Signature Mix
              </div>
              <div className="rounded-[2rem] bg-white/15 border border-white/20 p-5 md:p-6">
                <img
                  src="/images/custom.png"
                  alt="Custom Bowl Preview"
                  className="w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-24">
        <section className="mb-20">
          <SectionHeading
            step="Step 01"
            title="Choose Your Portion"
            desc="Select a bowl size first. Prices and nutrition automatically adjust based on this size."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sizes.map((size) => {
              const active = selectedSize === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`text-left rounded-[2rem] border-2 p-6 transition-all duration-300 bg-white h-full ${
                    active
                      ? "border-green-700 shadow-[0_18px_40px_rgba(22,101,52,0.25)] ring-4 ring-green-100"
                      : "border-[#ebe6cb] hover:border-green-300 hover:-translate-y-1"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b79654]">Portion</p>
                      <h4 className={`text-2xl font-black mt-1 ${active ? "text-green-800" : "text-gray-900"}`}>
                        {size.name}
                      </h4>
                    </div>
                    {active && <CheckCircle size={22} className="text-green-600" />}
                  </div>
                  <p className="text-sm text-gray-500 mt-4 leading-relaxed">{size.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-800 bg-green-50 px-3 py-1.5 rounded-full">
                    {portionHighlights[size.id]}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-20">
          <SectionHeading
            step="Step 02"
            title="Select Fresh Fruits"
            desc="Choose one or many fruits to create your ideal flavor and nutrition mix."
          />

          {!selectedSize && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm font-semibold flex items-center gap-2">
              <Lock size={16} />
              Select a bowl size in Step 01 to unlock fruit and topping selection.
            </div>
          )}

          <div className="mb-6">
            <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-4">Normal Fruits</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
              {normalFruits.map((fruit) => {
                const active = !!selectedFruits[fruit.id];
                return (
                  <button
                    key={fruit.id}
                    onClick={() => toggleFruit(fruit.id)}
                    className={`relative text-left rounded-[1.8rem] border p-4 bg-white transition-all duration-300 ${
                      active
                        ? "border-green-600 shadow-[0_16px_30px_rgba(22,101,52,0.2)] -translate-y-1"
                        : "border-[#ebe6cb] hover:border-green-300"
                    }`}
                  >
                    <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#f4faf4] to-[#fff6e8] border border-[#ece7c9] flex items-center justify-center overflow-hidden">
                      <img src={fruit.image} alt={fruit.name} className="w-[86%] h-[86%] object-contain" />
                    </div>

                    {active && (
                      <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                        <CheckCircle size={16} />
                      </div>
                    )}

                    <div className="mt-4">
                      <p className="font-black text-gray-900 leading-tight">{fruit.name}</p>
                      <p className="text-green-800 font-black mt-1">Rs. {fruit.price}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100">
                          <p className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Calories</p>
                          <p className="text-[11px] font-bold text-gray-700">{fruit.calories}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100">
                          <p className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Protein</p>
                          <p className="text-[11px] font-bold text-gray-700">{fruit.protein}g</p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-4">Premium Fruits</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
              {premiumFruits.map((fruit) => {
                const active = !!selectedFruits[fruit.id];
                return (
                  <button
                    key={fruit.id}
                    onClick={() => toggleFruit(fruit.id)}
                    className={`relative text-left rounded-[1.8rem] border p-4 bg-white transition-all duration-300 ${
                      active
                        ? "border-green-600 shadow-[0_16px_30px_rgba(22,101,52,0.2)] -translate-y-1"
                        : "border-[#ebe6cb] hover:border-green-300"
                    }`}
                  >
                    <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#fff5eb] to-[#ffeed7] border border-[#ead9b8] flex items-center justify-center overflow-hidden">
                      <img src={fruit.image} alt={fruit.name} className="w-[86%] h-[86%] object-contain" />
                    </div>

                    {active && (
                      <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                        <CheckCircle size={16} />
                      </div>
                    )}

                    <div className="mt-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-black text-gray-900 leading-tight">{fruit.name}</p>
                        <span className="text-[9px] uppercase tracking-wider font-bold text-[#a06e1a] bg-[#fff2de] px-2 py-1 rounded-full">
                          Premium
                        </span>
                      </div>
                      <p className="text-green-800 font-black mt-1">Rs. {fruit.price}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100">
                          <p className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Calories</p>
                          <p className="text-[11px] font-bold text-gray-700">{fruit.calories}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100">
                          <p className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Protein</p>
                          <p className="text-[11px] font-bold text-gray-700">{fruit.protein}g</p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            step="Step 03"
            title="Add Premium Toppings"
            desc="Finish your bowl with texture and flavor boosters."
          />

          <div className="flex flex-wrap gap-3">
            {toppings.map((topping) => {
              const active = !!selectedToppings[topping.id];
              return (
                <button
                  key={topping.id}
                  onClick={() => toggleTopping(topping.id)}
                  className={`px-6 md:px-8 py-3.5 rounded-full text-sm font-black transition-all border-2 ${
                    active
                      ? "bg-green-700 border-green-700 text-white shadow-xl"
                      : "bg-white border-[#e8e2c4] text-gray-600 hover:border-green-400"
                  }`}
                >
                  {topping.name} (+Rs. {topping.price})
                </button>
              );
            })}
          </div>
        </section>

        {selectedSize && (
          <div className="sticky bottom-24 md:bottom-10 z-30 w-full pointer-events-none">
            <div className="pointer-events-auto">
              <motion.div
                layout
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="rounded-[2rem] border border-green-100 bg-white/95 backdrop-blur-xl p-5 md:p-6 shadow-[0_25px_55px_rgba(0,0,0,0.2)]"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 flex-1">
                    <div className="rounded-xl bg-[#f5faf5] border border-green-100 px-3 py-2.5">
                      <p className="text-[9px] uppercase font-black tracking-wider text-gray-400">Size</p>
                      <p className="text-sm md:text-base font-black text-gray-900 capitalize">{selectedSize}</p>
                    </div>
                    <div className="rounded-xl bg-[#f5faf5] border border-green-100 px-3 py-2.5">
                      <p className="text-[9px] uppercase font-black tracking-wider text-gray-400">Fruits</p>
                      <p className="text-sm md:text-base font-black text-gray-900">{stats.fruitCount}</p>
                    </div>
                    <div className="rounded-xl bg-[#f5faf5] border border-green-100 px-3 py-2.5">
                      <p className="text-[9px] uppercase font-black tracking-wider text-gray-400">Toppings</p>
                      <p className="text-sm md:text-base font-black text-gray-900">{stats.toppingCount}</p>
                    </div>
                    <div className="rounded-xl bg-[#f5faf5] border border-green-100 px-3 py-2.5">
                      <p className="text-[9px] uppercase font-black tracking-wider text-gray-400">Calories</p>
                      <p className="text-sm md:text-base font-black text-gray-900">{stats.calories}</p>
                    </div>
                    <div className="rounded-xl bg-gradient-to-r from-green-700 to-green-900 px-3 py-2.5 text-white">
                      <p className="text-[9px] uppercase font-black tracking-wider text-green-100">Total</p>
                      <p className="text-lg md:text-xl font-black leading-tight">Rs. {stats.total}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (stats.fruitCount === 0) {
                        alert("Select at least one fruit to complete your bowl.");
                        return;
                      }

                      const selectedFruitNames = fruits
                        .filter((fruit) => selectedFruits[fruit.id])
                        .map((fruit) => fruit.name)
                        .join(", ");

                      const selectedToppingNames = toppings
                        .filter((topping) => selectedToppings[topping.id])
                        .map((topping) => topping.name)
                        .join(", ");

                      addToCart({
                        name: `Custom Bowl (${selectedSize})`,
                        price: stats.total,
                        quantity: 1,
                        image: "/images/custom-bowl.png",
                        description: `Fruits: ${selectedFruitNames || "None"} | Toppings: ${selectedToppingNames || "None"}`,
                        calories: `${stats.calories} kcal`,
                        protein: `${stats.protein}g Protein`,
                      });

                      alert("Custom bowl added to cart!");
                    }}
                    className="w-full lg:w-auto bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white px-8 md:px-12 py-4 rounded-2xl font-black text-base md:text-lg flex items-center justify-center gap-2.5 shadow-xl transition-all active:scale-95"
                  >
                    <Salad size={20} />
                    Add Bowl to Cart
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomBowlPage;
