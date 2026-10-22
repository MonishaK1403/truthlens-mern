<<<<<<< HEAD
# TruthLens

**Detection and Analysis of Misinformation on Digital Platforms Using Natural Language Processing Techniques**

A full MERN stack web application (MongoDB, Express, React, Node.js) that lets users submit text, URLs, or files for a linguistic-pattern based misinformation analysis, view detailed explanations of why content was flagged, and track their analysis history — matching the UI in the attached design (Landing, Login, Dashboard, Analyze, Results, History).

## Tech Stack
- **Frontend:** React 18 + Vite, React Router, Tailwind CSS, Recharts (charts), Lucide icons, Axios
- **Backend:** Node.js + Express, MongoDB + Mongoose, JWT auth, bcrypt password hashing
- **NLP:** A lightweight, explainable rule-based pipeline (`backend/utils/analyzer.js`) using the `natural` library for sentiment scoring plus keyword/pattern heuristics for claim-type classification, suspicious-language detection, and evidence checking. It's structured so you can swap in a real transformer model (e.g. a fine-tuned BERT/RoBERTa classifier via a Python microservice, or the HuggingFace Inference API) without changing the API contract — see the comment at the top of that file.

## Project Structure
```
truthlens/
├── backend/
│   ├── config/db.js
│   ├── models/User.js, Analysis.js
│   ├── middleware/authMiddleware.js
│   ├── routes/authRoutes.js, analysisRoutes.js, dashboardRoutes.js
│   ├── utils/analyzer.js          # NLP heuristic engine
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── context/AuthContext.jsx
    │   ├── components/            # Sidebar, TopBar, StatCard, ResultBadge, ProtectedRoute
    │   ├── pages/                 # Landing, Login, Signup, Dashboard, Analyze, Results, History, SavedArticles, Insights, Profile, Settings
    │   └── App.jsx
    └── .env.example
```

## Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally, or a MongoDB Atlas connection string

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env      # then edit MONGO_URI / JWT_SECRET if needed
npm run dev                # starts on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env      # VITE_API_URL defaults to http://localhost:5000/api
npm run dev                # starts on http://localhost:5173
```

Open `http://localhost:5173`, sign up for an account, and start analyzing content. Use the sample-content chips on the Analyze page for a quick demo of all three result types (Reliable / Uncertain / Potential Misinformation).

## API Overview
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Log in, returns JWT |
| GET | `/api/auth/me` | Get current user (auth required) |
| POST | `/api/analyze` | Run a new analysis on text/URL content |
| GET | `/api/analyze/history` | Paginated analysis history (filterable by result) |
| GET | `/api/analyze/saved` | Bookmarked analyses |
| GET | `/api/analyze/:id` | Fetch one analysis |
| PATCH | `/api/analyze/:id` | Toggle `saved` / `reported` |
| DELETE | `/api/analyze/:id` | Delete an analysis |
| GET | `/api/dashboard/summary` | Totals, 30-day trend, content-source breakdown |

## Extending to a real ML model
Swap the body of `runHeuristicPipeline()` in `backend/utils/analyzer.js` for a call to your trained classifier (e.g. a Python FastAPI/Flask microservice serving a fine-tuned BERT model, or a HuggingFace Inference endpoint), keeping the same return shape:
```js
{ result, confidence, claimType, suspiciousLanguage, sentiment, evidenceCheck, recommendation, summary }
```
Everything downstream (routes, database schema, and the React UI) will keep working unchanged.

## Notes for your report
- Authentication: JWT stored client-side, verified via Express middleware on protected routes.
- Data model: `User` and `Analysis` collections in MongoDB, one-to-many relationship.
- The NLP module is intentionally explainable (keyword/lexicon based) rather than a black box, since the project brief calls for "detailed explanations" of why content is flagged. This can be presented as the baseline/rule-based model, with a transformer-based model as a proposed enhancement / future work section.
=======
# truthlens-mern
>>>>>>> 4de6ef4bf2518825af5dac7b544a3b4e6fe5e38f
