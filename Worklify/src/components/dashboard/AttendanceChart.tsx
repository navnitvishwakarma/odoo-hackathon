import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const AttendanceChart: React.FC = () => {
    // Mock Data
    const data = [
        { name: 'Present', value: 112, color: '#22c55e' }, // Green
        { name: 'Late', value: 8, color: '#eab308' },    // Yellow
        { name: 'Absent', value: 6, color: '#ef4444' },  // Red
        { name: 'On Leave', value: 2, color: '#3b82f6' } // Blue
    ];

    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    const presentCount = data.find(d => d.name === 'Present')?.value || 0;
    const attendanceRate = Math.round((presentCount / total) * 100);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Attendance Overview Today</h3>

            <div className="flex-1 min-h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', color: '#1e293b' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value, entry: any) => (
                                <span className="text-slate-600 dark:text-slate-300 font-medium ml-1">{value} ({entry.payload.value})</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">{attendanceRate}%</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Present</span>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Total Staff: <strong className="text-slate-900 dark:text-white">{total}</strong></span>
                <span>Not Checked In: <strong className="text-slate-900 dark:text-white">{total - presentCount - 8}</strong></span>
            </div>
        </div>
    );
};
