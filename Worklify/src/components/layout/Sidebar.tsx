import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    CalendarCheck,
    Clock,
    Users,
    CreditCard,
    Settings,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import clsx from 'clsx';

const Sidebar: React.FC = () => {
    const { user, logout } = useAuth();

    // navItems removed as we are using custom sections
    // const navItems: NavItem[] = [
    //     { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    //     { label: 'Attendance', path: '/attendance', icon: Clock },
    //     { label: 'Leave', path: '/leave', icon: CalendarCheck },
    //     { label: 'Payroll', path: '/payroll', icon: CreditCard },
    //     { label: 'Employees', path: '/employees', icon: Users, roles: ['admin', 'hr'] },
    //     { label: 'Settings', path: '/settings', icon: Settings },
    // ];

    // const filteredItems = navItems.filter(item =>
    //     !item.roles || (user && item.roles.includes(user.role))
    // );

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white p-4 flex flex-col">
            <div className="flex items-center gap-3 px-2 mb-8 mt-2 h-10 w-full">
                <img src="/logo.jpg" alt="Worklify Logo" className="h-10 w-10 object-cover rounded-full bg-white" />
                <span className="text-xl font-bold tracking-tight">Worklify</span>
            </div>

            <nav className="flex-1 space-y-6 overflow-y-auto pr-2">
                {/* Section: Overview */}
                <div>
                    <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Overview</h3>
                    <div className="space-y-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) => clsx(
                                'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium',
                                isActive
                                    ? 'bg-blue-600 shadow-md shadow-blue-500/20 text-white'
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                            )}
                        >
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </NavLink>
                    </div>
                </div>

                {/* Section: Workforce / Management */}
                <div>
                    <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Management</h3>
                    <div className="space-y-1">
                        <NavLink to="/attendance" className={({ isActive }) => clsx('flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium', isActive ? 'bg-blue-600 shadow-md shadow-blue-500/20 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white')}>
                            <Clock size={20} />
                            <span>Attendance</span>
                        </NavLink>
                        <NavLink to="/leave" className={({ isActive }) => clsx('flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium', isActive ? 'bg-blue-600 shadow-md shadow-blue-500/20 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white')}>
                            <CalendarCheck size={20} />
                            <span>Leave</span>
                        </NavLink>
                        <NavLink to="/payroll" className={({ isActive }) => clsx('flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium', isActive ? 'bg-blue-600 shadow-md shadow-blue-500/20 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white')}>
                            <CreditCard size={20} />
                            <span>Payroll</span>
                        </NavLink>
                        {(!user?.role || ['admin', 'hr'].includes(user.role)) && (
                            <NavLink to="/employees" className={({ isActive }) => clsx('flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium', isActive ? 'bg-blue-600 shadow-md shadow-blue-500/20 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white')}>
                                <Users size={20} />
                                <span>Employees</span>
                            </NavLink>
                        )}
                    </div>
                </div>

                {/* Section: Account */}
                <div>
                    <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Account</h3>
                    <div className="space-y-1">
                        <NavLink to="/settings" className={({ isActive }) => clsx('flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium', isActive ? 'bg-blue-600 shadow-md shadow-blue-500/20 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white')}>
                            <Settings size={20} />
                            <span>Settings</span>
                        </NavLink>
                    </div>
                </div>
            </nav>

            <div className="border-t border-slate-800 pt-4 mt-auto">
                <div className="flex items-center gap-3 px-4 mb-4">
                    <div className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg",
                        user?.role === 'admin' && "bg-purple-600",
                        user?.role === 'hr' && "bg-blue-600",
                        (!user?.role || user?.role === 'employee') && "bg-green-600"
                    )}>
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            user?.name?.charAt(0) || 'U'
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate text-white">{user?.name}</p>
                        <p className={clsx(
                            "text-xs font-medium uppercase tracking-wider",
                            user?.role === 'admin' && "text-purple-300",
                            user?.role === 'hr' && "text-blue-300",
                            (!user?.role || user?.role === 'employee') && "text-green-300"
                        )}>
                            {user?.role === 'hr' ? 'HR Manager' : user?.role || 'Employee'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-2 w-full text-left text-slate-400 hover:text-red-400 transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
