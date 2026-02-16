import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Leaf, Truck, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HarvestCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024 for demo consistency
    const [selectedDate, setSelectedDate] = useState(new Date(2024, 0, 21));

    // Demo Data: Specific days with events
    const harvestEvents = {
        '2024-01-05': { type: 'harvest', title: 'Orchard Harvest', items: ['Apples', 'Pears'], desc: 'Fresh picking from the northern groves.' },
        '2024-01-12': { type: 'harvest', title: 'Tropical Harvest', items: ['Mangoes', 'Pineapples'], desc: 'Limited edition high-shelf selection.' },
        '2024-01-16': { type: 'delivery', title: 'Scheduled Delivery', items: ['Mixed Fruit Bowl'], status: 'Confirmed' },
        '2024-01-21': { type: 'delivery', title: 'Your Next Bounty', items: ['Standard Wellness Plan'], status: 'Scheduled' },
        '2024-01-25': { type: 'harvest', title: 'Citrus Harvest', items: ['Oranges', 'Kiwis'], desc: 'Vitamin C focused harvest day.' },
    };

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const renderHeader = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return (
            <div className="flex items-center justify-between mb-8 px-4">
                <div>
                    <h2 className="text-2xl font-black text-[#2f6131] tracking-tight italic uppercase">Harvest Calendar</h2>
                    <p className="text-[#B7A261] font-bold text-[10px] uppercase tracking-widest mt-1 italic">Tracking nature's schedule</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                        className="p-3 rounded-2xl bg-white border border-[#E8E4D9] text-[#6B705C] hover:bg-[#3e7b3f] hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                    <div className="px-6 py-3 bg-white border-2 border-[#E8E4D9] rounded-2xl shadow-sm min-w-[140px] text-center">
                        <span className="font-black text-[#2f6131] text-sm uppercase tracking-widest italic">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                    </div>
                    <button
                        onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                        className="p-3 rounded-2xl bg-white border border-[#E8E4D9] text-[#6B705C] hover:bg-[#3e7b3f] hover:text-white transition-all duration-300 shadow-sm"
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
            <div className="grid grid-cols-7 mb-4">
                {days.map(day => (
                    <div key={day} className="text-center text-[10px] font-black text-[#B7A261] uppercase tracking-[0.2em] italic mb-2">
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
            cells.push(<div key={`empty-${i}`} className="h-24 lg:h-32 border border-[#E8E4D9]/20 bg-[#F7F5EF]/30" />);
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
                    className={`h-24 lg:h-32 border border-[#E8E4D9]/40 p-3 cursor-pointer relative transition-all duration-300 group
                        ${isSelected ? 'bg-white ring-2 ring-[#3e7b3f] z-10 shadow-xl' : 'bg-white hover:bg-[#FBF8F2]'}
                        ${day === 1 ? 'rounded-tl-lg' : ''}
                        ${day === totalDays ? 'rounded-br-lg' : ''}
                    `}
                >
                    <span className={`text-xs font-black tracking-tighter ${isSelected ? 'text-[#3e7b3f]' : 'text-[#6B705C] group-hover:text-[#2f6131]'} ${isToday ? 'bg-[#B7A261] text-white px-2 py-0.5 rounded-md' : ''}`}>
                        {String(day).padStart(2, '0')}
                    </span>

                    {event && (
                        <div className="mt-2 flex flex-col gap-1">
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter flex items-center gap-1 shadow-sm
                                    ${event.type === 'harvest' ? 'bg-[#b7a261]/10 text-[#b7a261] border border-[#b7a261]/20' : 'bg-[#3e7b3f]/10 text-[#3e7b3f] border border-[#3e7b3f]/20'}
                                `}
                            >
                                {event.type === 'harvest' ? <Leaf size={10} /> : <Truck size={10} />}
                                <span className="truncate">{event.title}</span>
                            </motion.div>
                        </div>
                    )}

                    {isSelected && (
                        <motion.div
                            layoutId="activeCircle"
                            className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#3e7b3f]"
                        />
                    )}
                </motion.div>
            );
        }

        return <div className="grid grid-cols-7 rounded-[2.5rem] overflow-hidden shadow-inner border border-[#E8E4D9] bg-white">{cells}</div>;
    };

    const renderEventDetail = () => {
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        const event = harvestEvents[dateStr];

        return (
            <div className="mt-10 lg:mt-0 lg:ml-10 lg:w-96 flex flex-col gap-6">
                <div className="bg-white p-8 rounded-[3rem] border-2 border-[#E8E4D9] shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#3e7b3f]/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />

                    <div className="relative">
                        <p className="text-[#B7A261] font-black text-[10px] uppercase tracking-widest italic mb-2">Selected Date Detail</p>
                        <h3 className="text-3xl font-black text-[#2f6131] tracking-tighter mb-6 italic italic">
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
                                    <div className={`p-6 rounded-[2rem] shadow-sm border ${event.type === 'harvest' ? 'bg-[#b7a261]/5 border-[#b7a261]/10' : 'bg-[#3e7b3f]/5 border-[#3e7b3f]/10'}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-3 rounded-2xl ${event.type === 'harvest' ? 'bg-[#b7a261]' : 'bg-[#3e7b3f]'} text-white shadow-lg`}>
                                                {event.type === 'harvest' ? <Leaf size={24} /> : <Truck size={24} />}
                                            </div>
                                            <div>
                                                <h4 className={`text-xl font-black italic tracking-tight ${event.type === 'harvest' ? 'text-[#b7a261]' : 'text-[#3e7b3f]'}`}>{event.title}</h4>
                                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{event.type === 'harvest' ? 'Orchard Event' : 'Logistics Route'}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-sm font-medium text-[#6B705C] leading-relaxed">
                                                {event.desc || `Your organic bounty is scheduled for arrival on this day.`}
                                            </p>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {event.items.map(item => (
                                                    <span key={item} className="px-3 py-1 bg-white border border-[#E8E4D9] rounded-full text-[10px] font-black text-[#6B705C] uppercase tracking-tighter shadow-sm">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button className={`w-full py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl
                                        ${event.type === 'harvest' ? 'bg-[#b7a261] hover:bg-[#a49156] shadow-orange-900/10' : 'bg-[#3e7b3f] hover:bg-[#2f6131] shadow-green-900/10'} text-white
                                    `}>
                                        {event.type === 'harvest' ? 'Notify Me' : 'Manage Delivery'}
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div className="py-10 text-center flex flex-col items-center border-2 border-dashed border-[#E8E4D9] rounded-[2.5rem]">
                                <div className="w-16 h-16 bg-[#F7F5EF] rounded-full flex items-center justify-center mb-4">
                                    <CalendarIcon className="text-[#B7A261] opacity-40" strokeWidth={1} />
                                </div>
                                <p className="text-[#2f6131] font-black text-lg italic tracking-tight opacity-60 px-4">No events on this tranquil day</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-[#2f6131] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden shadow-emerald-900/20">
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mb-24 -mr-24" />
                    <div className="relative flex items-start gap-4">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                            <Info size={20} />
                        </div>
                        <div>
                            <h5 className="font-black text-lg italic mb-2 tracking-tight uppercase">Waitlist Notice</h5>
                            <p className="text-white/70 text-xs font-medium leading-relaxed tracking-wide uppercase">
                                Special seasonal harvests can be pre-booked 7 days in advance. Keep an eye on the <span className="text-[#B7A261]">Gold Markers</span>!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row items-start animate-fadeIn">
            <div className="flex-1 w-full lg:max-w-4xl">
                {renderHeader()}
                <div className="p-6 bg-[#F7F5EF]/50 rounded-[3.5rem] border border-[#E8E4D9] shadow-sm backdrop-blur-sm">
                    {renderDaysOfWeek()}
                    {renderCells()}
                </div>
            </div>
            {renderEventDetail()}
        </div>
    );
};

export default HarvestCalendar;
