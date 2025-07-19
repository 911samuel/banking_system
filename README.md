# Banking System API

## Overview

This project is a backend API for a banking system that manages authentication, user management, organization management, employee management, attendance tracking, payroll calculation, loan applications, job seeker forms, and certificate uploads.

## Features

- **Authentication & User Management**
  - User registration and login with JWT authentication
  - Retrieve current authenticated user info
  - Manage users by ID and organization

- **Organization Management**
  - Register and manage organizations
  - Approve or reject organizations
  - List employees within organizations

- **Category Management**
  - Manage salary categories per organization

- **Employee Management**
  - Add, update, delete, and retrieve employees

- **Attendance / Shift Tracking**
  - Employee clock-in and clock-out
  - Retrieve attendance records by employee or organization

- **Payroll Calculation**
  - Calculate and retrieve payroll summaries
  - Generate monthly payroll records

- **Loan Application**
  - Apply for loans
  - Manage loan approvals and status

- **Job Seeker Form**
  - Submit and manage job seeker applications

- **Certificate Upload**
  - Upload certificate files and retrieve URLs

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn
- A configured database (e.g., MySQL, PostgreSQL)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd banking_system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory and set the necessary environment variables such as database credentials, JWT secret, etc.

4. Run database migrations and seeders if applicable.

5. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

## API Documentation

The API endpoints are grouped by feature areas. A Postman collection is provided in `postman_collection.json` for easy testing.

### Authentication & User Management

- `POST /auth/register` - Register user
- `POST /auth/login` - Login user and receive JWT
- `GET /auth/me` - Get current authenticated user info
- `GET /users/me` - Get current user info
- `GET /users/:id` - Get user by ID
- `GET /users/org/:orgId` - Get all users in an organization

### Organization Management

- `POST /orgs/register` - Register a new organization
- `GET /orgs` - List all organizations
- `GET /orgs/:id` - Get organization by ID
- `PATCH /orgs/:id/status` - Approve or reject organization
- `GET /orgs/:id/employees` - Get employees of an organization

### Category Management

- `POST /categories` - Create a new category
- `GET /categories/org/:id` - Get categories for an organization
- `GET /categories/:id` - Get category by ID
- `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Employee Management

- `POST /employees` - Add new employee
- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `PATCH /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Attendance / Shift Tracking

- `POST /attendance/clock-in` - Employee clock in
- `POST /attendance/clock-out` - Employee clock out
- `GET /attendance/employee/:id` - Get attendance by employee
- `GET /attendance/org/:orgId` - Get attendance by organization

### Payroll Calculation

- `GET /payroll/employee/:id` - Get payroll for employee
- `GET /payroll/org/:orgId` - Get payroll summary for organization
- `POST /payroll/generate` - Generate monthly payroll

### Loan Application

- `POST /loans/apply` - Apply for loan
- `GET /loans` - Get all loans
- `GET /loans/user/:id` - Get loans by user
- `PATCH /loans/:id/status` - Update loan status

### Job Seeker Form

- `POST /jobseekers` - Submit job seeker application
- `GET /jobseekers` - Get all job seekers
- `GET /jobseekers/:id` - Get job seeker by ID

### Certificate Upload

- `POST /upload/certificate` - Upload certificate file

## Testing

Use the provided Postman collection `postman_collection.json` to test the API endpoints.

## License

Specify your project license here.
