# services/ai_generator.py
# ============================================================
# Responsible for calling the AI model via OpenRouter.
# OpenRouter is an API aggregator that provides access to many
# AI models (including Google Gemini) using a single API key
# and an OpenAI-compatible interface.
#
# API Docs: https://openrouter.ai/docs
# ============================================================

import os
from openai import OpenAI
from dotenv import load_dotenv
from fastapi import HTTPException

# Load environment variables from the .env file
# (reads OPENROUTER_API_KEY so we never hardcode secrets)
load_dotenv()


def call_gemini(full_prompt: str) -> str:
    """
    Sends the prompt to Google Gemini (via OpenRouter) and returns
    the AI's raw text response.

    Args:
        full_prompt: The complete prompt string built by prompt_builder.py

    Returns:
        The raw text string from the AI (may contain HTML, may have fences)

    Raises:
        HTTPException 500: if the API key is missing or invalid placeholder
        HTTPException 502: if the API call itself fails
    """

    # --- Step 1: Get the API key from .env ---
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key or api_key == "your_openrouter_api_key_here":
        raise HTTPException(
            status_code=500,
            detail=(
                "AI service not configured. "
                "Please add OPENROUTER_API_KEY to your backend/.env file. "
                "Get a free key at https://openrouter.ai/"
            )
        )

    # --- Step 2: Create the OpenRouter client ---
    # OpenRouter uses the same interface as OpenAI, we just change the base_url
    client = OpenAI(
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1",
    )

    # --- Step 3: Send the prompt and get the response ---
    try:
        response = client.chat.completions.create(
            # Google Gemini 2.0 Flash via OpenRouter — fast and free-tier friendly
            model="google/gemini-2.0-flash-001",
            messages=[
                {
                    "role": "user",
                    "content": full_prompt
                }
            ],
            # temperature 0.7 = creative but still structured output
            temperature=0.7,
            # max_tokens: websites need ~2000-4000 tokens for a full page
            max_tokens=8192,
        )

        # Extract the text content from the response
        return response.choices[0].message.content

    except Exception as error:
        # If the API call fails (rate limit, network error, etc.)
        # raise a 502 Bad Gateway with the reason
        raise HTTPException(
            status_code=502,
            detail=f"AI generation failed: {str(error)}"
        )
