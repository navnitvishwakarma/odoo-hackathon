import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { SettingSection } from './SettingSection';

export const CompanySettings: React.FC = () => {
    const { settings, updateSettings } = useSettings();
    const { company } = settings;

    const handleChange = (field: keyof typeof company, value: any) => {
        updateSettings('company', { [field]: value });
    };

    return (
        <SettingSection title="Company Settings" description="General information about your organization.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                    <input
                        type="text"
                        value={company.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Office Address</label>
                    <input
                        type="text"
                        value={company.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Office Start Time</label>
                    <input
                        type="time"
                        value={company.officeStartTime}
                        onChange={(e) => handleChange('officeStartTime', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Office End Time</label>
                    <input
                        type="time"
                        value={company.officeEndTime}
                        onChange={(e) => handleChange('officeEndTime', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                </div>
            </div>
        </SettingSection>
    );
};
