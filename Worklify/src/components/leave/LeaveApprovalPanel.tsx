import React, { useState } from 'react';
import { Check, X, MessageSquare } from 'lucide-react';
import type { LeaveRequest } from '../../types';

interface LeaveApprovalPanelProps {
    requests: LeaveRequest[];
    onApprove: (id: string, reason: string) => void;
    onReject: (id: string, reason: string) => void;
}

export const LeaveApprovalPanel: React.FC<LeaveApprovalPanelProps> = ({ requests, onApprove, onReject }) => {
    const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
    const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
    const [reason, setReason] = useState('');

    const initiateAction = (req: LeaveRequest, type: 'approve' | 'reject') => {
        setSelectedRequest(req);
        setActionType(type);
        setReason('');
    };

    const handleConfirm = () => {
        if (!selectedRequest || !actionType) return;

        if (actionType === 'approve') {
            onApprove(selectedRequest.id, reason);
        } else {
            onReject(selectedRequest.id, reason);
        }

        closeModal();
    };

    const closeModal = () => {
        setSelectedRequest(null);
        setActionType(null);
        setReason('');
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Pending Approvals</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review leave applications from your team.</p>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {requests.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                        No pending approvals.
                    </div>
                ) : (
                    requests.map((req) => (
                        <div key={req.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-semibold text-slate-900 dark:text-white">{req.employeeName}</span>
                                    <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">{req.type}</span>
                                    <span className="text-xs text-slate-400">• Applied on {req.appliedOn}</span>
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                                    <span className="font-medium">Dates:</span> {req.fromDate} to {req.toDate}
                                </div>
                                <div className="flex items-start gap-2 mt-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                    <MessageSquare size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-slate-500 dark:text-slate-400 italic">"{req.reason}"</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => initiateAction(req, 'reject')}
                                    className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium transition-colors"
                                >
                                    <X size={16} />
                                    Reject
                                </button>
                                <button
                                    onClick={() => initiateAction(req, 'approve')}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors shadow-sm"
                                >
                                    <Check size={16} />
                                    Approve
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Confirmation Modal */}
            {selectedRequest && actionType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {actionType === 'approve' ? 'Approve Leave Request' : 'Reject Leave Request'}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                            You are about to <span className={actionType === 'approve' ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{actionType}</span> the leave request for <span className="font-semibold text-slate-900 dark:text-white">{selectedRequest.employeeName}</span>.
                        </p>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Reason / Comment <span className="text-slate-400 font-normal">(Optional)</span>
                            </label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full h-24 p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Enter reason for ${actionType}ing...`}
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className={`px-6 py-2 text-white rounded-lg font-medium shadow-sm transition-colors ${actionType === 'approve'
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-red-600 hover:bg-red-700'
                                    }`}
                            >
                                Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
