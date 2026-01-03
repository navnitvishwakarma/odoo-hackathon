import React from 'react';

interface SettingSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export const SettingSection: React.FC<SettingSectionProps> = ({ title, description, children }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-6 border-b border-slate-200 bg-slate-50">
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};
