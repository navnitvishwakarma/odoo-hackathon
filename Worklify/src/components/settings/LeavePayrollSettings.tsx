import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { SettingSection } from './SettingSection';

export const LeavePayrollSettings: React.FC = () => {
    const { settings, updateSettings } = useSettings();
    const { leave, payroll } = settings;

    const handleLeaveChange = (field: keyof typeof leave, value: any) => {
        updateSettings('leave', { [field]: value });
    };

    const handlePayrollChange = (field: keyof typeof payroll, value: any) => {
        updateSettings('payroll', { [field]: value });
    };

    return (
        <>
            <SettingSection title="Leave Policy" description="Set annual leave quotas and carry forward rules.">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Casual Leave</label>
                        <input
                            type="number"
                            value={leave.casualLeaveQuota}
                            onChange={(e) => handleLeaveChange('casualLeaveQuota', Number(e.target.value))}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Sick Leave</label>
                        <input
                            type="number"
                            value={leave.sickLeaveQuota}
                            onChange={(e) => handleLeaveChange('sickLeaveQuota', Number(e.target.value))}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Earned Leave</label>
                        <input
                            type="number"
                            value={leave.earnedLeaveQuota}
                            onChange={(e) => handleLeaveChange('earnedLeaveQuota', Number(e.target.value))}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mt-8">
                            <input
                                type="checkbox"
                                id="carryForward"
                                checked={leave.carryForwardAllowed}
                                onChange={(e) => handleLeaveChange('carryForwardAllowed', e.target.checked)}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="carryForward" className="text-sm font-medium text-slate-700">
                                Allow Carry Forward
                            </label>
                        </div>
                    </div>
                </div>
            </SettingSection>

            <SettingSection title="Payroll Configuration" description="Manage salary cycles, tax, and PF rules.">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Salary Cycle</label>
                        <select
                            value={payroll.salaryCycle}
                            onChange={(e) => handlePayrollChange('salaryCycle', e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Monthly">Monthly</option>
                            <option value="Weekly">Weekly</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">PF Contribution (%)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={payroll.pfPercentage}
                                onChange={(e) => handlePayrollChange('pfPercentage', Number(e.target.value))}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tax Deduction (%)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={payroll.taxPercentage}
                                onChange={(e) => handlePayrollChange('taxPercentage', Number(e.target.value))}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Overtime Rate (₹/hr)</label>
                        <input
                            type="number"
                            value={payroll.overtimeRatePerHour}
                            onChange={(e) => handlePayrollChange('overtimeRatePerHour', Number(e.target.value))}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </SettingSection>
        </>
    );
};
