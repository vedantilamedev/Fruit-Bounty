import React, { useState, useMemo } from 'react';
import {
    CreditCard, CheckCircle, XCircle, Clock,
    Eye, Download, TrendingUp, ShieldCheck,
    Landmark, Receipt, Sparkles,
    Search, Zap, Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Payments = ({ payments = [] }) => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const methodBranding = {
        UPI: { icon: Zap, color: 'text-violet-400', bg: 'bg-violet-500/10' },
        Card: { icon: CreditCard, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        Bank: { icon: Landmark, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        Default: { icon: Wallet, color: 'text-white', bg: 'bg-white/5' }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Success': return <CheckCircle size={14} strokeWidth={3} className="text-emerald-400" />;
            case 'Pending': return <Clock size={14} strokeWidth={3} className="text-amber-400" />;
            case 'Failed': return <XCircle size={14} strokeWidth={3} className="text-rose-400" />;
            default: return <Clock size={14} strokeWidth={3} />;
        }
    };

    const statusStyles = {
        Success: 'bg-emerald-500/10 text-emerald-400 border-emerald-400/30',
        Pending: 'bg-amber-500/10 text-amber-400 border-amber-400/30',
        Failed: 'bg-rose-500/10 text-rose-400 border-rose-400/30',
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
            className="bg-[#1f5a32]/60 backdrop-blur-xl p-8 rounded-2xl border border-[#d5b975]/40 shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Icon size={28} className="text-[#d5b975]" strokeWidth={1.5} />
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-[#d5b975] uppercase tracking-[0.3em]">{title}</p>
                    <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest">{label}</p>
                </div>
            </div>
            <h3 className="text-4xl font-black text-white tracking-tighter mb-2">{value}</h3>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg border border-[#d5b975]/20">
                    <TrendingUp size={10} className="text-emerald-400" />
                    <span className="text-[9px] text-[#d5b975] font-bold uppercase tracking-widest">{trend}</span>
                </div>
                <span className="text-[9px] text-white/50 uppercase tracking-widest">Growth</span>
            </div>
        </motion.div>
    );

    return (
        <>
            <div className="min-h-screen   p-8 space-y-12">

                {/* Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <StatCard title="Total Investment" value={`₹${totalInvested.toLocaleString()}`} icon={TrendingUp} trend="+12.5%" label="Total payment history" />
                    <StatCard title="Active Credits" value="₹840.00" icon={Wallet} trend="Balance" label="Wallet Credits" />
                    <StatCard title="Total Savings" value="₹1,250" icon={ShieldCheck} trend="Verified" label="Eco Member Discount" />
                </div>

                {/* Transaction Table */}
                <div className="bg-[#1f5a32]/60 backdrop-blur-xl rounded-2xl border border-[#d5b975]/40 shadow-[0_25px_70px_rgba(0,0,0,0.35)] overflow-hidden">
                    <div className="p-10">
                        <h3 className="text-3xl font-black text-white mb-10 tracking-tight">Transaction History</h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-[#d5b975]/20">
                                        {["Receipt ID", "Date", "Amount", "Method", "Status", "Actions"].map((h) => (
                                            <th key={h} className="pb-6 text-[10px] font-black text-[#d5b975] uppercase tracking-[0.2em] px-4">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#d5b975]/10">
                                    {filteredPayments.map((payment) => (
                                        <motion.tr key={payment.id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-6 px-4 text-white text-xs font-bold">#{payment.id}</td>
                                            <td className="py-6 px-4 text-white/70 text-xs">{payment.date}</td>
                                            <td className="py-6 px-4 text-white font-black">₹{payment.amount.toLocaleString()}</td>
                                            <td className="py-6 px-4 text-white text-xs uppercase">{payment.method}</td>
                                            <td className="py-6 px-4">
                                                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${statusStyles[payment.status]}`}>
                                                    {getStatusIcon(payment.status)}
                                                    {payment.status}
                                                </div>
                                            </td>
                                            <td className="py-6 px-4 text-right">
                                                <button
                                                    onClick={() => setSelectedPayment(payment)}
                                                    className="p-3 bg-white/5 border border-[#d5b975]/30 text-white rounded-xl hover:bg-[#d5b975]/10 transition-all"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Analysis Section */}
                <div className="bg-gradient-to-br from-[#0e4722] via-[#0c7235] to-[#0e4722] p-12 rounded-2xl border border-[#d5b975]/40 shadow-2xl">
                    <h3 className="text-4xl font-black text-white mb-4">Payment Analysis</h3>
                    <p className="text-white/60 mb-6">
                        Your verified investment total:
                    </p>
                    <p className="text-6xl font-black text-[#d5b975]">
                        ₹{totalInvested.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedPayment && (
                    <motion.div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 z-50">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#1f5a32] w-full max-w-md rounded-2xl border border-[#d5b975]/40 shadow-[0_30px_80px_rgba(0,0,0,0.5)] p-8 text-white"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-[#d5b975]">Payment Receipt</h3>
                            <p className="mb-2 text-sm">ID: #{selectedPayment.id}</p>
                            <p className="mb-2 text-sm">Method: {selectedPayment.method}</p>
                            <p className="mb-2 text-sm">Date: {selectedPayment.date}</p>
                            <p className="mb-6 text-lg font-black text-[#d5b975]">
                                ₹{selectedPayment.amount.toLocaleString()}
                            </p>
                            <button
                                onClick={() => setSelectedPayment(null)}
                                className="w-full py-3 bg-[#2c6e3f] hover:bg-[#2f7c47] rounded-xl font-bold"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Payments;