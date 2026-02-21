
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, ChevronRight, Calendar as CalendarIcon,
    Leaf, Truck, Info, MapPin, Clock, ArrowRight, X,
    ShoppingBag, ShoppingCart, Filter, Sparkles,
    Zap, Gem, CheckCircle, Navigation, Package
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const HarvestCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));
    const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 17));
    const [filter, setFilter] = useState('all'); // all, harvest, delivery
    const navigate = useNavigate();

    const harvestEvents = {
        '2026-02-05': { type: 'harvest', title: 'Orchard Harvest', icon: '🍎', items: ['Apples', 'Pears', 'Guava'], desc: 'Fresh picking from the northern groves.', locality: 'North Orchard' },
        '2026-02-10': { type: 'harvest', title: 'Tropical Harvest', icon: '🥭', items: ['Mangoes', 'Pineapples', 'Papaya'], desc: 'Limited edition high-shelf selection.', locality: 'South Greenhouse' },
        '2026-02-13': { type: 'delivery', title: 'Order Arrived', items: ['Fresh Citrus Bowl'], status: 'Completed', time: '10:00 AM' },
        '2026-02-15': { type: 'delivery', title: 'Order Arrived', items: ['Exotic Tropical Salad'], status: 'Completed', time: '2:30 PM' },
        '2026-02-17': { type: 'delivery', title: 'Expected Delivery', items: ['Premium Mixed Fruit Bowl'], status: 'Pending', time: '09:00 - 12:00' },
        '2026-02-20': { type: 'harvest', title: 'Citrus Harvest', icon: '🍊', items: ['Oranges', 'Kiwis', 'Lemon'], desc: 'Vitamin C focused harvest day.', locality: 'Coastal Groves' },
        '2026-02-25': { type: 'harvest', title: 'Berry Harvest', icon: '🍓', items: ['Strawberries', 'Blueberries'], desc: 'Premium berry collection from organic farms.', locality: 'Hillside Farm' },
    };

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const [isGuideOpen, setIsGuideOpen] = useState(false);

    const seasonalData = [
        { quarter: 'Spring', months: 'Mar - May', fruits: ['Mangoes', 'Strawberries', 'Kiwis'], color: 'text-pink-500', bg: 'bg-pink-50' },
        { quarter: 'Summer', months: 'Jun - Aug', fruits: ['Lychees', 'Watermelons', 'Peaches'], color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { quarter: 'Autumn', months: 'Sep - Nov', fruits: ['Apples', 'Guavas', 'Pomegranates'], color: 'text-amber-600', bg: 'bg-amber-50' },
        { quarter: 'Winter', months: 'Dec - Feb', fruits: ['Oranges', 'Grapes', 'Custard Apples'], color: 'text-blue-500', bg: 'bg-blue-50' },
    ];

    const renderHeader = () => (
        <div className="space-y-5 mb-10 px-2">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">Harvest Calendar</h2>
                    <p className="text-sm text-gray-500 font-medium">Track orchard harvests and your deliveries in one place.</p>
                </div>
                <button
                    onClick={() => setIsGuideOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8E4D9] text-xs font-bold text-[#3C7E44] hover:border-[#3C7E44]/40 transition-all"
                >
                    <CalendarIcon size={14} /> Seasonal Guide
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6">
                {/* Filter Group - Left */}
                <div className="flex justify-start">
                <div className="flex items-center gap-2 bg-[#FBF8F2] p-1.5 rounded-2xl border border-[#E8E4D9]">
                    {['all', 'harvest', 'delivery'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-5 py-2.5 rounded-xl text-[11px] font-extrabold capitalize transition-all duration-300 ${filter === type
                                ? 'bg-white text-[#3C7E44] shadow-sm ring-1 ring-[#3C7E44]/10'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-white/60'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                </div>

                {/* Month Navigation - Center */}
                <div className="flex justify-center">
                <div className="flex items-center gap-1 bg-white p-1 rounded-[1.5rem] border border-[#E8E4D9] shadow-sm">
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#FBF8F2' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevMonth}
                        className="p-3 text-gray-400 hover:text-[#3C7E44] transition-colors rounded-[1rem]"
                    >
                        <ChevronLeft size={18} />
                    </motion.button>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 min-w-[160px] text-center">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#FBF8F2' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextMonth}
                        className="p-3 text-gray-400 hover:text-[#3C7E44] transition-colors rounded-[1rem]"
                    >
                        <ChevronRight size={18} />
                    </motion.button>
                </div>
                </div>

                {/* Quick Action Button - Right */}
                <div className="flex justify-end">
                <motion.button
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/customize')}
                    className="px-7 py-3.5 bg-gradient-to-r from-[#3C7E44] to-[#2d5a3f] text-white rounded-2xl text-[11px] font-extrabold shadow-xl shadow-green-900/20 flex items-center gap-2.5 group transition-all duration-300"
                    style={{ boxShadow: '0 10px 30px -14px rgba(60,126,68,0.42)' }}
                >
                    <ShoppingCart size={15} className="group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
                    Quick Order
                </motion.button>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">Harvest</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">Delivery</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E4D9]">
                    <span className="w-2 h-2 rounded-full bg-[#3C7E44]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-600">Selected Day</span>
                </div>
            </div>
        </div>
    );

    const renderCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const cells = [];

        // Previous month days placeholder
        for (let i = 0; i < startDay; i++) {
            cells.push(
                <div
                    key={`empty-${i}`}
                    className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-2xl border border-dashed border-gray-200/60 backdrop-blur-sm transform hover:scale-95 transition-transform"
                />
            );
        }

        // Current month days
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const event = harvestEvents[dateStr];
            const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
            const isFilteredOut = filter !== 'all' && event && event.type !== filter;

            cells.push(
                <motion.div
                    key={day}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    whileHover={{ scale: 1.02, y: -2, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    className={`aspect-square p-3 lg:p-4 relative cursor-pointer rounded-2xl border transition-all duration-300 group shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)]
                        ${isSelected
                            ? 'bg-gradient-to-br from-[#3C7E44] to-[#2d5a3f] text-white border-[#2d5a3f] shadow-[0_12px_24px_rgba(60,126,68,0.26)] ring-4 ring-[#3C7E44]/25'
                            : 'bg-white border-[#e2ebe3] hover:border-[#3C7E44]/35 hover:shadow-lg hover:shadow-green-900/5'
                        }
                        ${isFilteredOut ? 'opacity-35' : 'opacity-100'}
                    `}
                    style={{ transform: isSelected ? 'translateY(-4px)' : 'none' }}
                >
                    {/* Day Number */}
                    <div className="flex justify-between items-start mb-1">
                        <span className={`text-[11px] font-black w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300
                            ${isToday ? 'bg-[#B7A261] text-white shadow-md shadow-amber-900/30 ring-2 ring-[#B7A261]/30' : isSelected ? 'text-white bg-white/20 ring-2 ring-white/30' : 'text-gray-600 group-hover:text-[#3C7E44] group-hover:bg-[#3C7E44]/10'}
                        `}>
                            {day}
                        </span>
                        {event && (
                            <div className={`w-2 h-2 rounded-full animate-pulse shadow-lg ${event.type === 'harvest' ? 'bg-amber-400 shadow-amber-400/50' : 'bg-emerald-500 shadow-emerald-500/50'}`} />
                        )}
                    </div>

                    {/* Event Preview Icon - Centered */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-55 transition-all duration-300">
                        {event && (
                            <div className="text-3xl lg:text-4xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                                {event.type === 'harvest' ? (event.icon || '🌲') : '🚚'}
                            </div>
                        )}
                    </div>

                    {/* Bottom Indicator for Events */}
                    {event && (
                        <div className="absolute bottom-2 left-0 right-0 px-2">
                            <div className={`h-1.5 w-full rounded-full opacity-30 shadow-md ${event.type === 'harvest' ? 'bg-gradient-to-r from-transparent via-amber-400 to-transparent' : 'bg-gradient-to-r from-transparent via-emerald-500 to-transparent'}`} />
                        </div>
                    )}

                    {isSelected && (
                        <motion.div
                            layoutId="glow"
                            className="absolute inset-0 rounded-2xl border-2 border-[#3C7E44] pointer-events-none shadow-[0_0_20px_rgba(60,126,68,0.3)]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                    )}
                </motion.div>
            );
        }

        return (
            <div className="bg-gradient-to-br from-white via-[#FBF8F2] to-[#f6f5ef] backdrop-blur-xl p-6 lg:p-10 rounded-[2.25rem] border border-[#E8E4D9] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)]">
                <div className="grid grid-cols-7 mb-6 gap-3 lg:gap-4 px-1">
                    {days.map(day => (
                        <div key={day} className="text-center text-[10px] font-black text-[#B7A261] uppercase tracking-[0.25em]">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-3 lg:gap-5">
                    {cells}
                </div>
            </div>
        );
    };

    const renderDetails = () => {
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        const event = harvestEvents[dateStr];

        return (
            <div className="mt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-white/90 backdrop-blur-lg rounded-[3rem] p-10 border border-[#E8E4D9] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden"
                >
                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                        <div className="bg-gradient-to-br from-[#FBF8F2] to-white p-8 rounded-[2.5rem] min-w-[200px] text-center border border-[#E8E4D9] relative overflow-hidden group hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="block text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.3em] mb-4">Selected Date</span>
                            <span className="block text-6xl font-black bg-gradient-to-br from-[#3C7E44] to-[#B7A261] bg-clip-text text-transparent mb-2 tracking-tighter">{selectedDate.getDate()}</span>
                            <span className="block text-lg text-gray-900 font-bold uppercase tracking-widest">
                                {selectedDate.toLocaleString('default', { month: 'long' })}
                            </span>
                            <div className="w-12 h-1 bg-[#E8E4D9] mx-auto my-6 rounded-full" />
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
                                <CalendarIcon size={14} className="text-[#B7A261]" />
                                {selectedDate.toLocaleString('default', { weekday: 'long' })}
                            </div>
                        </div>

                        <div className="flex-1 w-full space-y-8">
                            {event ? (
                                <>
                                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-8">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] border flex items-center gap-2 shadow-sm
                                                    ${event.type === 'harvest'
                                                        ? 'bg-amber-50 text-[#B7A261] border-amber-100'
                                                        : 'bg-emerald-50 text-[#3C7E44] border-emerald-100'}
                                                `}>
                                                    {event.type === 'harvest' ? <Leaf size={12} /> : <Truck size={12} />}
                                                    {event.type === 'harvest' ? 'Fresh Orchard Harvest' : 'Scheduled Delivery'}
                                                </span>
                                                <div className="bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 flex items-center gap-2">
                                                    <Clock size={12} className="text-[#B7A261]" />
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{event.time || 'All Day'}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">{event.title}</h3>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <MapPin size={14} className="text-[#B7A261]" />
                                                <span className="text-xs font-bold uppercase tracking-widest">{event.locality || 'Orchard Location'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div>
                                            <h4 className="text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                                <Zap size={14} /> Description
                                            </h4>
                                            <p className="text-gray-500 text-sm font-medium leading-relaxed">{event.desc || `The ${event.title} is currently scheduled and ready for you.`}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                                <Package size={14} /> What's in the box
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {event.items.map((item, idx) => (
                                                    <div key={idx} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-700 shadow-sm flex items-center gap-2 group/item hover:border-[#3C7E44] transition-all">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#3C7E44] group-hover/item:scale-150 transition-transform" />
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 flex flex-col sm:flex-row gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => navigate('/customize')}
                                            className="flex-1 py-5 bg-[#3C7E44] text-white rounded-[1.5rem] text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl shadow-green-900/30 flex items-center justify-center gap-3 group/btn"
                                        >
                                            <ShoppingBag size={18} className="group-hover/btn:-rotate-12 transition-transform" />
                                            Order Now
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-10 py-5 bg-white border border-[#E8E4D9] text-gray-900 rounded-[1.5rem] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
                                        >
                                            <Info size={16} className="text-[#B7A261]" /> More Info
                                        </motion.button>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                                        <Leaf size={40} strokeWidth={1} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Open Harvest Window</h3>
                                        <p className="text-gray-400 text-sm font-medium mt-1 max-w-[280px] mx-auto">No specific events scheduled for this day.</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate('/customize')}
                                        className="px-10 py-4 bg-white border border-[#E8E4D9] text-[#B7A261] rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-lg shadow-black/5 flex items-center gap-2 group"
                                    >
                                        Custom Order <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    };

    return (
        <>
            <div className="animate-fadeIn pb-20">
                {renderHeader()}
                {renderCalendarGrid()}
                {renderDetails()}
            </div>

            {/* Seasonal Guide Modal - Rethemed for Professional Look */}
            <AnimatePresence>
                {isGuideOpen && (
                    <div className="fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsGuideOpen(false)}
                            className="absolute inset-0 bg-black/60"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl border border-[#E8E4D9] overflow-hidden"
                        >
                            <div className="bg-[#1a472a] p-12 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                                <div className="relative z-10 flex justify-between items-center">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center border border-white/20">
                                            <CalendarIcon size={32} className="text-[#B7A261]" />
                                        </div>
                                        <div>
                                            <h3 className="text-4xl font-black tracking-tighter">Seasonal Guide 2026</h3>
                                            <p className="text-green-100/60 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Best fruits available each season</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ rotate: 90, scale: 1.1 }}
                                        onClick={() => setIsGuideOpen(false)}
                                        className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <X size={24} />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {seasonalData.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`p-8 rounded-[3rem] border border-[#E8E4D9]/50 ${item.bg} relative group overflow-hidden`}
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <Gem size={40} className={item.color} />
                                        </div>
                                        <div className="relative z-10">
                                            <h4 className={`text-2xl font-black ${item.color} tracking-tight mb-1`}>{item.quarter}</h4>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">{item.months}</p>
                                            <div className="space-y-3">
                                                {item.fruits.map((fruit, fIdx) => (
                                                    <div key={fIdx} className="flex items-center gap-3">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace('text-', 'bg-')}`} />
                                                        <span className="text-[13px] font-bold text-gray-800">{fruit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="px-12 py-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={16} className="text-[#3C7E44]" />
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Certified 2026 Agricultural Schedule</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setIsGuideOpen(false)}
                                    className="px-8 py-3 bg-[#3C7E44] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#2f6131] transition-colors shadow-lg shadow-green-900/10"
                                >
                                    Close Guide
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default HarvestCalendar;
