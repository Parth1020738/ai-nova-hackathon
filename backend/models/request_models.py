# models/request_models.py
# ============================================================
# Pydantic models for request and response validation.
# FastAPI uses these to automatically validate incoming JSON
# and to document the API shape.
# ============================================================

from pydantic import BaseModel, field_validator


class GenerateRequest(BaseModel):
    """
    The JSON body the frontend sends to POST /generate.
    Example: { "prompt": "Create a photography portfolio" }
    """
    prompt: str

    # Validate that the prompt is not empty or just whitespace
    @field_validator("prompt")
    @classmethod
    def prompt_must_not_be_empty(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("Prompt cannot be empty.")
        if len(stripped) < 3:
            raise ValueError("Prompt is too short. Please describe the website in more detail.")
        return stripped


class GenerateResponse(BaseModel):
    """
    The JSON the backend sends back to the frontend.
    Example: { "html": "<html>...</html>", "css": "body { ... }" }
    """
    html: str
    css: str
