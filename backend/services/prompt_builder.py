# services/prompt_builder.py
# ============================================================
# Turns the user's short prompt into a detailed instruction
# that guides the AI to produce exactly the output we need:
# a single, complete, self-contained HTML file with embedded CSS.
# ============================================================

from utils.helpers import sanitise_prompt


def build_prompt(user_prompt: str) -> str:
    """
    Wraps the user's raw prompt in a structured system instruction.

    Why this matters:
    - Without guidance, AI models output markdown, explanations, or
      incomplete snippets.
    - This system prompt forces the model to output ONLY a complete
      HTML file — no extra text, no fences, just code.

    Args:
        user_prompt: The raw string the user typed in the frontend.

    Returns:
        A formatted string ready to be sent to the Gemini API.
    """
    # Clean the user input first
    clean_prompt = sanitise_prompt(user_prompt)

    # Build the full instruction
    full_prompt = f"""You are an expert web designer and front-end developer.

Your task is to generate a complete, beautiful, modern website based on the user's description below.

STRICT RULES — follow these exactly:
1. Output ONLY raw HTML with no markdown, no code fences (```), and no explanations.
2. The output must be a single, complete HTML file starting with <!DOCTYPE html>.
3. All CSS must be embedded inside a <style> tag in the <head> section.
4. Do NOT use any external CSS frameworks (no Bootstrap, no Tailwind).
5. You MAY use Google Fonts via a <link> tag — this is encouraged.
6. The website must be fully responsive (works on mobile and desktop).
7. Use a beautiful, modern design with:
   - A carefully chosen colour palette (not default browser colours)
   - Smooth hover effects and micro-animations where appropriate
   - Clean typography and proper spacing
   - Professional layout and visual hierarchy
8. Do NOT include any JavaScript unless the user specifically asks for it.
9. The page must be visually complete — no placeholder "lorem ipsum" text.
   Generate realistic, relevant content that fits the website's purpose.

USER DESCRIPTION:
{clean_prompt}

Now output the complete HTML file:"""

    return full_prompt
