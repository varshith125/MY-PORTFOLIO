# MY-PORTFOLIO

Personal portfolio website for **Varshith** — a React single-page site with an
Express backend that powers an AI "Ask me" chat assistant (via Google Gemini).

The project lives in the [`portfolio/`](portfolio/) folder and is split into two parts:

| Part | Stack | Folder |
|------|-------|--------|
| **Frontend** | React 19 + Vite, Framer Motion, GSAP | [`portfolio/frontend`](portfolio/frontend) |
| **Backend**  | Node.js + Express, Google Generative AI (Gemini) | [`portfolio/backend`](portfolio/backend) |

---

## Features

- Animated single-page portfolio (hero, work, skills, contact).
- "Ask me anything" chat box answered by an AI assistant grounded in profile data.
- Resume generated at build time (`make-resume.mjs`).

---

## Getting started

You'll need [Node.js](https://nodejs.org/) (v18 or newer) installed.

### 1. Backend

```bash
cd portfolio/backend
npm install
cp .env.example .env     # then fill in your values
npm run dev              # starts the API on http://localhost:5000
```

Environment variables (`portfolio/backend/.env`):

| Variable | Description |
|----------|-------------|
| `PORT` | Port the API runs on (default `5000`) |
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `GEMINI_MODEL` | Model name, e.g. `gemini-1.5-flash` |

### 2. Frontend

```bash
cd portfolio/frontend
npm install
cp .env.example .env     # optional, for custom API URLs
npm run dev              # starts the site on http://localhost:5173
```

Environment variables (`portfolio/frontend/.env`):

| Variable | Description |
|----------|-------------|
| `VITE_DEV_API` | Backend URL the dev server forwards `/api` to (default `http://localhost:5000`) |
| `VITE_API_URL` | Deployed backend URL for production builds (leave empty if same domain) |

---

## Scripts

**Frontend**
- `npm run dev` — start the Vite dev server
- `npm run build` — generate the resume, then build for production
- `npm run preview` — preview the production build

**Backend**
- `npm start` — start the API server
- `npm run dev` — start with auto-reload on file changes

---

## API endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/chat` | AI chat assistant |
| `GET`  | `/api/health` | Health check |

---

## Notes

- Secrets live in `.env` files, which are **not** committed to git. Use the
  `.env.example` files as templates.
- `node_modules/` and build output (`dist/`) are ignored and regenerated with
  `npm install` / `npm run build`.
