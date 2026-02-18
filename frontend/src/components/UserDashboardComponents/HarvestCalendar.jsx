import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Leaf, Truck, Info, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HarvestCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));
    const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 17));

    const harvestEvents = {
        '2026-02-05': { type: 'harvest', title: 'Orchard Harvest', items: ['Apples', 'Pears', 'Guava'], desc: 'Fresh picking from the northern groves.' },
        '2026-02-10': { type: 'harvest', title: 'Tropical Harvest', items: ['Mangoes', 'Pineapples', 'Papaya'], desc: 'Limited edition high-shelf selection.' },
        '2026-02-13': { type: 'delivery', title: 'Shipped', items: ['Fresh Citrus Bowl'], status: 'Completed', time: '10:00 AM' },
        '2026-02-15': { type: 'delivery', title: 'Delivered', items: ['Exotic Tropical Salad'], status: 'Completed', time: '2:30 PM' },
        '2026-02-17': { type: 'delivery', title: 'Scheduled Delivery', items: ['Premium Mixed Fruit Bowl'], status: 'Pending', time: '9:00 AM - 12:00 PM' },
        '2026-02-20': { type: 'harvest', title: 'Citrus Harvest', items: ['Oranges', 'Kiwis', 'Lemon'], desc: 'Vitamin C focused harvest day.' },
        '2026-02-25': { type: 'harvest', title: 'Berry Harvest', items: ['Strawberries', 'Blueberries'], desc: 'Premium berry collection from organic farms.' },
    };

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const renderHeader = () => (
        <div className="flex items-center justify-between mb-8 px-2">
            <div>
                <h2 className="text-3xl font-medium text-[#3C7E44] tracking-tight">Harvest Calendar</h2>
                <p className="text-sm text-gray-500 mt-1">Track your deliveries and seasonal harvests</p>
            </div>
            <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-[#E8E4D9] shadow-sm">
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevMonth}
                    className="p-3 rounded-xl text-gray-600 hover:text-[#3C7E44] transition-colors"
                >
                    <ChevronLeft size={20} />
                </motion.button>
                <div className="px-4 min-w-[140px] text-center">
                    <span className="text-lg font-medium text-gray-800">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextMonth}
                    className="p-3 rounded-xl text-gray-600 hover:text-[#3C7E44] transition-colors"
                >
                    <ChevronRight size={20} />
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

        // Empty cells
        for (let i = 0; i < startDay; i++) {
            cells.push(<div key={`empty-${i}`} className="h-24 lg:h-32 bg-gray-50/50 rounded-2xl border border-dashed border-gray-100" />);
        }

        // Days
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const event = harvestEvents[dateStr];
            const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

            cells.push(
                <motion.div
                    key={day}
                    layoutId={isSelected ? 'selected-day' : undefined}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    whileHover={{ y: -2 }}
                    className={`h-24 lg:h-32 p-3 relative cursor-pointer rounded-2xl border transition-all duration-300 group overflow-hidden
                        ${isSelected
                            ? 'bg-white border-[#3C7E44] shadow-xl shadow-green-900/10 ring-1 ring-[#3C7E44]'
                            : 'bg-white border-[#E8E4D9] hover:border-[#3C7E44]/50 hover:shadow-lg hover:shadow-green-900/5'
                        }
                    `}
                >
                    <div className="flex justify-between items-start">
                        <span className={`text-sm font-medium rounded-full w-7 h-7 flex items-center justify-center
                            ${isToday ? 'bg-[#3C7E44] text-white' : isSelected ? 'text-[#3C7E44] bg-[#3C7E44]/10' : 'text-gray-700 group-hover:bg-gray-100'}
                        `}>
                            {day}
                        </span>
                    </div>

                    {event && (
                        <div className="mt-2 space-y-1">
                            <div className={`px-2 py-1 rounded-lg text-[10px] font-medium w-full truncate flex items-center gap-1.5
                                ${event.type === 'harvest'
                                    ? 'bg-[#B7A261]/10 text-[#B7A261] border border-[#B7A261]/20'
                                    : 'bg-[#3C7E44]/10 text-[#3C7E44] border border-[#3C7E44]/20'}
                            `}>
                                {event.type === 'harvest' ? <Leaf size={10} /> : <Truck size={10} />}
                                <span className="truncate">{event.title}</span>
                            </div>
                        </div>
                    )}

                    {isSelected && (
                        <motion.div
                            layoutId="glow"
                            className="absolute inset-0 bg-gradient-to-tr from-[#3C7E44]/5 to-transparent pointer-events-none"
                        />
                    )}
                </motion.div>
            );
        }

        return (
            <div className="bg-white p-6 rounded-[2.5rem] border border-[#E8E4D9] shadow-sm">
                <div className="grid grid-cols-7 mb-4">
                    {days.map(day => (
                        <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-3">
                    {cells}
                </div>
            </div>
        );
    };

    const renderDetails = () => {
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        const event = harvestEvents[dateStr];

        return (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-[#E8E4D9] shadow-sm relative overflow-hidden"
                >
                    <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
                        <div className="bg-[#FBF8F2] p-6 rounded-[2rem] min-w-[160px] text-center border border-[#E8E4D9]">
                            <span className="block text-4xl font-light text-[#3C7E44] mb-1">{selectedDate.getDate()}</span>
                            <span className="block text-sm text-[#B7A261] font-medium uppercase tracking-wider">
                                {selectedDate.toLocaleString('default', { month: 'short' })}
                            </span>
                            <div className="w-8 h-1 bg-[#E8E4D9] mx-auto my-4 rounded-full" />
                            <span className="text-xs text-gray-500 font-medium">
                                {selectedDate.toLocaleString('default', { weekday: 'long' })}
                            </span>
                        </div>

                        <div className="flex-1 space-y-6">
                            {event ? (
                                <>
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                                                ${event.type === 'harvest'
                                                    ? 'bg-[#B7A261]/10 text-[#B7A261] border-[#B7A261]/20'
                                                    : 'bg-[#3C7E44]/10 text-[#3C7E44] border-[#3C7E44]/20'}
                                            `}>
                                                {event.type === 'harvest' ? 'Seasonal Harvest' : 'Delivery Scheduled'}
                                            </span>
                                            {event.time && (
                                                <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                                    <Clock size={12} /> {event.time}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-2xl text-gray-900 font-medium mb-2">{event.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{event.desc || `Status: ${event.status}`}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Included Items</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {event.items.map((item, idx) => (
                                                <span key={idx} className="px-4 py-2 bg-white border border-[#E8E4D9] rounded-xl text-sm text-gray-700 shadow-sm hover:border-[#3C7E44] transition-colors">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center py-8 opacity-60">
                                    <Leaf className="text-gray-300 mb-4" size={40} />
                                    <p className="text-gray-500 font-medium">No harvesting or deliveries scheduled for this day.</p>
                                    <p className="text-sm text-gray-400 mt-2">Enjoy the natural rhythm of the orchard.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-[#1a472a] to-[#2d5a3f] p-8 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-between group"
                >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-lg">
                            <Info size={24} className="text-[#B7A261]" />
                        </div>
                        <h4 className="text-xl font-medium mb-3">Harvest Notes</h4>
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                            Seasonal fruits are at their peak sweetness. Deliveries may be adjusted slightly based on ripening conditions.
                        </p>
                    </div>

                    <button className="w-full py-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-sm font-medium hover:bg-white hover:text-[#1a472a] transition-all duration-300">
                        View Full Season Guide
                    </button>
                </motion.div>
            </div>
        );
    };

    return (
        <div className="animate-fadeIn pb-10">
            {renderHeader()}
            {renderCalendarGrid()}
            {renderDetails()}
        </div>
    );
};

export default HarvestCalendar;
