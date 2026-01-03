const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Database Connection
const seedDatabase = require('./utils/startupSeeder');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        // Try connecting to configured URI first (if valid)
        // For this debugging session, we will fallback to Memory Server immediately if direct connection fails or if we want to ensure stability

        // Uncomment to try remote first:
        // await mongoose.connect(process.env.MONGO_URI);

        // Using Memory Server for stability during debugging
        console.log('Starting In-Memory MongoDB...');
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();

        await mongoose.connect(uri);
        console.log('MongoDB Connected (In-Memory)');

        // Seed the database
        await seedDatabase();

    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        // Fallback or retry logic could go here
    }
};

connectDB();

// Basic Route
app.get('/', (req, res) => {
    res.send('Worklify API is running...');
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/leave', require('./routes/leave'));
app.use('/api/payroll', require('./routes/payroll'));
app.use('/api/activity', require('./routes/activity'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
