import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, FileText, UserPlus, Calendar } from 'lucide-react';

interface QuickActionsProps {
    role: 'admin' | 'hr' | 'manager' | 'employee';
}

export const QuickActions: React.FC<QuickActionsProps> = ({ role }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => navigate('/attendance')}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                >
                    <LogIn size={24} className="mb-2" />
                    <span className="text-sm font-medium">Check In/Out</span>
                </button>

                <button
                    onClick={() => navigate('/leave')}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                >
                    <Calendar size={24} className="mb-2" />
                    <span className="text-sm font-medium">Apply Leave</span>
                </button>

                <button
                    onClick={() => navigate('/payroll')}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                >
                    <FileText size={24} className="mb-2" />
                    <span className="text-sm font-medium">Payslip</span>
                </button>

                {(role === 'admin' || role === 'hr') && (
                    <button
                        onClick={() => navigate('/employees')}
                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors"
                    >
                        <UserPlus size={24} className="mb-2" />
                        <span className="text-sm font-medium">Add Staff</span>
                    </button>
                )}
            </div>
        </div>
    );
};
