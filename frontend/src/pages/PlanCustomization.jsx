import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart, CheckCircle, ChevronLeft, Info, Star } from 'lucide-react';

const PlanCustomization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve data passed from Subscription page
  const { plan, basePrice, duration, image } = location.state || { 
    plan: 'individual', 
    basePrice: 499, 
    duration: 'Monthly', 
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000' 
  };

  const [bowls, setBowls] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [extraFruits, setExtraFruits] = useState([]);

  const FRUITS_LIST = [
    { id: 1, name: 'Kiwi Slices', price: 40, img: 'https://images.unsplash.com/photo-1585059895318-727909672630?w=200' },
    { id: 2, name: 'Dragon Fruit', price: 60, img: 'https://images.unsplash.com/photo-1527325672341-318158359402?w=200' },
    { id: 3, name: 'Blueberries', price: 80, img: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200' }
  ];

  const TOPPINGS_LIST = ['Honey Drizzle', 'Chia Seeds', 'Granola', 'Greek Yogurt', 'Mint Leaves'];

  const toggleItem = (item, list, setList) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const totalPrice = basePrice + (extraFruits.reduce((acc, f) => acc + f.price, 0) * bowls);

  return (
    <div className="min-h-screen bg-[#F3F6F3] py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left: Customization Options */}
        <div className="lg:col-span-2 space-y-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#2D5A27] font-bold mb-4">
            <ChevronLeft size={20} /> Back to Plans
          </button>
          
          <h1 className="text-4xl font-black text-[#0D1A0B]">Customize Your <span className="text-[#4CAF50]">{plan}</span> Bowl</h1>

          {/* Quantity Section */}
          <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Daily Bowl Quantity</h3>
              <p className="text-gray-400 text-sm">How many bowls should we deliver daily?</p>
            </div>
            <div className="flex items-center gap-5 bg-gray-50 p-2 rounded-2xl border">
              <button onClick={() => setBowls(Math.max(1, bowls - 1))} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><Minus size={18}/></button>
              <span className="text-2xl font-black w-8 text-center">{bowls}</span>
              <button onClick={() => setBowls(bowls + 1)} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><Plus size={18}/></button>
            </div>
          </div>

          {/* Extra Fruits Section */}
          <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Star className="text-[#4CAF50]" /> Add Premium Extra Fruits</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {FRUITS_LIST.map(fruit => (
                <div 
                  key={fruit.id} 
                  onClick={() => toggleItem(fruit, extraFruits, setExtraFruits)}
                  className={`cursor-pointer p-4 rounded-3xl border-2 transition-all ${extraFruits.some(f => f.id === fruit.id) ? 'border-[#4CAF50] bg-green-50' : 'border-gray-50'}`}
                >
                  <img src={fruit.img} className="w-full h-28 object-cover rounded-2xl mb-3" alt={fruit.name} />
                  <p className="font-bold">{fruit.name}</p>
                  <p className="text-[#4CAF50] font-black text-sm">+₹{fruit.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Toppings Section */}
          <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Complimentary Toppings</h3>
            <div className="flex flex-wrap gap-3">
              {TOPPINGS_LIST.map(top => (
                <button
                  key={top}
                  onClick={() => toggleItem(top, selectedToppings, setSelectedToppings)}
                  className={`px-6 py-3 rounded-full font-bold transition-all ${selectedToppings.includes(top) ? 'bg-[#2D5A27] text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  {top}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[40px] shadow-2xl sticky top-10 border border-gray-100">
            <img src={image} className="w-full h-44 object-cover rounded-3xl mb-6 shadow-lg" alt="Selected" />
            <h2 className="text-2xl font-black text-[#0D1A0B] mb-2">Order Summary</h2>
            
            <div className="space-y-4 border-b pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">{plan} ({duration})</span>
                <span className="font-bold">₹{basePrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Daily Bowls</span>
                <span className="font-bold">x {bowls}</span>
              </div>
              {extraFruits.map(f => (
                <div key={f.id} className="flex justify-between text-xs text-[#4CAF50] font-bold">
                  <span>+ Extra {f.name}</span>
                  <span>₹{f.price}</span>
                </div>
              ))}
            </div>

            <div className="py-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total to Pay</span>
                <span className="text-4xl font-black text-[#2D5A27]">₹{totalPrice}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#4CAF50] py-5 rounded-2xl text-white font-black text-xl flex items-center justify-center gap-3 shadow-xl"
              >
                Proceed to Pay <CheckCircle size={22} />
              </motion.button>
              
              <div className="mt-6 flex items-start gap-3 p-4 bg-yellow-50 rounded-2xl">
                <Info size={20} className="text-yellow-600 flex-shrink-0" />
                <p className="text-[10px] text-yellow-700 font-bold uppercase leading-tight">
                  Same-day delivery is not allowed. Orders scheduled for tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCustomization;