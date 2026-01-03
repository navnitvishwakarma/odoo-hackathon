import React, { useState, useEffect } from 'react';
import { Save, User, Building, Clock, Calculator, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CompanySettings } from '../components/settings/CompanySettings';
import { AttendanceSettings } from '../components/settings/AttendanceSettings';
import { LeavePayrollSettings } from '../components/settings/LeavePayrollSettings';
import { SystemSettings } from '../components/settings/SystemSettings';
import { ChangePassword } from '../components/settings/ChangePassword';
import { FaceRegistration } from '../components/settings/FaceRegistration';

const TabButton = ({
    id,
    label,
    icon: Icon,
    activeTab,
    setActiveTab
}: {
    id: 'profile' | 'general' | 'attendance' | 'leave_payroll' | 'system';
    label: string;
    icon: any;
    activeTab: string;
    setActiveTab: (tab: 'profile' | 'general' | 'attendance' | 'leave_payroll' | 'system') => void;
}) => (
    <button
        onClick={() => setActiveTab(id)}
        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${activeTab === id
            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
    >
        <Icon size={18} />
        {label}
    </button>
);

const Settings: React.FC = () => {
    const { user } = useAuth();
    const isHrOrAdmin = user?.role === 'admin' || user?.role === 'hr';

    // Default to 'profile' for employees, 'general' for admins
    const [activeTab, setActiveTab] = useState<'profile' | 'general' | 'attendance' | 'leave_payroll' | 'system'>(
        isHrOrAdmin ? 'general' : 'profile'
    );

    // Ensure employees don't get stuck on a restricted tab if role changes or on refresh
    useEffect(() => {
        if (!isHrOrAdmin) {
            setActiveTab('profile');
        }
    }, [isHrOrAdmin]);

    const handleSave = () => {
        // Since we use Context, state is already updated in memory.
        // In a real app, this would trigger an API call.
        alert('Settings saved successfully!');
    };

    return (
        <div className="p-6 max-w-5xl mx-auto animate-in fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        {activeTab === 'profile' ? 'Manage your personal account settings' : "Manage your organization's configuration"}
                    </p>
                </div>
                {/* Save button only relevant for global config, individual profile forms have their own buttons */}
                {activeTab !== 'profile' && (
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <Save size={20} />
                        Save Configuration
                    </button>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex-shrink-0 space-y-8">
                    <nav className="space-y-1">
                        <div className="pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider px-4">
                            Personal
                        </div>
                        <TabButton id="profile" label="My Profile" icon={User} activeTab={activeTab} setActiveTab={setActiveTab} />

                        {isHrOrAdmin && (
                            <>
                                <div className="pt-6 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider px-4">
                                    Organization
                                </div>
                                <TabButton id="general" label="Company & General" icon={Building} activeTab={activeTab} setActiveTab={setActiveTab} />
                                <TabButton id="attendance" label="Attendance Rules" icon={Clock} activeTab={activeTab} setActiveTab={setActiveTab} />
                                <TabButton id="leave_payroll" label="Leave & Payroll" icon={Calculator} activeTab={activeTab} setActiveTab={setActiveTab} />
                                <TabButton id="system" label="System & Roles" icon={Shield} activeTab={activeTab} setActiveTab={setActiveTab} />
                            </>
                        )}
                    </nav>

                    {/* Holiday Calendar Mini-Widget (Requested in task) - Showing for everyone */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Upcoming Holidays</h4>
                        <ul className="space-y-3">
                            <li className="flex justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Republic Day</span>
                                <span className="font-medium dark:text-slate-200">26 Jan</span>
                            </li>
                            <li className="flex justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Independence Day</span>
                                <span className="font-medium dark:text-slate-200">15 Aug</span>
                            </li>
                            <li className="flex justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Gandhi Jayanti</span>
                                <span className="font-medium dark:text-slate-200">02 Oct</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                            <FaceRegistration />
                            <ChangePassword />
                        </div>
                    )}

                    {isHrOrAdmin && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            {activeTab === 'general' && <CompanySettings />}
                            {activeTab === 'attendance' && <AttendanceSettings />}
                            {activeTab === 'leave_payroll' && <LeavePayrollSettings />}
                            {activeTab === 'system' && <SystemSettings />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
