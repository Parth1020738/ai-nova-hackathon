# services/ai_generator.py
# ============================================================
# Responsible for calling the Google Gemini API.
# It receives the fully-built prompt from prompt_builder.py
# and returns the raw text response from the AI model.
# ============================================================

import os
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import HTTPException

# Load environment variables from the .env file
# (this reads GEMINI_API_KEY so we don't hardcode secrets in code)
load_dotenv()


def call_gemini(full_prompt: str) -> str:
    """
    Sends the prompt to the Google Gemini model and returns the
    AI's raw text response.

    Args:
        full_prompt: The complete prompt string built by prompt_builder.py

    Returns:
        The raw text string from the AI (may contain HTML, may have fences)

    Raises:
        HTTPException 500: if the API key is missing
        HTTPException 502: if the Gemini call itself fails
    """

    # --- Step 1: Get the API key ---
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your_gemini_api_key_here":
        # This means the user hasn't set up their .env file yet
        raise HTTPException(
            status_code=500,
            detail="AI service not configured. Please add GEMINI_API_KEY to your backend/.env file."
        )

    # --- Step 2: Configure the Gemini client ---
    genai.configure(api_key=api_key)

    # We use gemini-1.5-flash — it's fast, free-tier friendly, and
    # very capable at generating clean HTML/CSS output
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config={
            # temperature controls creativity:
            # 0.7 = creative but still structured and predictable
            "temperature": 0.7,
            # max_output_tokens: how long the response can be
            # Websites need ~2000-4000 tokens for a full page
            "max_output_tokens": 8192,
        }
    )

    # --- Step 3: Send the prompt and get the response ---
    try:
        response = model.generate_content(full_prompt)
        # .text gives us the raw string content of the response
        return response.text

    except Exception as error:
        # If Gemini fails for any reason (rate limit, network, etc.)
        # we raise a 502 Bad Gateway with the error reason
        raise HTTPException(
            status_code=502,
            detail=f"AI generation failed: {str(error)}"
        )
