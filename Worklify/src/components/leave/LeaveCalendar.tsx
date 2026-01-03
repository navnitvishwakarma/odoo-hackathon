import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const LeaveCalendar: React.FC = () => {
    // This is a simplified visual-only calendar for the prototype
    // In a real app, this would map approved leaves to dates
    // This is a simplified visual-only calendar for the prototype
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const generateCalendar = () => {
        // Same logic as AttendanceCalendar for now, but with specific Leave styling
        const calendarDays = [];
        for (let i = 1; i <= 31; i++) {
            // Mock some leave data
            const isLeave = [5, 12, 13, 14, 28].includes(i);
            const name = i === 5 ? 'Sarah' : (i === 12 ? 'Aman' : (i === 28 ? 'Mike' : ''));
            const type = i === 5 ? 'Sick' : 'Casual';

            calendarDays.push(
                <div key={i} className="h-28 border border-slate-100 p-2 relative group overflow-hidden">
                    <span className="text-sm font-medium text-slate-400">{i}</span>
                    {isLeave && (
                        <div className={`mt-1 p-1.5 rounded text-xs font-medium border-l-4 ${type === 'Sick' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-blue-50 border-blue-500 text-blue-700'}`}>
                            <p className="truncate">{name}</p>
                            <p className="opacity-75 text-[10px]">{type}</p>
                        </div>
                    )}
                </div>
            );
        }
        return calendarDays;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">Leave Calendar</h3>
                    <p className="text-sm text-slate-500">Team absences for January 2026</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
                {days.map(day => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-slate-500 uppercase">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {generateCalendar()}
            </div>
        </div>
    );
};
