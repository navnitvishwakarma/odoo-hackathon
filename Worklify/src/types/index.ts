import React from 'react';

export type Role = 'admin' | 'hr' | 'employee' | 'manager';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    department?: string;
    position?: string; // alias for designation
    joinDate?: string;

    // Extended Employee Fields
    phone?: string;
    status?: 'Active' | 'Inactive';
    basicSalary?: number;
    leavePolicy?: string;
    address?: string;
}

export interface Employee extends User {
    department: string;
    position: string;
    joinDate: string;
    phone: string;
    status: 'Active' | 'Inactive';
    basicSalary: number;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export interface NavItem {
    label: string;
    path: string;
    icon: React.ElementType;
    roles?: Role[];
}

export type AttendanceStatus = 'present' | 'absent' | 'half-day' | 'leave';

export interface AttendanceRecord {
    id: string;
    employeeId: string;
    employeeName: string;
    date: string; // ISO Date string
    checkIn: string; // Time string like "09:00 AM"
    checkOut: string | null;
    status: AttendanceStatus;
    totalHours: number;
    department: string;
    overtimeHours?: number;
    isLate?: boolean;
    location?: {
        lat: number;
        lng: number;
    };
}

export type LeaveType = 'Casual' | 'Sick' | 'Earned' | 'Unpaid';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
    id: string;
    employeeId: string;
    employeeName: string;
    type: LeaveType;
    fromDate: string;
    toDate: string;
    reason: string;
    status: LeaveStatus;
    appliedOn: string;
}

export interface LeaveBalance {
    type: LeaveType;
    used: number;
    total: number; // For 'Unpaid', this might be effectively infinite or just a counter
}

export type PayrollStatus = 'Paid' | 'Pending' | 'Processing';

export interface SalaryStructure {
    basic: number;
    hra: number;
    allowances: number;
    overtime: number;
    deductions: {
        pf: number;
        tax: number;
        unpaidLeave: number;
    };
    gross: number;
    net: number;
}

export interface PayrollRecord {
    id: string;
    employeeId: string;
    employeeName: string;
    month: string; // e.g., "January 2026"
    salary: SalaryStructure;
    status: PayrollStatus;
    paymentDate?: string;
}

