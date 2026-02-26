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
        return payments.filter(payment => {
            const matchesSearch = payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.method.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filterStatus === 'All' || payment.status === filterStatus;
            return matchesSearch && matchesFilter;
        });
    }, [payments, searchQuery, filterStatus]);

    const totalInvested = payments.reduce((acc, curr) =>
        acc + (curr.status === 'Success' ? curr.amount : 0), 0
    );

    const StatCard = ({ title, value, icon: Icon, trend, label }) => (
        <motion.div
            whileHover={{ y: -6 }}
            className="
                bg-gradient-to-br
                from-[#3a7a41] to-[#25512b]
                p-8
                rounded-3xl
                border border-[#d5b975]/30
                shadow-xl
                relative
            "
        >
            <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#1b5e34] flex items-center justify-center">
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

            <h3 className="text-4xl font-black text-white mb-2">
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
            <div className="min-h-screen p-10 space-y-14">

                {/* Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <StatCard
                        title="Total Investment"
                        value={`₹${totalInvested.toLocaleString()}`}
                        icon={TrendingUp}
                        trend="+12.5%"
                        label="Total payment history"
                    />
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

                {/* Transaction Table */}
                <div className="
                    bg-gradient-to-br
                    from-[#3a7a41] to-[#25512b]
                    rounded-3xl
                    border border-[#d5b975]/30
                    shadow-xl
                    overflow-hidden
                ">
                    <div className="p-10">
                        <h3 className="text-3xl font-black text-white mb-10">
                            Transaction History
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-[#d5b975]/20">
                                        {["Receipt ID", "Date", "Amount", "Method", "Status", "Actions"].map((h) => (
                                            <th key={h}
                                                className="pb-6 text-[10px] font-black text-[#d5b975] uppercase tracking-[0.2em] px-4">
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
                                            <td className="py-6 px-4 text-white text-xs font-bold">
                                                #{payment.id}
                                            </td>
                                            <td className="py-6 px-4 text-white/70 text-xs">
                                                {payment.date}
                                            </td>
                                            <td className="py-6 px-4 text-white font-black">
                                                ₹{payment.amount.toLocaleString()}
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

                {/* Analysis Section */}
                <div className="
                    bg-gradient-to-br
                    from-[#3a7a41] to-[#25512b]
                    p-12
                    rounded-3xl
                    border border-[#d5b975]/30
                    shadow-2xl
                ">
                    <h3 className="text-4xl font-black text-white mb-4">
                        Payment Analysis
                    </h3>
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
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="
                                bg-[#0f3d23]
                                w-full max-w-md
                                rounded-3xl
                                border border-[#d5b975]/30
                                shadow-2xl
                                p-8
                                text-white
                            "
                        >
                            <h3 className="text-2xl font-bold mb-6 text-[#d5b975]">
                                Payment Receipt
                            </h3>

                            <p className="mb-2 text-sm">ID: #{selectedPayment.id}</p>
                            <p className="mb-2 text-sm">Method: {selectedPayment.method}</p>
                            <p className="mb-2 text-sm">Date: {selectedPayment.date}</p>

                            <p className="mb-6 text-lg font-black text-[#d5b975]">
                                ₹{selectedPayment.amount.toLocaleString()}
                            </p>

                            <button
                                onClick={() => setSelectedPayment(null)}
                                className="
                                    w-full py-3
                                    bg-[#206c3d]
                                    hover:bg-[#2f7c47]
                                    rounded-xl
                                    font-bold
                                    transition
                                "
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