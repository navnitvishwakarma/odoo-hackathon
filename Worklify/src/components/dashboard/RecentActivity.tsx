import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, FileText, UserPlus, Info, Bell, Loader } from 'lucide-react';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

interface Activity {
    _id: string;
    type: 'attendance' | 'leave' | 'payroll' | 'onboarding' | 'system' | 'announcement';
    message: string;
    user?: { name: string };
    createdAt: string;
}

export const RecentActivity: React.FC = () => {
    const { user } = useAuth();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    const role = user?.role || 'employee';

    // Dynamic Title based on Role
    const getTitle = () => {
        if (role === 'admin') return 'Organization Activity';
        if (role === 'hr') return 'Workforce Activity';
        return 'Your Recent Activity';
    };

    // Helper to get Icon and Color based on type
    const getActivityStyle = (type: string) => {
        switch (type) {
            case 'attendance':
                return { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' };
            case 'leave':
                return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' };
            case 'payroll':
                return { icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' };
            case 'onboarding':
                return { icon: UserPlus, color: 'text-orange-600', bg: 'bg-orange-50' };
            case 'announcement':
                return { icon: Bell, color: 'text-red-600', bg: 'bg-red-50' };
            default:
                return { icon: Info, color: 'text-slate-600', bg: 'bg-slate-50' };
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const res = await axios.get('/activity');
                setActivities(res.data);
            } catch (err) {
                console.error("Failed to fetch activity", err);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, []);

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 h-full flex items-center justify-center">
                <Loader className="animate-spin text-blue-500" />
            </div>
        );
    }

    const filteredActivities = activities.filter(item => {
        if (item.type === 'leave' && role !== 'hr' && role !== 'admin') {
            return false;
        }
        return true;
    });

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{getTitle()}</h3>

            <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] scrollbar-hide">
                {filteredActivities.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No recent activity found.</p>
                ) : (
                    filteredActivities.map((item) => {
                        const style = getActivityStyle(item.type);
                        const Icon = style.icon;

                        return (
                            <div key={item._id} className="flex items-start gap-3 group">
                                <div className={`mt-0.5 p-2 rounded-lg ${style.bg} ${style.color} dark:bg-opacity-20`}>
                                    <Icon size={16} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-900 dark:text-slate-200">
                                        {/* Highlight the user name if it exists in message, simplistic approach */}
                                        {item.message}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{formatTime(item.createdAt)}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* View All button can redirect to a dedicated Activity Log page in future */}
            <button className="w-full mt-4 py-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                View All Activity
            </button>
        </div>
    );
};
