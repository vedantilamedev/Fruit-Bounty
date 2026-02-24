import React, { useState } from 'react';
import {
    ShoppingBag, Package, CreditCard,
    Truck, CheckCircle, Clock, Search,
    ChevronRight, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Orders = ({ orders, onCancelOrder }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        const matchesSearch =
            order.id.toString().includes(searchQuery) ||
            order.items?.some(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        return matchesStatus && matchesSearch;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const StatusBadge = ({ status }) => {
        const config = {
            Pending: { icon: Clock, color: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30' },
            Confirmed: { icon: Truck, color: 'bg-blue-400/20 text-blue-300 border-blue-400/30' },
            Delivered: { icon: CheckCircle, color: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30' },
            Canceled: { icon: AlertCircle, color: 'bg-red-400/20 text-red-300 border-red-400/30' }
        }[status] || { icon: Package, color: 'bg-white/10 text-white border-white/20' };

        const Icon = config.icon;

        return (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold ${config.color}`}>
                <Icon size={14} />
                {status}
            </div>
        );
    };

    const StatCard = ({ title, value, icon: Icon }) => (
        <div className="bg-gradient-to-br from-green-800/60 to-green-900/60 
                    border border-[#c6a84b]
                    backdrop-blur-xl
                    rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs uppercase tracking-widest text-green-300/70 mb-2">
                        {title}
                    </p>
                    <h3 className="text-3xl font-bold text-white">{value}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-700/40 
                        flex items-center justify-center">
                    <Icon size={22} className="text-green-300" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-8 space-y-10 text-white">

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Active Orders"
                    value={orders.filter(o => ['Pending', 'Confirmed'].includes(o.status)).length}
                    icon={Package}
                />
                <StatCard
                    title="Completed"
                    value={orders.filter(o => o.status === 'Delivered').length}
                    icon={CheckCircle}
                />
                <StatCard
                    title="Invested in Freshness"
                    value={`₹${orders.reduce((sum, o) => sum + o.amount, 0)}`}
                    icon={CreditCard}
                />
            </div>

            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between
                      bg-green-900/40 backdrop-blur-xl
                      border border-[#c6a84b]
                      rounded-2xl p-4">

                <div className="relative w-full lg:flex-1">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-300" />
                    <input
                        type="text"
                        placeholder="Search by ID or item..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3
                       bg-green-950/60
                       border border-green-[#c6a84b]
                       rounded-xl
                       text-sm text-white
                       focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 bg-green-950/60
                     border border-[#c6a84b]
                     rounded-xl text-sm text-white
                     focus:outline-none focus:ring-2 focus:ring-green-500">
                    {['All', 'Pending', 'Confirmed', 'Delivered', 'Canceled'].map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            {/* Orders */}
            <div className="space-y-4">
                <AnimatePresence>
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-16 bg-green-900/40 rounded-2xl border border-[#c6a84b]0">
                            <ShoppingBag size={40} className="mx-auto text-green-400/50 mb-4" />
                            <p className="text-green-200">No Orders Found</p>
                        </div>
                    ) : (
                        filteredOrders.map(order => (
                            <motion.div
                                key={order.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-green-900/40 
                           border border-[#c6a84b]
                           backdrop-blur-xl
                           rounded-2xl p-6
                           flex flex-col md:flex-row
                           justify-between items-center
                           cursor-pointer transition">

                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-green-800/60 rounded-xl flex items-center justify-center">
                                        <Package className="text-green-300" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-300">
                                            Order #{order.id}
                                        </p>
                                        <p className="text-xs text-green-400/70">
                                            {formatDate(order.date)}
                                        </p>
                                        <p className="font-semibold text-white mt-1">
                                            {order.items?.[0]?.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 mt-4 md:mt-0">
                                    <StatusBadge status={order.status} />
                                    <p className="text-xl font-bold text-green-300">
                                        ₹{order.amount}
                                    </p>
                                    <ChevronRight
                                        className="text-green-400 hover:translate-x-1 transition"
                                        onClick={() => setSelectedOrder(order)}
                                    />
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setSelectedOrder(null)}>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-green-950 border border-[#c6a84b]
                         rounded-2xl p-8 w-full max-w-md text-white"
                            onClick={(e) => e.stopPropagation()}>

                            <h3 className="text-xl font-bold mb-2">
                                Order #{selectedOrder.id}
                            </h3>
                            <p className="text-sm text-green-400 mb-4">
                                {formatDate(selectedOrder.date)}
                            </p>

                            <p className="font-medium">
                                {selectedOrder.items?.[0]?.name}
                            </p>

                            <p className="text-green-300 font-bold text-lg mt-2">
                                ₹{selectedOrder.amount}
                            </p>

                            <div className="mt-4">
                                <StatusBadge status={selectedOrder.status} />
                            </div>

                            {/* Show Cancel Button only if Pending */}
                            {selectedOrder.status === "Pending" && (
                                <button
                                    onClick={() => {
                                        onCancelOrder(selectedOrder.id);
                                        setSelectedOrder(null);
                                    }}
                                    className="mt-6 w-full py-3 bg-red-600 hover:bg-red-500
        rounded-xl font-semibold transition">
                                    Cancel Order
                                </button>
                            )}

                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="mt-4 w-full py-3 bg-green-700 hover:bg-green-600
    rounded-xl font-semibold transition">
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