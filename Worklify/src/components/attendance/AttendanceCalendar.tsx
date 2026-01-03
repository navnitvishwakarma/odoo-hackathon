import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';
import clsx from 'clsx';

export const AttendanceCalendar: React.FC = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [currentDate, setCurrentDate] = useState(new Date());

    const getQuarter = (date: Date) => {
        const month = date.getMonth() + 1;
        return `Q${Math.ceil(month / 3)}`;
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // Enhanced Mock Data Generation
    const generateCalendar = () => {
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();
        const today = new Date();

        const calendarDays = [];

        // Empty cells
        for (let i = 0; i < startingDay; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="h-28 bg-transparent"></div>);
        }

        // Days
        for (let i = 1; i <= totalDays; i++) {
            const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isToday = today.getDate() === i && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
            const isWeekend = currentDayDate.getDay() === 0 || currentDayDate.getDay() === 6;

            // Randomized Status for Demo
            let status: 'present' | 'absent' | 'leave' | 'holiday' | null = null;
            if (!isWeekend && i < today.getDate()) {
                const rand = Math.random();
                if (rand > 0.9) status = 'leave';
                else if (rand > 0.85) status = 'absent';
                else status = 'present';
            }
            if (i === 26) status = 'holiday'; // Republic Day approx placement or random holiday

            calendarDays.push(
                <div
                    key={i}
                    className={clsx(
                        "h-28 p-2 rounded-xl border transition-all duration-200 relative group flex flex-col justify-between hover:shadow-md cursor-pointer",
                        isToday ? "bg-white border-blue-500 shadow-sm ring-1 ring-blue-500" : "bg-white border-slate-100 hover:border-blue-200",
                        isWeekend && "bg-slate-50/50"
                    )}
                >
                    <div className="flex justify-between items-start">
                        <span className={clsx("text-sm font-semibold", isToday ? "text-blue-600" : "text-slate-700")}>{i}</span>
                        {isToday && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">TODAY</span>}
                    </div>

                    {/* Status Chips */}
                    <div className="space-y-1">
                        {status === 'present' && (
                            <div className="flex items-center justify-center py-1 px-2 rounded-lg bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                                Present
                            </div>
                        )}
                        {status === 'absent' && (
                            <div className="flex items-center justify-center py-1 px-2 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-100">
                                Absent
                            </div>
                        )}
                        {status === 'leave' && (
                            <div className="flex items-center justify-center py-1 px-2 rounded-lg bg-yellow-50 text-yellow-700 text-xs font-medium border border-yellow-100">
                                On Leave
                            </div>
                        )}
                        {status === 'holiday' && (
                            <div className="flex items-center justify-center py-1 px-2 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">
                                Holiday
                            </div>
                        )}
                        {!status && !isWeekend && i < today.getDate() && (
                            <div className="flex items-center justify-center py-1 px-2 rounded-lg bg-slate-100 text-slate-500 text-xs font-medium">
                                N/A
                            </div>
                        )}
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none">
                        <div className="font-semibold mb-1">{currentDate.toLocaleString('default', { month: 'long' })} {i}</div>
                        {status === 'present' ? (
                            <div className="space-y-1 text-slate-300">
                                <div className="flex justify-between"><span>Check In:</span> <span className="text-white">09:00 AM</span></div>
                                <div className="flex justify-between"><span>Check Out:</span> <span className="text-white">06:00 PM</span></div>
                                <div className="flex justify-between"><span>Duration:</span> <span className="text-green-400">9h 00m</span></div>
                            </div>
                        ) : (
                            <div className="text-slate-300">No attendance records found.</div>
                        )}
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                    </div>
                </div>
            );
        }
        return calendarDays;
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Calendar Section */}
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                            </h2>
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-bold rounded-full">
                                {getQuarter(currentDate)}
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Attendance Overview</p>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
                        <button onClick={prevMonth} className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300 transition-all shadow-sm">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={nextMonth} className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300 transition-all shadow-sm">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 mb-4">
                    {days.map(day => (
                        <div key={day} className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-3">
                    {generateCalendar()}
                </div>
            </div>

            {/* Right Side Info Panel */}
            <div className="w-full lg:w-80 space-y-6">
                {/* Reminder / Summary Box */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Info size={18} />
                        Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                            <div className="text-2xl font-bold">18</div>
                            <div className="text-xs text-blue-100 opacity-80">Present Days</div>
                        </div>
                        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                            <div className="text-2xl font-bold">2</div>
                            <div className="text-xs text-blue-100 opacity-80">Total Absent</div>
                        </div>
                        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                            <div className="text-2xl font-bold">1</div>
                            <div className="text-xs text-blue-100 opacity-80">Leaves Taken</div>
                        </div>
                        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                            <div className="text-2xl font-bold">95%</div>
                            <div className="text-xs text-blue-100 opacity-80">Attendance</div>
                        </div>
                    </div>
                </div>

                {/* Important Dates List */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <CalendarIcon size={18} className="text-blue-500" />
                        Important Dates
                    </h3>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20">
                            <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg text-purple-600 dark:text-purple-300 font-bold text-xs flex-shrink-0 text-center min-w-[3rem]">
                                JAN<br /><span className="text-lg">26</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">Republic Day</h4>
                                <p className="text-xs text-slate-500">Public Holiday</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg text-blue-600 dark:text-blue-300 font-bold text-xs flex-shrink-0 text-center min-w-[3rem]">
                                JAN<br /><span className="text-lg">30</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">Payroll Cutoff</h4>
                                <p className="text-xs text-slate-500">Submit requests before this date</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Legend</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span> Present
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span> Absent
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span> On Leave
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
