import React, { useState, useMemo } from 'react';
import {
    CreditCard, CheckCircle, XCircle, Clock,
    Eye, Download, TrendingUp, ShieldCheck,
    Landmark, Receipt, Sparkles, Calendar,
    Search, Zap, Wallet, X, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Payments = ({ payments = [] }) => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Branding for payment methods
    const methodBranding = {
        UPI: { icon: Zap, color: 'text-violet-500', bg: 'bg-violet-50', border: 'border-violet-100' },
        Card: { icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
        Bank: { icon: Landmark, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
        Default: { icon: Wallet, color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-100' }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Success': return <CheckCircle size={14} strokeWidth={3} className="text-emerald-500" />;
            case 'Pending': return <Clock size={14} strokeWidth={3} className="text-amber-500" />;
            case 'Failed': return <XCircle size={14} strokeWidth={3} className="text-rose-500" />;
            default: return <Clock size={14} strokeWidth={3} />;
        }
    };

    const statusStyles = {
        Success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        Pending: 'bg-amber-50 text-amber-700 border-amber-100',
        Failed: 'bg-rose-50 text-rose-700 border-rose-100',
    };

    const filteredPayments = useMemo(() => {
        return payments.filter(payment => {
            const matchesSearch = payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.method.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filterStatus === 'All' || payment.status === filterStatus;
            return matchesSearch && matchesFilter;
        });
    }, [payments, searchQuery, filterStatus]);

    const totalInvested = payments.reduce((acc, curr) => acc + (curr.status === 'Success' ? curr.amount : 0), 0);

    const StatCard = ({ title, value, icon: Icon, color, trend, label }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[1rem] border border-[#E8E4D9] shadow-sm relative overflow-hidden group border-b-4 border-b-[#E8E4D9]"
        >
            <div className={`absolute -top-12 -right-12 w-40 h-40 ${color} opacity-[0.03] rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000`} />
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center shadow-inner`}>
                        <Icon size={28} className={color.replace('bg-', 'text-')} strokeWidth={1.5} />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.3em] mb-1">{title}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                    </div>
                </div>
                <h3 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">{value}</h3>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                        <TrendingUp size={10} className="text-emerald-500" />
                        <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">{trend}</span>
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Growth</span>
                </div>
            </div>
        </motion.div>
    );

    if (payments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-24 bg-white rounded-[1rem] border border-[#E8E4D9] shadow-2xl shadow-green-900/5 text-center transition-all animate-fadeIn">
                <div className="bg-[#F7F5EF] p-12 rounded-[1rem] mb-10 shadow-inner group cursor-pointer hover:scale-110 transition-transform">
                    <CreditCard size={100} className="text-[#B7A261] opacity-20 group-hover:opacity-40 transition-opacity" strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter">Your Financial Soil is Fresh</h3>
                <p className="text-gray-400 font-medium text-base max-w-sm mb-10">You haven't initialized any fruit bounties yet. A garden of health begins with a single investment.</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-16 py-5 bg-[#3C7E44] text-white rounded-[1rem] font-bold text-xs uppercase tracking-[0.3em] shadow-2xl shadow-green-900/30"
                >
                    Make First Payment
                </motion.button>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-12 animate-fadeIn pb-24">
                {/* Professional Stats Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <StatCard
                        title="Total Investment"
                        value={`₹${totalInvested.toLocaleString()}`}
                        icon={TrendingUp}
                        trend="+12.5%"
                        color="bg-[#3C7E44]"
                        label="Total payment history"
                    />
                    <StatCard
                        title="Active Credits"
                        value="₹840.00"
                        icon={Wallet}
                        trend="Balance"
                        color="bg-[#B7A261]"
                        label="Wallet Credits"
                    />
                    <StatCard
                        title="Total Savings"
                        value="₹1,250"
                        icon={ShieldCheck}
                        trend="Verified"
                        color="bg-[#3C7E44]"
                        label="Eco Member Discount"
                    />
                </div>

                <div className="bg-white rounded-[1rem] border border-[#E8E4D9] shadow-2xl shadow-green-900/5 overflow-hidden">
                    <div className="p-8 lg:p-12">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">Transaction History</h3>
                                <p className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.4em]">View your payment history</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                {/* Search Input */}
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#3C7E44] transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search by ID or Method..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-12 pr-4 py-3 bg-[#FBF8F2] border border-[#E8E4D9] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#3C7E44]/20 outline-none w-full transition-all"
                                    />
                                </div>

                                {/* Filter Dropdown */}
                                <div className="w-40">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="w-full p-3 bg-[#FBF8F2] border border-[#E8E4D9] rounded-2xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3C7E44]/20"
                                    >
                                        {['All', 'Success', 'Pending', 'Failed', 'Canceled'].map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="pb-6 text-[10px] font-black text-[#B7A261] uppercase tracking-[0.2em] px-4">Receipt ID</th>
                                        <th className="pb-6 text-[10px] font-black text-[#B7A261] uppercase tracking-[0.2em] px-4">Harvest Date</th>
                                        <th className="pb-6 text-[10px] font-black text-[#B7A261] uppercase tracking-[0.2em] px-4">Amount</th>
                                        <th className="pb-6 text-[10px] font-black text-[#B7A261] uppercase tracking-[0.2em] px-4">Method</th>
                                        <th className="pb-6 text-[10px] font-black text-[#B7A261] uppercase tracking-[0.2em] px-4">Status</th>
                                        <th className="pb-6 text-right text-[10px] font-black text-[#B7A261] uppercase tracking-[0.2em] px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 border-b border-gray-100 mb-8">
                                    {filteredPayments.map((payment) => (
                                        <motion.tr
                                            key={payment.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="group hover:bg-[#FBF8F2]/50 transition-colors"
                                        >
                                            <td className="py-6 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[#3C7E44]/5 rounded-xl flex items-center justify-center text-[#3C7E44]">
                                                        <Receipt size={18} />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-900 group-hover:text-[#3C7E44] transition-colors">#{payment.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-4 text-xs font-medium text-gray-500 uppercase tracking-widest">{payment.date}</td>
                                            <td className="py-6 px-4 text-sm font-black text-gray-900">₹{payment.amount.toLocaleString()}</td>
                                            <td className="py-6 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`${methodBranding[payment.method]?.bg || methodBranding.Default.bg} p-1.5 rounded-lg`}>
                                                        {React.createElement(methodBranding[payment.method]?.icon || methodBranding.Default.icon, { size: 14, className: methodBranding[payment.method]?.color || methodBranding.Default.color })}
                                                    </div>
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{payment.method}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-4">
                                                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${statusStyles[payment.status]}`}>
                                                    {getStatusIcon(payment.status)}
                                                    {payment.status}
                                                </div>
                                            </td>
                                            <td className="py-6 px-4 text-right">
                                                <button
                                                    onClick={() => setSelectedPayment(payment)}
                                                    className="p-3 bg-white border border-[#E8E4D9] rounded-xl text-gray-600 hover:text-[#3C7E44] hover:border-[#3C7E44] transition-all hover:scale-110 shadow-sm"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredPayments.length === 0 && (
                                <div className="py-20 text-center">
                                    <div className="w-20 h-20 bg-[#F7F5EF] rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#B7A261] opacity-40">
                                        <Search size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">No Transactions Found</h4>
                                    <p className="text-gray-400 text-sm font-medium">Try adjusting your search or filters.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-12 p-10 bg-[#FBF8F2] rounded-[1rem] border border-[#E8E4D9] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-[#3C7E44]/5 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#B7A261] shadow-xl shadow-amber-900/5">
                                        <Sparkles size={32} />
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-black text-gray-900 tracking-tight">Need Payment History?</h5>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Download your annual harvest financial summary</p>
                                    </div>
                                </div>
                                <button className="px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-colors shadow-2xl shadow-black/20 flex items-center gap-3">
                                    <Download size={18} /> Export FY 2025-26
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-[#1a472a] to-[#2d5a3f] p-12 rounded-[1rem] text-white overflow-hidden relative group shadow-2xl shadow-green-900/20"
                >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B7A261]/10 rounded-full blur-[100px] -ml-20 -mb-20" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-md">
                            <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                                <Landmark size={28} className="text-[#B7A261]" />
                            </div>
                            <h3 className="text-4xl font-black tracking-tighter mb-4">Payment Analysis</h3>
                            <p className="text-white/60 text-base font-medium leading-relaxed mb-8">
                                Your payments for Fruit Bounty have secured a <span className="text-white font-bold">100% Quality Benefit</span>. Each payment helps maintain your fresh fruit supply.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
                                    <ShieldCheck size={18} className="text-emerald-400" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#B7A261]">SSL SECURED</span>
                                </div>
                                <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
                                    <Zap size={18} className="text-violet-400" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#B7A261]">INSTANT Verification</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="w-72 h-72 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 flex items-center justify-center relative shadow-2xl overflow-hidden group">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-0 border-[6px] border-dashed border-[#B7A261]/20 rounded-full"
                                />
                                <div className="text-center z-10">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#B7A261] mb-2">Total Yield</p>
                                    <p className="text-6xl font-black tracking-tighter">₹{totalInvested.toLocaleString()}</p>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mt-2">Verified History</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Receipt Modal - Advanced Breakdown */}
            <AnimatePresence>
                {selectedPayment && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPayment(null)}
                            className="absolute inset-0"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 250 }}
                            className="relative bg-white w-full max-w-md rounded-xl border border-gray-200 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-green-700 text-white p-6 flex flex-col items-center relative">
                                <Sparkles size={36} className="mb-2 text-yellow-400" />
                                <h3 className="text-2xl font-bold">Payment Verified</h3>
                                <p className="text-xs uppercase tracking-widest mt-1">Official Payment Receipt</p>
                                <button
                                    onClick={() => setSelectedPayment(null)}
                                    className="absolute top-4 right-4 text-white font-bold text-xl"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Payment Details */}
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm font-bold text-gray-800">
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase">Reference ID</p>
                                        <p>#{selectedPayment.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 text-xs uppercase">Channel</p>
                                        <p>{selectedPayment.method}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase">Verification Date</p>
                                        <p>{selectedPayment.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 text-xs uppercase">Status</p>
                                        <p className={`inline-block px-2 py-1 rounded-full text-white text-xs ${statusStyles[selectedPayment.status]}`}>
                                            {selectedPayment.status}
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Breakdown */}
                                <div className="space-y-2 text-sm text-gray-700">
                                    <p className="font-bold uppercase text-xs text-green-700">Payment Breakdown</p>
                                    <div className="flex justify-between">
                                        <span>Base Price</span>
                                        <span>₹{(selectedPayment.amount * 0.82).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax (GST 18%)</span>
                                        <span>₹{(selectedPayment.amount * 0.18).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 pt-2 items-end">
                                        <span className="text-xs font-bold uppercase">Net Investment</span>
                                        <span className="text-lg font-black text-green-700">₹{selectedPayment.amount.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Download Button */}
                                <button
                                    className="w-full py-3 bg-green-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                                >
                                    <Download size={18} /> Download Receipt
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Payments;
