import React from 'react';
import { Download, ChevronDown } from 'lucide-react';

interface PayrollHeaderProps {
    selectedMonth: string;
    onMonthChange: (month: string) => void;
    onDownload: () => void;
}

export const PayrollHeader: React.FC<PayrollHeaderProps> = ({ selectedMonth, onMonthChange, onDownload }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payroll / Payout</h1>

            <div className="flex gap-3">
                <div className="relative">
                    <select
                        value={selectedMonth}
                        onChange={(e) => onMonthChange(e.target.value)}
                        className="appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 py-2.5 pl-4 pr-10 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
                    >
                        <option value="January 2026">January 2026</option>
                        <option value="December 2025">December 2025</option>
                        <option value="November 2025">November 2025</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none" />
                </div>

                <button
                    onClick={onDownload}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <Download size={18} />
                    Download Payslip
                </button>
            </div>
        </div>
    );
};
