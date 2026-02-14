import React, { useState } from 'react';
import { Truck, CheckCircle, Clock, XCircle, ShoppingBag, Eye, X } from 'lucide-react';

const Orders = ({ orders }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const StatusBadge = ({ status }) => {
        switch (status) {
            case 'Pending':
                return <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><Clock size={12} /> Pending</span>;
            case 'Confirmed':
                return <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><Truck size={12} /> Confirmed</span>;
            case 'Delivered':
                return <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><CheckCircle size={12} /> Delivered</span>;
            default:
                return <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><XCircle size={12} /> Unknown</span>;
        }
    };

    const PaymentBadge = ({ status }) => {
        switch (status) {
            case 'Paid':
                return <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium w-fit">Paid</span>;
            case 'Pending':
                return <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium w-fit">Pending</span>;
            case 'Failed':
                return <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium w-fit">Failed</span>;
            default:
                return <span className="text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs font-medium w-fit">-</span>;
        }
    };

    // Function to calculate delivery date (Order Date + 1 Day)
    const calculateDeliveryDate = (orderDateStr) => {
        const date = new Date(orderDateStr);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
                <span className="text-sm text-gray-500">Showing all {orders.length} orders</span>
            </div>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                    <ShoppingBag size={48} className="text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium text-lg">No orders yet</p>
                    <p className="text-gray-400 text-sm mt-1">Start by browsing our fresh bowls!</p>
                    <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        Browse Menu
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase font-semibold tracking-wide">
                                    <th className="p-4">Order ID</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Delivery Due</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Payment</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition duration-150">
                                        <td className="p-4 font-mono font-medium text-gray-700">#{order.id}</td>
                                        <td className="p-4 text-gray-600">{order.date}</td>
                                        <td className="p-4 text-gray-800 font-medium">
                                            {calculateDeliveryDate(order.date)}
                                        </td>
                                        <td className="p-4 font-semibold text-gray-900">₹{order.amount}</td>
                                        <td className="p-4">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="p-4">
                                            <PaymentBadge status={order.paymentStatus} />
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-gray-400 hover:text-green-600 transition p-2 rounded-full hover:bg-green-50"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-800 text-lg">Order Details</h3>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Order ID</p>
                                    <p className="text-xl font-mono text-gray-900 font-bold">#{selectedOrder.id}</p>
                                </div>
                                <StatusBadge status={selectedOrder.status} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Order Date</p>
                                    <p className="text-sm font-medium text-gray-800">{selectedOrder.date}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Expected Delivery</p>
                                    <p className="text-sm font-medium text-green-700">
                                        {calculateDeliveryDate(selectedOrder.date)}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">Products</p>
                                <ul className="space-y-2">
                                    {/* Dummy Loop if items exist, otherwise show generic */}
                                    {selectedOrder.items ? (
                                        selectedOrder.items.map((item, idx) => (
                                            <li key={idx} className="flex justify-between text-sm py-1 border-b border-dashed border-gray-100 last:border-0">
                                                <span className="text-gray-700">{item.name}</span>
                                                <span className="font-medium">x{item.qty}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-gray-500 italic">Details not available</li>
                                    )}
                                </ul>
                            </div>

                            <div className="flex justify-between pt-4 border-t border-gray-100 mt-4">
                                <span className="font-bold text-gray-800">Total Amount</span>
                                <span className="font-bold text-green-700 text-lg">₹{selectedOrder.amount}</span>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 text-center text-xs text-gray-500 border-t border-gray-100">
                            Need help with this order? <a href="#" className="underline hover:text-green-600">Contact Support</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
