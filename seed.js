
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://digloo:navnit@cluster0.frthf3b.mongodb.net/worklify_hrms?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected for Seeding');
        seedData();
    })
    .catch(err => console.error('MongoDB Connection Error:', err));

// --- Schemas (Copied from server.js) ---
const EmployeeSchema = new mongoose.Schema({
    id: Number,
    employeeId: String,
    name: String,
    email: String,
    role: String,
    phone: String,
    address: String,
    status: String,
    avatar: String,
    productivityScores: Array,
    attendanceSummary: Object,
    dailyTargets: Object,
    dailyProgress: Object,
    dailyProductivity: Object,
    dailyTaskReasons: Object,
    dailySubmitted: Object,
    password: { type: String, default: '123456' }
});

const AttendanceSchema = new mongoose.Schema({
    id: Number,
    employeeId: String,
    date: String,
    checkIn: String,
    checkOut: String,
    photo: String,
    location: Object
});

const TimeOffSchema = new mongoose.Schema({
    id: Number,
    employeeId: String,
    employeeName: String,
    type: String,
    leaveType: String,
    startDate: String,
    endDate: String,
    status: String,
    rejectionCategory: String,
    rejectionReason: String
});

const PayrollSchema = new mongoose.Schema({
    id: Number,
    employeeId: String,
    employeeName: String,
    month: String,
    year: String,
    basic: Number,
    hra: Number,
    da: Number,
    deductions: Number,
    net: Number,
    generatedDate: String
});

const Employee = mongoose.model('Employee', EmployeeSchema);
const Attendance = mongoose.model('Attendance', AttendanceSchema);
const TimeOff = mongoose.model('TimeOff', TimeOffSchema);
const Payroll = mongoose.model('Payroll', PayrollSchema);

const sampleEmployees = [
    {
        id: 102,
        employeeId: "EMP002",
        name: "Aarav Sharma",
        email: "aarav@worklify.com",
        role: "Senior Developer",
        phone: "9876543210",
        address: "123 MG Road, Bengaluru",
        status: "present",
        attendanceSummary: { presentDays: 18, absentDays: 1, leaveDays: 1 },
        dailyProductivity: { "2023-10-25": 85, "2023-10-26": 90 }
    },
    {
        id: 103,
        employeeId: "EMP003",
        name: "Diya Gupta",
        email: "diya@worklify.com",
        role: "UX Designer",
        phone: "9876543211",
        address: "456 Park Street, Kolkata",
        status: "absent",
        attendanceSummary: { presentDays: 15, absentDays: 3, leaveDays: 2 },
        dailyProductivity: { "2023-10-25": 95, "2023-10-26": 88 }
    },
    {
        id: 104,
        employeeId: "EMP004",
        name: "Vihaan Patel",
        email: "vihaan@worklify.com",
        role: "Product Manager",
        phone: "9876543212",
        address: "789 Satellite Road, Ahmedabad",
        status: "present",
        attendanceSummary: { presentDays: 20, absentDays: 0, leaveDays: 0 },
        dailyProductivity: { "2023-10-25": 80, "2023-10-26": 85 }
    },
    {
        id: 105,
        employeeId: "EMP005",
        name: "Ananya Singh",
        email: "ananya@worklify.com",
        role: "HR Specialist",
        phone: "9876543213",
        address: "321 Cyber Hub, Gurugram",
        status: "on-leave",
        attendanceSummary: { presentDays: 12, absentDays: 0, leaveDays: 8 },
        dailyProductivity: { "2023-10-25": 70, "2023-10-26": 75 }
    },
    {
        id: 106,
        employeeId: "EMP006",
        name: "Rohan Kumar",
        email: "robert@worklify.com",
        role: "Marketing Lead",
        phone: "9876543214",
        address: "654 Linking Road, Mumbai",
        status: "present",
        attendanceSummary: { presentDays: 19, absentDays: 1, leaveDays: 0 },
        dailyProductivity: { "2023-10-25": 92, "2023-10-26": 89 }
    }
];

function getRandomTime(startHour, endHour) {
    const hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
    const min = Math.floor(Math.random() * 60);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} ${ampm}`;
}

async function seedData() {
    try {
        console.log("Seeding Employees...");

        // 1. Clear Data
        await Employee.deleteMany({});
        await Attendance.deleteMany({});
        await Payroll.deleteMany({});
        await TimeOff.deleteMany({}); // Optional, maybe keep if meaningful

        for (const emp of sampleEmployees) {
            await Employee.create(emp);
            console.log(`Added ${emp.name}`);

            // 2. Add Attendance for last 7 days
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateStr = date.toLocaleDateString();

                // 80% chance of being present
                if (Math.random() > 0.2) {
                    await Attendance.create({
                        id: Date.now() + Math.random(),
                        employeeId: emp.employeeId,
                        date: dateStr,
                        checkIn: getRandomTime(9, 10), // 9 AM to 10 AM
                        checkOut: getRandomTime(17, 19), // 5 PM to 7 PM
                        location: { latitude: 12.9716, longitude: 77.5946 }
                    });
                }
            }

            // 3. Add Sample Payroll
            await Payroll.create({
                id: Date.now() + Math.random(),
                employeeId: emp.employeeId,
                employeeName: emp.name,
                month: "October",
                year: "2023",
                basic: 45000,
                hra: 20000,
                da: 10000,
                deductions: 5000,
                net: 70000,
                generatedDate: new Date().toISOString()
            });
        }

        console.log("Seeding Completed!");
        mongoose.disconnect();
        process.exit(0);

    } catch (err) {
        console.error("Seeding Error:", err);
        mongoose.disconnect();
        process.exit(1);
    }
}
