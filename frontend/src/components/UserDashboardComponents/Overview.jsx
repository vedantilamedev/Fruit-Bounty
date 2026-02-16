
import React from 'react';
import { ShoppingBag, Users, CreditCard, Calendar, Truck, ArrowRight, Package } from 'lucide-react';

const Overview = ({ userData, orders }) => {
  // Safe access to user data with fallbacks
  const activePackage = userData?.activePackage ?
    `${userData.activePackage.name} (${userData.activePackage.peopleCount} Person)` :
    'No Active Plan';

  const totalOrders = orders ? orders.length : 0;
  const lastPayment = userData?.payments && userData.payments.length > 0 ? userData.payments[0] : null;

  const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#E8E4D9] flex flex-col gap-4 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300 group h-full relative overflow-hidden">

      <div className="flex justify-between items-start z-10">
        <div className={`p-3.5 rounded-2xl ${color} shadow-lg shadow-current/10 text-white transition-transform duration-300 group-hover:scale-105`}>
          <Icon size={24} strokeWidth={2} />
        </div>
        {trend && (
          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {trend}
          </span>
        )}
      </div>

      <div className="z-10">
        <p className="text-[#B7A261] text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">{title}</p>
        <h3 className="text-3xl font-bold text-[#3C7E44] tracking-tight leading-tight">{value}</h3>
        {subtitle && <p className="text-[11px] text-gray-400 font-medium mt-1 uppercase tracking-tight truncate">{subtitle}</p>}
      </div>

      {/* Decorative background blob */}
      <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${color} opacity-5 rounded-full blur-2xl transition-all duration-500 group-hover:opacity-10`} />
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="bg-[#3C7E44]"
          trend="+2 New"
        />
        <StatCard
          title="Active Subscription"
          value={<span className="text-2xl lg:text-3xl truncate block" title={activePackage}>{activePackage}</span>}
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

      {/* Hero Section - Freshness Protocol */}
      <div className="bg-white border-2 border-[#E8E4D9] rounded-[3rem] p-6 lg:p-10 relative overflow-hidden group hover:border-[#3C7E44]/30 transition-colors duration-500 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3C7E44]/5 rounded-full -mr-20 -mt-20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
        <div className="relative flex flex-col lg:flex-row items-center gap-8">
          <div className="bg-gradient-to-br from-[#3C7E44] to-[#3C7E44] p-6 rounded-[2rem] shadow-xl shadow-green-900/20">
            <Calendar className="text-white" size={40} strokeWidth={1.5} />
          </div>
          <div className="text-center lg:text-left flex-1">
            <h3 className="text-xl lg:text-2xl font-medium text-[#3C7E44] tracking-tight mb-3">Freshness First Protocol!</h3>
            <p className="text-black font-normal leading-relaxed max-w-2xl">
              To guarantee maximum freshness from orchard to your bowl, <strong className="font-medium text-[#3C7E44]">Same-day delivery is currently paused.</strong> All new fruit treasures will reach you within 24 hours of harvest preparation.
            </p>
          </div>
          <button className="bg-[#B7A261] text-white px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-[#3C7E44] transition-all duration-300 shadow-lg shadow-orange-900/10">
            Read Policy
          </button>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] border border-[#E8E4D9] shadow-sm">
          <h4 className="text-lg font-medium text-[#3C7E44] mb-6">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-2xl bg-[#FBF8F2] hover:bg-[#3C7E44] hover:text-white transition-all group flex flex-col items-center justify-center gap-3 border border-[#E8E4D9]">
              <Package size={24} className="text-[#3C7E44] group-hover:text-white transition-colors" />
              <span className="text-xs font-medium uppercase tracking-wider">View Plans</span>
            </button>
            <button className="p-4 rounded-2xl bg-[#FBF8F2] hover:bg-[#3C7E44] hover:text-white transition-all group flex flex-col items-center justify-center gap-3 border border-[#E8E4D9]">
              <Calendar size={24} className="text-[#3C7E44] group-hover:text-white transition-colors" />
              <span className="text-xs font-medium uppercase tracking-wider">Harvest Schedule</span>
            </button>
          </div>
        </div>

        {/* Next Delivery Preview */}
        <div className="bg-[#3C7E44] p-8 rounded-[2.5rem] text-white shadow-xl shadow-green-900/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
          <h4 className="text-lg font-medium mb-2 relative z-10">Next Delivery</h4>
          <div className="mt-6 relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Truck size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm opacity-80 uppercase tracking-wider">Arriving Tomorrow</p>
                <p className="text-xl font-semibold">Premium Mixed Fruit Bowl</p>
              </div>
            </div>
            <button className="w-full py-3 bg-white text-[#3C7E44] rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#FBF8F2] transition-colors">
              Track Order <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
