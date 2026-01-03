import React from 'react';
import { Search } from 'lucide-react';
import type { AttendanceRecord } from '../../types';
import clsx from 'clsx';
import { FULL_DAY_HOURS } from '../../utils/constants';

// Helper to simulate data enhancement (In a real app, this comes from backend)
const enhanceMockData = (data: AttendanceRecord[]): AttendanceRecord[] => {
    return data.map(record => {
        // Mock Overtime Calculation
        let overtime = 0;
        if (record.totalHours > FULL_DAY_HOURS) {
            overtime = Number((record.totalHours - FULL_DAY_HOURS).toFixed(2));
        }

        // Mock Late Calculation (Simple string comparison for demo)
        let isLate = false;
        if (record.checkIn && record.checkIn !== '-') {
            // Convert "09:15 AM" to comparable value manually for mock or just hardcode some
            // For this hackathon demo, let's say anyone checking in after 9:30 AM is late
            // "10:00 AM" contains "10" at start vs "09"
            const hour = parseInt(record.checkIn.split(':')[0]);
            const ampm = record.checkIn.split(' ')[1];

            if (ampm === 'AM' && hour > 9 && hour !== 12) { // 10, 11 AM
                isLate = true;
            }
        }

        return {
            ...record,
            overtimeHours: overtime,
            isLate: isLate || record.id === '4' // Force one late for demo (Emily)
        };
    });
};

const rawMockData: AttendanceRecord[] = [
    {
        id: '1',
        employeeId: 'EMP001',
        employeeName: 'Aman',
        date: new Date().toISOString(),
        checkIn: '09:15 AM',
        checkOut: '06:05 PM',
        status: 'present',
        totalHours: 8.83,
        department: 'Engineering'
    },
    {
        id: '2',
        employeeId: 'EMP002',
        employeeName: 'Sarah Smith',
        date: new Date().toISOString(),
        checkIn: '09:00 AM',
        checkOut: '07:30 PM', // Worked late
        status: 'present',
        totalHours: 10.5,
        department: 'HR'
    },
    {
        id: '3',
        employeeId: 'EMP003',
        employeeName: 'Mike Johnson',
        date: new Date().toISOString(),
        checkIn: '-',
        checkOut: '-',
        status: 'absent',
        totalHours: 0,
        department: 'Sales'
    },
    {
        id: '4',
        employeeId: 'EMP004',
        employeeName: 'Emily Davis',
        date: new Date().toISOString(),
        checkIn: '10:15 AM', // Late
        checkOut: '06:15 PM',
        status: 'present', // Late but present
        totalHours: 8,
        department: 'Marketing'
    },
];

const mockAttendanceData = enhanceMockData(rawMockData);

export const AttendanceList: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Attendance Log</h3>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search employee..."
                            className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full md:w-64 text-slate-900 dark:text-white placeholder-slate-400"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Check In</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Check Out</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Hours</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Overtime</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {mockAttendanceData.map((record) => (
                            <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                                            {record.employeeName.charAt(0)}
                                        </div>
                                        <div className="ml-3">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">{record.employeeName}</p>
                                                {/* Mock Role Badge since we don't have role in record yet, assuming based on name/dept for demo */}
                                                {record.department === 'HR' && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">HR</span>}
                                                {record.department === 'Engineering' && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">DEV</span>}
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{record.department}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                    {new Date(record.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                                    <div className="flex items-center gap-2">
                                        {record.checkIn}
                                        {record.isLate && (
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                                                Late
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                                    {record.checkOut || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {record.totalHours > 0 ? `${Math.floor(record.totalHours)}h ${Math.round((record.totalHours % 1) * 60)}m` : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {record.overtimeHours && record.overtimeHours > 0 ? (
                                        <span className="text-green-600 font-medium">+{record.overtimeHours}h</span>
                                    ) : (
                                        <span className="text-slate-400">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={clsx(
                                        'px-2 py-1 text-xs font-medium rounded-full',
                                        record.status === 'present' && 'bg-green-100 text-green-700',
                                        record.status === 'absent' && 'bg-red-100 text-red-700',
                                        record.status === 'half-day' && 'bg-yellow-100 text-yellow-700',
                                        record.status === 'leave' && 'bg-blue-100 text-blue-700',
                                    )}>
                                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
