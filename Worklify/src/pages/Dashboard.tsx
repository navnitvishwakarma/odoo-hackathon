import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardKPI } from '../components/dashboard/DashboardKPI';
import { HeroSection } from '../components/dashboard/HeroSection';
import { PriorityPanel } from '../components/dashboard/PriorityPanel';
import { RightPanel } from '../components/dashboard/RightPanel';
import { AttendanceChart } from '../components/dashboard/AttendanceChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const role = user?.role || 'employee';

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Grid Layout: Main Content (Left) and Sidebar (Right) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Main Content Area - Spans 2 columns on large screens */}
                <div className="xl:col-span-2 space-y-8">
                    {/* 1. Hero Section ("Today's Focus") */}
                    <HeroSection />

                    {/* 2. KPI Cards (Interactive) */}
                    <DashboardKPI role={role} />

                    {/* 3. Priority Actions & Attendance Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Priority / Action List */}
                        <div className="h-full">
                            <PriorityPanel />
                        </div>

                        {/* Charts / Data */}
                        {/* Charts / Data */}
                        <div className="h-full">
                            <AttendanceChart />
                        </div>
                    </div>

                    {/* 4. Recent Activity (Full Width in Main Column) */}
                    {/* 4. Recent Activity (Full Width in Main Column) */}
                    <div>
                        <RecentActivity />
                    </div>
                </div>

                {/* Right Panel - Spans 1 column */}
                <div className="xl:col-span-1 space-y-8">
                    <RightPanel />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
