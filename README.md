# Node.js & Express REST API with TypeScript

A production-ready starter template for Node.js REST APIs built with Express and TypeScript.

---

## 🚀 Features

- **TypeScript** with ES Modules
- **Fast Development** via `nodemon` with TypeScript execution (`tsx`)
- **Production Bundler** using `tsup`
- **Security Middleware** via `helmet` and `cors`
- **Centralized Error Handling** with custom `AppError` class
- **Graceful Shutdown** on `SIGINT` / `SIGTERM`
- **Structured Architecture** separating config, controllers, middlewares, and routes
- **Ready-to-use Sample Endpoints** (Health check & CRUD items)

---

## 📁 Project Structure

```text
backend-project/
├── .env                  # Environment variables
├── .env.example          # Template for environment variables
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── README.md             # Documentation
└── src/
    ├── app.ts            # Express application setup
    ├── index.ts          # Server entry point & graceful shutdown
    ├── config/
    │   └── env.ts        # Typed environment configuration
    ├── controllers/
    │   ├── health.controller.ts # Health check handler
    │   └── item.controller.ts   # Example CRUD operations
    ├── middlewares/
    │   ├── error.middleware.ts  # 404 & centralized error handler
    │   └── logger.middleware.ts # Custom request logger
    └── routes/
        ├── health.routes.ts     # Health routes
        ├── item.routes.ts       # Items CRUD routes
        └── index.ts             # Combined API router
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
A default `.env` file is already created:
```env
PORT=5000
NODE_ENV=development
API_PREFIX=/api/v1
CORS_ORIGIN=*
```

### 3. Start Development Server
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

### 4. Build & Run for Production
```bash
npm run build
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API Root / Welcome message |
| `GET` | `/api/v1/health` | Service health status, uptime, and memory usage |
| `GET` | `/api/v1/items` | List all items |
| `GET` | `/api/v1/items/:id` | Get item by ID |
| `POST` | `/api/v1/items` | Create new item (`{ "name": "...", "description": "..." }`) |
| `DELETE` | `/api/v1/items/:id` | Delete item by ID |
