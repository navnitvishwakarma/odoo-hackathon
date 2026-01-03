# Worklify - Modern HRMS Application

![Worklify Banner](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3)

**Worklify** is a cutting-edge Human Resource Management System (HRMS) designed to streamline organizational workflows. Built with a robust MERN stack and a modern, premium user interface, Worklify simplifies employee management, attendance tracking, and payroll processing.

## 🚀 Key Features

*   **👥 Comprehensive Employee Management**
    *   Role-based access control (Admin, HR, Manager, Employee).
    *   Secure employee onboarding with restricted role assignment (only HR/Admin can create accounts).
    *   Profile management and digital records.

*   **📅 Intelligent Attendance System**
    *   **Face Registration**: Secure biometric-like attendance marking.
    *   **Real-time Tracking**: Monitor check-in/check-out times.
    *   **Visual Analytics**: Interactive donut charts and graphs for attendance trends.

*   **💰 Automated Payroll**
    *   Detailed salary structure breakdown (Basic, HRA, Allowances).
    *   Automatic tax and deduction calculations.
    *   Visual salary slips and summary cards with glassmorphism design.

*   **🔐 Secure & Scalable**
    *   JWT-based authentication.
    *   Password encryption using Bcrypt.
    *   Scalable MongoDB database architecture.

*   **🎨 Premium UI/UX**
    *   Built with **Tailwind CSS** for a sleek, responsive design.
    *   Modern aesthetic with gradients, glassmorphism, and micro-animations.
    *   Intuitive navigation and dashboard layout.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React 19 (Vite)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Charts**: Recharts
*   **HTTP Client**: Axios

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (with Mongoose)
*   **Authentication**: JSON Web Token (JWT)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB (Local or Atlas connection string)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/worklify.git
    cd worklify
    ```

2.  **Setup Backend**
    ```bash
    cd server
    npm install
    ```
    *   Create a `.env` file in the `server` directory and add your MongoDB URI and JWT Secret:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        PORT=5000
        ```
    *   Start the server:
        ```bash
        node index.js
        ```

3.  **Setup Frontend**
    Open a new terminal and navigate to the project root (if not already there), then:
    ```bash
    cd .. # Go back to Worklify root if you were in server
    npm install
    ```
    *   Start the development server:
        ```bash
        npm run dev
        ```

4.  **Access the App**
    Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```
Worklify/
├── src/                # Frontend Source Code
│   ├── components/     # Reusable UI Components
│   ├── pages/          # Application Pages (Login, Dashboard, etc.)
│   ├── types/          # TypeScript Type Definitions
│   └── ...
├── server/             # Backend Source Code
│   ├── models/         # Mongoose Database Models
│   ├── routes/         # API Routes
│   ├── middleware/     # Auth & Validation Middleware
│   └── index.js        # Server Entry Point
├── package.json        # Frontend Dependencies
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---
Built with ❤️ for the Odoo Hackathon.
