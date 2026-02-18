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
            className="bg-white p-8 rounded-[3rem] border border-[#E8E4D9] shadow-sm relative overflow-hidden group border-b-4 border-b-[#E8E4D9]"
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
            <div className="flex flex-col items-center justify-center p-24 bg-white rounded-[4rem] border border-[#E8E4D9] shadow-2xl shadow-green-900/5 text-center transition-all animate-fadeIn">
                <div className="bg-[#F7F5EF] p-12 rounded-[3.5rem] mb-10 shadow-inner group cursor-pointer hover:scale-110 transition-transform">
                    <CreditCard size={100} className="text-[#B7A261] opacity-20 group-hover:opacity-40 transition-opacity" strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter">Your Financial Soil is Fresh</h3>
                <p className="text-gray-400 font-medium text-base max-w-sm mb-10">You haven't initialized any fruit bounties yet. A garden of health begins with a single investment.</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-16 py-5 bg-[#3C7E44] text-white rounded-[2rem] font-bold text-xs uppercase tracking-[0.3em] shadow-2xl shadow-green-900/30"
                >
                    Sow First Ritual
                </motion.button>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-fadeIn pb-24">
            {/* Professional Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <StatCard
                    title="Treasury Root"
                    value={`₹${totalInvested.toLocaleString()}`}
                    icon={Landmark}
                    color="bg-[#3C7E44]"
                    trend="+12.5%"
                    label="Lifecycle Investment"
                />
                <StatCard
                    title="Active Aura"
                    value={`₹${payments[0]?.amount || 0}`}
                    icon={Sparkles}
                    color="bg-[#B7A261]"
                    trend="Verified"
                    label="Latest Transaction"
                />
                <StatCard
                    title="Ritual Health"
                    value="Elite"
                    icon={ShieldCheck}
                    color="bg-emerald-500"
                    trend="Stable"
                    label="Payment Trust Score"
                />
            </div>

            {/* Treasury Control Panel */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-10 bg-[#3C7E44] rounded-full shadow-lg shadow-green-900/20" />
                        <div>
                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Financial Ledger</h3>
                            <p className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.4em] mt-1">Institutional Transaction History</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-72">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Links or Channels..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white border border-[#E8E4D9] rounded-2xl text-[11px] font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3C7E44]/10 transition-all shadow-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                            {['All', 'Success', 'Pending', 'Failed'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${filterStatus === status
                                        ? 'bg-white text-[#3C7E44] shadow-md shadow-gray-200/50'
                                        : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Ledger Body */}
                <div className="bg-white rounded-[4rem] border border-[#E8E4D9] shadow-2xl shadow-black/[0.02] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-[#FBF8F2]/50">
                                    <th className="px-8 py-8 text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.3em] border-b border-[#E8E4D9]/40">Treasury ID</th>
                                    <th className="px-8 py-8 text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.3em] border-b border-[#E8E4D9]/40">Verification</th>
                                    <th className="px-8 py-8 text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.3em] border-b border-[#E8E4D9]/40">Net Value</th>
                                    <th className="px-8 py-8 text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.3em] border-b border-[#E8E4D9]/40">Ritual Channel</th>
                                    <th className="px-8 py-8 text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.3em] border-b border-[#E8E4D9]/40">Status</th>
                                    <th className="px-8 py-8 text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.3em] border-b border-[#E8E4D9]/40 text-center">Protocol</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E4D9]/30">
                                {filteredPayments.map((payment) => {
                                    const branding = methodBranding[payment.method] || methodBranding.Default;
                                    const MethodIcon = branding.icon;

                                    return (
                                        <motion.tr
                                            key={payment.id}
                                            whileHover={{ backgroundColor: '#FBF8F2' }}
                                            className="transition-colors group cursor-default"
                                        >
                                            <td className="px-8 py-7">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#3C7E44] opacity-40 group-hover:scale-150 transition-transform" />
                                                    <span className="text-xs font-black text-gray-900 tracking-tight">#{payment.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-7">
                                                <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-900 transition-colors">
                                                    <Calendar size={14} className="text-[#B7A261]" />
                                                    <span className="text-xs font-bold uppercase tracking-widest">{payment.date}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-7">
                                                <div className="flex flex-col">
                                                    <span className="text-xl font-black text-[#3C7E44] tracking-tighter">₹{payment.amount.toLocaleString()}</span>
                                                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Digital INR</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-7">
                                                <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl border ${branding.bg} ${branding.color} ${branding.border} shadow-sm group-hover:shadow-md transition-all`}>
                                                    <MethodIcon size={14} strokeWidth={2.5} />
                                                    <span className="text-[10px] font-extrabold uppercase tracking-widest">{payment.method}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-7">
                                                <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${statusStyles[payment.status] || 'bg-gray-50 text-gray-600'}`}>
                                                    {getStatusIcon(payment.status)}
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-7 text-center">
                                                <div className="flex items-center justify-center gap-3">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1, backgroundColor: '#3C7E44', color: '#fff' }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => setSelectedPayment(payment)}
                                                        className="p-3.5 rounded-[1.25rem] bg-gray-50 text-gray-400 border border-gray-100 transition-all flex items-center gap-2 group/btn"
                                                    >
                                                        <Eye size={18} />
                                                        <span className="text-[10px] font-extrabold uppercase tracking-widest hidden lg:group-hover/btn:block">Inspect Receipt</span>
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1, y: -2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="p-3.5 rounded-[1.25rem] bg-gray-50 text-gray-400 border border-gray-100 transition-all hover:text-[#B7A261]"
                                                    >
                                                        <Download size={18} />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {filteredPayments.length === 0 && (
                        <div className="py-20 text-center bg-gray-50/50">
                            <div className="mb-4 inline-flex p-6 bg-white rounded-full border border-dashed border-gray-200">
                                <Search size={32} className="text-gray-300" />
                            </div>
                            <p className="text-gray-500 font-bold text-sm">No transaction ritual matches your search.</p>
                            <p className="text-gray-400 text-[10px] mt-1 font-bold uppercase tracking-widest">Refine your audit or clear filters</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Premium Insight Section - Only for Expert Overhaul */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#1a472a] to-[#2d5a3f] p-12 rounded-[4rem] text-white overflow-hidden relative group shadow-2xl shadow-green-900/20"
            >
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B7A261]/10 rounded-full blur-[100px] -ml-20 -mb-20" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-md">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                            <Landmark size={28} className="text-[#B7A261]" />
                        </div>
                        <h3 className="text-4xl font-black tracking-tighter mb-4">Financial Aura Analysis</h3>
                        <p className="text-white/60 text-base font-medium leading-relaxed mb-8">
                            Your investments into the Fruit Bounty ecosystem have secured a <span className="text-white font-bold">100% Nutritive ROI</span>. Each transaction ritual directly feeds your personal wellness garden.
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
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 mt-2">Verified Ledger</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Receipt Modal - Advanced Breakdown */}
            <AnimatePresence>
                {selectedPayment && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPayment(null)}
                            className="fixed inset-0 bg-[#1a472a]/20 backdrop-blur-xl z-[-1]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative bg-white w-full max-w-md rounded-[3.5rem] shadow-2xl border border-[#E8E4D9] overflow-hidden p-0"
                        >
                            <div className="bg-[#1a472a] p-10 text-white relative flex flex-col items-center">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="w-20 h-20 bg-white/10 rounded-[2.5rem] border border-white/20 flex items-center justify-center mb-6 shadow-2xl backdrop-blur-2xl relative"
                                >
                                    <Sparkles size={36} className="text-[#B7A261]" />
                                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-1.5 rounded-full border-[3px] border-[#1a472a]">
                                        <CheckCircle size={12} />
                                    </div>
                                </motion.div>
                                <h3 className="text-3xl font-black tracking-tighter mb-1">Ritual Verified</h3>
                                <p className="text-[#B7A261] text-[9px] font-black uppercase tracking-[0.4em]">Official Treasury Receipt</p>
                                <button
                                    onClick={() => setSelectedPayment(null)}
                                    className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
                                >
                                    <X size={20} className="group-hover:rotate-90 transition-transform" />
                                </button>
                            </div>

                            <div className="p-10 space-y-8 bg-[#FBF8F2]/30">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Reference ID</p>
                                        <p className="text-sm font-black text-gray-900 tracking-tight">#{selectedPayment.id}</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Channel</p>
                                        <p className="text-sm font-black text-gray-900 tracking-tight">{selectedPayment.method}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Verification Date</p>
                                        <p className="text-sm font-black text-gray-900 tracking-tight">{selectedPayment.date}</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Status Protocol</p>
                                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border inline-block ${statusStyles[selectedPayment.status]}`}>
                                            {selectedPayment.status}
                                        </p>
                                    </div>
                                </div>

                                <div className="h-px w-full border-t-2 border-dashed border-gray-200 relative">
                                    <div className="absolute -left-16 -top-3 w-6 h-6 bg-white rounded-full border border-gray-100" />
                                    <div className="absolute -right-16 -top-3 w-6 h-6 bg-white rounded-full border border-gray-100" />
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.2em] mb-4">Investment Breakdown</p>
                                    <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                                        <span>Base Ritual Price</span>
                                        <span>₹{(selectedPayment.amount * 0.82).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                                        <span>Institutional Tax (GST 18%)</span>
                                        <span>₹{(selectedPayment.amount * 0.18).toFixed(2)}</span>
                                    </div>
                                    <div className="pt-4 flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1">Net Investment</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Tax Inclusive</p>
                                        </div>
                                        <p className="text-4xl font-black text-[#3C7E44] tracking-tighter">₹{selectedPayment.amount.toLocaleString()}</p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-5 bg-[#3C7E44] text-white rounded-[1.75rem] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-green-900/10 flex items-center justify-center gap-3 group/btn"
                                >
                                    <Download size={18} className="group-hover/btn:-translate-y-1 transition-transform" strokeWidth={3} /> Download Receipt
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Payments;
