import React from 'react';
import { ShoppingBag, Calendar, Package, CreditCard, ArrowRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow duration-300">
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

const Overview = ({ userData, orders }) => {
  // Calculate stats from dummy data
  const totalOrders = orders.length;
  // Find next delivery: filter pending orders, sort by date, find first one > today
  // For simplicity using hardcoded or derived from the first pending order
  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const upcomingDelivery = pendingOrders.length > 0 ? pendingOrders[0].deliveryDate : 'No upcoming deliveries';
  
  const activePackage = userData.activePackage ? userData.activePackage.name : 'No Active Plan';
  const lastPayment = userData.payments && userData.payments.length > 0 
    ? userData.payments[0] 
    : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome back, {userData.name.split(' ')[0]}! 👋</h2>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your fruit bowls.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Orders" 
          value={totalOrders} 
          icon={ShoppingBag} 
          color="bg-orange-500" 
        />
        <StatCard 
          title="Next Delivery" 
          value={upcomingDelivery.split(',')[0]} // Show date only
          subtitle={upcomingDelivery.split(',')[1] || ''}
          icon={Calendar} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Active Plan" 
          value={activePackage} 
          icon={Package} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Last Payment" 
          value={lastPayment ? `₹${lastPayment.amount}` : '-'}
          subtitle={lastPayment ? lastPayment.status : ''}
          icon={CreditCard} 
          color={lastPayment?.status === 'Success' ? 'bg-blue-500' : 'bg-red-500'} 
        />
      </div>

      {/* Recent Activity / Next Delivery Alert */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <Calendar className="text-green-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Delivery Schedule Updated</h3>
            <p className="text-gray-600 mt-1 text-sm">
              Please note: <strong>Same-day delivery is currently disabled.</strong> All new orders will be delivered the next day to ensure maximum freshness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
