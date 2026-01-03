import React from 'react';
import { CheckInWidget } from '../components/attendance/CheckInWidget';
import { AttendanceStats } from '../components/attendance/AttendanceStats';
import { AttendanceList } from '../components/attendance/AttendanceList';
import { AttendanceCalendar } from '../components/attendance/AttendanceCalendar';

const Attendance: React.FC = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Attendance Management</h1>

            <AttendanceStats />

            <CheckInWidget />

            <AttendanceList />

            <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Monthly Overview</h2>
                <AttendanceCalendar />
            </div>
        </div>
    );
};

export default Attendance;
