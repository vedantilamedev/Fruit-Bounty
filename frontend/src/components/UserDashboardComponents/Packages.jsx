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
            className="bg-white p-6 rounded-[1rem] border border-[#E8E4D9] shadow-sm relative overflow-hidden group"
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
            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[1rem] border-2 border-dashed border-[#E8E4D9] shadow-inner text-center animate-fadeIn">
                <div className="bg-[#F7F5EF] p-8 rounded-[1rem] mb-6 shadow-sm">
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
            <div className="bg-white rounded-[1rem] border border-[#E8E4D9] shadow-xl shadow-green-900/5 overflow-hidden">
                <div className="lg:flex">
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
                    <div className="lg:w-2/3 p-10 lg:p-14 bg-[#FBF8F2]/30">
                        <div className="flex flex-col lg:flex-col gap-10">
                            {/* Capabilities */}
                            <div className="flex-1  space-y-6">
                                <h4 className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.2em] mb-6">Plan Benefits</h4>
                                <div className="grid lg:flex  grid-cols-1 gap-4">
                                    <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-[#cfc5aa] shadow-sm">
                                        <div className="w-12 h-12 bg-[#3C7E44]/5 rounded-2xl flex items-center justify-center text-[#3C7E44]">
                                            <Users size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 leading-none">{activePackage.type} Plan</p>
                                            <p className="text-xs text-gray-400 font-medium mt-1">Perfect for {activePackage.peopleCount} People</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-[#cfc5aa] shadow-sm">
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
                                <div className="flex flex-wrap gap-2.5">
                                    {activePackage.fruits.map((fruit, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ x: 5 }}
                                            className="flex items-center gap-3  bg-white/60 rounded-[1rem] border border-white"
                                        >
                                            <span className="text-sm font-bold text-gray-700">{fruit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="mt-12 bottom-44 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
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
                                <button className="px-8 py-3 bg-white border  text-gray-600 rounded-2xl border-[#cfc5aa] text-[10px] font-bold uppercase tracking-widest hover:bg-[#b8b09b] transition-all shadow-sm">Manage Billing</button>
                                <button
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
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-white rounded-full border border-[#E8E4D9] shadow-sm">
                        <Gem size={18} className="text-[#3C7E44]" />
                        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em]">Available Upgrade</span>
                    </div>
                </div>

                <div className="w-full flex justify-center items-center px-4 lg:px-0">
                    <div className="flex  flex-col lg:flex-row gap-8 max-w-6xl w-full">
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
                        ]
                            .filter(tier => tier.id !== activePackage.type.toLowerCase())
                            .map((tier, idx) => (
                                <motion.div
                                    key={tier.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.15 }}
                                    whileHover={{ y: -8 }}
                                    className="relative flex-1 bg-gradient-to-br from-[#745605] via-[#dbc171] to-[#6b4e07] rounded-[1.75rem] border border-[#E8E4D9] p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500  flex-col overflow-hidden"
                                >
                                    <div className='lg:flex'>
                                        <div>
                                    {/* Soft Premium Glow */}
                                    <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${tier.color} opacity-[0.04] rounded-full`} />

                                    {/* Header */}
                                    <div className="mb-8 relative z-10">
                                        <span className="bg-[#3C7E44]/5 text-yellow-400 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] inline-block mb-5">
                                            {tier.tag}
                                        </span>

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-14 h-14 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                                <tier.icon size={26} strokeWidth={1.5} />
                                            </div>
                                            <h5 className="text-3xl font-bold text-gray-900 tracking-tight">
                                                {tier.name}
                                            </h5>
                                        </div>

                                        <p className="text-gray-900 text-sm leading-relaxed max-w-md">
                                            {tier.description}
                                        </p>
                                    </div>

                                    {/* Price Section */}
                                    <div className="mb-8 pb-6 border-b border-[#ECE7DA]">
                                        <div className="flex items-end gap-2">
                                            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                                ₹{tier.price}
                                            </span>
                                            <span className="text-gray-900 text-xs font-bold uppercase tracking-[0.25em] mb-1">
                                                / {isSixMonth ? '6 Months' : 'Month'}
                                            </span>
                                        </div>

                                        {isSixMonth && (
                                            <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mt-2">
                                                Save up to 20% on bi-annual plans
                                            </p>
                                        )}
                                    </div>
                                        </div>

                                    {/* Features */}
                                    <div className="space-y-4 mb-10 mt-8 justify-center items-center flex-1">
                                        {tier.features.map((feature, fIdx) => (
                                            
                                            <div key={fIdx} className="flex items-center p-2 justify-start gap-3">
                                                <div className="w-6 h-6 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                                                    <Check size={14} className="text-[#3C7E44]" strokeWidth={3} />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-700">
                                                    {feature}
                                                </span>
                                                
                                                
                                            </div>
                                                
                                        ))}
                                        
                                    </div>
                                    
                                    </div>


                                    {/* Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => navigate('/subscription')}
                                        className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-[0.25em] shadow-lg transition-all duration-300 flex items-center justify-center gap-2
              ${tier.id === 'corporate'
                                                ? 'bg-gradient-to-r from-[#65510f] via-[#d4cb89] to-[#92730f] text-[#383837] hover:shadow-xl'
                                                : 'bg-white border border-[#E8E4D9] text-[#3C7E44] hover:bg-[#F6F2E8]'
                                            }
            `}
                                    >
                                        Upgrade Now
                                        <ArrowRight size={16} />
                                    </motion.button>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packages;
