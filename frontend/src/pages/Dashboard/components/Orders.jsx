import React, { useState } from 'react';
import { Truck, CheckCircle, Clock, XCircle, ShoppingBag, Eye, X } from 'lucide-react';

const Orders = ({ orders }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const StatusBadge = ({ status }) => {
        switch (status) {
            case 'Pending':
                return <span className="text-[#B7A261] bg-[#B7A261]/10 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-[#B7A261]/20"><Clock size={12} strokeWidth={2.5} /> Pending</span>;
            case 'Confirmed':
                return <span className="text-[#3e7b3f] bg-[#3e7b3f]/10 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-[#3e7b3f]/20"><Truck size={12} strokeWidth={2.5} /> Confirmed</span>;
            case 'Delivered':
                return <span className="text-[#2f6131] bg-[#2f6131]/10 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-[#2f6131]/20"><CheckCircle size={12} strokeWidth={2.5} /> Delivered</span>;
            default:
                return <span className="text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-gray-200"><XCircle size={12} strokeWidth={2.5} /> Unknown</span>;
        }
    };

    const PaymentBadge = ({ status }) => {
        switch (status) {
            case 'Paid':
                return <span className="text-[#3e7b3f] text-[10px] font-black uppercase tracking-tighter bg-[#3e7b3f]/5 px-2 py-0.5 rounded-md">Paid</span>;
            case 'Pending':
                return <span className="text-[#B7A261] text-[10px] font-black uppercase tracking-tighter bg-[#B7A261]/5 px-2 py-0.5 rounded-md">Pending</span>;
            case 'Failed':
                return <span className="text-[#A44A3F] text-[10px] font-black uppercase tracking-tighter bg-[#A44A3F]/5 px-2 py-0.5 rounded-md">Failed</span>;
            default:
                return <span className="text-gray-400 text-[10px] font-black uppercase tracking-tighter">-</span>;
        }
    };

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
        <div className="space-y-8 animate-fadeIn mt-4">
            <div className="flex justify-end mb-4 px-2">
                <span className="text-[11px] font-black text-[#3e7b3f] bg-white px-4 py-2 rounded-full border border-[#E8E4D9] shadow-sm uppercase tracking-tighter">
                    {orders.length} Total Treasures
                </span>
            </div>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[3rem] border-2 border-dashed border-[#E8E4D9] shadow-inner text-center">
                    <div className="bg-[#F7F5EF] p-8 rounded-[2rem] mb-6 shadow-sm">
                        <ShoppingBag size={64} className="text-[#B7A261] opacity-40" strokeWidth={1} />
                    </div>
                    <p className="text-[#2f6131] font-black text-xl italic mb-2 tracking-tight">Your Basket is Empty!</p>
                    <p className="text-[#6B705C] font-normal text-sm max-w-xs mb-8">It seems you haven't started your journey of freshness yet.</p>
                    <button className="px-10 py-4 bg-[#3e7b3f] text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#2f6131] transition-all duration-300 shadow-xl shadow-green-900/20">
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] shadow-sm border border-[#E8E4D9] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#F7F5EF] text-[10px] text-[#B7A261] uppercase font-black tracking-[0.15em] border-b border-[#E8E4D9]">
                                    <th className="p-6">Treasury ID</th>
                                    <th className="p-6">Harvest Date</th>
                                    <th className="p-6">Expected Arrival</th>
                                    <th className="p-6">Investment</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6">Payment</th>
                                    <th className="p-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E4D9]/30 text-sm">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-[#FBF8F2] transition duration-300 group">
                                        <td className="p-6 font-bold text-[#6B705C] text-xs">#{order.id}</td>
                                        <td className="p-6 text-[#2f6131] font-medium italic opacity-80">{order.date}</td>
                                        <td className="p-6 text-[#3e7b3f] font-bold tracking-tight">
                                            {calculateDeliveryDate(order.date)}
                                        </td>
                                        <td className="p-6 font-bold text-[#2f6131] text-lg">₹{order.amount}</td>
                                        <td className="p-6">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="p-6">
                                            <PaymentBadge status={order.paymentStatus} />
                                        </td>
                                        <td className="p-6 text-center">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="bg-[#F7F5EF] text-[#3e7b3f] hover:bg-[#3e7b3f] hover:text-white transition-all duration-300 p-3 rounded-2xl shadow-sm group-hover:scale-110"
                                                title="View Details"
                                            >
                                                <Eye size={18} strokeWidth={2.5} />
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-900/20 backdrop-blur-md p-4 animate-fadeIn">
                    <div className="bg-[#FBF8F2] rounded-[3.5rem] shadow-2xl w-full max-w-[28rem] overflow-hidden border-2 border-white/50">
                        <div className="flex justify-between items-center p-8 border-b border-[#E8E4D9] bg-white/50 relative">
                            <div>
                                <h3 className="font-black text-[#2f6131] text-xl italic tracking-tight uppercase">Treasure Receipt</h3>
                                <p className="text-[10px] font-black text-[#B7A261] tracking-widest mt-1">Order Details Breakdown</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="bg-[#F7F5EF] text-[#6B705C] hover:bg-[#A44A3F] hover:text-white transition-all duration-300 p-2 rounded-full absolute top-6 right-8"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="p-10 space-y-8 overflow-y-auto max-h-[70vh]">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[10px] font-black text-[#B7A261] uppercase tracking-widest mb-1 italic">Treasure ID</p>
                                    <p className="text-2xl font-black text-[#2f6131] tracking-tighter italic">#{selectedOrder.id}</p>
                                </div>
                                <StatusBadge status={selectedOrder.status} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-[2.5rem] border border-[#E8E4D9] shadow-sm">
                                <div>
                                    <p className="text-[10px] font-black text-[#B7A261] uppercase tracking-widest mb-1 italic">Harvested</p>
                                    <p className="text-sm font-black text-[#6B705C]">{selectedOrder.date}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-[#B7A261] uppercase tracking-widest mb-1 italic">Arriving</p>
                                    <p className="text-sm font-black text-[#3e7b3f]">
                                        {calculateDeliveryDate(selectedOrder.date)}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-[#B7A261] uppercase tracking-widest mb-4 italic ml-2">Delights Contained</p>
                                <ul className="space-y-3 bg-white/40 p-2 rounded-3xl">
                                    {selectedOrder.items ? (
                                        selectedOrder.items.map((item, idx) => (
                                            <li key={idx} className="flex justify-between text-base px-6 py-4 bg-white rounded-2xl shadow-sm border border-[#E8E4D9]/30">
                                                <span className="font-bold text-[#6B705C]">{item.name}</span>
                                                <span className="font-black text-[#3e7b3f] bg-[#F7F5EF] px-3 py-1 rounded-lg text-sm">x{item.qty}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-gray-500 italic px-6">Details not available</li>
                                    )}
                                </ul>
                            </div>

                            <div className="flex justify-between pt-8 border-t border-[#E8E4D9] mt-6 items-end">
                                <div>
                                    <p className="text-[10px] font-black text-[#B7A261] uppercase tracking-widest italic">Total Investment</p>
                                    <span className="text-sm font-black text-[#3e7b3f]">{selectedOrder.paymentStatus}</span>
                                </div>
                                <span className="font-black text-[#2f6131] text-3xl tracking-tighter">₹{selectedOrder.amount}</span>
                            </div>
                        </div>

                        <div className="p-6 bg-[#3e7b3f] text-center text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-2xl">
                            Harvested with love by FruitsBounty
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Orders;
