# TaskManger

A full-stack task management web app with user authentication, kanban-style dashboard, and persistent local storage.

## Links

- **GitHub Repository:** https://github.com/lekhanpavansai/TaskManger
- **Live Demo:** https://lekhanpavansai.github.io/TaskManger/
- **Download Source (ZIP):** https://github.com/lekhanpavansai/TaskManger/archive/refs/heads/main.zip
- **Netlify Deploy (alternative):** https://app.netlify.com/start/deploy?repository=https://github.com/lekhanpavansai/TaskManger

### Enable Live Demo (one-time, ~30 seconds)

The app is already built and pushed to the `gh-pages` branch. To activate the live URL:

1. Open **Settings → Pages** in the GitHub repo
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**
3. Select branch **`gh-pages`**, folder **`/ (root)`**, then click **Save**
4. Wait 1–2 minutes, then open https://lekhanpavansai.github.io/TaskManger/

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
