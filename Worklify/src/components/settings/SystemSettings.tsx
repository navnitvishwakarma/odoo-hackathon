import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { SettingSection } from './SettingSection';

export const SystemSettings: React.FC = () => {
    const { settings, updateSettings } = useSettings();
    const { system } = settings;

    const handleChange = (field: keyof typeof system, value: any) => {
        updateSettings('system', { [field]: value });
    };

    const handleNotificationChange = (field: keyof typeof system.notifications, value: boolean) => {
        updateSettings('system', {
            notifications: {
                ...system.notifications,
                [field]: value
            }
        });
    };

    return (
        <SettingSection title="System Preferences" description="Customize display, currency, and notifications.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Currency Symbol</label>
                    <input
                        type="text"
                        value={system.currency}
                        onChange={(e) => handleChange('currency', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date Format</label>
                    <select
                        value={system.dateFormat}
                        onChange={(e) => handleChange('dateFormat', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-medium text-slate-900 mb-4">Email Notifications</h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="notif_leave"
                            checked={system.notifications.leaveRequest}
                            onChange={(e) => handleNotificationChange('leaveRequest', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="notif_leave" className="text-sm text-slate-600">Notify on new Leave Request</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="notif_approval"
                            checked={system.notifications.leaveApproval}
                            onChange={(e) => handleNotificationChange('leaveApproval', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="notif_approval" className="text-sm text-slate-600">Notify on Leave Approval/Rejection</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="notif_late"
                            checked={system.notifications.lateArrival}
                            onChange={(e) => handleNotificationChange('lateArrival', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="notif_late" className="text-sm text-slate-600">Notify on Late Arrival</label>
                    </div>
                </div>
            </div>
        </SettingSection>
    );
};
