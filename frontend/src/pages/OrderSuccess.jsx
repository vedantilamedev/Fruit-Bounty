import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import { 
  CheckCircle, 
  Package, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Heart,
  ShoppingBag
} from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
const [order, setOrder] = useState(null);

useEffect(() => {
  if (location.state && location.state.order) {
    const newOrder = location.state.order;
    setOrder(newOrder);

    // 🔥 SAVE TO LOCALSTORAGE
    const existingOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    localStorage.setItem("userOrders", JSON.stringify([newOrder, ...existingOrders]));

  } else {
    navigate("/");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}, [location.state, navigate]);


  // Prevent crash on refresh / direct visit
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-bold text-lg">
          Loading order...
        </p>
      </div>
    );
  }

    // Realistic delivery date
    const deliveryDate = new Date(order.createdAt || Date.now());
    deliveryDate.setDate(deliveryDate.getDate() + 1);

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen font-sans bg-[#faf9f6] text-gray-900 relative selection:bg-[#C9C27A]/30 overflow-hidden">
      {/* Signature Background Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.6] pointer-events-none"
        style={{
          backgroundImage: `url('/images/main-background.webp')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      {/* Animated Floating Sparkles */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      >
        <Sparkles className="absolute top-20 left-[15%] text-[#C9C27A]/20" size={40} />
        <Sparkles className="absolute bottom-40 right-[10%] text-[#C9C27A]/20" size={60} />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl w-full text-center"
        >
          {/* Main Success Icon */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-24 h-24 md:w-32 md:h-32 bg-green-900 rounded-[2.5rem] flex items-center justify-center border-[4px] border-[#C9C27A] shadow-2xl"
              >
                <CheckCircle size={64} className="text-[#C9C27A]" />
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-[#C9C27A] rounded-full flex items-center justify-center shadow-lg"
              >
                <Sparkles size={20} className="text-green-950" />
              </motion.div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-4 mb-10">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              Order <span className="text-[#C9C27A]">Confirmed</span>
            </h1>
            <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
              Your journey to wellness has begun
            </p>
          </motion.div>

          {/* Details Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-[3px] border-[#C9C27A] mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Package size={120} className="text-green-900" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 text-left">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <Calendar size={12} className="text-[#C9C27A]"/> Estimated Delivery
                </p>
                <p className="text-lg font-black text-green-950 uppercase tracking-tight">
                  {deliveryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <ShoppingBag size={12} className="text-[#C9C27A]"/> Preparation Status
                </p>
                <p className="text-lg font-black text-green-950 uppercase tracking-tight">
                  Harvesting Fresh
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-800">
                <Heart size={20} fill="currentColor" className="opacity-20" />
              </div>
              <p className="text-[10px] font-bold text-gray-500 italic">
                "We're hand-selecting the finest seasonal fruits just for you."
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-green-950 text-white p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-800 transition-all flex items-center justify-center gap-2 group"
            >
              Go to Dashboard <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/shop')}
              className="flex-1 bg-white border-[3px] border-gray-100 text-gray-400 p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-[#C9C27A] hover:text-[#C9C27A] transition-all"
            >
              Back to Menu
            </button>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="mt-12 text-[9px] font-black text-gray-800 uppercase tracking-[0.4em]"
          >
            Thank you for choosing Harvest
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;