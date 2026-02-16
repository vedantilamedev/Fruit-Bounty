import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Leaf, Truck, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HarvestCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026 - current month
    const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 17)); // Today's date

    // Demo Data: Specific days with events
    const harvestEvents = {
        '2026-02-05': { type: 'harvest', title: 'Orchard Harvest', items: ['Apples', 'Pears', 'Guava'], desc: 'Fresh picking from the northern groves.' },
        '2026-02-10': { type: 'harvest', title: 'Tropical Harvest', items: ['Mangoes', 'Pineapples', 'Papaya'], desc: 'Limited edition high-shelf selection.' },
        '2026-02-13': { type: 'delivery', title: 'Delivered', items: ['Fresh Citrus Bowl'], status: 'Completed' },
        '2026-02-15': { type: 'delivery', title: 'Delivered', items: ['Exotic Tropical Salad'], status: 'Completed' },
        '2026-02-17': { type: 'delivery', title: 'Scheduled Delivery', items: ['Premium Mixed Fruit Bowl'], status: 'Pending' },
        '2026-02-20': { type: 'harvest', title: 'Citrus Harvest', items: ['Oranges', 'Kiwis', 'Lemon'], desc: 'Vitamin C focused harvest day.' },
        '2026-02-25': { type: 'harvest', title: 'Berry Harvest', items: ['Strawberries', 'Blueberries'], desc: 'Premium berry collection from organic farms.' },
    };

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const renderHeader = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return (
            <div className="flex items-center justify-end mb-4 px-2">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
                            setCurrentDate(newDate);
                            setSelectedDate(newDate);
                        }}
                        className="p-3 rounded-2xl bg-white border border-[#E8E4D9] text-black hover:bg-[#3C7E44] hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                    <div className="px-6 py-3 bg-white border-2 border-[#E8E4D9] rounded-2xl shadow-sm min-w-[140px] text-center">
                        <span className="font-normal text-black text-sm uppercase tracking-widest">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                    </div>
                    <button
                        onClick={() => {
                            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
                            setCurrentDate(newDate);
                            setSelectedDate(newDate);
                        }}
                        className="p-3 rounded-2xl bg-white border border-[#E8E4D9] text-black hover:bg-[#3C7E44] hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        );
    };

    const renderDaysOfWeek = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <div className="grid grid-cols-7 mb-4 px-2 lg:px-3 gap-1 lg:gap-3">
                {days.map(day => (
                    <div key={day} className="text-center text-[9px] lg:text-[10px] font-medium text-[#B7A261] uppercase tracking-wider mb-2">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);

        const cells = [];

        // Padding for previous month
        for (let i = 0; i < startDay; i++) {
            cells.push(<div key={`empty-${i}`} className="h-20 lg:h-32 bg-[#F7F5EF]/10 rounded-2xl border border-dashed border-[#E8E4D9]/20" />);
        }

        // Actual days
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const event = harvestEvents[dateStr];
            const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

            cells.push(
                <motion.div
                    key={day}
                    whileHover={{ scale: 0.98 }}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    className={`h-20 lg:h-32 border p-2 lg:p-3 cursor-pointer relative transition-all duration-300 group rounded-2xl
                        ${isSelected
                            ? 'bg-white border-[#3C7E44] border-2 ring-4 ring-[#3C7E44]/10 z-10 shadow-xl'
                            : 'bg-white border-[#E8E4D9]/40 hover:bg-[#FBF8F2] hover:border-[#3C7E44]/30'}
                    `}
                >
                    <span className={`text-[10px] lg:text-xs font-normal tracking-tighter ${isSelected ? 'text-[#3C7E44]' : 'text-black group-hover:text-[#3C7E44]'} ${isToday ? 'bg-[#B7A261] text-white px-2 py-0.5 rounded-md font-normal' : ''}`}>
                        {String(day).padStart(2, '0')}
                    </span>

                    {event && (
                        <div className="mt-1 lg:mt-2 flex flex-col gap-1">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-lg text-[8px] lg:text-[9px] font-normal uppercase tracking-tighter flex items-center gap-1 shadow-sm
                                    ${event.type === 'harvest' ? 'bg-[#b7a261]/10 text-[#b7a261] border border-[#b7a261]/20' : 'bg-[#3C7E44]/10 text-[#3C7E44] border border-[#3C7E44]/20'}
                                `}
                            >
                                {event.type === 'harvest' ? <Leaf size={8} className="lg:w-[10px]" /> : <Truck size={8} className="lg:w-[10px]" />}
                                <span className="truncate">{event.title}</span>
                            </motion.div>
                        </div>
                    )}

                    {isSelected && (
                        <motion.div
                            layoutId="activeCircle"
                            className="absolute bottom-2 right-2 w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#3C7E44]"
                        />
                    )}
                </motion.div>
            );
        }

        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${year}-${month}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="grid grid-cols-7 p-2 lg:p-3 gap-1 lg:gap-3 rounded-[2rem] lg:rounded-[3.5rem] border border-[#E8E4D9] bg-white/50"
                >
                    {cells}
                </motion.div>
            </AnimatePresence>
        );
    };

    const renderEventDetail = () => {
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        const event = harvestEvents[dateStr];

        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                <div className="lg:col-span-2 bg-white p-8 lg:p-10 rounded-[3rem] border-2 border-[#E8E4D9] shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#3C7E44]/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />

                    <div className="relative">
                        <p className="text-[#B7A261] font-normal text-[10px] uppercase tracking-widest mb-2">Selected Date Detail</p>
                        <h3 className="text-3xl font-normal text-[#3C7E44] tracking-tighter mb-6">
                            {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </h3>

                        {event ? (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={dateStr}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className={`p-6 lg:p-8 rounded-[2rem] shadow-sm border ${event.type === 'harvest' ? 'bg-[#b7a261]/5 border-[#b7a261]/10' : 'bg-[#3C7E44]/5 border-[#3C7E44]/10'}`}>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`p-3 lg:p-4 rounded-2xl ${event.type === 'harvest' ? 'bg-[#b7a261]' : 'bg-[#3C7E44]'} text-white shadow-lg shadow-current/20`}>
                                                {event.type === 'harvest' ? <Leaf size={28} strokeWidth={2.5} /> : <Truck size={28} strokeWidth={2.5} />}
                                            </div>
                                            <div>
                                                <h4 className={`text-2xl font-normal tracking-tight ${event.type === 'harvest' ? 'text-[#b7a261]' : 'text-[#3C7E44]'}`}>{event.title}</h4>
                                                <span className="text-[10px] font-medium uppercase text-gray-400 tracking-[0.2em]">{event.type === 'harvest' ? 'Orchard Event' : 'Logistics Route'}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-base font-normal text-black leading-relaxed">
                                                {event.desc || `Your organic bounty is scheduled for arrival on this day.`}
                                            </p>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {event.items.map(item => (
                                                    <span key={item} className="px-5 py-2 bg-white border border-[#E8E4D9] rounded-full text-[11px] font-normal text-black uppercase tracking-tighter shadow-sm hover:border-[#3C7E44]/30 transition-colors">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button className={`w-full py-5 rounded-full font-normal text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl
                                        ${event.type === 'harvest' ? 'bg-[#b7a261] hover:bg-[#a49156] shadow-orange-900/10' : 'bg-[#3C7E44] hover:bg-[#3C7E44] shadow-green-900/10'} text-white hover:scale-[1.01]
                                    `}>
                                        {event.type === 'harvest' ? 'Notify Me' : 'Manage Delivery'}
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div className="py-16 text-center flex flex-col items-center border-2 border-dashed border-[#E8E4D9] rounded-[2.5rem] bg-[#FBF8F2]/50">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                                    <CalendarIcon size={32} className="text-[#B7A261] opacity-40" strokeWidth={1} />
                                </div>
                                <p className="text-black font-normal text-xl tracking-tight opacity-60 px-4">No events on this tranquil day</p>
                                <p className="text-black font-normal text-xs mt-2 uppercase tracking-widest">Select a marked date to see more details</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1 bg-[#3C7E44] p-8 lg:p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden shadow-emerald-900/20 flex flex-col justify-center">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mb-24 -mr-24" />
                    <div className="relative flex flex-col items-start gap-6">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                            <Info size={28} className="text-white" />
                        </div>
                        <div>
                            <h5 className="font-normal text-2xl mb-3 tracking-tight uppercase">Waitlist Notice</h5>
                            <p className="text-white/70 text-sm font-normal leading-relaxed tracking-wide uppercase">
                                Special seasonal harvests can be pre-booked 7 days in advance. Keep an eye on the <span className="text-[#B7A261] font-normal">Gold Markers</span>!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full space-y-8 animate-fadeIn">
            <div className="w-full">
                {renderHeader()}
                <div className="p-4 lg:p-6 bg-[#F7F5EF]/50 rounded-[2.5rem] lg:rounded-[3.5rem] border border-[#E8E4D9] shadow-sm backdrop-blur-sm">
                    {renderDaysOfWeek()}
                    {renderCells()}
                </div>
            </div>
            {/* Event details in a responsive grid */}
            <div className="w-full">
                {renderEventDetail()}
            </div>
        </div>
    );
};

export default HarvestCalendar;
