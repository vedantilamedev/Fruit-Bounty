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

    const filteredOrders = orders?.filter(order => {
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
            Pending: { icon: Clock, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
            Confirmed: { icon: Truck, color: 'bg-blue-100 text-blue-800 border-blue-300' },
            Delivered: { icon: CheckCircle, color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
            Canceled: { icon: AlertCircle, color: 'bg-red-100 text-red-800 border-red-300' }
        }[status] || { icon: Package, color: 'bg-gray-100 text-gray-700 border-gray-300' };

        const Icon = config.icon;

        return (
            <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border text-xs font-semibold ${config.color}`}>
                <Icon size={14} />
                {status}
            </div>
        );
    };

    const StatCard = ({ title, value, icon: Icon }) => (
        <div className="bg-gradient-to-br from-[#2f5e2f] to-[#3c7a3c]
            text-white rounded-2xl p-4 sm:p-6 shadow-lg">

            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs uppercase tracking-widest text-white/70 mb-2">
                        {title}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold break-words">{value}</h3>
                </div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20
                    flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-8 sm:space-y-10 min-h-screen">

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <StatCard
                    title="Active Orders"
                    value={orders?.filter(o => ['Pending', 'Confirmed'].includes(o.status))?.length}
                    icon={Package}
                />
                <StatCard
                    title="Completed"
                    value={orders?.filter(o => o.status === 'Delivered')?.length}
                    icon={CheckCircle}
                />
                <StatCard
                    title="Invested in Freshness"
                    value={`₹${orders?.reduce((sum, o) => sum + o.amount, 0)}`}
                    icon={CreditCard}
                />
            </div>

            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between
                bg-gradient-to-r from-[#2f5e2f] to-[#3c7a3c]
                rounded-2xl p-4 shadow-lg text-white">

                <div className="relative w-full lg:flex-1">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />
                    <input
                        type="text"
                        placeholder="Search by ID or item..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3
                            bg-white/20 backdrop-blur-md
                            border border-white/20
                            rounded-xl text-sm text-white
                            placeholder-white/60
                            focus:outline-none focus:ring-2 focus:ring-white/40"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full lg:w-auto px-4 py-3 bg-white/20
                        border border-white/20
                        rounded-xl text-sm text-white
                        focus:outline-none focus:ring-2 focus:ring-white/40">
                    {['All', 'Pending', 'Confirmed', 'Delivered', 'Canceled'].map((status) => (
                        <option key={status} value={status} className="text-black">
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            {/* Orders */}
            <div className="space-y-4 sm:space-y-5">
                <AnimatePresence>
                    {filteredOrders?.length === 0 ? (
                        <div className="text-center py-12 sm:py-16
                            bg-gradient-to-br from-[#2f5e2f] to-[#3c7a3c]
                            text-white rounded-2xl shadow-lg">
                            <ShoppingBag size={40} className="mx-auto text-white/70 mb-4" />
                            <p className="text-white/80 text-sm sm:text-base">No Orders Found</p>
                        </div>
                    ) : (
                        filteredOrders?.map(order => (
                            <motion.div
                                key={order.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gradient-to-r from-[#2f5e2f] to-[#3c7a3c]
                                    text-white rounded-2xl p-4 sm:p-6
                                    flex flex-col md:flex-row
                                    gap-4 md:gap-0
                                    justify-between md:items-center
                                    shadow-lg transition">

                                <div className="flex items-center gap-4 sm:gap-5">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center">
                                        <Package className="text-white" size={22} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm text-white/80">
                                            Order #{order.id}
                                        </p>
                                        <p className="text-xs text-white/60">
                                            {formatDate(order.date)}
                                        </p>
                                        <p className="font-semibold mt-1 truncate">
                                            {order.items?.[0]?.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                    <StatusBadge status={order.status} />
                                    <p className="text-lg sm:text-xl font-bold">
                                        ₹{order.amount}
                                    </p>
                                    <ChevronRight
                                        className="text-white/70 hover:translate-x-1 transition cursor-pointer"
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
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedOrder(null)}>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-gradient-to-br from-[#2f5e2f] to-[#3c7a3c]
                                text-white rounded-2xl p-6 sm:p-8
                                w-full max-w-md shadow-xl"
                            onClick={(e) => e.stopPropagation()}>

                            <h3 className="text-lg sm:text-xl font-bold mb-2">
                                Order #{selectedOrder.id}
                            </h3>

                            <p className="text-sm text-white/70 mb-4">
                                {formatDate(selectedOrder.date)}
                            </p>

                            <p className="font-medium break-words">
                                {selectedOrder.items?.[0]?.name}
                            </p>

                            <p className="font-bold text-lg mt-2">
                                ₹{selectedOrder.amount}
                            </p>

                            <div className="mt-4">
                                <StatusBadge status={selectedOrder.status} />
                            </div>

                            {selectedOrder.status === "Pending" && (
                                <button
                                    onClick={() => {
                                        onCancelOrder(selectedOrder.id);
                                        setSelectedOrder(null);
                                    }}
                                    className="mt-6 w-full py-3 bg-red-600 hover:bg-red-500
                                        text-white rounded-xl font-semibold transition">
                                    Cancel Order
                                </button>
                            )}

                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="mt-4 w-full py-3 bg-white/20
                                    hover:bg-white/30
                                    text-white rounded-xl font-semibold transition">
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