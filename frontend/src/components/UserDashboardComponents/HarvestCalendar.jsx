import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, ChevronRight, Calendar as CalendarIcon,
    Leaf, Truck, Info, MapPin, Clock, ArrowRight, X,
    ShoppingBag, ShoppingCart, Filter, Sparkles,
    Zap, Gem, CheckCircle, Navigation, Package
} from 'lucide-react';
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
        <div className="flex flex-col lg:flex-row items-center justify-between mb-10 gap-6 px-2">
            <div className="flex items-center gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Harvest Ecosystem</h2>
                    <div className="text-[#B7A261] font-bold text-[10px] mt-1 uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B7A261] animate-ping" />
                        Live Orchard Tracking
                    </div>
                </div>
                <div className="h-10 w-px bg-gray-100 hidden lg:block" />
                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-100">
                    {['all', 'harvest', 'delivery'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${filter === type
                                ? 'bg-white text-[#3C7E44] shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#E8E4D9] shadow-sm">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevMonth}
                        className="p-1.5 text-gray-400 hover:text-[#3C7E44] transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </motion.button>
                    <span className="text-sm font-bold text-gray-900 min-w-[140px] text-center">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextMonth}
                        className="p-1.5 text-gray-400 hover:text-[#3C7E44] transition-colors"
                    >
                        <ChevronRight size={18} />
                    </motion.button>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/customize')}
                    className="px-6 py-3.5 bg-[#3C7E44] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-green-900/20 flex items-center gap-2 group"
                >
                    <ShoppingCart size={14} className="group-hover:rotate-12 transition-transform" /> Quick Order
                </motion.button>
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
            cells.push(<div key={`empty-${i}`} className="h-28 lg:h-36 bg-[#FBF8F2]/30 rounded-[2rem] border border-dashed border-[#E8E4D9]/50" />);
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
                    whileHover={{ y: -4 }}
                    className={`h-28 lg:h-36 p-4 relative cursor-pointer rounded-[2rem] border transition-all duration-300 group overflow-hidden
                        ${isSelected
                            ? 'bg-white border-[#3C7E44] shadow-2xl shadow-green-900/10'
                            : 'bg-white border-[#E8E4D9] hover:border-[#3C7E44]/40 hover:shadow-xl hover:shadow-green-900/5'
                        }
                        ${isFilteredOut ? 'opacity-30 grayscale-[0.5]' : ''}
                    `}
                >
                    <div className="flex justify-between items-start">
                        <span className={`text-xs font-bold rounded-xl w-8 h-8 flex items-center justify-center transition-colors
                            ${isToday ? 'bg-[#3C7E44] text-white' : isSelected ? 'text-white bg-[#B7A261]' : 'text-gray-400 group-hover:text-gray-900'}
                        `}>
                            {day}
                        </span>
                        {isToday && <div className="w-1.5 h-1.5 rounded-full bg-[#B7A261]" />}
                    </div>

                    <div className="mt-4 flex flex-col gap-1.5">
                        {event && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex items-center gap-2 p-2 rounded-xl border ${event.type === 'harvest'
                                    ? 'bg-amber-50 border-amber-100 text-[#B7A261]'
                                    : 'bg-emerald-50 border-emerald-100 text-[#3C7E44]'
                                    }`}
                            >
                                <div className="text-xs">
                                    {event.type === 'harvest' ? (event.icon || <Leaf size={10} />) : <Truck size={10} />}
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-wider truncate">{event.title}</span>
                            </motion.div>
                        )}
                    </div>

                    {isSelected && (
                        <div className="absolute top-0 right-0 p-2">
                            <Sparkles size={12} className="text-[#B7A261] animate-pulse" />
                        </div>
                    )}
                </motion.div>
            );
        }

        return (
            <div className="bg-white p-8 rounded-[4rem] border border-[#E8E4D9] shadow-xl shadow-green-900/5">
                <div className="grid grid-cols-7 mb-8 px-4">
                    {days.map(day => (
                        <div key={day} className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-4">
                    {cells}
                </div>
            </div>
        );
    };

    const renderDetails = () => {
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        const event = harvestEvents[dateStr];

        return (
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8 bg-white rounded-[3.5rem] p-10 border border-[#E8E4D9] shadow-xl shadow-green-900/5 relative overflow-hidden"
                >
                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                        <div className="bg-[#FBF8F2] p-8 rounded-[2.5rem] min-w-[200px] text-center border border-[#E8E4D9] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="block text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.3em] mb-4">Selected Date</span>
                            <span className="block text-6xl font-black text-[#3C7E44] mb-2 tracking-tighter">{selectedDate.getDate()}</span>
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
                                                    {event.type === 'harvest' ? 'Direct Orchard Harvest' : 'Luxury Subscription Delivery'}
                                                </span>
                                                <div className="bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 flex items-center gap-2">
                                                    <Clock size={12} className="text-[#B7A261]" />
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{event.time || 'All Day'}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">{event.title}</h3>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <MapPin size={14} className="text-[#B7A261]" />
                                                <span className="text-xs font-bold uppercase tracking-widest">{event.locality || 'Orchard Hub'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div>
                                            <h4 className="text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                                <Zap size={14} /> Ecosystem Report
                                            </h4>
                                            <p className="text-gray-500 text-sm font-medium leading-relaxed">{event.desc || `The ${event.title} is currently scheduled and verified by our system.`}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-extrabold text-[#B7A261] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                                <Package size={14} /> Crate Manifest
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
                                            Initialize Pre-Order
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-10 py-5 bg-white border border-[#E8E4D9] text-gray-900 rounded-[1.5rem] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
                                        >
                                            <Info size={16} className="text-[#B7A261]" /> Ritual Details
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
                                        <p className="text-gray-400 text-sm font-medium mt-1 max-w-[280px] mx-auto">No specific ritual scheduled for this day, but nature never rests.</p>
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

                <div className="lg:col-span-4 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gradient-to-br from-[#1a472a] to-[#2d5a3f] p-10 rounded-[3.5rem] text-white relative overflow-hidden h-full flex flex-col justify-between group shadow-2xl shadow-green-900/20"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-1000" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -ml-10 -mb-10" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
                                <Gem size={32} className="text-[#B7A261]" />
                            </div>
                            <h4 className="text-3xl font-bold tracking-tight mb-4">Seasonal Rituals</h4>
                            <p className="text-white/60 text-sm font-medium leading-relaxed mb-10">
                                Our orchards follow the lunar calendar and precise soil moisture readings. All dates are optimized for peak nutritional density.
                            </p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <CheckCircle size={20} className="text-[#B7A261]" />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#B7A261]">Orchard Quality</p>
                                        <p className="text-sm font-bold text-white">98% Ripeness Index</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <Navigation size={20} className="text-[#B7A261]" />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#B7A261]">Current Hub</p>
                                        <p className="text-sm font-bold text-white">Main Valley Groves</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsGuideOpen(true)}
                            className="relative z-10 w-full py-5 bg-white text-[#1a472a] rounded-[1.5rem] text-[11px] font-extrabold uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                        >
                            Open Seasonal Atlas <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                        </motion.button>
                    </motion.div>
                </div>
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
                                            <h3 className="text-4xl font-black tracking-tighter">Harvest Atlas 2026</h3>
                                            <p className="text-green-100/60 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">The rhythmic synchronization of nature</p>
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
                                    Dismiss Atlas
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
