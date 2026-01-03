import React from 'react';
import { Briefcase, HeartPulse, Award, AlertCircle } from 'lucide-react';
import type { LeaveBalance } from '../../types';
import clsx from 'clsx';

interface LeaveBalanceProps {
    balances: LeaveBalance[];
}

export const LeaveBalanceCards: React.FC<LeaveBalanceProps> = ({ balances }) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'Casual': return Briefcase;
            case 'Sick': return HeartPulse;
            case 'Earned': return Award;
            default: return AlertCircle;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'Casual': return 'bg-blue-50 text-blue-600';
            case 'Sick': return 'bg-red-50 text-red-600';
            case 'Earned': return 'bg-green-50 text-green-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {balances.map((balance) => {
                const Icon = getIcon(balance.type);
                const colorClass = getColor(balance.type);

                return (
                    <div key={balance.type} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className={clsx('p-3 rounded-lg', colorClass)}>
                                <Icon size={24} />
                            </div>
                            <span className="text-sm font-medium text-slate-500">{balance.type} Leave</span>
                        </div>

                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-3xl font-bold text-slate-900">
                                    {balance.total - balance.used}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Available
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-slate-700">
                                    {balance.used} / {balance.type === 'Unpaid' ? '∞' : balance.total}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Consumed
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar (Not for Unpaid) */}
                        {balance.type !== 'Unpaid' && (
                            <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={clsx('h-full rounded-full', colorClass.replace('bg-', 'bg-').split(' ')[0].replace('50', '500'))}
                                    style={{ width: `${(balance.used / balance.total) * 100}%` }}
                                ></div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
