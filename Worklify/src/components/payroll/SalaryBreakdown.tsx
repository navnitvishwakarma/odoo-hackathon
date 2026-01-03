import React from 'react';
import type { SalaryStructure } from '../../types';

interface SalaryBreakdownProps {
    salary: SalaryStructure;
}

export const SalaryBreakdown: React.FC<SalaryBreakdownProps> = ({ salary }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-full">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Salary Breakdown</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Detailed view of earnings and deductions</p>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Earnings</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-300">Basic Salary</span>
                            <span className="font-medium text-slate-900 dark:text-white">₹{salary.basic.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-300">House Rent Allowance (HRA)</span>
                            <span className="font-medium text-slate-900 dark:text-white">₹{salary.hra.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-300">Special Allowances</span>
                            <span className="font-medium text-slate-900 dark:text-white">₹{salary.allowances.toLocaleString()}</span>
                        </div>
                        {salary.overtime > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-green-600 dark:text-green-400 font-medium">Overtime Pay</span>
                                <span className="font-medium text-green-700 dark:text-green-300">+ ₹{salary.overtime.toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">Gross Earnings</span>
                        <span className="font-bold text-slate-900 dark:text-white">₹{salary.gross.toLocaleString()}</span>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Deductions</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-300">Provident Fund (PF)</span>
                            <span className="font-medium text-red-600 dark:text-red-400">- ₹{salary.deductions.pf.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-300">Professional Tax</span>
                            <span className="font-medium text-red-600 dark:text-red-400">- ₹{salary.deductions.tax.toLocaleString()}</span>
                        </div>
                        {salary.deductions.unpaidLeave > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-300">Unpaid Leave Deduction</span>
                                <span className="font-medium text-red-600 dark:text-red-400">- ₹{salary.deductions.unpaidLeave.toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">Total Deductions</span>
                        <span className="font-bold text-red-600 dark:text-red-400">
                            - ₹{(salary.deductions.pf + salary.deductions.tax + salary.deductions.unpaidLeave).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="pt-4 border-t-2 border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div>
                            <span className="block text-sm text-blue-800 dark:text-blue-300 font-medium">Net Payable Amount</span>
                            <span className="text-xs text-blue-600 dark:text-blue-400">Directly credited to bank</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">₹{salary.net.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
