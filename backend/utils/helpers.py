# utils/helpers.py
# ============================================================
# Small shared utility functions used across the backend.
# Keeping these here avoids repeating the same logic in
# multiple service files.
# ============================================================

import re


def strip_fences(text: str) -> str:
    """
    Removes markdown code fences that AI models sometimes add around code.

    For example, Gemini might return:
        ```html
        <html>...</html>
        ```
    This function strips the triple-backtick lines so we get clean HTML.
    """
    # Remove ```html, ```css, ``` lines
    text = re.sub(r"```[a-zA-Z]*\n?", "", text)
    text = text.replace("```", "")
    return text.strip()


def sanitise_prompt(prompt: str) -> str:
    """
    Cleans and trims the user prompt before sending it to the AI.
    - Strips leading/trailing whitespace
    - Truncates to 1000 characters to control token usage
    """
    prompt = prompt.strip()
    if len(prompt) > 1000:
        prompt = prompt[:1000]
    return prompt
