import { useState, useMemo, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { CheckCircle, ChevronRight, Sparkles, Leaf, Zap } from "lucide-react";
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

function CustomBowlPage() {
  const { addToCart } = useCart();
  const [selectedFruits, setSelectedFruits] = useState({});
  const [selectedToppings, setSelectedToppings] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFruit = (id) => {
    // CODE SIDE LOGIC: Selection blocked if size is null
    if (!selectedSize) {
      alert("Please select a Bowl Size first to start building your bowl! 🥣");
      return;
    }
    setSelectedFruits((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTopping = (id) => {
    // CODE SIDE LOGIC: Selection blocked if size is null
    if (!selectedSize) {
      alert("Please select a Bowl Size first to add toppings! 🥣");
      return;
    }
    setSelectedToppings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const stats = useMemo(() => {
    if (!selectedSize) return { total: 0, fruitCount: 0 };
    const fruitTotal = fruits.reduce((sum, f) => (selectedFruits[f.id] ? sum + f.price : sum), 0);
    const toppingsTotal = toppings.reduce((sum, t) => (selectedToppings[t.id] ? sum + t.price : sum), 0);
    const multiplier = sizes.find((s) => s.id === selectedSize)?.multiplier || 1;
    return {
      total: Math.round((fruitTotal + toppingsTotal) * multiplier),
      fruitCount: Object.values(selectedFruits).filter(Boolean).length
    };
  }, [selectedFruits, selectedToppings, selectedSize]);

  return (
    <div className="bg-[#FBF8F2] min-h-screen font-sans overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Fresh Fruits"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 md:px-12 lg:px-24 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center gap-4 mb-6">
               <span className="bg-green-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                 <Leaf size={12} /> 100% Fresh Fruits
               </span>
               <span className="bg-orange-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                 <Zap size={12} /> Natural Energy
               </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
              Design Your <span className="text-green-400 italic">Signature</span> Fruit Bowl
            </h1>
            <p className="text-gray-100 text-base md:text-xl font-medium max-w-4xl mx-auto leading-relaxed">
              Experience ultimate nutrition tailored to your taste. Pick a size below and start customizing your fresh seasonal fruit bowl.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SELECTION AREA WITH PADDING */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-20 relative">
        
        {/* STEP 1: SIZE SELECTION */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-green-700 font-bold text-xs bg-green-100 px-4 py-1.5 rounded-full uppercase tracking-widest">Step 01</span>
            <h3 className="text-3xl font-black text-gray-900">Choose Your Portion</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sizes.map((size) => (
              <div
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`cursor-pointer p-8 rounded-[2.5rem] border-2 transition-all bg-white flex flex-col justify-between h-full ${
                  selectedSize === size.id ? 'border-green-600 shadow-2xl scale-[1.05] ring-8 ring-green-50' : 'border-gray-100 hover:border-green-200'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className={`text-xl font-bold ${selectedSize === size.id ? 'text-green-700' : 'text-gray-800'}`}>{size.name}</h4>
                    {selectedSize === size.id && <CheckCircle size={24} className="text-green-600" />}
                  </div>
                  <p className="text-sm text-gray-400 mb-8 leading-relaxed font-medium">{size.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STEP 2: FRUIT SELECTION (Visible, but locked in code) */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-green-700 font-bold text-xs bg-green-100 px-4 py-1.5 rounded-full uppercase tracking-widest">Step 02</span>
            <h3 className="text-3xl font-black text-gray-900">Select Fresh Fruits</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10">
            {fruits.map((fruit) => (
              <div
                key={fruit.id}
                onClick={() => toggleFruit(fruit.id)}
                className={`cursor-pointer text-center relative p-4 rounded-[2rem] transition-all bg-white shadow-sm border border-gray-100 hover:border-green-300 ${
                  selectedFruits[fruit.id] ? 'shadow-xl scale-105 border-2 border-green-500' : 'hover:scale-105'
                }`}
              >
                <img src={fruit.image} alt={fruit.name} className="w-full aspect-square object-contain mb-4" />
                {selectedFruits[fruit.id] && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg font-bold">✓</div>
                )}
                <p className="font-bold text-lg text-gray-800">{fruit.name}</p>
                <p className="text-green-700 font-black">₹{fruit.price}</p>
                <div className="mt-1 flex justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                  <span>🔥 {fruit.calories} kcal</span>
                  <span>💪 {fruit.protein}g</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STEP 3: TOPPINGS (Visible, but locked in code) */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-green-700 font-bold text-xs bg-green-100 px-4 py-1.5 rounded-full uppercase tracking-widest">Step 03</span>
            <h3 className="text-3xl font-black text-gray-900">Add Crunchy Toppings</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {toppings.map((topping) => (
              <button
                key={topping.id}
                onClick={() => toggleTopping(topping.id)}
                className={`px-10 py-5 rounded-full text-sm font-black transition-all border-2 ${
                  selectedToppings[topping.id] 
                  ? 'bg-green-700 border-green-700 text-white shadow-2xl' 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-green-400'
                }`}
              >
                {topping.name} (+₹{topping.price})
              </button>
            ))}
          </div>
        </section>

        {/* STICKY SUMMARY BAR (Only shows once a size is picked) */}
        {selectedSize && (
          <div className="sticky bottom-28 md:bottom-12 z-30 w-full pointer-events-none mt-10">
            <div className="pointer-events-auto">
              <motion.div 
                layout
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-6 md:p-8 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-green-100 flex flex-col md:flex-row items-center justify-between gap-8"
              >
                <div className="flex items-center gap-10 md:gap-16">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Bowl Size</p>
                    <p className="text-xl font-black text-gray-900 capitalize">{selectedSize}</p>
                  </div>
                  <div className="h-14 w-px bg-gray-200 hidden md:block" />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Grand Total</p>
                    <p className="text-4xl font-black text-green-800 leading-none">₹{stats.total}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (stats.fruitCount === 0) return alert("Select at least one fruit to complete your bowl! 🍓");
                    addToCart({ name: `Custom Bowl (${selectedSize})`, price: stats.total, quantity: 1 });
                    alert("Custom bowl added to cart!");
                  }}
                  className="w-full md:w-auto bg-green-700 hover:bg-green-900 text-white px-16 py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95"
                >
                  Add to Cart <ChevronRight size={24}/>
                </button>
              </motion.div>
            </div>
          </div>
        )}

        <div className="h-32" />
      </div>
    </div>
  );
}

export default CustomBowlPage;