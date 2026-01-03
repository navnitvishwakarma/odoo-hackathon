
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// MongoDB Connection (Cached for Serverless)
const MONGO_URI = 'mongodb+srv://digloo:navnit@cluster0.frthf3b.mongodb.net/worklify_hrms?retryWrites=true&w=majority&appName=Cluster0';

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(MONGO_URI);
        isConnected = true;
        console.log('MongoDB Connected (Serverless)');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};

// Ensure DB is connected for every request
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// --- Schemas ---

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
    reason: String,
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

const OfficeSchema = new mongoose.Schema({
    lat: Number,
    lng: Number,
    setAt: String
});

// Prevent model overwrite in serverless
const Employee = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
const TimeOff = mongoose.models.TimeOff || mongoose.model('TimeOff', TimeOffSchema);
const Payroll = mongoose.models.Payroll || mongoose.model('Payroll', PayrollSchema);
const Office = mongoose.models.Office || mongoose.model('Office', OfficeSchema);

// --- Routes ---

app.get('/api/init', async (req, res) => {
    try {
        const [employees, attendance, timeoff, payroll, office] = await Promise.all([
            Employee.find({}),
            Attendance.find({}),
            TimeOff.find({}),
            Payroll.find({}),
            Office.findOne({})
        ]);

        res.json({
            employees,
            attendance,
            timeoff,
            payroll,
            officeLocation: office || null
        });
    } catch (err) {
        console.error("API Init Error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/employees', async (req, res) => {
    try {
        const emp = new Employee(req.body);
        await emp.save();
        res.json(emp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/employees/:id', async (req, res) => {
    try {
        await Employee.updateOne({ id: req.params.id }, req.body);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/change-password', async (req, res) => {
    try {
        const { employeeId, oldPassword, newPassword } = req.body;
        const emp = await Employee.findOne({ employeeId });
        if (!emp) return res.status(404).json({ error: 'Employee not found' });
        if ((emp.password || '123456') !== oldPassword) return res.status(400).json({ error: 'Incorrect current password' });
        emp.password = newPassword;
        await emp.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/attendance', async (req, res) => {
    try {
        const att = new Attendance(req.body);
        await att.save();
        res.json(att);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/timeoff', async (req, res) => {
    try {
        const t = new TimeOff(req.body);
        await t.save();
        res.json(t);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/timeoff/:id', async (req, res) => {
    try {
        await TimeOff.updateOne({ id: req.params.id }, req.body);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/payroll', async (req, res) => {
    try {
        const p = new Payroll(req.body);
        await p.save();
        res.json(p);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/office', async (req, res) => {
    try {
        await Office.deleteMany({});
        const o = new Office(req.body);
        await o.save();
        res.json(o);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Export the app for Vercel
export default app;
