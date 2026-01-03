import React, { useState } from 'react';
import { PayrollHeader } from '../components/payroll/PayrollHeader';
import { SalarySummaryCards } from '../components/payroll/SalarySummaryCards';
import { SalaryBreakdown } from '../components/payroll/SalaryBreakdown';
import { PayrollHistoryTable } from '../components/payroll/PayrollHistoryTable';
import { AdminPayrollControls } from '../components/payroll/AdminPayrollControls';
import type { PayrollRecord } from '../types';

// Mock Data
const mockSalaryJan: PayrollRecord = {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'Aman',
    month: 'January 2026',
    status: 'Pending',
    salary: {
        basic: 25000,
        hra: 10000,
        allowances: 5000,
        overtime: 2000,
        gross: 42000, // + Overtime = 44000
        net: 40800,
        deductions: {
            pf: 1800,
            tax: 1200,
            unpaidLeave: 200
        }
    }
};

// Adjust mock gross to match breakdown logic if needed, but for now using the requested visual values
mockSalaryJan.salary.gross = mockSalaryJan.salary.basic + mockSalaryJan.salary.hra + mockSalaryJan.salary.allowances + mockSalaryJan.salary.overtime;
// 25+10+5+2 = 42000
// Deductions = 1800+1200+200 = 3200
// Net = 42000 - 3200 = 38800

const mockHistory: PayrollRecord[] = [
    mockSalaryJan,
    {
        id: '2',
        employeeId: 'EMP001',
        employeeName: 'Aman',
        month: 'December 2025',
        status: 'Paid',
        paymentDate: '2026-01-01',
        salary: {
            basic: 25000,
            hra: 10000,
            allowances: 5000,
            overtime: 0,
            gross: 40000,
            net: 37000,
            deductions: {
                pf: 1800,
                tax: 1200,
                unpaidLeave: 0
            }
        }
    },
    {
        id: '3',
        employeeId: 'EMP001',
        employeeName: 'Aman',
        month: 'November 2025',
        status: 'Paid',
        paymentDate: '2025-12-01',
        salary: {
            basic: 25000,
            hra: 10000,
            allowances: 5000,
            overtime: 1000,
            gross: 41000,
            net: 38000,
            deductions: {
                pf: 1800,
                tax: 1200,
                unpaidLeave: 0
            }
        }
    }
];

const Payroll: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState('January 2026');
    const [isLoading, setIsLoading] = useState(false);
    const [payrollData, setPayrollData] = useState<PayrollRecord>(mockSalaryJan);

    // Simulate switching data based on month with loading state
    const handleMonthChange = (month: string) => {
        setIsLoading(true);
        setSelectedMonth(month);

        // Mock API Call simulation
        setTimeout(() => {
            const record = mockHistory.find(r => r.month === month) || { ...mockSalaryJan, month: month, status: 'Pending' };
            setPayrollData(record);
            setIsLoading(false);
        }, 800);
    };

    const handleDownload = () => {
        alert(`Downloading payslip for ${selectedMonth}...`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <PayrollHeader
                selectedMonth={selectedMonth}
                onMonthChange={handleMonthChange}
                onDownload={handleDownload}
            />

            {isLoading ? (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-40 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                    </div>
                </div>
            ) : (
                <>
                    <SalarySummaryCards
                        salary={payrollData.salary}
                        status={payrollData.status}
                    />

                    {/* Admin Controls - Visible for demo */}
                    <AdminPayrollControls />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                        <SalaryBreakdown salary={payrollData.salary} />
                        <PayrollHistoryTable history={mockHistory} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Payroll;
