# TaskManger

A full-stack task management web app with user authentication, kanban-style dashboard, and persistent local storage.

## Links

- **GitHub Repository:** https://github.com/lekhanpavansai/TaskManger
- **Live Demo:** https://lekhanpavansai.github.io/TaskManger/
- **Download Source (ZIP):** https://github.com/lekhanpavansai/TaskManger/archive/refs/heads/main.zip

### Enable Live Demo (one-time)

If the live URL shows 404, open your repo **Settings → Pages**, set **Source** to **Deploy from a branch**, choose branch **`gh-pages`** and folder **`/ (root)`**, then save.

## Tech Stack

- **Frontend:** React + Vite + React Router
- **Backend:** Node.js + Express

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
# Install root dependencies
npm install

# Install client dependencies
npm install --prefix client

# Install server dependencies
npm install --prefix server
```

### Development

Run both frontend and backend concurrently:

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

Or run them separately:

```bash
npm run dev:client   # Frontend only
npm run dev:server   # Backend only
```

### Test Credentials

- **Username:** `sara@example.com`
- **Password:** `user123`

## Features

- Secure login via external auth API
- Protected routes with localStorage token
- Kanban dashboard (To Do, In Progress, Done)
- Search and priority filters
- Add task modal with validation
- Task detail page with status history
- Task persistence via localStorage
- 404 page

## Environment Variables

Copy `.env.example` files and configure as needed:

- `client/.env` — `VITE_AUTH_API_URL` (defaults to `/api/auth/signin`)
- `server/.env` — `PORT`, `AUTH_API_URL`

## Production Build

```bash
npm run build
npm start
```
