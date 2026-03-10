# main.py
# ============================================================
# FastAPI application entry point.
#
# This file:
#   1. Creates the FastAPI app instance
#   2. Adds CORS middleware so the React frontend can call the API
#   3. Registers the /generate route
#   4. Provides a health-check root endpoint
# ============================================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.generate import router as generate_router

# ── Create the FastAPI app ──
app = FastAPI(
    title="AI Website Builder API",
    description="Receives a text prompt and returns AI-generated HTML + CSS for a complete website.",
    version="1.0.0"
)

# ── CORS Middleware ──
# This allows the React frontend running at localhost:5173 (Vite)
# to call this backend running at localhost:3000.
# Without this, the browser would block the request with a CORS error.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server (default)
        "http://localhost:5174",   # Vite alternate port
        "http://localhost:3000",   # In case frontend and backend share port
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],    # Allow GET, POST, OPTIONS, etc.
    allow_headers=["*"],    # Allow Content-Type, Authorization, etc.
)

# ── Register Routes ──
# Include the /generate route from routes/generate.py
app.include_router(generate_router)


# ── Health Check ──
# A simple GET / endpoint so you can confirm the server is running.
# Open http://localhost:3000 in your browser and you should see this.
@app.get("/", summary="Health check")
async def root():
    return {
        "status": "running",
        "message": "AI Website Builder API is live. Send a POST request to /generate."
    }


# ── Run with uvicorn ──
# If you run this file directly with: python main.py
# it will start the server on port 3000 (matching the frontend's API_BASE_URL)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=3000, reload=True)
