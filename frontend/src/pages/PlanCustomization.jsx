import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { 
  CheckCircle, RefreshCcw, ArrowRight, Sparkles, ArrowLeft, Gem, Soup, Utensils, Copy, ChevronLeft, ChevronRight
} from 'lucide-react';

import PremiumCard from '../components/Subscription/Premium-Cards.jsx'; 

const PlanCustomization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  
  // ORIGINAL LOGIC PRESERVED
  const { plan, duration, priceTotal } = location.state || { plan: 'Individual', duration: 7, priceTotal: 0 };

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selections, setSelections] = useState({ fruits: [], size: 'Medium', toppings: [] });
  const [mealBag, setMealBag] = useState({});
  const [activeDayIndex, setActiveDayIndex] = useState(0); 

  const PRODUCTS = [
    { id: 'custom', name: "Customize Your Own Bowl", price: 0, cals: "Varies", img: "/images/custom-bowl.webp", isCustom: true },
    { id: 'p2', name: "Antioxidant Berry", price: 349, cals: "180 kcal", img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400" },
    { id: 'p3', name: "Citrus Vitamin C", price: 250, cals: "150 kcal", img: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400" },
  ];
//FRUITS
  const FREE_FRUITS = [
    { name: "Watermelon", img: "/images/watermelon.webp" },
    { name: "Mango", img: "/images/mango.webp" },
    { name: "Orange", img: "/images/oranges.webp" },
    { name: "Berries", img: "/images/berries.webp" },
    { name: "Strawberries", img: "/images/strawberries.webp" },
    { name: "Pineapple", img: "/images/pinapple.webp" },
    { name: "Grapes", img: "/images/grapes.webp" }
  ];
//PREMIUM
  const PREMIUM_FRUITS = [
    { name: "kiwi", img: "/images/kiwi.webp" },
    { name: "Avocado", img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200" }
  ];

  const TOPPINGS = [
    { name: "Nuts", img: "/images/crunch.webp" },
    { name: "Honey", img: "/images/honey.webp" },
    { name: "Dry Fruits", img: "/images/dryfruits.webp" },
    { name: "Yogurt", img: "/images/yoghurt.webp" },
  ];
  const SIZES = [
    { label: "Small", qty: "300g Portion" },
    { label: "Medium", qty: "450g Portion" },
    { label: "Large", qty: "650g Portion" }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - (clientWidth * 0.8) : scrollLeft + (clientWidth * 0.8);
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const toggleSelection = (key, value) => {
    setSelections(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(i => i !== value) : [...prev[key], value]
    }));
  };

  const handleRepeatMeal = () => {
    if (!mealBag[activeDayIndex]) return;
    const currentMeal = mealBag[activeDayIndex];
    const newBag = { ...mealBag };
    for (let i = 0; i < 7; i++) {
      if (!newBag[i]) newBag[i] = { ...currentMeal };
    }
    setMealBag(newBag);
  };

  const addToBag = () => {
    setMealBag({ 
        ...mealBag, 
        [activeDayIndex]: { 
            base: selectedBase.name, 
            fruits: selections.fruits, 
            size: selections.size, 
            toppings: selections.toppings 
        } 
    });
    setSelectedBase(null); 
    setSelections({ fruits: [], size: 'Medium', toppings: [] });
    setCurrentStep(1);
    if (activeDayIndex < 6) setActiveDayIndex(prev => prev + 1);
  };
const { addToCart } = useCart();

 const handleCheckout = () => {
   const cartItem = {
     id: Date.now(),                          // unique ID
     name: `${plan} ${duration}-Day Plan`,
     price: priceTotal,
     quantity: 1,
     image: '/images/custom-bowl.webp',       // or any plan image
     meals: mealBag,                          // ✅ this is what Cart.jsx reads to show the 7-day cycle
   };

   addToCart(cartItem);       // ✅ pushes into CartContext
   navigate('/cart');         // ✅ then navigate
 };

  const calendarDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return { display: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), dayNum: i + 1 };
  });



  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 pt-6 md:pt-10 font-sans selection:bg-[#C9C27A]/30 relative">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.6] pointer-events-none"
        style={{
          backgroundImage: `url('/images/main-background.webp')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 relative z-10">
        
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#C9C27A] transition-colors">
            <ArrowLeft size={16}/> Back to Plans
        </button>

        <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                Harvest <span className="text-[#C9C27A]">Customization</span>
            </h1>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
          
          <div className="w-full lg:col-span-8 order-2 lg:order-1">
            <div className="bg-white rounded-[2rem] border-[3px] md:border-[4px] border-[#C9C27A] shadow-2xl overflow-hidden min-h-[500px]">
                
                <div className="p-5 md:p-8 bg-[#faf9f6] border-b border-gray-100 flex flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[#C9C27A] shadow-sm border border-[#C9C27A]/30"><Sparkles size={20}/></div>
                        <div>
                            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-800">Day {activeDayIndex + 1} Selection</h3>
                            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase">{calendarDates[activeDayIndex].display}</p>
                        </div>
                    </div>
                    <div className="hidden sm:block text-[9px] font-black uppercase tracking-widest text-[#C9C27A] bg-[#C9C27A]/10 px-4 py-2 rounded-xl border border-[#C9C27A]/20">
                        Customizing {plan} Plan
                    </div>
                </div>

                <div className="p-5 md:p-10">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 md:space-y-8">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-[10px] font-black uppercase text-gray-800 tracking-widest">01. Choose Your Base Product</h4>
                                  <div className="flex gap-2">
                                    <button onClick={() => scroll('left')} className="p-2 rounded-full bg-gray-100 hover:bg-[#C9C27A] hover:text-white transition-colors"><ChevronLeft size={16}/></button>
                                    <button onClick={() => scroll('right')} className="p-2 rounded-full bg-gray-100 hover:bg-[#C9C27A] hover:text-white transition-colors"><ChevronRight size={16}/></button>
                                  </div>
                                </div>
                                
                                <div ref={scrollRef} className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth items-stretch">
                                    {PRODUCTS.map(p => (
                                        <div
                                          key={p.id}
                                          onClick={() => setSelectedBase(p)}
                                         className={`flex-shrink-0 snap-center transition-all duration-300 rounded-[30px] border-2 inline-flex h-auto ${
  selectedBase?.id === p.id
    ? 'relative z-10 border-[#C9C27A] bg-[#C9C27A]/10 shadow-[0_0_26px_rgba(201,194,122,0.30)]'
    : 'border-transparent shadow-[0_0_18px_rgba(15,23,42,0.10)] hover:shadow-[0_0_22px_rgba(201,194,122,0.20)]'
                                          }`}
                                        >
                                          <PremiumCard product={{ title: p.name, calories: p.cals, image: p.img, weight: "450g", fruits: "Customizable", category: p.isCustom ? "Builder" : "Premium" }} />
                                        </div>
                                    ))}
                                </div>
                                <button disabled={!selectedBase} onClick={() => setCurrentStep(2)} className="w-full py-4 md:py-5 bg-gradient-to-r from-green-800 to-green-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 transition-all active:scale-95">Continue <ArrowRight size={18}/></button>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 md:space-y-10">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-gray-800 tracking-widest mb-6">02. Seasonal Essentials</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
                                        {FREE_FRUITS.map(f => (
                                            <div key={f.name} onClick={() => toggleSelection('fruits', f.name)} className={`relative p-3 md:p-4 rounded-3xl border-2 transition-all text-center cursor-pointer active:scale-95 ${selections.fruits.includes(f.name) ? 'border-[#C9C27A] bg-[#C9C27A]/5 shadow-inner' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                                                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 overflow-hidden">
                                                  <img src={f.img} alt={f.name} className="w-full h-full object-contain" />
                                                </div>
                                                <span className="text-[9px] md:text-[10px] font-black uppercase block truncate">{f.name}</span>
                                                {selections.fruits.includes(f.name) && <CheckCircle size={14} className="absolute top-2 right-2 text-[#C9C27A]" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <h4 className="text-[10px] font-black uppercase text-gray-800 tracking-widest mb-6 flex items-center gap-2">Premium Selection <Gem size={12} className="text-[#C9C27A]"/></h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
                                        {PREMIUM_FRUITS.map(f => (
                                            <div key={f.name} onClick={() => toggleSelection('fruits', f.name)} className={`relative p-3 md:p-4 rounded-3xl border-2 border-dashed transition-all text-center cursor-pointer active:scale-95 ${selections.fruits.includes(f.name) ? 'border-[#C9C27A] bg-[#C9C27A]/5' : 'border-gray-200 bg-white'}`}>
                                                <img src={f.img} alt={f.name} className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 object-cover rounded-full" />
                                                <span className="text-[9px] font-bold uppercase block truncate">{f.name}</span>
                                                {selections.fruits.includes(f.name) && <CheckCircle size={12} className="absolute top-2 right-2 text-[#C9C27A]" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button onClick={() => setCurrentStep(1)} className="order-2 sm:order-1 px-10 py-4 md:py-5 border-2 border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest">Back</button>
                                    <button disabled={selectedBase?.isCustom && selections.fruits.length === 0} onClick={() => setCurrentStep(3)} className="order-1 sm:order-2 flex-1 py-4 md:py-5 bg-gradient-to-r from-green-800 to-green-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg disabled:opacity-50">Next: Add-ons</button>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 md:space-y-12">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-gray-800 tracking-widest mb-6 flex items-center gap-2"><Soup size={14} /> 03. Select Bowl Size</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                                        {SIZES.map(s => (
                                            <button key={s.label} onClick={() => setSelections({...selections, size: s.label})} className={`p-5 md:p-6 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${selections.size === s.label ? 'bg-[#C9C27A] border-[#C9C27A] text-white shadow-lg' : 'bg-white border-gray-100 text-gray-800'}`}>
                                                <p className="font-black text-[10px] md:text-[11px] uppercase tracking-widest">{s.label}</p>
                                                <p className={`text-[9px] font-bold mt-1 ${selections.size === s.label ? 'text-white/80' : 'text-gray-800'}`}>{s.qty}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-gray-800 tracking-widest mb-6 flex items-center gap-2"><Utensils size={14}/> Toppings</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                                        {TOPPINGS.map((t) => (
                                            <button
                                              key={t.name}
                                              onClick={() => toggleSelection('toppings', t.name)}
                                              className={`relative p-3 md:p-4 rounded-2xl border-2 bg-white transition-all text-center active:scale-[0.98] ${
                                                selections.toppings.includes(t.name)
                                                  ? 'border-[#C9C27A] bg-[#C9C27A]/10 shadow-inner'
                                                  : 'border-gray-100 hover:border-gray-200'
                                              }`}
                                            >
                                                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 overflow-hidden">
                                                  <img src={t.img} alt={t.name} className="w-full h-full object-contain" />
                                                </div>
                                                <span className="text-[9px] md:text-[10px] font-black uppercase block truncate">{t.name}</span>
                                                {selections.toppings.includes(t.name) && (
                                                  <CheckCircle size={14} className="absolute top-2 right-2 text-[#C9C27A]" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button onClick={() => setCurrentStep(2)} className="order-2 sm:order-1 px-10 py-4 md:py-5 border-2 border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest">Back</button>
                                    <button onClick={addToBag} className="order-1 sm:order-2 flex-1 py-4 md:py-5 bg-gradient-to-r from-green-800 to-green-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">Confirm & Save Day {activeDayIndex + 1}</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
          </div>

          <div className="w-full lg:col-span-4 order-1 lg:order-2">
            <div className="bg-gradient-to-br from-green-800 to-green-950 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border-[3px] border-[#C9C27A] shadow-2xl lg:sticky lg:top-10">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h3 className="text-white font-black text-lg md:text-xl tracking-tight uppercase">The Cycle</h3>
                    <RefreshCcw size={16} className="text-[#C9C27A] cursor-pointer hover:rotate-180 transition-transform duration-500" onClick={() => setMealBag({})}/>
                </div>
                
                <div className="grid grid-cols-4 lg:grid-cols-3 gap-2 md:gap-3 mb-6 md:mb-8">
                    {calendarDates.map((dateObj, idx) => {
                        const m = mealBag[idx];
                        const isActive = activeDayIndex === idx;
                        return (
                            <div key={idx} onClick={() => setActiveDayIndex(idx)} className={`group relative cursor-pointer aspect-square rounded-xl md:rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${isActive ? 'border-[#C9C27A] bg-white/10 scale-105 shadow-lg' : 'border-white/5 bg-white/5'} ${m ? 'border-[#C9C27A] bg-[#C9C27A]/20' : ''}`}>
                                <span className="absolute top-1 md:top-1.5 right-1.5 md:right-2 text-[6px] md:text-[7px] font-black text-white/30">{dateObj.dayNum}</span>
                                <span className={`text-[8px] md:text-[9px] font-black ${m ? 'text-[#C9C27A]' : 'text-white/60'}`}>{dateObj.display}</span>
                                {m && <CheckCircle size={10} className="text-[#C9C27A] mt-1" />}
                            </div>
                        );
                    })}
                </div>

                {mealBag[activeDayIndex] && (
                  <button onClick={handleRepeatMeal} className="w-full mb-6 py-3 border border-white/20 rounded-xl flex items-center justify-center gap-2 text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-colors">
                    <Copy size={14} className="text-[#C9C27A]"/> Repeat current for empty days
                  </button>
                )}

              <div className="pt-6 md:pt-8 border-t border-white/10">
                  <p className="text-[9px] md:text-[10px] font-black text-[#C9C27A] uppercase tracking-widest mb-1">Estimated Total</p>
                  <p className="text-2xl md:text-3xl font-black text-white tracking-tighter">₹{priceTotal.toLocaleString()}</p>

                  {/* Days remaining hint */}
                  {Object.keys(mealBag).length < 7 && (
                      <p className="text-[8px] text-white/40 text-center mt-4 uppercase tracking-widest">
                          {7 - Object.keys(mealBag).length} day{7 - Object.keys(mealBag).length !== 1 ? 's' : ''} remaining
                      </p>
                  )}

                  <button
                  onClick={handleCheckout}
                  disabled={Object.keys(mealBag).length < 7}
                  className="w-full mt-3 md:mt-4 py-4 md:py-5 bg-[#C9C27A] text-green-950 rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] shadow-lg disabled:opacity-20 hover:scale-[1.02] active:scale-95 transition-all">
                  Add Selection to Cart
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCustomization;
