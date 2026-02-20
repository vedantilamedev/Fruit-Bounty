import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Package, Users, User, Calendar, Check, XCircle,
    Zap, Award, ArrowUpCircle, Star, Sparkles,
    ChevronRight, ArrowRight, ShieldCheck,
    Clock, RefreshCcw, TrendingUp, Gem
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Packages = ({ activePackage }) => {
    const navigate = useNavigate();
    const [isSixMonth, setIsSixMonth] = useState(false);
    const [isCompareOpen, setIsCompareOpen] = useState(false);



    const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2.5rem] border border-[#E8E4D9] shadow-sm relative overflow-hidden group"
        >
            <div className={`absolute -top-4 -right-4 w-24 h-24 ${color} opacity-[0.03] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.2em] mb-2">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
                    {subtitle && <p className="text-[10px] mt-2 text-gray-400 font-bold uppercase tracking-widest">{subtitle}</p>}
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
            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[3rem] border-2 border-dashed border-[#E8E4D9] shadow-inner text-center animate-fadeIn">
                <div className="bg-[#F7F5EF] p-8 rounded-[2rem] mb-6 shadow-sm">
                    <Package size={64} className="text-[#B7A261] opacity-40" strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">No Active Harvest Plan</h3>
                <p className="text-gray-500 text-sm max-w-xs mb-8">Reconnect with fresh fruit by choosing a subscription plan.</p>
                <button className="px-12 py-4 bg-[#3C7E44] text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#2f6131] transition-all duration-300 shadow-2xl shadow-green-900/20">
                    Explore Plans
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-fadeIn pb-16">
            {/* Executive Status Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <StatCard
                    title="Active Plan"
                    value={activePackage.name}
                    icon={Award}
                    color="bg-[#3C7E44]"
                    subtitle={`Valid until ${activePackage.endDate}`}
                />
                <StatCard
                    title="Next Delivery"
                    value={activePackage.renewalDate}
                    icon={RefreshCcw}
                    color="bg-[#B7A261]"
                    subtitle="Automatic Renewal"
                />
            </div>

            {/* Main Interactive Plan Board */}
            <div className="bg-white rounded-[3.5rem] border border-[#E8E4D9] shadow-xl shadow-green-900/5 overflow-hidden">
                <div className="lg:flex">
                    {/* Visual Plan Hero */}
                    <div className="lg:w-1/3 bg-gradient-to-br from-[#3C7E44] to-[#1a472a] p-10 lg:p-14 text-white relative">
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
                    <div className="lg:w-2/3 p-10 lg:p-14 bg-[#FBF8F2]/30">
                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* Capabilities */}
                            <div className="flex-1 space-y-6">
                                <h4 className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.2em] mb-6">Plan Benefits</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                        <div className="w-12 h-12 bg-[#3C7E44]/5 rounded-2xl flex items-center justify-center text-[#3C7E44]">
                                            <Users size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 leading-none">{activePackage.type} Plan</p>
                                            <p className="text-xs text-gray-400 font-medium mt-1">Perfect for {activePackage.peopleCount} People</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#B7A261]">
                                            <ShieldCheck size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 leading-none">Quality Guarantee</p>
                                            <p className="text-xs text-gray-400 font-medium mt-1">Freshness & Safety Guaranteed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Box Contents */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.2em]">Box Contents</h4>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{activePackage.fruits.length} Items</span>
                                </div>
                                <div className="grid grid-cols-1 gap-2.5">
                                    {activePackage.fruits.map((fruit, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ x: 5 }}
                                            className="flex items-center gap-3 p-4 bg-white/60 rounded-[1.25rem] border border-white"
                                        >
                                            <Check size={14} className="text-[#3C7E44]" strokeWidth={3} />
                                            <span className="text-sm font-bold text-gray-700">{fruit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
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
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shared within your tribe</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-8 py-3 bg-white border border-[#E8E4D9] text-gray-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-sm">Manage Billing</button>
                                <button className="text-[#A44A3F] font-bold text-[10px] uppercase tracking-widest px-4 hover:underline">Exit Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Professional Upgrade Path */}
            <div className="pt-20">
                <div className="flex flex-col items-center mb-8">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-white rounded-full border border-[#E8E4D9] shadow-sm">
                        <Gem size={18} className="text-[#3C7E44]" />
                        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em]">Available Upgrade</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-10 max-w-2xl mx-auto px-4 lg:px-0">
                    {[
                        {
                            id: 'individual',
                            name: "Personal Plan",
                            price: isSixMonth ? 2499 : 499,
                            description: "Tailored for solo health enthusiasts. Enjoy a personalized selection of nature's best daily.",
                            features: ["Fresh and Handpicked Fruits", "Custom Fruit Bowl Designs", "Guaranteed Next-Day Delivery", "Personal Wellness Dashboard"],
                            color: "from-[#3C7E44] to-[#2d5a3f]",
                            tag: "INDIVIDUAL",
                            icon: User
                        },
                        {
                            id: 'corporate',
                            name: "Corporate Plan",
                            price: isSixMonth ? 7999 : 1499,
                            description: "Fuel your team with premium fruit arrangements. Perfect for meetings and office wellness.",
                            features: ["Bulk Team Arrangements", "Meeting-Ready Displays", "Priority Support", "Custom Branding Options"],
                            color: "from-[#B7A261] to-[#8c7a42]",
                            tag: "TEAM BOUNTY",
                            icon: Users
                        }
                    ].filter(tier => tier.id !== activePackage.type.toLowerCase()).map((tier, idx) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[3rem] border border-[#E8E4D9] p-10 lg:p-14 shadow-xl shadow-green-900/5 flex flex-col items-stretch relative overflow-hidden group/plan"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tier.color} opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover/plan:scale-150 transition-transform duration-700`} />

                            <div className="mb-8">
                                <span className="bg-[#3C7E44]/5 text-[#3C7E44] px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest mb-6 inline-block">
                                    {tier.tag}
                                </span>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                        <tier.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h5 className="text-3xl font-bold text-gray-900 tracking-tight">{tier.name}</h5>
                                </div>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed">{tier.description}</p>
                            </div>

                            <div className="mb-10 pb-8 border-b border-gray-100">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-gray-900 tracking-tighter">₹{tier.price}</span>
                                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] ml-2">/ {isSixMonth ? '6 Months' : 'Month'}</span>
                                </div>
                                {isSixMonth && <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mt-2">Save up to 20% on bi-annual plans</p>}
                            </div>

                            <div className="space-y-4 mb-12 flex-1">
                                {tier.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-4">
                                        <div className="w-6 h-6 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-[#3C7E44]" strokeWidth={4} />
                                        </div>
                                        <span className="text-sm font-bold text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/subscription')} // Added onClick handler
                                className={`w-full py-6 rounded-[2rem] font-bold text-xs uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 group/btn
                                    ${tier.id === 'corporate'
                                        ? 'bg-[#3C7E44] text-white shadow-green-900/20 hover:bg-[#2f6131]'
                                        : 'bg-white border border-[#E8E4D9] text-[#3C7E44] hover:bg-[#FBF8F2]'
                                    }`}
                            >
                                Activate Plan <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Packages;
