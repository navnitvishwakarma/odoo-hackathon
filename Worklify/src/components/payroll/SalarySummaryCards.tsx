import React from 'react';
import { IndianRupee, TrendingDown, Wallet, Clock, ShieldCheck, Activity } from 'lucide-react';
import type { SalaryStructure, PayrollStatus } from '../../types';
import clsx from 'clsx';

interface SalarySummaryCardsProps {
    salary: SalaryStructure;
    status: PayrollStatus;
}

export const SalarySummaryCards: React.FC<SalarySummaryCardsProps> = ({ salary, status }) => {
    // Calculate total deductions for display
    const totalDeductions = salary.deductions.pf + salary.deductions.tax + salary.deductions.unpaidLeave;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Gross Salary - Premium Blue Gradient */}
            <div className="relative group bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-lg shadow-blue-500/20 text-white overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Activity size={100} />
                </div>
                <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                            <IndianRupee size={24} className="text-white" />
                        </div>
                        <span className="text-xs font-semibold bg-blue-500/30 px-2 py-1 rounded-full border border-blue-400/30">Earnings</span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-blue-100 mb-1">Gross Salary</div>
                        <p className="text-3xl font-bold tracking-tight">
                            ₹{salary.gross.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Deductions - Soft Red/Orange Background */}
            <div className="relative group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-900/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                        <TrendingDown size={24} />
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Deductions</span>
                </div>
                <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        ₹{totalDeductions.toLocaleString()}
                    </p>
                    <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1">
                        <TrendingDown size={14} />
                        PF, Tax & Leaves
                    </p>
                </div>
            </div>

            {/* Net Pay - Emerald Green Success Style */}
            <div className="relative group bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 shadow-lg shadow-emerald-500/20 text-white overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Wallet size={100} />
                </div>
                <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                            <Wallet size={24} className="text-white" />
                        </div>
                        <span className="text-xs font-semibold bg-emerald-400/30 px-2 py-1 rounded-full border border-emerald-300/30">Final Payout</span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-emerald-50 mb-1">Net Pay</div>
                        <p className="text-3xl font-bold tracking-tight">
                            ₹{salary.net.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Status - Dynamic Style based on Status */}
            <div className="relative group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                    <div className={clsx('p-3 rounded-xl',
                        status === 'Paid' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600'
                    )}>
                        {status === 'Paid' ? <ShieldCheck size={24} /> : <Clock size={24} />}
                    </div>
                    <span className={clsx("text-xs font-bold px-2 py-1 rounded-full border",
                        status === 'Paid' ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                    )}>
                        {status.toUpperCase()}
                    </span>
                </div>
                <div>
                    <p className={clsx("text-3xl font-bold", status === 'Paid' ? 'text-green-600' : 'text-amber-500')}>
                        {status === 'Paid' ? 'Processed' : 'Pending'}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                        {status === 'Paid' ? 'Transfer Successful' : 'Awaiting Admin Action'}
                    </p>
                </div>
            </div>
        </div>
    );
};
