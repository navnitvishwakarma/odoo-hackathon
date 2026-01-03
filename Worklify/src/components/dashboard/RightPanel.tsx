import React from 'react';
import { Bell, ChevronRight, MoreHorizontal } from 'lucide-react';

export const RightPanel: React.FC = () => {
    // Mini Calendar Component (Visual only for prototype)
    const renderMiniCalendar = () => {
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        return (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">January 2026</h3>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><ChevronRight size={18} /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                    {days.map(d => <span key={d} className="text-slate-400 text-xs font-semibold">{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {Array.from({ length: 31 }, (_, i) => {
                        const day = i + 1;
                        const isToday = day === 3; // Mock today
                        const hasEvent = [5, 12, 15].includes(day);
                        return (
                            <div key={day} className={`
                                aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all
                                ${isToday ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}
                                ${hasEvent && !isToday ? 'relative after:content-[""] after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-blue-500 after:rounded-full' : ''}
                            `}>
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const notifications = [
        { id: 1, text: 'Riya applied for leave', time: '2h ago', action: true },
        { id: 2, text: 'System maintenance at midnight', time: '5h ago', action: false },
        { id: 3, text: 'New policy document updated', time: '1d ago', action: false },
    ];

    return (
        <div className="space-y-6">
            {renderMiniCalendar()}

            {/* Notifications Widget */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Bell size={18} className="text-blue-500" /> Notifications
                    </h3>
                    <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18} /></button>
                </div>
                <div className="space-y-4">
                    {notifications.map(n => (
                        <div key={n.id} className="pb-3 border-b border-slate-50 dark:border-slate-700 last:border-0 last:pb-0">
                            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{n.text}</p>
                            <span className="text-xs text-slate-400 mt-1 block">{n.time}</span>
                            {n.action && (
                                <div className="flex gap-2 mt-2">
                                    <button className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">View</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
