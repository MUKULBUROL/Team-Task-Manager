# Team Task Manager

A full-stack Team Task Management application built with:

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt

### Deployment

- Railway (Backend + PostgreSQL)
- Vercel (Frontend)

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role Based Access Control

## Project Management

Admin can:

- Create Projects
- View Projects
- Add Members to Projects

Members can:

- View projects they belong to

## Task Management

Admin can:

- Create Tasks
- Assign Tasks

Members can:

- View Assigned Tasks
- Update Task Status

Task Status:

- TODO
- IN_PROGRESS
- DONE

## Dashboard

Displays:

- Total Users
- Total Projects
- Total Tasks
- Task Status Distribution

---

# Roles

## ADMIN

Permissions:

- Create Projects
- Add Members
- Create Tasks
- Delete Tasks
- View Everything

## MEMBER

Permissions:

- View Assigned Tasks
- Update Own Task Status
- View Projects They Belong To

Restrictions:

- Cannot Create Projects
- Cannot Add Members
- Cannot Delete Tasks

---

# Project Structure

```text
Team-Task-Manager
│
├── backend
│   ├── prisma
│   ├── src
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# Backend Setup

## 1. Navigate to Backend

```bash
cd backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create Environment File

Create:

```bash
backend/.env
```

Example:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskmanager?schema=public"

JWT_SECRET="your-secret-key"

ADMIN_EMAIL="admin@example.com"

ADMIN_PASSWORD="admin123"
```

---

# Database Setup

## Generate Prisma Client

```bash
npx prisma generate
```

## Push Schema

```bash
npx prisma db push
```

## Seed Database

```bash
npm run seed
```

Expected:

```text
Admin user created/updated
Seeding completed
```

---

# Run Backend

```bash
npm run dev
```

Expected:

```text
Server is running on port 3000
```

Health Check:

```text
http://localhost:3000/health
```

Response:

```json
{
  "status": "ok"
}
```

---

# Frontend Setup

## Navigate to Frontend

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Create Environment File

Create:

```bash
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:3000
```

---

# Run Frontend

```bash
npm run dev
```

Expected:

```text
http://localhost:5173
```

Open:

```text
http://localhost:5173
```

---

# Test Credentials

## Admin

```text
Email:
admin@example.com

Password:
admin123
```

## Sample Members

```text
member1@test.com
password123

member2@test.com
password123

member3@test.com
password123
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

---

## Projects

### Create Project

```http
POST /api/projects
```

### Get Projects

```http
GET /api/projects
```

### Add Member

```http
POST /api/projects/add-member
```

---

## Tasks

### Create Task

```http
POST /api/tasks
```

### Get Tasks

```http
GET /api/tasks
```

### Update Task Status

```http
PATCH /api/tasks/:taskId/status
```

### Delete Task

```http
DELETE /api/tasks/:id
```

---

## Dashboard

### Metrics

```http
GET /api/dashboard/metrics
```

---

# Local Testing Checklist

## Authentication

- [ ] Register User
- [ ] Login User
- [ ] JWT Stored
- [ ] Logout Works

## Projects

- [ ] Create Project
- [ ] Add Members
- [ ] View Projects

## Tasks

- [ ] Create Task
- [ ] Assign Task
- [ ] Update Status
- [ ] Delete Task

## Dashboard

- [ ] Metrics Load Correctly

## Security

- [ ] Protected Routes
- [ ] Role Based Access
- [ ] Unauthorized Requests Blocked

---

# Deployment

## Backend (Railway)

Environment Variables:

```env
DATABASE_URL=<railway-postgres-url>

JWT_SECRET=<secret>

ADMIN_EMAIL=admin@example.com

ADMIN_PASSWORD=admin123
```

Deploy:

```bash
npm install
npm start
```

---

## Frontend (Vercel)

Environment Variable:

```env
VITE_API_URL=https://your-railway-url.up.railway.app
```

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

---

# Common Commands

## Backend

```bash
npm run dev
npm run seed
npx prisma generate
npx prisma db push
npx prisma studio
```

## Frontend

```bash
npm run dev
npm run build
```

---

# Future Improvements

- Refresh Tokens
- Email Verification
- Task Comments
- Task Attachments
- Activity Logs
- Project Analytics
- User Profile Management

---

# Author

Mukul Kumar

Team Task Manager Assessment Project
