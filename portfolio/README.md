# Venkata Varshith 3D Developer Portfolio

Modern full-stack portfolio for Venkata Varshith with:

- React + Vite frontend
- TailwindCSS styling and Framer Motion animation
- React Three Fiber 3D workspace
- Node.js + Express backend
- Google Gemini chatbot
- GitHub auto project integration
- Dynamic resume PDF generator
- Recruiter analytics with MongoDB persistence

## Project Structure

```text
portfolio/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── analyticsController.js
│   ├── data/
│   │   └── profile.json
│   ├── models/
│   │   └── Visit.js
│   ├── routes/
│   │   ├── analytics.js
│   │   ├── chat.js
│   │   ├── github.js
│   │   └── resume.js
│   ├── services/
│   │   └── analyticsService.js
│   ├── utils/
│   │   ├── gemini.js
│   │   └── resumeParser.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── analytics/
│   │   │   └── useAnalytics.js
│   │   ├── components/
│   │   │   ├── Chatbot.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── GitHubSection.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ResumeSection.jsx
│   │   │   ├── ResumeUpload.jsx
│   │   │   ├── Skills.jsx
│   │   │   └── Workspace3D.jsx
│   │   ├── data/
│   │   │   └── profile.json
│   │   ├── pages/
│   │   │   └── AdminDashboard.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Features

### 1. 3D Developer Workspace

The 3D scene is implemented with React Three Fiber in `frontend/src/components/Workspace3D.jsx`.

Objects:

- Laptop -> Projects
- Whiteboard -> Skills
- Desk -> About Me
- Robot assistant -> AI Chatbot
- Bookshelf -> Education

The scene supports:

- Mouse orbit with `OrbitControls`
- Zoom in/out
- Clickable 3D objects that scroll to portfolio sections

### 2. Modern Portfolio UI

The main UI includes:

- Navbar
- Hero section
- Projects
- Skills
- GitHub activity
- AI assistant
- Contact
- Resume generator
- Recruiter analytics dashboard

### 3. GitHub Auto Project Integration

Backend routes in `backend/routes/github.js` fetch repos from GitHub and return normalized project data.

Endpoints:

- `GET /api/github/repos`
- `GET /api/github/user`

### 4. AI Chatbot

Backend chatbot route:

- `POST /api/chat`

Gemini integration lives in `backend/utils/gemini.js`.

### 5. Resume Generator

Frontend resume generator:

- `frontend/src/components/ResumeSection.jsx`

Uses `html2pdf.js` to export a PDF generated from profile JSON data.

### 6. Recruiter Analytics

Analytics endpoints:

- `POST /api/analytics/track`
- `GET /api/analytics/stats`

Tracked data:

- Visitor IP
- Country
- Device type
- Pages visited
- Project clicks
- Timestamp

MongoDB model:

- `backend/models/Visit.js`

If MongoDB is not configured, analytics fall back to in-memory storage.

## Environment Variables

### Backend `.env`

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_key
GITHUB_USERNAME=varshith125
MONGODB_URI=your_mongodb_connection_string
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## Local Development

### Frontend

```powershell
cd C:\Users\varsh\Downloads\portfolio\portfolio\frontend
npm.cmd install
npm.cmd run dev
```

### Backend

```powershell
cd C:\Users\varsh\Downloads\portfolio\portfolio\backend
npm.cmd install
npm.cmd start
```

## Deployment

### Frontend

Deploy `frontend/` to Vercel or Netlify.

Required env var:

```env
VITE_API_URL=https://your-backend-domain/api
```

### Backend

Deploy `backend/` to Render, Railway, or Fly.io.

Required env vars:

```env
GEMINI_API_KEY=...
GITHUB_USERNAME=varshith125
FRONTEND_URL=https://your-frontend-domain
MONGODB_URI=...
```

## Notes

- The app already includes a production build path for the frontend.
- The frontend bundle is currently large because the 3D scene and PDF generator are bundled eagerly.
- A good next optimization is lazy-loading `Workspace3D` and `ResumeSection`.
