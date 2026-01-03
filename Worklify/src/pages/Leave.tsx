import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LeaveBalanceCards } from '../components/leave/LeaveBalanceCards';
import { LeaveHistoryTable } from '../components/leave/LeaveHistoryTable';
import { LeaveApprovalPanel } from '../components/leave/LeaveApprovalPanel';
import { ApplyLeaveModal } from '../components/leave/ApplyLeaveModal';
import type { LeaveRequest, LeaveBalance } from '../types';



const Leave: React.FC = () => {
    const { user } = useAuth();
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

    // Mock Data - In a real app, this would come from an API
    const [myBalances] = useState<LeaveBalance[]>([
        { type: 'Casual', used: 3, total: 12 },
        { type: 'Sick', used: 1, total: 10 },
        { type: 'Earned', used: 5, total: 15 },
        { type: 'Unpaid', used: 0, total: 0 },
    ]);

    const [myRequests, setMyRequests] = useState<LeaveRequest[]>([
        { id: '1', employeeId: 'e1', employeeName: 'John Doe', type: 'Casual', fromDate: '2025-01-10', toDate: '2025-01-12', reason: 'Family function', status: 'Pending', appliedOn: '2025-01-02' },
        { id: '2', employeeId: 'e1', employeeName: 'John Doe', type: 'Sick', fromDate: '2024-12-15', toDate: '2024-12-16', reason: 'Viral fever', status: 'Approved', appliedOn: '2024-12-14' },
    ]);

    const [teamRequests, setTeamRequests] = useState<LeaveRequest[]>([
        { id: '101', employeeId: 'e2', employeeName: 'Sarah Smith', type: 'Sick', fromDate: '2025-01-05', toDate: '2025-01-06', reason: 'Migraine', status: 'Pending', appliedOn: '2025-01-04' },
        { id: '102', employeeId: 'e3', employeeName: 'Mike Johnson', type: 'Earned', fromDate: '2025-01-20', toDate: '2025-01-25', reason: 'Vacation', status: 'Pending', appliedOn: '2025-01-01' },
        { id: '103', employeeId: 'e4', employeeName: 'Emily Brown', type: 'Casual', fromDate: '2024-12-28', toDate: '2024-12-28', reason: 'Personal work', status: 'Approved', appliedOn: '2024-12-20' },
    ]);

    const isHrOrAdmin = user?.role === 'admin' || user?.role === 'hr';

    // Handlers
    const handleApplyLeave = (data: any) => {
        const newRequest: LeaveRequest = {
            id: Date.now().toString(),
            employeeId: user?.id || 'unknown',
            employeeName: user?.name || 'Unknown',
            type: data.type,
            fromDate: data.fromDate,
            toDate: data.toDate,
            reason: data.reason,
            status: 'Pending',
            appliedOn: new Date().toISOString().split('T')[0],
        };
        setMyRequests([newRequest, ...myRequests]);
        setIsApplyModalOpen(false);
    };

    const handleApprove = (id: string, reason: string) => {
        setTeamRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: 'Approved' } : req
        ));
        console.log(`Approved request ${id} with reason: ${reason}`);
    };

    const handleReject = (id: string, reason: string) => {
        setTeamRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: 'Rejected' } : req
        ));
        console.log(`Rejected request ${id} with reason: ${reason}`);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Leave Management</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        {isHrOrAdmin ? 'Manage employee leave requests and view approvals.' : 'Track your leave balance and apply for new leaves.'}
                    </p>
                </div>
                {!isHrOrAdmin && (
                    <button
                        onClick={() => setIsApplyModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 font-medium"
                    >
                        <Plus size={20} />
                        Apply Leave
                    </button>
                )}
            </div>

            {/* Employee View: Balance Cards */}
            {!isHrOrAdmin && (
                <section>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Your Leave Balance</h2>
                    <LeaveBalanceCards balances={myBalances} />
                </section>
            )}

            {/* HR View: Pending Approvals */}
            {isHrOrAdmin && (
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Action Required</h2>
                    </div>
                    <LeaveApprovalPanel
                        requests={teamRequests.filter(r => r.status === 'Pending')}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                </section>
            )}

            {/* Common: History Table */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                        {isHrOrAdmin ? 'All Leave Requests' : 'Leave History'}
                    </h2>

                    {isHrOrAdmin && (
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 rounded-lg">
                            <Filter size={16} className="text-slate-500 ml-2" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as any)}
                                className="bg-transparent border-none text-sm text-slate-600 dark:text-slate-300 focus:ring-0 cursor-pointer py-1"
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    )}
                </div>

                <LeaveHistoryTable
                    requests={isHrOrAdmin
                        ? teamRequests.filter(r => filterStatus === 'All' || r.status === filterStatus)
                        : myRequests
                    }
                />
            </section>

            {/* Modals */}
            {/* Modals */}
            <ApplyLeaveModal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                onSubmit={handleApplyLeave}
            />
        </div>
    );
};

export default Leave;
