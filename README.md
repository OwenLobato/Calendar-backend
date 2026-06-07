# Calendar Backend

REST API for a React calendar application. Handles user authentication with JWT, full CRUD for calendar events backed by MongoDB, and serves the React frontend as a static SPA.

## Tech Stack

- **Runtime:** Node.js 22
- **Framework:** Express 5
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **Validation:** express-validator
- **Dates:** moment
- **Dev:** nodemon

## Project Structure

```
calendar-backend/
├── controllers/        # Route handlers (auth, events)
├── database/           # Mongoose connection setup
├── helpers/            # JWT generator, date validator
├── middlewares/        # JWT validator, field validator
├── models/             # Mongoose schemas (User, Event)
├── public/             # React frontend SPA (built dist)
├── routes/             # Express routers (auth, events)
├── .env.example        # Environment variables template
└── index.js            # Entry point
```

## Getting Started

### Prerequisites

- Node.js 22.x
- MongoDB instance (local or Atlas)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/OwenLobato/Calendar-backend.git
cd Calendar-backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in the values in .env

# 4. Start the development server
npm run dev
```

## Environment Variables

| Variable          | Description                        | Example                                          |
|-------------------|------------------------------------|--------------------------------------------------|
| `PORT`            | Port the server listens on         | `4000`                                           |
| `DB_CNN`          | MongoDB connection string          | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `SECRET_JWT_SEED` | Secret key used to sign JWT tokens | `my-secret-word`                                 |

## API Endpoints

### Auth — `/api/auth`

| Method | Endpoint               | Description         | Auth required   | Body                        |
|--------|------------------------|---------------------|-----------------|-----------------------------|
| POST   | `/api/auth/new`        | Register a new user | No              | `name`, `email`, `password` |
| POST   | `/api/auth/`           | Login               | No              | `email`, `password`         |
| GET    | `/api/auth/revalidate` | Revalidate token    | Yes (`x-token`) | —                           |

### Events — `/api/events`

All event endpoints require a valid JWT in the `x-token` header.

| Method | Endpoint          | Description        | Body                                    |
|--------|-------------------|--------------------|-----------------------------------------|
| GET    | `/api/events`     | Get all events     | —                                       |
| POST   | `/api/events`     | Create a new event | `title`, `start`, `end`, `notes` (opt.) |
| PUT    | `/api/events/:id` | Update an event    | Any event fields                        |
| DELETE | `/api/events/:id` | Delete an event    | —                                       |

### Response format

All endpoints return JSON with at least an `ok` boolean:

```json
// Success
{ "ok": true, "token": "...", "uid": "...", "name": "..." }

// Error
{ "ok": false, "msg": "Error description" }
```

## Serving the Frontend

The backend serves the React frontend from the `public/` folder. To update the frontend build:

```bash
# In the React project
npm run build

# Copy the dist/ output into the backend
cp -r dist/* ../calendar-backend/public/
```

Any route not matched by the API is redirected to `index.html`, so React Router handles client-side navigation.

## Scripts

| Command       | Description                       |
|---------------|-----------------------------------|
| `npm start`   | Start server with Node            |
| `npm run dev` | Start server with nodemon (watch) |

## Credits

Built as part of the **[React: De cero a experto](https://www.udemy.com/course/react-cero-experto)** course by [Fernando Herrera](https://github.com/Klerith) — [DevTalles](https://devtalles.com).
