// ... (imports remain same) which are React and Lucide icons
import React from 'react';
import { Users, UserCheck, UserMinus, IndianRupee, ArrowUpRight } from 'lucide-react';

interface DashboardKPIProps {
    role: 'admin' | 'hr' | 'manager' | 'employee';
}

export const DashboardKPI: React.FC<DashboardKPIProps> = ({ role }) => {
    // Helper for rendering interactive card
    const renderCard = (title: string, value: string, subtitle: string, icon: React.ElementType, color: string, bg: string, onClick?: () => void) => (
        <div
            onClick={onClick}
            className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
        >
            <div className={`absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400`}>
                <ArrowUpRight size={20} />
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${bg} ${color}`}>
                    {React.createElement(icon, { size: 24 })}
                </div>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</span>
            </div>
            <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{value}</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    {subtitle}
                </p>
            </div>
        </div>
    );

    if (role === 'employee') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {renderCard('Attendance', '22 / 24', 'Days Present', UserCheck, 'text-green-600', 'bg-green-50 dark:bg-green-500/10')}
                {renderCard('Leave Bal', '12', 'Available Days', UserMinus, 'text-blue-600', 'bg-blue-50 dark:bg-blue-500/10')}
                {renderCard('Net Pay', '₹72,000', 'Last Month', IndianRupee, 'text-purple-600', 'bg-purple-50 dark:bg-purple-500/10')}
                {renderCard('Status', 'Active', 'Current Status', UserCheck, 'text-orange-600', 'bg-orange-50 dark:bg-orange-500/10')}
            </div>
        );
    }

    // Admin / HR View
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderCard('Total Staff', '128', '+3 New this month', Users, 'text-blue-600', 'bg-blue-50 dark:bg-blue-500/10')}
            {renderCard('Present Today', '112', '8 Late Arrivals', UserCheck, 'text-green-600', 'bg-green-50 dark:bg-green-500/10')}
            {renderCard('On Leave', '6', '4 Pending Requests', UserMinus, 'text-yellow-600', 'bg-yellow-50 dark:bg-yellow-500/10')}
            {renderCard('Payroll Due', '₹3.2L', 'For Jan 2026', IndianRupee, 'text-purple-600', 'bg-purple-50 dark:bg-purple-500/10')}
        </div>
    );
};
