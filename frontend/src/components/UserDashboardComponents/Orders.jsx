import React, { useState } from 'react';
import { ShoppingBag, Eye, X, Calendar, Package, CreditCard, Truck, CheckCircle, Clock } from 'lucide-react';

const Orders = ({ orders }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Calculate delivery date (Order Date + 1 day)
    const calculateDeliveryDate = (orderDate) => {
        const date = new Date(orderDate);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    // Format date nicely
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusConfig = {
            'Pending': {
                icon: Clock,
                color: 'bg-[#B7A261]/10 text-[#B7A261] border-[#B7A261]/20',
                label: 'Pending'
            },
            'Confirmed': {
                icon: Truck,
                color: 'bg-[#3C7E44]/10 text-[#3C7E44] border-[#3C7E44]/20',
                label: 'Confirmed'
            },
            'Delivered': {
                icon: CheckCircle,
                color: 'bg-[#3C7E44]/10 text-[#3C7E44] border-[#3C7E44]/20',
                label: 'Delivered'
            }
        };

        const config = statusConfig[status] || statusConfig['Pending'];
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${config.color}`}>
                <Icon size={14} strokeWidth={2.5} />
                {config.label}
            </span>
        );
    };

    // Payment status badge
    const PaymentBadge = ({ status }) => {
        const colors = {
            'Paid': 'bg-[#3C7E44]/10 text-[#3C7E44] border-[#3C7E44]/20',
            'Pending': 'bg-[#B7A261]/10 text-[#B7A261] border-[#B7A261]/20',
            'Failed': 'bg-[#A44A3F]/10 text-[#A44A3F] border-[#A44A3F]/20'
        };

        return (
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border uppercase tracking-wider ${colors[status] || colors['Pending']}`}>
                {status}
            </span>
        );
    };

    return (
        <>
            <div className="space-y-6 animate-fadeIn">
                {/* Header Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-[#B7A261] uppercase tracking-widest mb-1">Total Orders</p>
                                <p className="text-3xl font-bold text-[#3C7E44] tracking-tight">{orders.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-[#3C7E44]/10 rounded-xl flex items-center justify-center">
                                <ShoppingBag className="text-[#3C7E44]" size={24} strokeWidth={2} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-[#B7A261] uppercase tracking-widest mb-1">Delivered</p>
                                <p className="text-3xl font-bold text-[#3C7E44] tracking-tight">
                                    {orders.filter(o => o.status === 'Delivered').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-[#3C7E44]/10 rounded-xl flex items-center justify-center">
                                <CheckCircle className="text-[#3C7E44]" size={24} strokeWidth={2} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-[#B7A261] uppercase tracking-widest mb-1">Total Spent</p>
                                <p className="text-3xl font-bold text-[#3C7E44] tracking-tight">
                                    ₹{orders.reduce((sum, order) => sum + order.amount, 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-[#B7A261]/10 rounded-xl flex items-center justify-center">
                                <CreditCard className="text-[#B7A261]" size={24} strokeWidth={2} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-500 text-sm">Your order history will appear here</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Items
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Payment
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-gray-900">#{order.id}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-600">{formatDate(order.date)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-900">
                                                    {order.items?.[0]?.name || 'N/A'}
                                                    {order.items?.length > 1 && (
                                                        <span className="text-gray-500"> +{order.items.length - 1} more</span>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-semibold text-gray-900">₹{order.amount}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={order.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <PaymentBadge status={order.paymentStatus} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    <Eye size={16} />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            {
                selectedOrder && (
                    <div
                        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
                        onClick={() => setSelectedOrder(null)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="bg-[#3C7E44] px-8 py-6 flex items-center justify-between shadow-md">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <Package className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Order Details</h3>
                                        <p className="text-sm text-blue-100">#{selectedOrder.id}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                                {/* Status & Payment Info */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-xs text-gray-500 mb-2">Order Status</p>
                                        <StatusBadge status={selectedOrder.status} />
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-xs text-gray-500 mb-2">Payment Status</p>
                                        <PaymentBadge status={selectedOrder.paymentStatus} />
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="bg-gray-50 rounded-xl p-5 mb-6">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Order Timeline</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Calendar className="text-green-600" size={16} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Order Placed</p>
                                                <p className="text-xs text-gray-500">{formatDate(selectedOrder.date)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${selectedOrder.status === 'Delivered' ? 'bg-green-100' : 'bg-gray-200'
                                                }`}>
                                                <Truck className={selectedOrder.status === 'Delivered' ? 'text-green-600' : 'text-gray-400'} size={16} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Delivery Date</p>
                                                <p className="text-xs text-gray-500">{calculateDeliveryDate(selectedOrder.date)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Order Items</h4>
                                    <div className="space-y-2">
                                        {selectedOrder.items?.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                                        <Package className="text-gray-400" size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-xs text-gray-500">Quantity: {item.qty}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-[#FBF8F2] rounded-2xl p-6 border border-[#E8E4D9]">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium text-gray-600">Subtotal</span>
                                        <span className="text-sm font-bold text-gray-900">₹{selectedOrder.amount}</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium text-gray-600">Delivery Fee</span>
                                        <span className="text-sm font-bold text-[#3C7E44]">Free</span>
                                    </div>
                                    <div className="border-t border-[#E8E4D9] my-4"></div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-900">Total Amount</span>
                                        <span className="text-2xl font-black text-[#3C7E44]">₹{selectedOrder.amount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Orders;
