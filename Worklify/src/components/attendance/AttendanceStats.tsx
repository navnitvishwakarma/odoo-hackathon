import React from 'react';
import { Users, UserX, Clock, UserMinus } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ElementType;
    color: 'blue' | 'red' | 'yellow' | 'green';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, color }) => {
    const colorStyles = {
        blue: 'bg-blue-50 text-blue-600',
        red: 'bg-red-50 text-red-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        green: 'bg-green-50 text-green-600',
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
                </div>
                <div className={clsx('p-3 rounded-lg', colorStyles[color])}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
};

export const AttendanceStats: React.FC = () => {
    // TODO: Replace with real data
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
                label="Present Today"
                value="142"
                icon={Users}
                color="green"
            />
            <StatCard
                label="Absent Today"
                value="12"
                icon={UserX}
                color="red"
            />
            <StatCard
                label="On Leave"
                value="8"
                icon={UserMinus}
                color="yellow"
            />
            <StatCard
                label="Avg. Hours"
                value="8h 45m"
                icon={Clock}
                color="blue"
            />
        </div>
    );
};
