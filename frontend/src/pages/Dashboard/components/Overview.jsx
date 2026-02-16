import React from 'react';
import { ShoppingBag, Calendar, Package, CreditCard, ArrowRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => (
  <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-[#E8E4D9] flex flex-col justify-between hover:shadow-xl hover:shadow-green-900/5 transition-all duration-500 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-4 rounded-2xl ${color} shadow-lg shadow-current/10 transition-transform duration-500 group-hover:scale-110`}>
        <Icon size={24} className="text-white" />
      </div>
      {trend && (
        <span className="bg-green-50 text-green-600 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-[#B7A261] text-[10px] font-bold uppercase tracking-widest mb-1 italic opacity-80">{title}</p>
      <h3 className="text-3xl font-black text-[#2f6131] tracking-tight">{value}</h3>
      {subtitle && <p className="text-[11px] text-gray-400 font-medium mt-2 uppercase tracking-tight">{subtitle}</p>}
    </div>
  </div>
);

const Overview = ({ userData, orders }) => {
  // Calculate stats from dummy data
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const upcomingDelivery = pendingOrders.length > 0 ? pendingOrders[0].deliveryDate : 'No upcoming deliveries';

  const activePackage = userData.activePackage ? userData.activePackage.name : 'No Active Plan';
  const lastPayment = userData.payments && userData.payments.length > 0
    ? userData.payments[0]
    : null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="bg-[#3e7b3f]"
          trend="+2 New"
        />
        <StatCard
          title="Next Delivery"
          value={upcomingDelivery.split(',')[0]}
          subtitle={upcomingDelivery.split(',')[1] || 'Scheduled'}
          icon={Calendar}
          color="bg-[#b7a261]"
        />
        <StatCard
          title="Active Plan"
          value={activePackage.split(' ')[0]}
          subtitle={activePackage.split(' ').slice(1).join(' ')}
          icon={Package}
          color="bg-[#2f6131]"
        />
        <StatCard
          title="Last Payment"
          value={lastPayment ? `₹${lastPayment.amount}` : '-'}
          subtitle={lastPayment ? lastPayment.status : ''}
          icon={CreditCard}
          color={lastPayment?.status === 'Success' ? 'bg-[#3e7b3f]' : 'bg-[#A44A3F]'}
        />
      </div>

      {/* Hero Alert / Featured Info */}
      <div className="bg-white border-2 border-[#E8E4D9] rounded-[3rem] p-8 lg:p-10 relative overflow-hidden group hover:border-[#3e7b3f]/30 transition-colors duration-500 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3e7b3f]/5 rounded-full -mr-20 -mt-20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
        <div className="relative flex flex-col lg:flex-row items-center gap-8">
          <div className="bg-gradient-to-br from-[#3e7b3f] to-[#2f6131] p-6 rounded-[2rem] shadow-xl shadow-green-900/20">
            <Calendar className="text-white" size={40} strokeWidth={1.5} />
          </div>
          <div className="text-center lg:text-left flex-1">
            <h3 className="text-2xl font-black text-[#2f6131] tracking-tight mb-3 italic">Freshness First Protocol!</h3>
            <p className="text-[#6B705C] font-normal leading-relaxed max-w-2xl">
              To guarantee maximum freshness from orchard to your bowl, <strong className="font-black text-[#3e7b3f]">Same-day delivery is currently paused.</strong> All new fruit treasures will reach you within 24 hours of harvest preparation.
            </p>
          </div>
          <button className="bg-[#B7A261] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#3e7b3f] transition-all duration-300 shadow-lg shadow-orange-900/10">
            Read Policy
          </button>
        </div>
      </div>
    </div>
  );
};


export default Overview;
