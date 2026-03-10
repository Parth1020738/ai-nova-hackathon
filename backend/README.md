# AI Website Builder — Backend

A Python + FastAPI backend that generates complete websites from a text prompt using Google Gemini AI.

## Quick Start

### 1. Get a Gemini API Key (free)
Go to [https://aistudio.google.com/](https://aistudio.google.com/), sign in, and click **"Get API Key"**.

### 2. Set up environment variables
```powershell
# In the backend/ directory, create a .env file
copy .env.example .env
# Then open .env and replace the placeholder with your real API key
```

### 3. Install dependencies
```powershell
pip install -r requirements.txt
```

### 4. Start the server
```powershell
python main.py
```
Server runs at **http://localhost:3000**

### 5. Start the React frontend (in a separate terminal)
```powershell
# From the project root (ai nove/)
npm run dev
```
Open **http://localhost:5173** in your browser and start generating websites!

---

## API Reference

### `POST /generate`
Generate a website from a text prompt.

**Request body:**
```json
{ "prompt": "Create a modern portfolio website for a photographer" }
```

**Response:**
```json
{
  "html": "<!DOCTYPE html><html>...</html>",
  "css": "body { ... }"
}
```

**Error responses:**
| Scenario | Status | Detail |
|---|---|---|
| Empty prompt | 422 | Validation error |
| Prompt < 3 chars | 422 | Prompt is too short |
| API key missing | 500 | AI service not configured |
| Gemini call fails | 502 | AI generation failed: `<reason>` |

### `GET /`
Health check — returns `{ "status": "running" }`.

---

## Folder Structure

```
backend/
 ├── main.py                  ← FastAPI app, CORS, route registration
 ├── requirements.txt         ← Python dependencies
 ├── .env                     ← Your API key (create from .env.example, never commit!)
 ├── .env.example             ← Template for .env
 ├── routes/
 │    └── generate.py         ← POST /generate endpoint
 ├── services/
 │    ├── ai_generator.py     ← Calls Google Gemini API
 │    ├── prompt_builder.py   ← Builds detailed AI system prompt
 │    └── code_formatter.py  ← Extracts HTML + CSS from AI response
 ├── models/
 │    └── request_models.py   ← Pydantic request/response models
 └── utils/
      └── helpers.py          ← Shared utilities (strip fences, sanitise)
```
