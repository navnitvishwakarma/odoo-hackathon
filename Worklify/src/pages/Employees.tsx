import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { EmployeeTable } from '../components/employees/EmployeeTable';
import { EmployeeFormModal } from '../components/employees/EmployeeFormModal';
import type { Employee } from '../types';
import api from '../api/axios';

const Employees: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Employees
    const fetchEmployees = async () => {
        try {
            const res = await api.get('/employees');
            // Transform data to match frontend Employee interface
            // The backend returns populated user object, we need to flatten it or adjust interface
            // Our frontend Employee interface extends User, so we need to map the nested user object fields
            const mappedData = res.data.map((emp: any) => ({
                id: emp._id,
                name: emp.user.name,
                email: emp.user.email,
                role: emp.user.role,
                avatar: emp.user.avatar,
                department: emp.department,
                position: emp.designation, // Backend uses 'designation', frontend 'position'
                joinDate: new Date(emp.joinDate).toISOString().split('T')[0],
                phone: emp.phone,
                status: emp.status,
                basicSalary: emp.basicSalary
            }));
            setEmployees(mappedData);
        } catch (err) {
            console.error('Error fetching employees:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleAddEmployee = async (formData: Partial<Employee>) => {
        try {
            // Mapping frontend keys to backend expected payload
            const payload = {
                name: formData.name || '',
                email: formData.email || '',
                department: formData.department || '',
                position: formData.position || '', // Backend expects this as 'position' or we mapped it in route? Route expects 'position' for designation
                basicSalary: formData.basicSalary || 0,
                phone: formData.phone || '',
                joinDate: formData.joinDate || new Date().toISOString(),
                password: 'password123' // Default password for new employees
            };

            await api.post('/employees', payload);
            fetchEmployees(); // Refresh list
            setIsAddModalOpen(false);
        } catch (err) {
            console.error('Error adding employee:', err);
            alert('Failed to add employee');
        }
    };

    const handleEditEmployee = async (formData: Partial<Employee>) => {
        if (!editingEmployee) return;

        try {
            const payload = {
                department: formData.department,
                designation: formData.position, // Backend route uses 'designation' for update
                basicSalary: formData.basicSalary,
                phone: formData.phone,
                status: formData.status
            };

            await api.put(`/employees/${editingEmployee.id}`, payload);
            fetchEmployees();
            setEditingEmployee(null);
        } catch (err) {
            console.error('Error updating employee:', err);
            alert('Failed to update employee');
        }
    };

    const handleDeleteEmployee = async (employeeId: string) => {
        if (window.confirm('Are you sure you want to remove this employee? This action cannot be undone.')) {
            try {
                await api.delete(`/employees/${employeeId}`);
                fetchEmployees();
            } catch (err) {
                console.error('Error deleting employee:', err);
                alert('Failed to delete employee');
            }
        }
    };

    const handleViewEmployee = (employee: Employee) => {
        console.log('View employee:', employee);
        // TODO: Implement view modal
    };

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDep = selectedDepartment === 'All' || emp.department === selectedDepartment;
        return matchesSearch && matchesDep;
    });

    const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
                    <p className="text-slate-500">Manage your team members and their roles.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Add Employee
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="text-slate-400" size={20} />
                        <select
                            className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                        >
                            {departments.map(dep => (
                                <option key={dep} value={dep}>{dep}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center py-12 text-slate-500">Loading employees...</div>
                ) : (
                    <EmployeeTable
                        employees={filteredEmployees}
                        onView={handleViewEmployee}
                        onEdit={setEditingEmployee}
                        onDelete={handleDeleteEmployee}
                    />
                )}
            </div>

            <EmployeeFormModal
                isOpen={isAddModalOpen || !!editingEmployee}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setEditingEmployee(null);
                }}
                onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
                initialData={editingEmployee || undefined}
            />
        </div>
    );
};

export default Employees;
