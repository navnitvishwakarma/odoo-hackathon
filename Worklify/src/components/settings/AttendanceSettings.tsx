import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { SettingSection } from './SettingSection';

export const AttendanceSettings: React.FC = () => {
    const { settings, updateSettings } = useSettings();
    const { attendance } = settings;

    const handleChange = (field: keyof typeof attendance, value: any) => {
        updateSettings('attendance', { [field]: value });
    };

    return (
        <SettingSection title="Attendance Rules" description="Configure late marks, half-days, and geo-fencing.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Late Tolerance (Minutes)</label>
                    <input
                        type="number"
                        value={attendance.lateThresholdMinutes}
                        onChange={(e) => handleChange('lateThresholdMinutes', Number(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-slate-500 mt-1">Allowed delay after office start time.</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Half-Day After (Time)</label>
                    <input
                        type="time"
                        value={attendance.halfDayTime}
                        onChange={(e) => handleChange('halfDayTime', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Auto-Absent After (Time)</label>
                    <input
                        type="time"
                        value={attendance.autoAbsentTime}
                        onChange={(e) => handleChange('autoAbsentTime', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="geoFence"
                        checked={attendance.enableLocationCheck}
                        onChange={(e) => handleChange('enableLocationCheck', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="geoFence" className="text-sm font-medium text-slate-700">
                        Enable Location-Based Check-in (Geo-Fencing)
                    </label>
                </div>
            </div>
        </SettingSection>
    );
};
