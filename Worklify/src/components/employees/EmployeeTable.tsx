import React from 'react';
import { Search, Filter, Edit2, UserX, Eye } from 'lucide-react';
import type { Employee } from '../../types';
import clsx from 'clsx';

interface EmployeeTableProps {
    employees: Employee[];
    onView: (employee: Employee) => void;
    onEdit: (employee: Employee) => void;
    onDelete: (employeeId: string) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onView, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-900">Employee Directory</h3>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full md:w-64"
                        />
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
                        <Filter size={18} />
                        Filter
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Dept</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center cursor-pointer" onClick={() => onView(employee)}>
                                        {employee.avatar ? (
                                            <img
                                                src={employee.avatar}
                                                alt={employee.name}
                                                className="h-10 w-10 rounded-full object-cover border border-slate-200"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                {employee.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{employee.name}</p>
                                            <p className="text-xs text-slate-500">{employee.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {employee.department}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 capitalize">
                                    {employee.position}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {employee.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={clsx(
                                        'px-2 py-1 text-xs font-medium rounded-full',
                                        employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                                    )}>
                                        {employee.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onView(employee)}
                                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                            title="View Profile"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => onEdit(employee)}
                                            className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(employee.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            title="Deactivate"
                                        >
                                            <UserX size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <p className="text-sm text-slate-500">Showing {employees.length} of {employees.length} records</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-white disabled:opacity-50">Previous</button>
                    <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-white">Next</button>
                </div>
            </div>
        </div>
    );
};
