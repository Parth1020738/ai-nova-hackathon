# routes/generate.py
# ============================================================
# Defines the POST /generate API endpoint.
#
# This is the single route the frontend calls. It coordinates
# the three service modules:
#   1. prompt_builder  → enhance the prompt
#   2. ai_generator    → call Gemini
#   3. code_formatter  → extract HTML + CSS
# ============================================================

from fastapi import APIRouter
from models.request_models import GenerateRequest, GenerateResponse
from services.prompt_builder import build_prompt
from services.ai_generator import call_gemini
from services.code_formatter import format_response

# APIRouter lets us keep routes in separate files
# and then "include" them in main.py
router = APIRouter()


@router.post(
    "/generate",
    response_model=GenerateResponse,
    summary="Generate a website from a text prompt",
    description="Receives a natural language prompt and returns AI-generated HTML and CSS."
)
async def generate_website(request: GenerateRequest):
    """
    POST /generate

    Endpoint flow:
    1. Receive { "prompt": "..." } from the frontend
    2. Build a detailed AI instruction from the user prompt
    3. Call the Gemini AI model
    4. Extract clean HTML + CSS from the AI response
    5. Return { "html": "...", "css": "..." }

    FastAPI automatically validates the request body using GenerateRequest.
    If prompt is empty or too short, it returns a 422 error automatically.
    """

    # Step 1: Build a detailed prompt for the AI
    # The prompt_builder wraps the user's short description into
    # a precise instruction that produces clean HTML output
    enhanced_prompt = build_prompt(request.prompt)

    # Step 2: Send the enhanced prompt to Google Gemini
    # This returns the raw AI response text
    raw_ai_response = call_gemini(enhanced_prompt)

    # Step 3: Parse and clean the AI's response
    # Extracts the full HTML document and the CSS block
    result = format_response(raw_ai_response)

    # Step 4: Return the structured response to the frontend
    return GenerateResponse(
        html=result["html"],
        css=result["css"]
    )
