import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, Calendar } from 'lucide-react';

export const HeroSection: React.FC = () => {
    const { user } = useAuth();
    const role = user?.role || 'employee';

    // Dynamic content based on role
    const getHeroContent = () => {
        if (role === 'admin' || role === 'hr') {
            return {
                title: "Today's Focus",
                subtitle: "Here's what needs your attention today.",
                stats: [
                    { label: 'Late Arrivals', value: '8', color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'Leave Requests', value: '4', color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Payroll Due', value: '2 Days', color: 'text-purple-500', bg: 'bg-purple-50' },
                ],
                primaryAction: { label: 'Review Attendance', icon: Clock },
                secondaryAction: { label: 'Approve Leaves', icon: Calendar }
            };
        }
        return {
            title: "Your Day",
            subtitle: "You're on track! Here's your summary.",
            stats: [
                { label: 'Shift Duration', value: '08h 12m', color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'Pending Tasks', value: '12', color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Next Holiday', value: 'Jan 26', color: 'text-purple-500', bg: 'bg-purple-50' },
            ],
            primaryAction: { label: 'Check Out', icon: Clock },
            secondaryAction: { label: 'Apply Leave', icon: Calendar }
        };
    };

    const content = getHeroContent();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700/50 relative overflow-hidden group">
            {/* Decorative Background Blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all duration-500" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{content.title}</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">{content.subtitle}</p>

                    <div className="flex flex-wrap gap-4">
                        {content.stats.map((stat, index) => (
                            <div key={index} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-600/50">
                                <span className={`font-bold ${stat.color} text-lg`}>{stat.value}</span>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95">
                        <content.primaryAction.icon size={18} />
                        {content.primaryAction.label}
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-semibold rounded-xl border border-slate-200 dark:border-slate-600 transition-all">
                        {content.secondaryAction.label}
                    </button>
                </div>
            </div>
        </div>
    );
};
