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
            'Pending': { icon: Clock, bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200/60', dot: 'bg-amber-400' },
            'Confirmed': { icon: Truck, bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200/60', dot: 'bg-blue-400' },
            'Delivered': { icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200/60', dot: 'bg-emerald-400' },
            'Canceled': { icon: AlertCircle, bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200/60', dot: 'bg-rose-400' }
        }[status] || { icon: Package, bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200/60', dot: 'bg-gray-400' };

        const Icon = config.icon;

        return (
            <motion.div
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-[1rem] border backdrop-blur-md ${config.bg} ${config.text} ${config.border} shadow-sm transition-all`}
            >
                <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
                <Icon size={14} strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{status}</span>
            </motion.div>
        );
    };

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -6 }}
            className="bg-white/70 backdrop-blur-2xl p-7 rounded-[1rem] border border-[#d5b975]
            shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] 
            hover:shadow-[0_30px_80px_-15px_rgba(60,126,68,0.25)] 
            transition-all duration-500"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.3em] mb-3">{title}</p>
                    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
                    {trend && <p className="text-[10px] mt-3 text-emerald-600 font-bold uppercase tracking-widest">{trend}</p>}
                </div>
                <div className={`w-14 h-14 rounded-[1rem] ${color} bg-opacity-10 flex items-center justify-center shadow-inner`}>
                    <Icon size={24} className={color.replace('bg-', 'text-')} strokeWidth={1.5} />
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="relative space-y-10 pb-12">

            {/* Luxury Soft Background */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#FDFCF9] via-white to-[#F7F5EF]" />
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(60,126,68,0.06),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(183,162,97,0.06),transparent_40%)]" />

            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            {/* Toolbar */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-2xl p-4 rounded-[1rem] border border-[#d5b975]
                shadow-lg flex flex-col lg:flex-row gap-5 items-center justify-between"
            >
                <div className="relative w-full  lg:flex-1">
                    <Search className="absolute left-5 top-1/2  -translate-y-1/2 text-[#B7A261]" size={16} />
                    <input
                        type="text"
                        placeholder="Search by ID or item..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-5 py-3 bg-[#FBF8F2] rounded-[1rem] 
                        focus:outline-none focus:ring-2 focus:ring-[#3C7E44]/30 
                        text-xs font-bold uppercase tracking-widest transition-all "
                    />
                </div>
                <div className="relative w-full max-w-xs">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="appearance-none w-full px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em]
    rounded-[1rem] bg-white text-[#3C7E44] border border-[#d5b975]
    focus:outline-none focus:ring-2 focus:ring-[#3C7E44]/30
    shadow-sm cursor-pointer"
                    >
                        {['All', 'Pending', 'Confirmed', 'Delivered', 'Canceled'].map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#3C7E44]">
                        ▼
                    </div>
                </div>
            </motion.div>

            {/* Orders List */}
            <div className="space-y-5">
                <AnimatePresence mode="popLayout">
                    {filteredOrders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white/70 backdrop-blur-2xl rounded-[1rem] border border-[#d5b975] p-20 text-center shadow-lg"
                        >
                            <ShoppingBag className="text-[#B7A261]/40 mx-auto mb-6" size={44} />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Found</h3>
                            <p className="text-gray-400 text-sm">Try adjusting filters.</p>
                        </motion.div>
                    ) : (
                        filteredOrders.map(order => (
                            <motion.div
                                key={order.id}
                                layout
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.3 }}
                                className="group bg-white/70 backdrop-blur-2xl rounded-[1rem] border border-[#d5b975] p-7 
                                hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.2)] transition-all cursor-pointer"
                                
                            >
                                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-[#FBF8F2] rounded-[1rem] flex items-center justify-center shadow-inner">
                                            <Package className="text-[#3C7E44]" size={28} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#B7A261] uppercase tracking-widest">
                                                Order #{order.id}
                                            </p>
                                            <p className="text-sm text-gray-400">{formatDate(order.date)}</p>
                                            <h4 className="font-semibold text-gray-900 mt-1">
                                                {order.items?.[0]?.name}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <StatusBadge status={order.status} />
                                        <p className="text-2xl font-extrabold text-[#3C7E44] tracking-tight">
                                            ₹{order.amount}
                                        </p>
                                        <motion.div
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOrder(order);
                                            }}
                                            className="cursor-pointer"
                                        ><ChevronRight className="text-gray-400 group-hover:translate-x-2 transition-transform" /></motion.div>
                                    </div>

                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setSelectedOrder(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-[1.5rem] p-8 w-full max-w-md shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Order #{selectedOrder.id}
                            </h3>

                            <p className="text-sm text-gray-400 mb-2">
                                {formatDate(selectedOrder.date)}
                            </p>

                            <div className="mb-4">
                                <p className="font-medium text-gray-800">
                                    {selectedOrder.items?.[0]?.name}
                                </p>
                                <p className="text-[#3C7E44] font-bold text-lg mt-2">
                                    ₹{selectedOrder.amount}
                                </p>
                            </div>

                            <StatusBadge status={selectedOrder.status} />

                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="mt-6 w-full py-3 bg-[#3C7E44] text-white rounded-[1rem] font-semibold hover:bg-[#2e6234] transition"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Orders;