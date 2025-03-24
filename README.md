# Restaurant Booking System API

## Table of Contents
1. [Web App Link](#web-url)
2. [Introduction](#introduction)
3. [Setup Instructions](#development-environment-setup-instructions)
4. [Running the Application](#running-the-application)
5. [API Documentation](#api-documentation)
6. [Additional Notes](#additional-notes)

---

## Web-URL
https://restaurant-booking-platform.pages.dev

---

## Introduction
This is a RESTful API for a restaurant booking system, supporting user registration/login, table reservations, and restaurant schedule management.  

Frontend:

- Framework: React.js
- UI: React Hooks + MUI
- Live UI: Real-time updates for reservation status (e.g., via WebSockets or polling)

Backend:

- Language/Framework: Node.js with Express
- REST API: Full CRUD for reservations

Security:

- JWT-based authentication

Database:

- MySQL

Deployment:

- CloudFlare Pages (Frontend)
- Google Cloud Run (Backend)
- Aiven (Cloud MySQL)

---

## Development Environment Setup Instructions

### Prerequisites
- Node.js (v16+)
- MySQL
- Git

### Clone the Repository
```bash
git clone https://github.com/XiangyuSha/restaurant-booking-system.git
```

### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file in the `Server` directory:
```bash
PORT=your-port
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASS=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-jwt-secret
```

### Run Database Migration
```bash
npm run migrate
```

---

## Running the Application

### Start Backend
```bash
cd Server
node server.js
```

For development:
```bash
npm run devStart
```

### Start Frontend
```bash
cd Client/views
npm start
```

---

## API Documentation

### Get All Tables
GET `/bookings`

Returns all available tables with their status.

---

### Create a Reservation
POST `/bookings`
Requires authentication (role: customer)

```json
POST /reservations
Authorization: Bearer <YOUR TOKEN>

{
  "table_id": 2,
  "date": "2025-03-30",
  "time": "18:30",
  "guests": 4
}
```

---

### Update Reservation
PUT `/bookings/:id`
Requires authentication (owner or admin)

```json
PUT /bookings/5
Authorization: Bearer <YOUR TOKEN>

{
  "id": 5,
  "guests": 1
}
```

---

### Cancel Reservation
DELETE `/bookings/:id`
Requires authentication (owner or admin)

```http
DELETE /bookings/5
Authorization: Bearer <YOUR TOKEN>
```

---

### Register a New User
POST `/auth/register`

```json
{
  "email": "customer@example.com",
  "password": "securepassword",
  "role_id": 2
}
```

---

### Login
POST `/auth/login`

```json
{
  "email": "customer@example.com",
  "password": "securepassword"
}
```

---

## Additional Notes
- Ensure MySQL is running before backend startup.
- Protected routes require JWT in the `Authorization` header.
- User Roles:
  - `1` = Admin
  - `2` = Customer
  - `3` = Waiter

