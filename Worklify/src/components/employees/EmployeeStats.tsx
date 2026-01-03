import React from 'react';
import { Users, UserCheck, UserMinus, UserPlus } from 'lucide-react';

export const EmployeeStats: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                        <Users size={24} />
                    </div>
                    <span className="text-sm font-medium text-slate-500">Total Staff</span>
                </div>
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-3xl font-bold text-slate-900">128</p>
                        <p className="text-xs text-slate-500 mt-1">Employees</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-green-50 text-green-600">
                        <UserCheck size={24} />
                    </div>
                    <span className="text-sm font-medium text-slate-500">Active</span>
                </div>
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-3xl font-bold text-slate-900">120</p>
                        <p className="text-xs text-slate-500 mt-1">Currently working</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
                        <UserMinus size={24} />
                    </div>
                    <span className="text-sm font-medium text-slate-500">On Leave</span>
                </div>
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-3xl font-bold text-slate-900">5</p>
                        <p className="text-xs text-slate-500 mt-1">Today</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                        <UserPlus size={24} />
                    </div>
                    <span className="text-sm font-medium text-slate-500">New Joins</span>
                </div>
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-3xl font-bold text-slate-900">3</p>
                        <p className="text-xs text-slate-500 mt-1">This month</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
