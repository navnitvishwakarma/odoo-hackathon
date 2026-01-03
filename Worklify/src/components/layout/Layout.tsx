import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
    return (
        <div className="flex min-h-screen relative overflow-hidden transition-colors duration-200">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'contrast(1.2) sepia(0.2)'
                }}
            />

            {/* Background Color Layer (for theme tinting) */}
            <div className="absolute inset-0 z-0 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm pointer-events-none" />

            <div className="relative z-10 flex w-full">
                <Sidebar />
                <div className="flex-1 ml-64 flex flex-col">
                    <Header />
                    <main className="flex-1 p-8 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
export default Layout;
