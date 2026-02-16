import React from 'react';
import { Package, Users, Calendar, Check, XCircle } from 'lucide-react';

const Packages = ({ activePackage }) => {
    if (!activePackage) {
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[3rem] border-2 border-dashed border-[#E8E4D9] shadow-inner text-center animate-fadeIn">
                <div className="bg-[#F7F5EF] p-8 rounded-[2rem] mb-6 shadow-sm">
                    <Package size={64} className="text-[#B7A261] opacity-40" strokeWidth={1} />
                </div>
                <p className="text-[#2f6131] font-black text-xl italic mb-2 tracking-tight">No Active Harvest Plan!</p>
                <p className="text-[#6B705C] font-medium text-sm max-w-xs mb-8">Unlock the full bounty of freshness with our subscription plans.</p>
                <button className="px-10 py-4 bg-[#3e7b3f] text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#2f6131] transition-all duration-300 shadow-xl shadow-green-900/20">
                    Explore Plans
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-end mb-4 px-2">
                <div>
                    <h2 className="text-2xl font-black text-[#2f6131] tracking-tight italic uppercase">Current Subscription</h2>
                    <p className="text-[#B7A261] font-bold text-[10px] uppercase tracking-widest mt-1">Your personalized harvest ritual</p>
                </div>
                <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${activePackage.status === 'Active' ? 'bg-[#3e7b3f]/10 text-[#3e7b3f] border-[#3e7b3f]/20' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {activePackage.status} System
                </span>
            </div>

            <div className="bg-white rounded-[3.5rem] shadow-sm border border-[#E8E4D9] overflow-hidden group">
                <div className="bg-gradient-to-br from-[#3e7b3f] to-[#2f6131] p-10 lg:p-14 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-3">
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                    <Package className="text-white" size={28} />
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-black italic tracking-tight">{activePackage.name}</h3>
                            </div>
                            <p className="text-white/70 font-bold uppercase tracking-[0.2em] text-xs">Aura of Freshness valid until <span className="text-[#B7A261]">{activePackage.endDate}</span></p>
                        </div>
                        <div className="bg-black/10 backdrop-blur-md px-8 py-4 rounded-[2rem] border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Harvest Frequency</p>
                            <p className="text-xl font-black italic">{activePackage.frequency}</p>
                        </div>
                    </div>
                </div>

                <div className="p-10 lg:p-14 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 bg-[#FBF8F2]/30">
                    <div className="space-y-6">
                        <div className="flex items-center gap-5 p-6 bg-white rounded-[2.5rem] border border-[#E8E4D9]/50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-[#3e7b3f]/10 p-4 rounded-2xl">
                                <Users className="text-[#3e7b3f]" size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-[#B7A261] uppercase tracking-widest mb-1 italic">Tribe Capacity</p>
                                <p className="text-lg font-black text-[#2f6131] italic">{activePackage.type} <span className="text-[#B7A261] font-bold text-sm">({activePackage.peopleCount} Senses)</span></p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 p-6 bg-white rounded-[2.5rem] border border-[#E8E4D9]/50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-[#b7a261]/10 p-4 rounded-2xl">
                                <Calendar className="text-[#b7a261]" size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-[#B7A261] uppercase tracking-widest mb-1 italic">Ritual Duration</p>
                                <p className="text-lg font-black text-[#2f6131] italic">{activePackage.duration} <span className="text-[#B7A261] font-bold text-sm">Cycle</span></p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[#2f6131] font-black text-xl italic mb-6 flex items-center gap-3">
                            Included Bounty
                            <span className="bg-[#B7A261] text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">
                                {activePackage.fruits.length} Fruits
                            </span>
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {activePackage.fruits.map((fruit, idx) => (
                                <li key={idx} className="flex items-center text-[#6B705C] font-bold bg-white p-4 rounded-2xl shadow-sm border border-[#E8E4D9]/30">
                                    <span className="w-6 h-6 rounded-full bg-[#3e7b3f] text-white flex items-center justify-center mr-3 shadow-lg shadow-green-900/10">
                                        <Check size={14} strokeWidth={4} />
                                    </span>
                                    {fruit}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="px-10 py-8 bg-[#F7F5EF] border-t border-[#E8E4D9] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#B7A261] uppercase tracking-widest italic leading-none">Next Harvest Renewal:</span>
                        <span className="font-black text-[#2f6131] italic">{activePackage.renewalDate}</span>
                    </div>
                    <button className="text-[#A44A3F] hover:bg-[#A44A3F]/5 border border-transparent hover:border-[#A44A3F]/20 px-6 py-2 rounded-full transition-all font-black text-[10px] uppercase tracking-widest">Terminate Ritual</button>
                </div>
            </div>
        </div>
    );
};

export default Packages;
