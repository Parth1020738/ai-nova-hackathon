# services/code_formatter.py
# ============================================================
# Takes the raw AI response text and extracts clean HTML and CSS.
#
# The AI is instructed to return a complete HTML file, so:
#   html → the full HTML string (with CSS already inside <style>)
#   css  → the CSS extracted from the <style> block (for the frontend)
#
# The frontend (PreviewPane.jsx) writes generatedSite.html into
# the iframe, so we must return the complete HTML with styles.
# The css field is a convenience — the frontend currently doesn't
# use it separately, but it's included for future use.
# ============================================================

import re
from utils.helpers import strip_fences


def format_response(raw_text: str) -> dict:
    """
    Parses the AI's raw text output and returns { html, css }.

    Processing steps:
    1. Strip any markdown fences the AI may have added
    2. Extract the complete HTML (from <!DOCTYPE> or <html> to </html>)
    3. Pull out the CSS from the <style> block as a separate field

    Args:
        raw_text: The raw string returned by call_gemini()

    Returns:
        A dict with keys "html" (str) and "css" (str)
    """

    # --- Step 1: Remove markdown code fences ---
    # Gemini sometimes wraps output in ```html ... ``` even when told not to
    cleaned = strip_fences(raw_text)

    # --- Step 2: Extract the full HTML document ---
    # We look for the HTML block starting at <!DOCTYPE html> or <html>
    html_match = re.search(
        r"(<!DOCTYPE\s+html[\s\S]*?</html>|<html[\s\S]*?</html>)",
        cleaned,
        re.IGNORECASE
    )

    if html_match:
        # Found a well-formed HTML document — use it
        html_output = html_match.group(1).strip()
    else:
        # Fallback: the AI didn't wrap in <html> tags — use everything
        # This handles edge cases where only a <body> fragment was returned
        html_output = cleaned.strip()

        # If there's no <html> wrapping, wrap it ourselves so the iframe works
        if not html_output.lower().startswith("<html"):
            html_output = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Generated Website</title>
</head>
<body>
{html_output}
</body>
</html>"""

    # --- Step 3: Extract the CSS from the <style> block ---
    # We pull the CSS out as a separate string field.
    # The styles are already embedded in html_output, this is just
    # for the frontend's css field (useful if the UI shows code view)
    css_match = re.search(
        r"<style[^>]*>([\s\S]*?)</style>",
        html_output,
        re.IGNORECASE
    )

    css_output = css_match.group(1).strip() if css_match else ""

    return {
        "html": html_output,
        "css": css_output
    }
