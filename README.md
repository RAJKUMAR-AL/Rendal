# Rental Room Management System

A full-stack web application for managing rental room bookings for long-distance workers.

## Features

- User authentication (signup/login)
- Room search with filters (price, location, amenities)
- Detailed room pages with availability calendar
- Online booking system with confirmation
- User booking history
- Admin dashboard for managing rooms and bookings
- Mobile-responsive design

## Tech Stack

**Frontend:**
- React 18
- React Router
- Axios
- React Calendar
- Lucide React (icons)
- Vite

**Backend:**
- Node.js
- Express
- MongoDB
- JWT authentication
- bcryptjs

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB

### Installation

1. Install dependencies:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

2. Configure environment:
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Run the application:
```bash
# From root directory
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Default Admin Account

To create an admin user, manually update a user in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Project Structure

```
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── App.jsx      # Main app component
├── backend/           # Express backend
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Auth middleware
│   └── server.js      # Server entry point
└── package.json       # Root package file
```

## API Endpoints

### Auth
- POST /api/auth/signup - Register new user
- POST /api/auth/login - Login user

### Rooms
- GET /api/rooms - Get all rooms (with filters)
- GET /api/rooms/:id - Get room details
- POST /api/rooms - Create room (admin)
- PUT /api/rooms/:id - Update room (admin)
- DELETE /api/rooms/:id - Delete room (admin)

### Bookings
- POST /api/bookings - Create booking
- GET /api/bookings/my-bookings - Get user bookings
- GET /api/bookings - Get all bookings (admin)
- PUT /api/bookings/:id - Update booking (admin)

## License

MIT
