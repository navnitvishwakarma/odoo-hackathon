import React from 'react';
import { ChevronRight, ArrowUpRight, Clock, UserPlus, Briefcase } from 'lucide-react';

export const PriorityPanel: React.FC = () => {
    const tasks = [
        { id: 1, title: 'Review Leave Request', subtitle: 'Sarah Smith • Sick Leave', type: 'urgent', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
        { id: 2, title: 'Onboard New Designer', subtitle: 'Mike Ross • UX Department', type: 'normal', icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 3, title: 'Interview Candidate', subtitle: 'Frontend Dev Role • 2:00 PM', type: 'normal', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pending Actions</h3>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 transition-colors">
                    View All <ChevronRight size={16} />
                </button>
            </div>

            <div className="space-y-4">
                {tasks.map((task) => (
                    <div key={task.id} className="group flex items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                        <div className={`p-3 rounded-lg ${task.bg} ${task.color} mr-4`}>
                            <task.icon size={20} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{task.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{task.subtitle}</p>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-600 rounded-full transition-all opacity-0 group-hover:opacity-100">
                            <ArrowUpRight size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
