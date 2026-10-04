# EcoKitchen AI

EcoKitchen AI is a food-waste management and donation platform with a React/Vite frontend and a FastAPI/MongoDB backend.

## Requirements

- Node.js 20 or later
- Python 3.11 or later
- MongoDB running locally on port `27017`

## 1. Start MongoDB

Start your local MongoDB service before running the backend. The default connection is:

```text
mongodb://localhost:27017
```

The backend uses a database named `ecokitchen_ai` by default.

## 2. Run the backend

Open PowerShell in the project folder, then run:

```powershell
cd Backend
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload
```

The backend starts at `http://127.0.0.1:8000`.

Useful backend URLs:

- API documentation: `http://127.0.0.1:8000/docs`
- OpenAPI schema: `http://127.0.0.1:8000/openapi.json`
- Health check: `http://127.0.0.1:8000/health`

### Backend environment variables

Edit `Backend/.env` if needed. Do not use the example JWT key in a deployed application.

```env
MONGODB_URL=mongodb://localhost:27017
MONGODB_DATABASE=ecokitchen_ai
JWT_SECRET_KEY=replace-with-a-long-random-secret
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

## 3. Run the frontend

Open a second PowerShell window in the project folder, then run:

```powershell
cd Frontend
npm install
npm run dev
```

Open `http://127.0.0.1:5173` in your browser.

The frontend is configured to call the backend at:

```text
http://127.0.0.1:8000/api/v1
```

To use a different API address, create or edit `Frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

## Verify the project

### Frontend production build

```powershell
cd Frontend
npm run build
```

### Backend tests

```powershell
cd Backend
.\.venv\Scripts\python.exe -m pytest -q
```

## API areas

The API is available below `/api/v1` and includes:

- Authentication and users
- Inventory and expiry tracking
- Sales and food-waste records
- Forecasts
- Donations and charity requests
- Notifications
- Reports and charity discovery

## Project structure

```text
Backend/         FastAPI application, tests, and environment example
Frontend/        React + TypeScript + Vite application
Database .csv/   CSV and MongoDB export seed data
FIXES.txt        Record of completed fixes and verification
```

## Notes

- MongoDB must be running for the backend application to start.
- Use `Backend/.env` for local secrets; do not commit it to source control.
- Some frontend pages still use mock data while their API integrations are being migrated. See `FIXES.txt` for the current status.
