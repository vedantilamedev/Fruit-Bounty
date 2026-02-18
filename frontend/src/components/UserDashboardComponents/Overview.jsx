
import React, { useState } from 'react';
import { ShoppingBag, CreditCard, Calendar, Truck, ArrowRight, Package, X, CheckCircle2, MapPin, Clock, User, Smartphone, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Overview = ({ userData, orders }) => {
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  // Safe access to user data with fallbacks
  const activePackage = userData?.activePackage ?
    `${userData.activePackage.name} (${userData.activePackage.peopleCount} Person)` :
    'No Active Plan';

  const totalOrders = orders ? orders.length : 0;
  const lastPayment = userData?.payments && userData.payments.length > 0 ? userData.payments[0] : null;

  const trackingSteps = [
    { status: 'Order Confirmed', description: 'Orchard selection finalized', time: 'Feb 18, 10:30 AM', completed: true, current: false, icon: ShoppingBag },
    { status: 'Harvesting', description: 'Fruits picked at peak ripeness', time: 'Feb 19, 06:15 AM', completed: true, current: false, icon: Package },
    { status: 'Quality Lab', description: 'Certified for freshness & taste', time: 'Feb 19, 09:00 AM', completed: true, current: true, icon: CheckCircle2 },
    { status: 'Out for Delivery', description: 'Van #FB-TRK-99 is on route', time: 'Expected ~1:00 PM', completed: false, current: false, icon: Truck },
    { status: 'Arriving', description: 'Delivery to doorstep', time: 'Pending', completed: false, current: false, icon: MapPin },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => {
    // Extract hex code (e.g. from 'bg-[#3C7E44]') or default to green
    const hex = color?.match(/\[(.*?)\]/)?.[1] || '#3C7E44';

    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-[#E8E4D9/60] flex flex-col justify-between hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300 group h-full relative overflow-hidden"
      >

        {/* Background decoration with rotation animation */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] rounded-bl-[100%]"
          style={{ backgroundColor: hex }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="flex justify-between items-start z-10 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white relative overflow-hidden shadow-lg shadow-black/5"
            style={{
              backgroundColor: hex,
              boxShadow: `0 8px 20px -6px ${hex}66`
            }}
          >
            {/* Glossy/Gradient Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/5" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full blur-md" />

            <Icon size={26} strokeWidth={1.5} className="relative z-10 drop-shadow-sm" />
          </motion.div>

          {trend && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#effae8] text-[#3C7E44] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-[#3C7E44]" /> {trend}
            </motion.span>
          )}
        </div>

        <div className="z-10 mt-auto">
          <p className="text-[#B7A261] text-[11px] font-bold uppercase tracking-[0.15em] mb-2 pl-1">{title}</p>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl lg:text-4xl font-normal text-gray-900 tracking-tight leading-none mb-1"
          >
            {value}
          </motion.h3>
          {subtitle && <p className="text-[12px] text-gray-400 font-medium uppercase tracking-wide truncate pl-1">{subtitle}</p>}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 pb-6"
      >
        {/* Freshness Protocol Banner */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white to-[#FBF8F2] border border-[#E8E4D9] rounded-[3rem] p-6 lg:p-8 relative overflow-hidden group hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] rotate-12" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -right-24 w-64 h-64 bg-[#3C7E44]/5 rounded-full blur-3xl"
          />

          <div className="relative flex flex-col lg:flex-row items-center gap-6">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="bg-gradient-to-br from-[#3C7E44] to-[#2f6131] p-5 rounded-[2rem] shadow-xl shadow-green-900/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <Calendar className="text-white relative z-10" size={36} strokeWidth={1.5} />
            </motion.div>
            <div className="text-center lg:text-left flex-1 space-y-2">
              <h3 className="text-xl lg:text-2xl font-medium text-[#3C7E44] tracking-tight">Freshness First Protocol!</h3>
              <p className="text-gray-600 font-normal leading-relaxed max-w-2xl text-sm">
                To guarantee maximum freshness from orchard to your bowl, <strong className="font-medium text-[#3C7E44] bg-[#3C7E44]/10 px-2 py-0.5 rounded-md">Same-day delivery is currently paused.</strong> All new fruit treasures will reach you within 24 hours.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#B7A261] text-white px-8 py-4 rounded-[2rem] font-medium text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#B7A261]/20"
            >
              Read Policy
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={ShoppingBag}
            color="bg-[#3C7E44]"
            trend="+2 New"
          />
          <StatCard
            title="Active Subscription"
            value={<span className="text-2xl lg:text-3xl truncate block" title={activePackage}>{activePackage.split('(')[0]}</span>}
            subtitle={activePackage.includes('(') ? activePackage.split('(')[1].replace(')', '') : 'Plan Active'}
            icon={Package}
            color="bg-[#3C7E44]"
          />
          <StatCard
            title="Last Payment"
            value={<span className="text-3xl">₹{lastPayment?.amount || 0}</span>}
            subtitle={lastPayment ? lastPayment.status : 'No payments'}
            icon={CreditCard}
            color={lastPayment?.status === 'Success' ? 'bg-[#3C7E44]' : 'bg-[#A44A3F]'}
          />
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-[3rem] border border-[#E8E4D9] shadow-sm flex flex-col justify-center h-full"
          >
            <h4 className="text-lg font-medium text-[#3C7E44] mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#B7A261]" /> Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Package, label: "View Plans" },
                { icon: Calendar, label: "Harvest Schedule" }
              ].map((action, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ y: -5, borderColor: '#3C7E44' }}
                  whileTap={{ scale: 0.98 }}
                  className="p-1 rounded-[2.5rem] bg-white border border-[#E8E4D9] transition-all duration-300 group hover:shadow-xl hover:shadow-green-900/10 relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#3C7E44] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-5 flex flex-col items-center justify-center gap-3 bg-[#FBF8F2] rounded-[2.3rem] group-hover:bg-white transition-colors h-full">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm group-hover:bg-[#3C7E44] flex items-center justify-center transition-colors duration-300 border border-[#E8E4D9]/50 group-hover:border-transparent">
                      <action.icon size={24} className="text-[#3C7E44] group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-800 group-hover:text-[#3C7E44] transition-colors">{action.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Next Delivery Preview */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-[#3C7E44] to-[#244f2a] p-8 rounded-[3rem] text-white shadow-2xl shadow-green-900/20 relative overflow-hidden flex flex-col justify-between min-h-[320px] group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"
            />

            <div className="relative z-10 flex justify-between items-start">
              <div>
                <h4 className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Upcoming</h4>
                <div className="text-3xl font-medium tracking-tight">Delivery</div>
              </div>
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="bg-white/20 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-black/10 border border-white/10"
              >
                <Truck size={28} className="text-white drop-shadow-md" strokeWidth={1.5} />
              </motion.div>
            </div>

            <div className="relative z-10 mt-8">
              <div className="flex items-center gap-5 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner"
                >
                  <ShoppingBag size={32} className="text-white drop-shadow-md" strokeWidth={1.5} />
                </motion.div>
                <div>
                  <p className="text-xs text-[#B7A261] font-bold uppercase tracking-widest mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7A261] animate-pulse" /> Arriving Tomorrow
                  </p>
                  <p className="text-2xl font-medium leading-tight text-white/95">Premium Mixed Fruit Bowl</p>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsTrackingOpen(true)}
                className="w-full py-4 bg-white text-[#3C7E44] rounded-[1.5rem] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#FBF8F2] transition-colors shadow-lg shadow-black/10 hover:shadow-xl group/btn"
              >
                Track Component <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tracking Modal */}
      <AnimatePresence>
        {isTrackingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTrackingOpen(false)}
              className="absolute inset-0 bg-[#3C7E44]/10 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(60,126,68,0.25)] border border-[#E8E4D9] overflow-hidden"
            >
              {/* Header with gradient and pattern */}
              <div className="bg-gradient-to-r from-[#3C7E44] to-[#2f6131] p-7 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10" />
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/20 rounded-full text-[9px] font-bold uppercase tracking-widest mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live Tracking
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">Delivery Journey</h3>
                    <p className="text-green-100/70 text-[10px] mt-0.5 font-medium">Order ID: <span className="text-white">#FRUIT-2026-X10</span></p>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsTrackingOpen(false)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 backdrop-blur-md"
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                {/* Left side: Timeline */}
                <div className="lg:w-[55%] p-6 lg:p-7">
                  <h4 className="text-[9px] font-bold text-[#B7A261] uppercase tracking-[0.2em] mb-6">Status Updates</h4>
                  <div className="space-y-0">
                    {trackingSteps.map((step, idx) => (
                      <div key={idx} className="relative flex gap-4 group">
                        {/* The Line */}
                        {idx !== trackingSteps.length - 1 && (
                          <div className={`absolute left-3.5 top-8 w-0.5 h-full -ml-px transition-colors duration-500 ${step.completed ? 'bg-[#3C7E44]' : 'bg-gray-100'
                            }`} />
                        )}

                        <div className="relative z-10 flex flex-col items-center">
                          <motion.div
                            initial={false}
                            animate={{
                              backgroundColor: step.completed ? '#3C7E44' : step.current ? '#B7A261' : '#f3f4f6',
                              scale: step.current ? [1, 1.05, 1] : 1
                            }}
                            transition={step.current ? { repeat: Infinity, duration: 2 } : {}}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-md ${step.current ? 'shadow-[#B7A261]/30' : step.completed ? 'shadow-[#3C7E44]/10' : 'shadow-none'
                              }`}
                          >
                            <step.icon size={14} strokeWidth={2.5} />
                          </motion.div>
                        </div>

                        <div className="pb-8 last:pb-0">
                          <p className={`font-bold text-[13px] tracking-tight transition-colors ${step.completed || step.current ? 'text-gray-900' : 'text-gray-300'
                            }`}>
                            {step.status}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5 font-medium leading-tight">{step.description}</p>
                          <p className={`text-[8px] mt-1.5 font-bold uppercase tracking-wider ${step.current ? 'text-[#B7A261]' : 'text-gray-400'
                            }`}>{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side: Courier & Details */}
                <div className="lg:w-[45%] bg-gray-50/50 p-6 lg:p-7 space-y-6">
                  {/* Estimated Delivery Card */}
                  <div className="bg-white p-4 rounded-3xl border border-[#E8E4D9/50] shadow-sm">
                    <p className="text-[9px] font-bold text-[#B7A261] uppercase tracking-widest mb-1.5">Estimated Arrival</p>
                    <div className="flex items-end gap-1.5">
                      <span className="text-2xl font-bold text-gray-900 tracking-tighter">12:30</span>
                      <span className="text-xs font-bold text-gray-500 mb-0.5">PM</span>
                    </div>
                  </div>

                  {/* Courier Profile */}
                  <div className="space-y-3">
                    <h4 className="text-[9px] font-bold text-[#B7A261] uppercase tracking-[0.2em]">Delivery Hero</h4>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#E8E4D9/50] shadow-sm">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                          <User size={24} className="text-gray-400" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#3C7E44] border-2 border-white rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">Vikram S.</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle2 size={8} className="text-[#3C7E44]" /> Verified
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-2.5 bg-white border border-[#E8E4D9] rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 text-gray-600">
                        <Smartphone size={12} className="text-[#3C7E44]" /> Text
                      </button>
                      <button className="py-2.5 bg-[#3C7E44] text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-[#2f6131] transition-colors flex items-center justify-center gap-1.5">
                        <Phone size={12} /> Call
                      </button>
                    </div>
                  </div>

                  {/* Order Preview */}
                  <div className="space-y-3">
                    <h4 className="text-[9px] font-bold text-[#B7A261] uppercase tracking-[0.2em]">Harvest Items</h4>
                    <div className="bg-white p-4 rounded-[1.5rem] border border-[#E8E4D9/50] shadow-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#FBF8F2] rounded flex items-center justify-center text-[#3C7E44]">
                          <Package size={12} />
                        </div>
                        <p className="text-[10px] font-medium text-gray-800 truncate">Premium Bowl</p>
                        <span className="ml-auto text-[9px] font-bold text-gray-400">x1</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#FBF8F2] rounded flex items-center justify-center text-[#3C7E44]">
                          <ShoppingBag size={12} />
                        </div>
                        <p className="text-[10px] font-medium text-gray-800 truncate">Almond Pack</p>
                        <span className="ml-auto text-[9px] font-bold text-gray-400">x1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Overview;
