# Northstar Mini CRM

A premium full-stack mini CRM for agency and startup lead management built with React, Vite, Tailwind, Node, Express, MongoDB, and JWT.

## Features
- Secure admin login with JWT and bcrypt
- Responsive SaaS-style dashboard with animated cards
- Lead CRUD, search, filters, pagination, and CSV export
- Lead analytics with charts and recent activity
- Protected routes and environment-based configuration

## Tech Stack
- Frontend: React, Vite, Tailwind, React Router, Framer Motion, Recharts
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, CORS

## Setup
### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run seed
npm run dev
```

## Environment Variables
Create a `.env` file inside the server folder using `.env.example`.

## API Endpoints
- POST /api/auth/login
- POST /api/leads
- GET /api/leads
- GET /api/leads/:id
- PUT /api/leads/:id
- DELETE /api/leads/:id
- PATCH /api/leads/status
- POST /api/leads/:id/notes
- GET /api/dashboard

## Deployment Notes
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## License
MIT
