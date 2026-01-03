import React from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-200 relative overflow-hidden">
            {/* Watermark Logo Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-10">
                <span className="text-4xl font-black text-slate-700 dark:text-slate-300 uppercase tracking-[0.5em] select-none">
                    Worklify
                </span>
            </div>

            <div className="flex-1 flex justify-center z-10">
                <div className="relative w-full max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for anything..."
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-transparent dark:border-slate-700/50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6 z-10">
                <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-200 dark:border-slate-700">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.position}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
