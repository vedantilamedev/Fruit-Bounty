import React, { useState } from 'react';
import {
    ShoppingBag, Eye, X, Calendar, Package, CreditCard,
    Truck, CheckCircle, Clock, Search, Filter, ArrowRight,
    Download, RefreshCcw, MapPin, ChevronRight, AlertCircle, Ban
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Orders = ({ orders, onCancelOrder }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter logic
    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        const matchesSearch = order.id.toString().includes(searchQuery) ||
            order.items?.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesStatus && matchesSearch;
    });

    const calculateDeliveryDate = (orderDate) => {
        const date = new Date(orderDate);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    };

    const StatusBadge = ({ status }) => {
        const config = {
            'Pending': { icon: Clock, bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', dot: 'bg-amber-400' },
            'Confirmed': { icon: Truck, bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', dot: 'bg-blue-400' },
            'Delivered': { icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', dot: 'bg-emerald-400' },
            'Canceled': { icon: AlertCircle, bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', dot: 'bg-rose-400' }
        }[status] || { icon: Package, bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-100', dot: 'bg-gray-400' };

        const Icon = config.icon;
        return (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} shadow-sm transition-all duration-300`}>
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
                <Icon size={14} strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{status}</span>
            </div>
        );
    };

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2.5rem] border border-[#E8E4D9] shadow-sm relative overflow-hidden group"
        >
            <div className={`absolute -top-4 -right-4 w-24 h-24 ${color} opacity-[0.03] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.2em] mb-2">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
                    {trend && <p className="text-[10px] mt-2 text-emerald-600 font-bold uppercase tracking-widest">{trend}</p>}
                </div>
                <div className={`w-12 h-12 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center text-white overflow-hidden relative shadow-inner`}>
                    <div className={`absolute inset-0 ${color} opacity-20`} />
                    <Icon size={22} className={color.replace('bg-', 'text-')} strokeWidth={1.5} />
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-8 pb-10">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <StatCard
                    title="Active Orders"
                    value={orders.filter(o => ['Pending', 'Confirmed'].includes(o.status)).length}
                    icon={Package}
                    color="bg-[#3C7E44]"
                    trend="2 Items arriving soon"
                />
                <StatCard
                    title="Completed"
                    value={orders.filter(o => o.status === 'Delivered').length}
                    icon={CheckCircle}
                    color="bg-[#B7A261]"
                />
                <StatCard
                    title="Invested in Freshness"
                    value={`₹${orders.reduce((sum, o) => sum + o.amount, 0)}`}
                    icon={CreditCard}
                    color="bg-[#3C7E44]"
                />
            </div>

            {/* toolbar */}
            <div className="bg-white p-4 lg:p-6 rounded-[3rem] border border-[#E8E4D9] shadow-xl shadow-green-900/5 flex flex-col lg:flex-row gap-6 items-center justify-between">
                <div className="relative w-full lg:w-[450px]">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B7A261]" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID, item name or date..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-[#FBF8F2] border border-[#E8E4D9/60] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3C7E44]/10 focus:border-[#3C7E44] transition-all text-sm placeholder:text-gray-400 font-medium"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto px-2 lg:px-0 no-scrollbar">
                    {['All', 'Pending', 'Confirmed', 'Delivered', 'Canceled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border
                                ${statusFilter === status
                                    ? 'bg-[#3C7E44] text-white border-transparent shadow-lg shadow-green-900/20'
                                    : 'bg-white text-gray-500 border-[#E8E4D9] hover:border-[#3C7E44] hover:text-[#3C7E44]'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                <AnimatePresence mode='popLayout'>
                    {filteredOrders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[3rem] border border-[#E8E4D9] p-20 text-center shadow-inner"
                        >
                            <div className="w-24 h-24 bg-[#FBF8F2] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#E8E4D9]">
                                <ShoppingBag className="text-[#B7A261]/40" size={40} />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2 tracking-tight">Traces of your garden are missing</h3>
                            <p className="text-gray-400 text-sm max-w-xs mx-auto">Try adjusting your filters or start a new harvest journey.</p>
                        </motion.div>
                    ) : (
                        filteredOrders.map((order, idx) => (
                            <motion.div
                                key={order.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-white rounded-[2.5rem] border border-[#E8E4D9] overflow-hidden hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 cursor-pointer"
                                onClick={() => setSelectedOrder(order)}
                            >
                                <div className="p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6">
                                    {/* Order Thumbnail/Icon */}
                                    <div className="w-20 h-20 bg-[#FBF8F2] rounded-3xl flex items-center justify-center border border-[#E8E4D9] shrink-0 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-[#3C7E44] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Package className="text-[#3C7E44]" size={32} strokeWidth={1.5} />
                                    </div>

                                    {/* Core Info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 lg:gap-4 mb-2">
                                            <span className="text-xs font-bold text-[#B7A261] uppercase tracking-widest leading-none">Order #{order.id}</span>
                                            <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300" />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formatDate(order.date)}</span>
                                        </div>
                                        <h4 className="text-lg lg:text-xl font-medium text-gray-900 tracking-tight mb-2">
                                            {order.items?.[0]?.name} {order.items?.length > 1 && <span className="text-gray-400">& {order.items.length - 1} more</span>}
                                        </h4>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-medium text-gray-500">
                                            <div className="flex items-center gap-1.5"><MapPin size={14} className="text-[#3C7E44]" /> Orchard Selection</div>
                                            <div className="flex items-center gap-1.5"><CreditCard size={14} className="text-[#B7A261]" /> {order.paymentStatus}</div>
                                        </div>
                                    </div>

                                    {/* Right Side: Status & Action */}
                                    <div className="flex flex-col md:items-end gap-5">
                                        <StatusBadge status={order.status} />
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                                <p className="text-2xl font-bold text-[#3C7E44]">₹{order.amount}</p>
                                            </div>
                                            <motion.div
                                                whileHover={{ x: 5 }}
                                                className="w-12 h-12 rounded-full border border-[#E8E4D9] flex items-center justify-center text-[#3C7E44] group-hover:bg-[#3C7E44] group-hover:text-white group-hover:border-transparent transition-all duration-300"
                                            >
                                                <ChevronRight size={20} />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Modern Order Details Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="absolute inset-0 bg-[#3C7E44]/15 px-4"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="relative bg-white w-full max-w-3xl rounded-[3rem] shadow-[0_25px_70px_-15px_rgba(60,126,68,0.25)] border border-[#E8E4D9] overflow-hidden overflow-y-auto max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-[#3C7E44] to-[#244f2a] p-10 text-white relative overflow-hidden shrink-0">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                                <div className="relative z-10 flex justify-between items-center">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[9px] font-bold uppercase tracking-widest mb-4">
                                            Order Confirmed on {formatDate(selectedOrder.date)}
                                        </div>
                                        <h3 className="text-3xl font-bold tracking-tight">Order Details</h3>
                                        <p className="text-green-100/70 text-sm mt-1 font-medium italic">#{selectedOrder.id}</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setSelectedOrder(null)}
                                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 backdrop-blur-md"
                                    >
                                        <X size={24} />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="p-8 lg:p-12 space-y-10">
                                {/* Dashboard-style Track Row */}
                                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                                    <div className="flex-1 bg-[#FBF8F2] p-6 rounded-[2rem] border border-[#E8E4D9/50] flex flex-col justify-between">
                                        <p className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.2em] mb-4">Delivery Status</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#3C7E44] shadow-sm">
                                                <Truck size={24} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-gray-900">Arriving {calculateDeliveryDate(selectedOrder.date)}</h5>
                                                <p className="text-xs text-gray-400 font-medium">Estimated between 9 AM - 1 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-[#f0f8f1] p-6 rounded-[2rem] border border-[#3C7E44]/10 flex flex-col justify-between">
                                        <p className="text-[10px] font-bold text-[#3C7E44] uppercase tracking-[0.2em] mb-4">Payment Journey</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#3C7E44] rounded-2xl flex items-center justify-center text-white shadow-lg">
                                                <CreditCard size={24} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-gray-900">₹{selectedOrder.amount} Successfully Paid</h5>
                                                <p className="text-xs text-gray-400 font-medium">via Secure Online Gateway</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Items Row */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.2em]">Crate Contents</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedOrder.items?.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-5 bg-white border border-[#E8E4D9] rounded-3xl hover:border-[#3C7E44] transition-colors group/item">
                                                <div className="w-14 h-14 bg-[#FBF8F2] rounded-2xl flex items-center justify-center text-[#3C7E44] group-hover/item:bg-[#3C7E44] group-hover/item:text-white transition-colors">
                                                    <Package size={24} strokeWidth={1.5} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-gray-900 leading-none mb-1">{item.name}</p>
                                                    <p className="text-xs text-gray-400 font-medium">Orchard Selected • Qty {item.qty}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-[#3C7E44]">Standard</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-gray-100">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 py-4 bg-[#3C7E44] text-white rounded-[1.5rem] font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-green-900/20 flex items-center justify-center gap-3"
                                    >
                                        <Download size={16} /> Download Invoice
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 py-4 bg-white border border-[#E8E4D9] text-gray-700 rounded-[1.5rem] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#FBF8F2] transition-colors flex items-center justify-center gap-3"
                                    >
                                        <RefreshCcw size={16} className="text-[#B7A261]" /> Reorder Fresh Items
                                    </motion.button>
                                    {(selectedOrder.status === 'Pending' || selectedOrder.status === 'Confirmed') && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to cancel this order?")) {
                                                    onCancelOrder(selectedOrder.id);
                                                    setSelectedOrder(null);
                                                }
                                            }}
                                            className="flex-1 py-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-[1.5rem] font-bold text-xs uppercase tracking-[0.2em] hover:bg-rose-100 transition-colors flex items-center justify-center gap-3"
                                        >
                                            <Ban size={16} /> Cancel Order
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Orders;
