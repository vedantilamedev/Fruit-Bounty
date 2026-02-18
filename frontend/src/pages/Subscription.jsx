import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, User, ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react';

const Subscription = () => {
  const [activePlan, setActivePlan] = useState('individual'); 
  const [isSixMonth, setIsSixMonth] = useState(false);
  const navigate = useNavigate();

  const COLORS = {
    darkGreen: "#2D5A27",
    primaryGreen: "#4CAF50",
    richBlack: "#0D1A0B",
  };

  const planData = {
    individual: {
      price: isSixMonth ? 2499 : 499,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000', 
      label: 'Personal Plan',
      desc: 'Tailored for solo health enthusiasts. Enjoy a personalized selection of nature\'s best daily.'
    },
    corporate: {
      price: isSixMonth ? 7999 : 1499,
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=1000', 
      label: 'Corporate Plan',
      desc: 'Fuel your team with premium fruit arrangements. Perfect for meetings and daily office wellness.'
    }
  };

  const handleActivate = () => {
    // Navigates and passes data to the customization page
    navigate('/PlanCustomization', { 
      state: { 
        plan: activePlan, 
        basePrice: planData[activePlan].price,
        duration: isSixMonth ? '6 Months' : 'Monthly',
        image: planData[activePlan].image
      } 
    });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center py-10 px-4 overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover"
          alt="Fruits Bounty Backdrop"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-white drop-shadow-xl"
          >
            Fruits Bounty <span style={{ color: COLORS.primaryGreen }}>Membership</span>
          </motion.h1>
          <p className="text-white/90 text-lg font-bold bg-black/20 inline-block px-6 py-2 rounded-full backdrop-blur-md">
            The ultimate fresh fruit experience, curated just for you.
          </p>
        </div>

        {/* PLAN SELECTOR */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#0D1A0B]/80 backdrop-blur-xl p-1.5 rounded-2xl flex gap-1 shadow-2xl border border-white/10">
            {['individual', 'corporate'].map((type) => (
              <button
                key={type}
                onClick={() => setActivePlan(type)}
                className={`px-12 py-3 rounded-xl transition-all duration-300 font-bold flex items-center gap-2 capitalize ${
                  activePlan === type 
                  ? 'bg-[#4CAF50] text-white shadow-lg' 
                  : 'text-white/60 hover:text-white'
                }`}
              >
                {type === 'individual' ? <User size={20} /> : <Users size={20} />}
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CARD SECTION */}
        <div className="relative max-w-4xl mx-auto min-h-[580px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row w-full min-h-[580px]"
            >
              <div className="md:w-[45%] relative h-64 md:h-auto overflow-hidden flex-shrink-0">
                <img src={planData[activePlan].image} className="w-full h-full object-cover" alt={planData[activePlan].label} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A0B] via-black/10 to-transparent p-10 flex flex-col justify-end">
                  <h2 className="text-white text-4xl font-black uppercase mb-3 leading-tight drop-shadow-md">
                    {planData[activePlan].label}
                  </h2>
                  <p className="text-white/90 text-sm font-medium min-h-[3rem] drop-shadow-md">
                    {planData[activePlan].desc}
                  </p>
                </div>
              </div>

              <div className="md:w-[55%] p-10 md:p-14 flex flex-col justify-between bg-[#F9FBF9] flex-grow">
                <div>
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex flex-col">
                      <h3 style={{ color: COLORS.richBlack }} className="text-6xl font-black tracking-tighter italic">
                        ₹{planData[activePlan].price}
                      </h3>
                      <p className="text-gray-500 font-bold text-xs tracking-widest uppercase mt-2">
                        {isSixMonth ? '6 Months Access' : 'Monthly Access'}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                      <div 
                        onClick={() => setIsSixMonth(!isSixMonth)}
                        className={`w-16 h-9 rounded-full cursor-pointer transition-all duration-300 relative p-1 ${isSixMonth ? 'bg-[#4CAF50]' : 'bg-gray-300'}`}
                      >
                        <motion.div animate={{ x: isSixMonth ? 28 : 0 }} className="w-7 h-7 bg-white rounded-full shadow-md" />
                      </div>
                      <span className="text-[10px] font-black text-[#2D5A27] uppercase tracking-tighter">
                        {isSixMonth ? '6 Months' : 'Monthly'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm h-[72px]">
                      <Star size={20} className="text-[#4CAF50]" fill="#4CAF50" />
                      <span className="text-[#0D1A0B] font-bold text-md">Fresh and Handpicked Fruits</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm h-[72px]">
                      <Zap size={20} className="text-[#4CAF50]" />
                      <span className="text-[#0D1A0B] font-bold text-md">Custom Fruit Bowl Designs</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#2D5A27]/5 border border-[#2D5A27]/10 h-[72px]">
                      <ShieldCheck size={20} className="text-[#2D5A27]" />
                      <span className="text-[#2D5A27] font-black text-md">Guaranteed Next-Day Delivery</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleActivate}
                    style={{ backgroundColor: activePlan === 'individual' ? COLORS.primaryGreen : COLORS.darkGreen }}
                    className="w-full py-5 rounded-2xl text-white font-black text-xl flex items-center justify-center gap-3 shadow-xl transition-all uppercase tracking-widest"
                  >
                    Activate Now <ArrowRight size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Subscription;