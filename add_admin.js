
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://digloo:navnit@cluster0.frthf3b.mongodb.net/worklify_hrms?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        addAdmin();
    })
    .catch(err => console.error('MongoDB Connection Error:', err));

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

const Employee = mongoose.model('Employee', EmployeeSchema);

async function addAdmin() {
    try {
        // Check if exists
        const exists = await Employee.findOne({ employeeId: 'ADM001' });
        if (exists) {
            console.log('Admin ADM001 already exists in DB.');
            process.exit(0);
        }

        await Employee.create({
            id: 1,
            employeeId: "ADM001",
            name: "System Admin",
            email: "admin@worklify.com",
            role: "admin",
            phone: "0000000000",
            address: "Headquarters",
            status: "active",
            avatar: "AD",
            password: "password", // Keeping the default dev password or 'password'
            attendanceSummary: { presentDays: 0, absentDays: 0, leaveDays: 0 },
            dailyProductivity: {},
            dailyTargets: {},
            dailyProgress: {}
        });

        console.log("Admin User Added to Database!");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
