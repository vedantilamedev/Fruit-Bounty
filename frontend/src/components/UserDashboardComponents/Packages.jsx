import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Package, Users, User, Calendar, Check, XCircle,
    Zap, Award, ArrowUpCircle, Star, Sparkles,
    ChevronRight, ArrowRight, ShieldCheck,
    Clock, RefreshCcw, TrendingUp, Gem, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const Packages = ({ activePackage, onCancelSubscription, onTabChange }) => {
    const navigate = useNavigate();
    const [isSixMonth, setIsSixMonth] = useState(false);
    const [isCompareOpen, setIsCompareOpen] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    const handleCancelSubscription = async () => {
        if (!onCancelSubscription) {
            setShowCancelConfirm(true);
            return;
        }
        setIsCancelling(true);
        try {
            console.log("Calling onCancelSubscription...");
            await onCancelSubscription();
            console.log("Cancellation successful!");
            toast.success("Subscription cancelled successfully");
        } catch (error) {
            console.error("Cancel error:", error);
            toast.error("Failed to cancel subscription: " + (error.message || "Unknown error"));
        } finally {
            setIsCancelling(false);
            setShowCancelConfirm(false);
        }
    };

    const handleManageBilling = () => {
        if (onTabChange) {
            onTabChange('payments');
        } else {
            navigate('/dashboard?tab=payments');
        }
    };

    const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="
bg-gradient-to-br from-[#3a7a41] to-[#25512b]
p-6
rounded-2xl
border border-[#d5b975]/30
shadow-[0_25px_70px_rgba(0,0,0,0.45)]
relative overflow-hidden group
transition-all duration-300
"    >
            <div className={`absolute -top-4 -right-4 w-24 h-24 ${color} opacity-[0.03] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.2em] mb-2">{title}</p>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
                    {subtitle && <p className="text-[10px] mt-2 text-white/60 font-bold uppercase tracking-widest">{subtitle}</p>}
                </div>
                <div className={`w-12 h-12 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center text-white overflow-hidden relative shadow-inner`}>
                    <div className={`absolute inset-0 ${color} opacity-20`} />
                    <Icon size={22} className={color.replace('bg-', 'text-')} strokeWidth={1.5} />
                </div>
            </div>
        </motion.div>
    );

    if (!activePackage) {
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[1rem] border-2 border-dashed border-[#E8E4D9] shadow-inner text-center animate-fadeIn">
                <div className="bg-[#F7F5EF] p-8 rounded-[1rem] mb-6 shadow-sm">
                    <Package size={64} className="text-[#B7A261] opacity-40" strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">No Active Harvest Plan</h3>
                <p className="text-white text-sm max-w-xs mb-8">Reconnect with fresh fruit by choosing a subscription plan.</p>
                <button onClick={() => { navigate("/subscription") }} className="px-12 py-4 bg-[#3C7E44] text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#2f6131] transition-all duration-300 shadow-2xl shadow-green-900/20">
                    Explore Plans
                </button>
            </div>
        );
    }

    return (
        <>
        <div className="space-y-10 animate-fadeIn pb-16">
            {/* Executive Status Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <StatCard
                    title="Active Plan"
                    value={activePackage.name}
                    icon={Award}
                    color="bg-[#B7A261]"
                    subtitle={`Valid until ${activePackage.endDate}`}
                />
                <StatCard
                    title="Next Delivery"
                    value={activePackage.renewalDate}
                    icon={RefreshCcw}
                    color="bg-[#000]"
                    subtitle="Automatic Renewal"
                />
            </div>

            {/* Main Interactive Plan Board */}
            <div className="
bg-gradient-to-br 
from-[#3a7a41] to-[#25512b]
rounded-2xl
border border-[#d5b975]/40
shadow-[0_25px_70px_rgba(0,0,0,0.35)]
overflow-hidden
">                <div className="lg:flex">
                    {/* Visual Plan Hero */}
                    <div className="lg:w-1/3 bg-gradient-to-br from-[#0a4402] via-green-600 to-[#044304] p-10 lg:p-14 text-white relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-[0.2em] mb-8 border border-white/10">
                                    <Sparkles size={12} className="text-[#B7A261]" /> Current Subscription
                                </span>
                                <h3 className="text-4xl font-bold tracking-tighter leading-tight mb-4">{activePackage.name}</h3>
                                <p className="text-white/60 text-sm font-medium leading-relaxed">You are currently experiencing our premium harvest curation at the highest standards.</p>
                            </div>

                            <div className="mt-12 space-y-6">
                                <div className="p-5 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm">
                                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 mb-2">Delivery Schedule</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold">{activePackage.frequency}</span>
                                        <Zap size={20} className="text-[#B7A261]" />
                                    </div>
                                </div>
                                <div className="p-5 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm">
                                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 mb-2">Renewal Period</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold">{activePackage.duration}</span>
                                        <Clock size={20} className="text-[#B7A261]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Ecosystem Content */}
                    <div className="lg:w-2/3 p-10 lg:p-14 bg-transparent">
                        <div className="flex flex-col lg:flex-col gap-10">
                            {/* Capabilities */}
                            <div className="flex-1  space-y-6">
                                <h4 className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.2em] mb-6">Plan Benefits</h4>
                                <div className="grid lg:flex  grid-cols-1 gap-4">
                                    <div className="flex items-center gap-5 p-6 bg-white/5
backdrop-blur-md
rounded-2xl
border border-[#d5b975]/30">
                                        <div className="w-12 h-12 bg-[#09380f] rounded-2xl flex items-center justify-center text-[#f3f3f3]">
                                            <Users size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white leading-none">{activePackage.type} Plan</p>
                                            <p className="text-xs text-white/60 font-medium mt-1">Perfect for {activePackage.peopleCount} People</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5 p-6 bg-white/5
backdrop-blur-md
rounded-2xl
border border-[#d5b975]/30">
                                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#B7A261]">
                                            <ShieldCheck size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white leading-none">Quality Guarantee</p>
                                            <p className="text-xs text-white/60 font-medium mt-1">Freshness & Safety Guaranteed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Box Contents */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.2em]">Box Contents</h4>
                                    <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">{(activePackage?.fruits || []).length} Items</span>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {activePackage.fruits.map((fruit, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ x: 5 }}
                                            className="flex items-center gap-3  bg-white/5
rounded-xl
border border-[#d5b975]/30
backdrop-blur-sm
px-4 py-2"
                                        >
                                            <span className="text-sm font-bold text-white">{fruit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="mt-12 bottom-44 pt-8 border-t border-[#d5b975]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                            <div className="w-full h-full bg-[#3C7E44]/10 flex items-center justify-center">
                                                <Users size={12} className="text-[#3C7E44]" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Shared within your tribe</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={handleManageBilling}
                                    className="px-8 py-3 border border-[#d5b975]/40
text-white
bg-transparent
hover:bg-[#d5b975]/10   rounded-2xl border-[#cfc5aa] text-[10px] font-bold uppercase tracking-widest hover:bg-[#b8b09b] transition-all shadow-sm">Manage Billing</button>
                                <button
                                    onClick={() => setShowCancelConfirm(true)}
                                    className="px-5 py-2.5 rounded-[0.8rem]  bg-red-50 text-red-600 border border-red-200 font-semibold text-xs uppercase tracking-widest  hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-95 transition-all duration-300"
                                >
                                    Exit Plan
                                </button>                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Professional Upgrade Path */}
            <div className="pt-20">
                <div className="flex flex-col items-center mb-8">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#182118] rounded-full border border-[#E8E4D9] shadow-sm">
                        <Gem size={18} className="text-[#3C7E44]" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Available Upgrade</span>
                    </div>
                </div>

                <div className="w-full flex justify-center items-center px-4 lg:px-0">
                    <div className="flex flex-col  max-w-10xl w-full">

                        {[
                            {
                                id: 'individual',
                                name: "Personal Plan",
                                price: isSixMonth ? 2499 : 499,
                                description:
                                    "Tailored for solo health enthusiasts. Enjoy a personalized selection of nature's best daily.",
                                features: [
                                    "Fresh and Handpicked Fruits",
                                    "Custom Fruit Bowl Designs",
                                    "Guaranteed Next-Day Delivery",
                                    "Personal Wellness Dashboard"
                                ],
                                color: "from-emerald-300 to-emerald-100",
                                tag: "INDIVIDUAL",
                                icon: User
                            },
                            {
                                id: 'corporate',
                                name: "Corporate Plan",
                                price: isSixMonth ? 7999 : 1499,
                                description:
                                    "Fuel your team with premium fruit arrangements. Perfect for meetings and office wellness.",
                                features: [
                                    "Bulk Team Arrangements",
                                    "Meeting-Ready Displays",
                                    "Priority Support",
                                    "Custom Branding Options"
                                ],
                                color: "from-[#a07b29] via-[#cbb46b] to-[#a07b29]",
                                tag: "TEAM BOUNTY",
                                icon: Users
                            }
                        ]
                            .filter(tier => tier.id !== (activePackage?.type || '').toLowerCase())
                            .map((tier, idx) => (
                                <motion.div
                                    key={tier.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.15 }}
                                    className="flex flex-col lg:flex-row rounded-3xl overflow-hidden border  border-[#c6a84b]/30 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
                                >
                                    {/* LEFT PANEL */}
                                    <div className={`lg:w-1/2 bg-gradient-to-br ${tier.color} p-10 text-white flex flex-col justify-between`}>

                                        <div>
                                            <span className="text-xs tracking-[0.4em] font-semibold opacity-80 uppercase">
                                                Current Subscription
                                            </span>

                                            <h3 className="text-4xl font-bold mt-6 mb-4">
                                                {isSixMonth ? "6 Month" : "1 Month"} {tier.name}
                                            </h3>

                                            <p className="text-sm opacity-90 leading-relaxed max-w-md">
                                                {tier.description}
                                            </p>
                                        </div>

                                        <div className="mt-10">
                                            <div className="flex items-end gap-3">
                                                <span className="text-5xl font-extrabold">
                                                    ₹{tier.price}
                                                </span>
                                                <span className="text-xs uppercase tracking-[0.35em] mb-2">
                                                    / {isSixMonth ? "6 Months" : "Month"}
                                                </span>
                                            </div>

                                            {isSixMonth && (
                                                <p className="text-xs font-bold uppercase mt-2 opacity-80">
                                                    Save up to 20%
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* RIGHT PANEL */}
                                    <div className="lg:w-full bg-[#363518] p-10 flex flex-col justify-between text-white">

                                        {/* PLAN BENEFITS */}
                                        <div>
                                            <h4 className="text-sm tracking-[0.3em] uppercase text-[#c6a84b] mb-6">
                                                Plan Benefits
                                            </h4>

                                            <div className="grid grid-cols-1 gap-4">
                                                {tier.features.map((feature, fIdx) => (
                                                    <div
                                                        key={fIdx}
                                                        className="flex items-center gap-4 bg-[#545533] rounded-xl px-5 py-4 border border-[#c6a84b]/20"
                                                    >
                                                        <div className="w-8 h-8 bg-[#c6a84b]/20 rounded-lg flex items-center justify-center border border-[#c6a84b]/40">
                                                            <Check size={16} className="text-[#c6a84b]" strokeWidth={3} />
                                                        </div>
                                                        <span className="text-sm font-medium text-[#e4efe8]">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* BUTTON */}
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => navigate('/subscription')}
                                            className={`mt-10 w-full py-4 rounded-full font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2
              ${tier.id === "corporate"
                                                    ? "bg-gradient-to-r from-[#65510f] via-[#d4cb89] to-[#92730f] text-[#383837]"
                                                    : "bg-[#2c6e3f] text-white hover:bg-[#2f7c47]"
                                                }`}
                                        >
                                            Upgrade Now
                                            <ArrowRight size={16} />
                                        </motion.button>

                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Cancel Confirmation Modal */}
        <AnimatePresence>
            {showCancelConfirm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setShowCancelConfirm(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertTriangle size={32} className="text-red-600" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                            Cancel Subscription?
                        </h3>
                        <p className="text-gray-600 text-center mb-6">
                            Are you sure you want to cancel your {activePackage?.name}? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelConfirm(false)}
                                className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors"
                            >
                                Keep Plan
                            </button>
                            <button
                                onClick={handleCancelSubscription}
                                disabled={isCancelling}
                                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-full font-bold text-sm uppercase tracking-wider hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </>);
};

export default Packages;
