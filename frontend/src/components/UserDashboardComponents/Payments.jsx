import React, { useState, useMemo } from 'react';
import {
    CreditCard, CheckCircle, XCircle, Clock,
    Eye, TrendingUp, ShieldCheck,
    Landmark, Zap, Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Payments = ({ payments = [] }) => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Success': return <CheckCircle size={14} className="text-emerald-400" />;
            case 'Pending': return <Clock size={14} className="text-amber-400" />;
            case 'Failed': return <XCircle size={14} className="text-rose-400" />;
            default: return <Clock size={14} />;
        }
    };

    const statusStyles = {
        Success: 'bg-emerald-900/40 text-emerald-300 border-emerald-500/30',
        Pending: 'bg-amber-900/40 text-amber-300 border-amber-500/30',
        Failed: 'bg-rose-900/40 text-rose-300 border-rose-500/30',
    };

    const filteredPayments = useMemo(() => {
        return (payments || []).filter(payment => {
            const paymentId = payment?.id ? String(payment.id) : '';
            const paymentName = payment?.name || '';
            const paymentMethod = payment?.method || '';
            const matchesSearch =
                paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                paymentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter =
                filterStatus === 'All' || payment.status === filterStatus;
            return matchesSearch && matchesFilter;
        });
    }, [payments, searchQuery, filterStatus]);

    const totalInvested = (payments || []).reduce((acc, curr) =>
        acc + ((curr?.status === 'Success' && typeof curr?.amount === 'number') ? curr.amount : 0), 0
    );

    const StatCard = ({ title, value, icon: Icon, trend, label }) => (
        <motion.div
            whileHover={{ y: -6 }}
            className="
                bg-gradient-to-br
                from-[#3a7a41] to-[#25512b]
                p-6 sm:p-8
                rounded-3xl
                border border-[#d5b975]/30
                shadow-xl
                relative
            "
        >
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1b5e34] flex items-center justify-center">
                    <Icon size={26} className="text-[#d5b975]" />
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-[#d5b975] uppercase tracking-[0.25em]">
                        {title}
                    </p>
                    <p className="text-[9px] text-white/60 uppercase tracking-widest">
                        {label}
                    </p>
                </div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white mb-2">
                {value}
            </h3>

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#1b5e34] px-3 py-1 rounded-lg border border-[#d5b975]/20">
                    <TrendingUp size={12} className="text-emerald-400" />
                    <span className="text-[9px] text-[#d5b975] font-bold uppercase tracking-widest">
                        {trend}
                    </span>
                </div>
                <span className="text-[9px] text-white/50 uppercase tracking-widest">
                    Growth
                </span>
            </div>
        </motion.div>
    );

    return (
        <>
            <div className="min-h-screen p-6 sm:p-10 space-y-10 sm:space-y-14">

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <StatCard
                        title="Active Credits"
                        value="₹00"
                        icon={Wallet}
                        trend="Balance"
                        label="Wallet Credits"
                    />
                    <StatCard
                        title="Total Savings"
                        value="₹00"
                        icon={ShieldCheck}
                        trend="Verified"
                        label="Eco Member Discount"
                    />
                </div>

                {/* Transaction Table (unchanged) */}
                <div className="
                    bg-gradient-to-br
                    from-[#3a7a41] to-[#25512b]
                    rounded-3xl
                    border border-[#d5b975]/30
                    shadow-xl
                    overflow-hidden
                ">
                    <div className="p-6 sm:p-10">
                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-8 sm:mb-10">
                            Transaction History
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] text-left">
                                <thead>
                                    <tr className="border-b border-[#d5b975]/20">
                                        {["Name", "Receipt ID", "Date", "Amount", "Method", "Status", "Actions"].map((h) => (
                                            <th
                                                key={h}
                                                className="pb-6 text-[10px] font-black text-[#d5b975] uppercase tracking-[0.2em] px-4"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-[#d5b975]/10">
                                    {filteredPayments.map((payment) => (
                                        <motion.tr
                                            key={payment.id}
                                            className="hover:bg-[#1b5e34]/40 transition"
                                        >
                                            <td className="py-6 px-4 text-white/70 text-xs">
                                                {payment.name}
                                            </td>
                                            <td className="py-6 px-4 text-white text-xs font-bold">
                                                #{payment.id}
                                            </td>
                                            <td className="py-6 px-4 text-white/70 text-xs">
                                                {payment.date}
                                            </td>
                                            <td className="py-6 px-4 text-white font-black">
                                                ₹{payment.amount != null ? payment.amount.toLocaleString() : '0'}
                                            </td>
                                            <td className="py-6 px-4 text-white text-xs uppercase">
                                                {payment.method}
                                            </td>
                                            <td className="py-6 px-4">
                                                <div className={`
                                                    inline-flex items-center gap-2
                                                    px-4 py-1.5 rounded-full border
                                                    text-[9px] font-black uppercase tracking-widest
                                                    ${statusStyles[payment.status]}
                                                `}>
                                                    {getStatusIcon(payment.status)}
                                                    {payment.status}
                                                </div>
                                            </td>
                                            <td className="py-6 px-4 text-right">
                                                <button
                                                    onClick={() => setSelectedPayment(payment)}
                                                    className="
                                                        p-3
                                                        bg-[#1b5e34]
                                                        border border-[#d5b975]/30
                                                        text-white
                                                        rounded-xl
                                                        hover:bg-[#206c3d]
                                                        transition
                                                    "
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

                {/* Analysis Section (unchanged) */}
                <div className="
                    bg-gradient-to-br
                    from-[#3a7a41] to-[#25512b]
                    p-8 sm:p-12
                    rounded-3xl
                    border border-[#d5b975]/30
                    shadow-2xl
                ">
                    <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
                        Payment Analysis
                    </h3>
                    <p className="text-white/60 mb-6">
                        Your verified investment total:
                    </p>
                    <p className="text-4xl sm:text-6xl font-black text-[#d5b975] break-words">
                        ₹{totalInvested.toLocaleString()}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Payments;