import React, { createContext, useContext, useState } from 'react';

// Define types for each section
export interface CompanySettings {
    name: string;
    address: string;
    workingDays: string[];
    officeStartTime: string;
    officeEndTime: string;
}

export interface AttendanceSettings {
    lateThresholdMinutes: number;
    halfDayTime: string;
    autoAbsentTime: string;
    enableLocationCheck: boolean;
}

export interface LeaveSettings {
    casualLeaveQuota: number;
    sickLeaveQuota: number;
    earnedLeaveQuota: number;
    unpaidLeaveQuota: number;
    carryForwardAllowed: boolean;
}

export interface PayrollSettings {
    salaryCycle: string;
    salaryCreditDate: number;
    pfPercentage: number;
    taxPercentage: number;
    overtimeRatePerHour: number;
}

export interface SystemSettings {
    theme: 'light' | 'dark';
    currency: string;
    dateFormat: string;
    notifications: {
        leaveRequest: boolean;
        leaveApproval: boolean;
        lateArrival: boolean;
        payrollGenerated: boolean;
    };
}

export interface AppSettings {
    company: CompanySettings;
    attendance: AttendanceSettings;
    leave: LeaveSettings;
    payroll: PayrollSettings;
    system: SystemSettings;
}

interface SettingsContextType {
    settings: AppSettings;
    updateSettings: (section: keyof AppSettings, data: Partial<AppSettings[keyof AppSettings]>) => void;
}

// Default State
const defaultSettings: AppSettings = {
    company: {
        name: 'Worklify',
        address: '123 Business Park, New Delhi',
        workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        officeStartTime: '09:30',
        officeEndTime: '18:00',
    },
    attendance: {
        lateThresholdMinutes: 15,
        halfDayTime: '13:00',
        autoAbsentTime: '11:00',
        enableLocationCheck: true,
    },
    leave: {
        casualLeaveQuota: 12,
        sickLeaveQuota: 8,
        earnedLeaveQuota: 15,
        unpaidLeaveQuota: 0,
        carryForwardAllowed: true,
    },
    payroll: {
        salaryCycle: 'Monthly',
        salaryCreditDate: 1,
        pfPercentage: 12,
        taxPercentage: 10,
        overtimeRatePerHour: 500,
    },
    system: {
        theme: 'light',
        currency: '₹',
        dateFormat: 'DD/MM/YYYY',
        notifications: {
            leaveRequest: true,
            leaveApproval: true,
            lateArrival: true,
            payrollGenerated: true,
        },
    },
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);

    const updateSettings = (section: keyof AppSettings, data: any) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                ...data
            }
        }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
