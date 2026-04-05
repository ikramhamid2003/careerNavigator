# Career Navigator — Setup Guide

## Prerequisites
- Python 3.11 or 3.12
- Node.js 18+
- Git

---

## Backend Setup

```powershell
cd career-navigator\backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python -m ml_engine.ml_model
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

---

## Frontend Setup (new terminal)

```powershell
cd career-navigator\frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## Notes
- The .env file is pre-configured with Neon PostgreSQL and Groq API
- Replace GROQ_API_KEY if expired (get a free key at console.groq.com)
- Replace DATABASE_URL if your Neon DB changes
