# Books FullStack Application

A full-stack Book Management Application built using:

* ASP.NET Core Web API
* React + TypeScript + Vite
* SQL Server
* Docker & Docker Compose
* JWT Authentication
* Unit Testing

---

# Project Structure

```text
Project_API/
│
├── BooksApi/                 # ASP.NET Core Backend API
│
├── BooksApi.Tests/           # Unit Test Project
│
├── Books_UI/
│   └── books-react-ui/       # React Frontend Application
│
└── docker-compose.yml
```

---

# Features

## Backend (ASP.NET Core API)

* RESTful API
* CRUD Operations for Books
* JWT Authentication
* Entity Framework Core
* SQL Server Integration
* Swagger API Documentation
* Docker Support
* Logging
* Unit Testing

## Frontend (React + TypeScript)

* React with TypeScript
* Vite Setup
* Axios API Integration
* Login Authentication
* Protected Routes
* Responsive UI
* Book Listing
* Add / Edit / Delete Books

---

# Technologies Used

## Backend

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* JWT Authentication
* xUnit
* Docker

## Frontend

* React
* TypeScript
* Vite
* Axios
* React Router

---

# Getting Started

## Prerequisites

Install:

* .NET SDK
* Node.js
* SQL Server
* Docker Desktop

---

# Backend Setup

Navigate to backend project:

```bash
cd BooksApi
```

Restore packages:

```bash
dotnet restore
```

Run migrations:

```bash
dotnet ef database update
```

Run API:

```bash
dotnet run
```

Swagger:

```text
https://localhost:xxxx/swagger
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd Books_UI/books-react-ui
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Running with Docker

Build and run containers:

```bash
docker-compose up --build
```

---

# API Authentication

This project uses JWT Authentication.

After login:

* JWT token is generated
* Token is stored in frontend
* Protected APIs require Authorization header

Example:

```text
Authorization: Bearer <token>
```

---

# Testing

Run backend tests:

```bash
cd BooksApi.Tests
dotnet test
```

Run frontend tests:

```bash
npm run test
```

---

# Environment Variables

Create `.env` files if required.

Example:

```env
VITE_API_URL=http://localhost:8080/api
```

---

# Future Improvements

* Role-Based Authorization
* Search & Filtering
* Pagination
* Deployment to AWS
* CI/CD Pipeline
* Refresh Tokens
* Redis Caching

---

# Author

Dhanush S

GitHub:
https://github.com/dhanushJZTec
