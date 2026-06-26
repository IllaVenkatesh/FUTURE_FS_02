# 🚀 Future Interns Task 2 – Client Lead Management System (Mini CRM)

A modern **Full Stack MERN-based Client Lead Management System** built as part of the **Future Interns Full Stack Web Development Internship – Task 2**.

This application helps businesses, freelancers, and agencies efficiently manage client leads generated through websites by providing secure authentication, lead tracking, status management, and analytics.

---

## 📌 Project Overview

The Mini CRM allows administrators to:

* Manage incoming client leads
* Track lead status throughout the sales pipeline
* Maintain follow-up notes
* Analyze lead performance
* Securely access the dashboard through authentication

Designed with a clean SaaS-inspired interface, the project demonstrates full-stack development concepts including authentication, REST APIs, CRUD operations, database management, and responsive UI development.

---

# ✨ Features

### 🔐 Authentication

* Secure Admin Login
* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes

### 👥 Lead Management

* Add New Leads
* View All Leads
* Edit Lead Details
* Delete Leads
* Lead Status Management
* Priority Management

### 📊 Dashboard

* Total Leads
* New Leads
* Contacted Leads
* Converted Leads
* Dashboard Statistics
* Responsive Cards

### 📈 Analytics

* Lead Overview
* Performance Insights
* Conversion Tracking
* Data Visualization

### 🔍 Productivity Features

* Search Leads
* Filter by Status
* Filter by Priority
* Export Leads to CSV
* Responsive Design

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Framer Motion
* React Icons
* Recharts

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* Express Validator
* CORS

## Database

* MongoDB Atlas
* Mongoose

## Development Tools

* Git
* GitHub
* VS Code
* Postman

---

# 📁 Project Structure

```
FUTURE_FS_02/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/IllaVenkatesh/FUTURE_FS_02.git
```

```bash
cd FUTURE_FS_02
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file using `.env.example`.

Run the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# 🌐 API Endpoints

## Authentication

```
POST /api/auth/login
```

## Leads

```
GET    /api/leads
GET    /api/leads/:id
POST   /api/leads
PUT    /api/leads/:id
DELETE /api/leads/:id
PATCH  /api/leads/status
```

## Dashboard

```
GET /api/dashboard
```

---

# 🔒 Environment Variables

Create a `.env` file inside the **server** folder.

```
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

# 🚀 Deployment

### Frontend

Deploy using **Vercel**

### Backend

Deploy using **Render**

### Database

Use **MongoDB Atlas**

---

# 📸 Screenshots

Add screenshots of:

* Login Page
* Dashboard
* Lead Management
* Add Lead
* Analytics

---

# 📚 Learning Outcomes

This project helped me understand:

* Full Stack MERN Development
* REST API Development
* CRUD Operations
* JWT Authentication
* MongoDB Integration
* Responsive Dashboard Design
* Business Workflow Management
* Git & GitHub Collaboration

---

# 🎯 Future Improvements

* Email Notifications
* Activity Timeline
* Advanced Analytics
* Calendar Integration
* Role-Based Authentication
* Lead Assignment
* Dark/Light Theme Toggle

---

# 👨‍💻 Author

**Venkatesh Illa**

B.Tech – Artificial Intelligence & Machine Learning

GitHub: https://github.com/IllaVenkatesh

LinkedIn: https://www.linkedin.com/in/venkatesh-illa

---

# 📄 License

This project is developed for educational purposes as part of the **Future Interns Full Stack Web Development Internship (Task 2)**.

Licensed under the MIT License.
