
import React, { useState } from 'react';
import { ShoppingBag, CreditCard, Calendar, Truck, ArrowRight, Package, X, CheckCircle2, MapPin, Clock, User, Smartphone, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Overview = ({ userData, orders, payments, onTabChange }) => {
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
    const navigate = useNavigate();

  // Safe access to user data with fallbacks
  const totalOrders = orders?.length || 0;
  const activePackage = userData?.activePackage ?
    `${userData.activePackage.name} (${userData.activePackage.peopleCount || 1} Person)` :
    'No Active Plan';
  const activePackageName = userData?.activePackage?.name || 'No Active Plan';
  const activePackageSubtitle = userData?.activePackage ? 
    `${userData.activePackage.peopleCount || 1} Person` : 'Plan Active';
  const lastPayment = payments && payments.length > 0 ? payments[0] : null;
  const lastPaymentAmount = lastPayment?.amount ?? lastPayment?.total_amount ?? 0;

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
        className="
bg-gradient-to-br from-[#fbfcfb] 
p-6 rounded-[1.2rem]
border border-[#c6a84b]
shadow-[0_8px_25px_rgba(0,0,0,0.5)]
flex flex-col justify-between
transition-all duration-300
group h-full relative overflow-hidden"
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
            whileHover={{ scale: 1.05 }}
            className="
    w-14 h-14 
    rounded-xl 
    flex items-center justify-center 
    border border-[#c6a84b]
    shadow-[0_4px_12px_rgba(0,0,0,0.4)]
  "
            style={{ backgroundColor: hex }}
          >
            {/* Glossy/Gradient Effects */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/5" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full blur-md" /> */}

            <Icon size={26} strokeWidth={1.5} className="relative text-white z-10 drop-shadow-sm" />
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
          <p className="text-[#1f3f25] text-[11px] font-bold uppercase tracking-[0.15em] mb-2 pl-1">{title}</p>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl lg:text-4xl font-semibold text-[#1f3f25] tracking-tight leading-none mb-1"
          >
            {value}
          </motion.h3>
          {subtitle && <p className="text-[12px] text-[#858181] font-medium uppercase tracking-wide truncate pl-1">{subtitle}</p>}
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
        {/* Freshness Policy Banner */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br min-w-[75vw] from-[#3C7E44] to-[#244f2a]
  border border-[#DAA520] rounded-[1rem] p-6 lg:p-8 
  relative overflow-hidden group 
  shadow-[0_10px_30px_rgba(0,0,0,0.6)]
  transition-all duration-500"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -right-24 w-64 h-64 bg-[#3C7E44]/5 rounded-full blur-3xl "
          />

          <div className="relative  flex flex-col lg:flex-row items-center gap-6">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="bg-gradient-to-br from-[#2e6034] to-[#1b361b]  p-5 rounded-[1rem] shadow-xl shadow-green-900/20 relative overflow-hidden"
            >
              <Calendar className="text-white relative z-10" size={36} strokeWidth={1.5} />
            </motion.div>
            <div className="text-center  lg:text-left flex-1 space-y-2">
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#00ff2f] tracking-tight">
                Welcome{" "}
                <span className="text-[#00ff1e]">
                  {userData?.name || "User"}
                </span>
              </h2>
              <h3 className="text-xl lg:text-2xl font-medium text-white tracking-tight">Freshness First Policy</h3>
              <p className="text-white/60 font-normal leading-relaxed max-w-2xl text-sm">
                To guarantee maximum freshness from orchard to your bowl, <strong className="font-medium text-[#50e261] bg-[#3C7E44]/10 px-2 py-0.5 rounded-md">Same-day delivery is currently paused.</strong> All new fruit orders will reach you within 24 hours.
              </p>
            </div>
            <motion.button onClick={() => { navigate("/privacy-policy")}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1b361b] text-white px-8 py-4 rounded-[1rem] font-medium text-[10px] uppercase tracking-[0.2em] shadow-sm shadow-black"
            >
              Read Policy
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={ShoppingBag}
            color="bg-[#3C7E44]"
            trend="+2 New"
            
            
          />
          <StatCard
            title="Active Subscription"
            value={<span className="text-2xl lg:text-3xl truncate block" title={activePackageName}>{activePackageName}</span>}
            subtitle={activePackageSubtitle}
            icon={Package}
            color="bg-[#3C7E44]"
          />
          <StatCard
            title="Last Payment"
            value={<span className="text-3xl">₹{typeof lastPaymentAmount === 'number' ? lastPaymentAmount.toLocaleString() : 0}</span>}
            subtitle={lastPayment ? (lastPayment.status === 'Success' ? 'Payment Successful' : lastPayment.status) : 'No payments yet'}
            icon={CreditCard}
            color={lastPayment?.status === 'Success' ? 'bg-[#3C7E44]' : 'bg-[#A44A3F]'}
          />
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Quick Actions */}


          {/* Next Delivery Preview */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br min-w-[75vw] from-[#3C7E44] to-[#244f2a] p-8 rounded-[1rem] text-white shadow-[0_12px_35px_rgba(0,0,0,0.65)]
border border-[#c6a84b] relative overflow-hidden flex flex-col justify-between min-h-[320px]  group"
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
                  className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5  rounded-[1rem] flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner"
                >
                  <ShoppingBag size={32} className="text-white drop-shadow-md" strokeWidth={1.5} />
                </motion.div>
                <div>
                  <p className="text-xs text-[#c4a757] font-bold uppercase tracking-widest mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fff200] animate-pulse" /> Arriving Tomorrow
                  </p>
                  <p className="text-2xl font-medium leading-tight text-white/95">Premium Mixed Fruit Bowl</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsTrackingOpen(true)}
                className="w-full py-4 bg-[#e8e4d9]
text-[#1f3f25]
rounded-full
shadow-[0_5px_12px_rgba(0,0,0,0.4)]
hover:bg-[#d4b75f]
hover:text-[#1f3f25]
transition-all   font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3  hover:text   shadow-black/10 hover:shadow-xl group/btn"
              >
                Track Order <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tracking Modal */}
      <AnimatePresence >
        
        {isTrackingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white  border-yellow-600 border-2 w-full max-w-md rounded-3xl shadow-md overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-tr from-[#3a7942] to-[#25522b] text-white p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Delivery Status</h3>
                  <p className="text-sm text-green-100 mt-1">Order ID: #FRUIT-2026-X10</p>
                </div>
                <button
                  onClick={() => setIsTrackingOpen(false)}
                  className="text-white font-bold text-xl"
                >
                  ×
                </button>
              </div>

              {/* Timeline */}
              <div className="p-4 space-y-4">
                {trackingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className={`w-4 h-4 mt-1 rounded-full ${step.completed ? 'bg-[#40884b]' : step.current ? 'bg-yellow-500' : 'bg-gray-300'
                        }`}
                    />
                    <div>
                      <p className={`font-medium ${step.completed || step.current ? 'text-white' : 'text-white/60'}`}>
                        {step.status}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                      <p className="text-[10px] text-gray-400">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Courier Info */}
              <div className="p-4 border-t border-gray-200 space-y-2">
                <p className="text-sm font-semibold text-gray-700">Delivery Partner:</p>
                <p className="text-gray-800">Vikram S.</p>
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg">Message</button>
                  <button className="flex-1 py-2 bg-gradient-to-tr from-[#3a7942] to-[#25522b] text-white rounded-lg">Call</button>
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
