import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, Calendar, DollarSign } from 'lucide-react';
import type { Employee } from '../../types';

interface EmployeeProfileProps {
    employee: Employee;
    onBack: () => void;
}

export const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee, onBack }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'attendance' | 'leave' | 'payroll'>('info');

    return (
        <div className="space-y-6">
            {/* Header / Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
                <ArrowLeft size={20} />
                Back to Directory
            </button>

            {/* Profile Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold border-4 border-white shadow-lg">
                    {employee.name.charAt(0)}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-slate-900">{employee.name}</h2>
                    <p className="text-lg text-slate-500 mt-1">{employee.position} • {employee.department}</p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                            {employee.status}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-600 text-sm">
                            <Mail size={16} /> {employee.email}
                        </span>
                        {employee.phone && (
                            <span className="flex items-center gap-1.5 text-slate-600 text-sm">
                                <Phone size={16} /> {employee.phone}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 flex gap-6 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('info')}
                    className={`pb-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'info' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Profile Info
                </button>
                <button
                    onClick={() => setActiveTab('attendance')}
                    className={`pb-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'attendance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Attendance Summary
                </button>
                <button
                    onClick={() => setActiveTab('leave')}
                    className={`pb-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'leave' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Leave Balance
                </button>
                <button
                    onClick={() => setActiveTab('payroll')}
                    className={`pb-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'payroll' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Payroll History
                </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 min-h-[300px]">
                {activeTab === 'info' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">Personal Details</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                                    <p className="text-slate-900 font-medium">{employee.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Email Address</label>
                                    <p className="text-slate-900 font-medium">{employee.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Phone Number</label>
                                    <p className="text-slate-900 font-medium">{employee.phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Address</label>
                                    <p className="text-slate-900 font-medium flex items-center gap-1.5 list-none">
                                        {employee.address || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">Employment Details</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Employee ID</label>
                                    <p className="text-slate-900 font-medium">{employee.id}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Date of Joining</label>
                                    <p className="text-slate-900 font-medium flex items-center gap-1.5">
                                        <Calendar size={16} className="text-slate-400" />
                                        {employee.joinDate || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Role</label>
                                    <p className="text-slate-900 font-medium capitalize">{employee.role}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Basic Salary</label>
                                    <p className="text-slate-900 font-medium flex items-center gap-1.5">
                                        <DollarSign size={16} className="text-slate-400" />
                                        ₹{employee.basicSalary?.toLocaleString() || '0'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'attendance' && (
                    <div className="text-center py-12">
                        <p className="text-slate-500">Attendance data integration would appear here.</p>
                        <p className="text-sm text-slate-400 mt-2">(Total working days, Present, Absent, Late counts)</p>
                    </div>
                )}

                {activeTab === 'leave' && (
                    <div className="text-center py-12">
                        <p className="text-slate-500">Leave balance integration would appear here.</p>
                        <p className="text-sm text-slate-400 mt-2">(Casual, Sick, Earned Leave Balances)</p>
                    </div>
                )}

                {activeTab === 'payroll' && (
                    <div className="text-center py-12">
                        <p className="text-slate-500">Payroll history integration would appear here.</p>
                        <p className="text-sm text-slate-400 mt-2">(Last salary paid, Payslip archives)</p>
                    </div>
                )}
            </div>
        </div>
    );
};
