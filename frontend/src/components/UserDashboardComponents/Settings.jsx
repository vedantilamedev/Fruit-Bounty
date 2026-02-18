import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Bell, Lock, Shield, Save, ChevronRight,
    Mail, Phone, Moon, Smartphone, Globe,
    CreditCard, Fingerprint, Zap, Gem, Compass,
    Camera, RefreshCw, Trash2, ShieldCheck,
    MessageSquare, AlertCircle
} from 'lucide-react';

const Settings = ({ userData }) => {
    const [activeSection, setActiveSection] = useState('profile');
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        whatsapp: true,
        marketing: false
    });

    const sections = [
        { id: 'profile', label: 'Identity Protocol', icon: User, description: 'Manage your personal ritual & public identity' },
        { id: 'notifications', label: 'Pulse Frequency', icon: Bell, description: 'Configure high-frequency alert channels' },
        { id: 'security', label: 'Fortress Ritual', icon: Lock, description: 'Update biometric & access authentication' },
        { id: 'privacy', label: 'Invisible Shield', icon: Shield, description: 'Data stewardship & tracking preferences' },
    ];

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };

    const InputField = ({ label, icon: Icon, type = "text", defaultValue, readOnly, placeholder }) => (
        <motion.div variants={containerVariants} className="space-y-2.5">
            <label className="text-[10px] font-black text-[#B7A261] uppercase tracking-[0.2em] ml-1">{label}</label>
            <div className="relative group">
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300 ${readOnly ? 'bg-gray-200' : 'bg-[#3C7E44] scale-y-0 group-focus-within:scale-y-100'}`} />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3C7E44] transition-colors">
                    <Icon size={18} strokeWidth={2} />
                </div>
                <input
                    type={type}
                    defaultValue={defaultValue}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    className={`w-full pl-12 pr-4 py-4 bg-white border border-[#E8E4D9] rounded-[1.5rem] focus:outline-none focus:border-[#3C7E44]/30 focus:ring-4 focus:ring-[#3C7E44]/5 text-gray-900 font-bold text-sm transition-all placeholder:text-gray-300
                        ${readOnly ? 'bg-gray-50/50 cursor-not-allowed text-gray-500' : 'hover:border-[#3C7E44]/20'}
                    `}
                />
            </div>
        </motion.div>
    );

    const Toggle = ({ active, onClick, label, desc }) => (
        <motion.div
            variants={containerVariants}
            className="flex items-center justify-between p-6 bg-white border border-[#E8E4D9] rounded-[2rem] hover:shadow-xl hover:shadow-green-900/5 transition-all group"
        >
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${active ? 'bg-[#3C7E44]/10 text-[#3C7E44]' : 'bg-gray-50 text-gray-400'}`}>
                    <Zap size={20} strokeWidth={active ? 2.5 : 1.5} />
                </div>
                <div>
                    <h5 className="font-bold text-gray-900 text-sm tracking-tight">{label}</h5>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{desc}</p>
                </div>
            </div>
            <button
                onClick={onClick}
                className={`w-14 h-8 rounded-full transition-all duration-500 p-1 relative ${active ? 'bg-[#3C7E44] shadow-lg shadow-green-900/20' : 'bg-gray-200'}`}
            >
                <motion.div
                    animate={{ x: active ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                >
                    {active && <div className="w-1 h-1 bg-[#3C7E44] rounded-full animate-ping" />}
                </motion.div>
            </button>
        </motion.div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                        <div className="flex items-center gap-8 mb-10 p-6 bg-[#FBF8F2] rounded-[2.5rem] border border-[#E8E4D9]">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#1a472a] to-[#2d5a3f] p-1 shadow-2xl overflow-hidden">
                                    <div className="w-full h-full bg-white rounded-[1.8rem] flex items-center justify-center relative overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`} alt="avatar" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm">
                                            <Camera size={24} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-xl shadow-lg border border-[#E8E4D9] flex items-center justify-center text-[#3C7E44]">
                                    <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-gray-900 tracking-tight">{userData.name}</h4>
                                <p className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.3em] mt-1">Foundational Citizen</p>
                                <div className="flex items-center gap-2 mt-3">
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded-lg border border-emerald-100">VERIFIED IDENTITY</span>
                                    <span className="px-3 py-1 bg-[#3C7E44] text-white text-[9px] font-bold rounded-lg uppercase tracking-wider shadow-lg shadow-green-900/10 cursor-pointer">Upgrade Plan</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Ritual Moniker" icon={User} defaultValue={userData.name} />
                            <InputField label="Digital Hub (Email)" icon={Mail} defaultValue={userData.email} readOnly />
                            <InputField label="Sub-atomic Frequency" icon={Phone} defaultValue={userData.phone} readOnly />
                            <InputField label="Primary Locality" icon={Globe} defaultValue="Bengaluru, IND" />
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={18} className="text-emerald-500" />
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">Identity Data is securely encrypted</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-[#3C7E44] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-green-900/20 flex items-center gap-3"
                            >
                                <Save size={18} /> Update Protocol
                            </motion.button>
                        </div>
                    </motion.div>
                );
            case 'notifications':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                        <div className="p-8 bg-gradient-to-br from-[#3C7E44] to-[#2d5a3f] rounded-[3rem] text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <h4 className="text-2xl font-black tracking-tight mb-2">Pulse Orchestration</h4>
                                    <p className="text-white/60 text-sm font-medium max-w-sm">Every pulse we send is curated and calibrated for minimal digital entropy.</p>
                                </div>
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center">
                                    <Zap size={32} className="text-[#B7A261]" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Toggle
                                active={notifications.email}
                                onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                                label="Digital Letter (Email)"
                                desc="Official Ritual Summaries"
                            />
                            <Toggle
                                active={notifications.whatsapp}
                                onClick={() => setNotifications({ ...notifications, whatsapp: !notifications.whatsapp })}
                                label="Messenger Nexus (WA)"
                                desc="Direct Orchard Alerts"
                            />
                            <Toggle
                                active={notifications.sms}
                                onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                                label="Atomic Signal (SMS)"
                                desc="Urgent Logistics Pulse"
                            />
                            <Toggle
                                active={notifications.marketing}
                                onClick={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                                label="Exotic Offerings"
                                desc="Rare Harvest Discoveries"
                            />
                        </div>
                    </motion.div>
                );
            case 'security':
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                <InputField label="Current Cipher" icon={Lock} type="password" placeholder="••••••••" />
                                <InputField label="Future Cipher" icon={RefreshCw} type="password" placeholder="••••••••" />
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    className="w-full py-5 bg-white border border-[#3C7E44] text-[#3C7E44] rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-green-900/5 flex items-center justify-center gap-3"
                                >
                                    <RefreshCw size={18} /> Re-calibrate Password
                                </motion.button>
                            </div>
                            <div className="bg-[#FBF8F2] border border-[#E8E4D9] rounded-[3rem] p-8 flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 bg-[#3C7E44] text-white rounded-xl flex items-center justify-center mb-6 shadow-xl shadow-green-900/10">
                                        <Fingerprint size={24} />
                                    </div>
                                    <h5 className="text-xl font-black text-gray-900 tracking-tight mb-2">Biometric Ritual</h5>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8">Secure your treasury with biometric frequency mapping. Available on mobile nexus devices.</p>
                                </div>
                                <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-black transition-colors">
                                    Initialize Mapping <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 bg-rose-50 border border-rose-100 rounded-[3rem] flex items-center justify-between group">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-500 border border-rose-100 shadow-xl shadow-rose-900/5 group-hover:scale-110 transition-transform">
                                    <Trash2 size={28} />
                                </div>
                                <div>
                                    <h5 className="text-xl font-black text-rose-900 tracking-tight">Identity Termination</h5>
                                    <p className="text-rose-600/60 text-xs font-semibold uppercase tracking-widest mt-1">This action is irreversible</p>
                                </div>
                            </div>
                            <button className="px-8 py-4 bg-white border border-rose-200 text-rose-500 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-900/5">
                                Dissolve Citizenship
                            </button>
                        </div>
                    </motion.div>
                );
            default:
                return (
                    <div className="py-20 text-center space-y-4">
                        <div className="inline-flex p-6 bg-gray-50 rounded-full border border-dashed border-gray-200">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <Compass size={40} className="text-gray-300" />
                            </motion.div>
                        </div>
                        <div>
                            <p className="text-gray-900 font-black text-xl tracking-tight">Ritual Coming Soon</p>
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">Our architects are calibrating this sector</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-10 animate-fadeIn min-h-[700px]">
            {/* Professional Sidebar Navigation */}
            <div className="lg:w-1/3 xl:w-1/4 space-y-4">
                <div className="mb-8 px-4">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter">System Rituals</h3>
                    <p className="text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.4em] mt-1">Personal Configuration Atlas</p>
                </div>

                <div className="space-y-2">
                    {sections.map((section) => (
                        <motion.button
                            key={section.id}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left p-6 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden ${activeSection === section.id
                                ? 'bg-white border-[#3C7E44] shadow-2xl shadow-green-900/10'
                                : 'bg-transparent border-transparent hover:bg-white hover:border-[#E8E4D9]'
                                }`}
                        >
                            {activeSection === section.id && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#3C7E44] rounded-r-full"
                                />
                            )}

                            <div className="flex items-start gap-5">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${activeSection === section.id
                                    ? 'bg-[#3C7E44] text-white shadow-lg shadow-green-900/20 rotate-6'
                                    : 'bg-white text-gray-400 group-hover:text-[#3C7E44]'
                                    }`}>
                                    <section.icon size={20} strokeWidth={activeSection === section.id ? 2.5 : 1.5} />
                                </div>
                                <div className="flex-1">
                                    <h4 className={`text-sm font-black transition-colors tracking-tight ${activeSection === section.id ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'
                                        }`}>
                                        {section.label}
                                    </h4>
                                    <p className={`text-[10px] font-medium leading-relaxed mt-1 transition-colors ${activeSection === section.id ? 'text-gray-400' : 'text-gray-300'
                                        }`}>
                                        {section.description}
                                    </p>
                                </div>
                                <ChevronRight
                                    size={16}
                                    className={`mt-1 transition-all duration-500 ${activeSection === section.id ? 'text-[#3C7E44] translate-x-0 opacity-100' : 'text-gray-200 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                                        }`}
                                />
                            </div>
                        </motion.button>
                    ))}
                </div>

                <div className="mt-10 p-8 bg-[#1a472a] rounded-[3rem] text-white relative overflow-hidden group shadow-2xl shadow-green-900/20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                    <div className="relative z-10">
                        <Gem size={24} className="text-[#B7A261] mb-4" />
                        <h5 className="font-black tracking-tight mb-2">Vault Support</h5>
                        <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest leading-loose">Need architectural assistance? Our stewards are ready.</p>
                        <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 transition-all">
                            Initialize Signal
                        </button>
                    </div>
                </div>
            </div>

            {/* Architectural Content Area */}
            <div className="flex-1">
                <motion.div
                    layout
                    className="bg-white rounded-[4rem] border border-[#E8E4D9] p-10 lg:p-14 shadow-2xl shadow-green-900/5 relative overflow-hidden"
                >
                    {/* Ghost Icon Overlay */}
                    <div className="absolute -top-12 -right-12 opacity-[0.02] text-gray-900 group-hover:rotate-12 transition-transform duration-1000">
                        {React.createElement(sections.find(s => s.id === activeSection)?.icon || User, { size: 400 })}
                    </div>

                    <div className="relative z-10">
                        <header className="mb-12 flex items-center justify-between border-b border-gray-50 pb-8">
                            <div>
                                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
                                    {sections.find(s => s.id === activeSection)?.label}
                                </h2>
                                <p className="text-[11px] font-bold text-[#B7A261] uppercase tracking-[0.4em] mt-1">Calibrating System Identity</p>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Synchronized
                            </div>
                        </header>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Status Footer */}
                <div className="mt-8 flex items-center justify-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1a472a]" />
                        <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest italic">Encrypted Connection</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B7A261]" />
                        <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest italic">Global Node: 1A-4G</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
