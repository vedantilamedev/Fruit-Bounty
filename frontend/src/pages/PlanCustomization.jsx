import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, CheckCircle, ChevronLeft, Star, X, Flame, Leaf, Target, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

const PlanCustomization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const { plan, basePrice, duration, image } = location.state || { 
    plan: 'Individual', 
    basePrice: 499, 
    duration: 'Monthly', 
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000' 
  };

  // 1. DATA CONSTANTS (Standardized for professional look)
  const SIZES = [
    { id: "small", name: "Small", multiplier: 1, cals: 150 },
    { id: "medium", name: "Medium", multiplier: 1.3, cals: 220 },
    { id: "large", name: "Large", multiplier: 1.6, cals: 310 },
  ];

  const FRUITS_LIST = [
    { id: 1, name: 'Kiwi Slices', price: 40, cals: 42, protein: '0.8g', fiber: '2.1g', quality: 'Organic', img: 'https://images.unsplash.com/photo-1585059895318-727909672630?w=200' },
    { id: 2, name: 'Dragon Fruit', price: 60, cals: 60, protein: '1.2g', fiber: '3g', quality: 'Exotic Fresh', img: 'https://images.unsplash.com/photo-1527325672341-318158359402?w=200' },
    { id: 3, name: 'Blueberries', price: 80, cals: 84, protein: '1.1g', fiber: '3.6g', quality: 'Superfood', img: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200' }
  ];

  const TOPPINGS_LIST = [
    { id: 't1', name: 'Honey Drizzle', price: 20, cals: 60, quality: 'Pure Manuka' },
    { id: 't2', name: 'Chia Seeds', price: 15, cals: 40, quality: 'Fiber Rich' },
    { id: 't3', name: 'Roasted Granola', price: 25, cals: 110, quality: 'Whole Grain' },
    { id: 't4', name: 'Greek Yogurt', price: 35, cals: 50, quality: 'Probiotic' }
  ];

  // 2. STATE MANAGEMENT
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [bowls, setBowls] = useState(1);
  const [extraFruits, setExtraFruits] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);

  // 3. LIVE CALCULATION ENGINE (Simulating API behavior)
  const stats = useMemo(() => {
    const fruitCals = extraFruits.reduce((acc, f) => acc + f.cals, 0);
    const toppingCals = selectedToppings.reduce((acc, t) => acc + t.cals, 0);
    const fruitPrice = extraFruits.reduce((acc, f) => acc + f.price, 0);
    const toppingPrice = selectedToppings.reduce((acc, t) => acc + t.price, 0);

    const totalCals = Math.round((selectedSize.cals + fruitCals + toppingCals));
    const totalPrice = Math.round(((basePrice + fruitPrice + toppingPrice) * selectedSize.multiplier) * bowls);
    
    return { totalCals, totalPrice };
  }, [selectedSize, extraFruits, selectedToppings, bowls, basePrice]);

  const toggleItem = (item, list, setList) => {
    const exists = list.find(i => i.id === item.id);
    setList(exists ? list.filter(i => i.id !== item.id) : [...list, item]);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F6] relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Enhancements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#2d5a27 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 pb-20">
        
        {/* HEADER - Single Row Alignment */}
        <header className="py-10 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 font-bold bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-green-100 hover:bg-green-50 transition-all">
            <ChevronLeft size={20} className="text-green-700"/> Back
          </button>

          <h1 className="text-2xl md:text-4xl font-[900] text-[#121D12] tracking-tight absolute left-1/2 -translate-x-1/2 text-center w-full md:w-auto">
            Customize <span className="text-green-700">Bowl</span>
          </h1>

          <div className="hidden md:flex items-center gap-2 bg-[#121D12] text-white px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">
            <Target size={16} className="text-green-400"/> {duration}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
          
          <div className="lg:col-span-8 space-y-10">
            
            {/* STEP 1: SIZE SELECTION */}
            <section className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-[#121D12]">
                <Leaf className="text-green-600" size={20}/> 1. Select Bowl Size
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`py-5 rounded-3xl font-black transition-all border-2 ${
                      selectedSize.id === size.id 
                        ? 'border-green-600 bg-green-700 text-white shadow-lg' 
                        : 'border-transparent bg-gray-50 text-gray-400 hover:bg-green-50'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </section>

            {/* STEP 2: QUANTITY */}
            <section className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl font-black text-[#121D12]">2. Daily Quantity</h3>
                <p className="text-gray-400 text-sm font-medium italic">How many bowls per delivery?</p>
              </div>
              <div className="flex items-center gap-8 bg-[#121D12] p-2 rounded-3xl">
                <button onClick={() => setBowls(Math.max(1, bowls - 1))} className="w-12 h-12 bg-green-700 rounded-2xl text-white flex items-center justify-center hover:bg-green-600"><Minus size={20}/></button>
                <span className="text-2xl font-black text-white w-8 text-center">{bowls}</span>
                <button onClick={() => setBowls(bowls + 1)} className="w-12 h-12 bg-green-700 rounded-2xl text-white flex items-center justify-center hover:bg-green-600"><Plus size={20}/></button>
              </div>
            </section>

            {/* STEP 3: PREMIUM FRUITS (Hover Expansion) */}
            <section>
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-[#121D12]">
                <Star className="text-orange-400 fill-orange-400" size={24}/> 3. Add Premium Fruits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {FRUITS_LIST.map(fruit => (
                  <motion.div 
                    whileHover={{ y: -8 }}
                    key={fruit.id} 
                    onClick={() => toggleItem(fruit, extraFruits, setExtraFruits)}
                    className={`cursor-pointer p-5 rounded-[2.5rem] border-2 transition-all relative group bg-white shadow-sm ${
                      extraFruits.find(f => f.id === fruit.id) ? 'border-green-600 ring-4 ring-green-100' : 'border-transparent'
                    }`}
                  >
                    <img src={fruit.img} className="w-full h-44 object-cover rounded-[2rem] mb-4 group-hover:scale-105 transition-transform duration-500" alt={fruit.name} />
                    <div className="flex justify-between items-center mb-1">
                       <p className="font-black text-[#121D12]">{fruit.name}</p>
                       <p className="text-green-700 font-black">₹{fruit.price}</p>
                    </div>

                    <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="pt-4 border-t border-gray-100 mt-4 space-y-1">
                        <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{fruit.quality}</span>
                        <div className="flex justify-between text-[11px] font-bold text-gray-400">
                           <span>Prot: {fruit.protein}</span>
                           <span className="text-orange-500">{fruit.cals} kcal</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* STEP 4: TOPPINGS (RESTORED) */}
            <section className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] border border-white shadow-sm">
              <h3 className="text-xl font-black mb-6 text-[#121D12] flex items-center gap-2">
                <Zap className="text-yellow-500" size={20}/> 4. Choose Toppings
              </h3>
              <div className="flex flex-wrap gap-4">
                {TOPPINGS_LIST.map(top => (
                  <button
                    key={top.id}
                    onClick={() => toggleItem(top, selectedToppings, setSelectedToppings)}
                    className={`px-8 py-4 rounded-full font-black text-sm transition-all border-2 flex items-center gap-3 ${
                      selectedToppings.find(t => t.id === top.id) 
                      ? 'bg-green-700 border-green-700 text-white shadow-lg scale-105' 
                      : 'bg-white border-gray-100 text-gray-500 hover:border-green-200'
                    }`}
                  >
                    {top.name} {selectedToppings.find(t => t.id === top.id) && <CheckCircle size={16}/>}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR SUMMARY CARD (Fixed/Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-[#121D12] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col">
              
              <div className="p-10 text-white bg-gradient-to-br from-[#1b2e1b] to-[#121D12]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold opacity-70 tracking-widest uppercase text-[10px]">Nutri-Tracker</h2>
                  <Flame className="text-orange-500 animate-pulse" size={24} />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-[900] tracking-tighter">{stats.totalCals}</span>
                  <span className="text-xl font-bold text-green-400">kcal</span>
                </div>
                <div className="mt-8 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                   <motion.div animate={{ width: `${Math.min(100, stats.totalCals / 6)}%` }} className="h-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                </div>
              </div>

              <div className="p-2 bg-white m-2 rounded-[3rem]">
                <div className="p-8">
                  <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest mb-6">Your Selection</p>
                  
                  <div className="space-y-4 mb-10 min-h-[120px]">
                    <AnimatePresence mode="popLayout">
                      {[...extraFruits, ...selectedToppings].map((item) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          key={item.id}
                          className="flex justify-between items-center group"
                        >
                          <div className="flex items-center gap-3">
                             <button onClick={() => item.price > 25 ? toggleItem(item, extraFruits, setExtraFruits) : toggleItem(item, selectedToppings, setSelectedToppings)} className="text-red-300 hover:text-red-500 transition-colors">
                               <X size={14} />
                             </button>
                             <span className="text-sm font-bold text-gray-700">{item.name}</span>
                          </div>
                          <span className="text-sm font-black text-green-700">₹{item.price}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="pt-8 border-t border-gray-100">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Grand Total</p>
                        <p className="text-5xl font-[900] text-[#121D12] tracking-tighter leading-none">₹{stats.totalPrice}</p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        addToCart({ name: `${plan} Plan`, price: stats.totalPrice, image, quantity: 1, details: { size: selectedSize.name, bowls, calories: stats.totalCals } });
                        navigate('/cart');
                      }}
                      className="w-full bg-[#121D12] py-6 rounded-[2rem] text-white font-black text-xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3"
                    >
                      Go to Cart <CheckCircle size={22} className="text-green-500" />
                    </motion.button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCustomization;