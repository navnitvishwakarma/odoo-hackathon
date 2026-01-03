import React from 'react';
import { Lock, CreditCard } from 'lucide-react';

export const AdminPayrollControls: React.FC = () => {
    return (
        <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-bold mb-1">Admin Payroll Controls</h3>
                    <p className="text-slate-400 text-sm">Manage monthly payroll generation and payments.</p>
                </div>

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors">
                        <Lock size={18} />
                        Lock Payroll
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors shadow-blue-900/20 shadow-lg">
                        <CreditCard size={18} />
                        Mark as Paid
                    </button>
                </div>
            </div>
        </div>
    );
};
