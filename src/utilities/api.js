// utilities/api.js
// ============================================================
// API helper for the AI Website Builder
// This file handles communication with the backend.
// POST /generate  →  { html, css }
// ============================================================

// ── Configuration ──
// Change API_BASE_URL to your backend server address when deploying
const API_BASE_URL = 'http://localhost:3000';

/**
 * generateWebsite
 * ---------------
 * Sends the user's prompt to the backend and returns generated HTML + CSS.
 *
 * @param {string} prompt - The user's description of the website
 * @returns {Promise<{ html: string, css: string }>}
 */
export async function generateWebsite(prompt) {
  try {
    // Attempt real API call
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data; // Expected: { html: "...", css: "..." }

  } catch (error) {
    // ── Fallback: return a mock preview when backend is unavailable ──
    // Remove this block and the try/catch once your real API is ready
    console.warn('[API] Backend unavailable — using mock response:', error.message);
    return getMockResponse(prompt);
  }
}

/**
 * getMockResponse
 * ---------------
 * Returns a realistic mock website preview for offline development.
 * This lets you test the UI without a running backend.
 *
 * @param {string} prompt - The user's prompt (used in the preview heading)
 * @returns {{ html: string, css: string }}
 */
function getMockResponse(prompt) {
  const css = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      color: #ffffff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 20px;
    }
    .badge {
      background: rgba(124, 58, 237, 0.3);
      border: 1px solid rgba(124, 58, 237, 0.5);
      color: #c4b5fd;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 99px;
      margin-bottom: 24px;
      display: inline-block;
    }
    h1 {
      font-size: clamp(28px, 6vw, 56px);
      font-weight: 800;
      line-height: 1.15;
      background: linear-gradient(135deg, #fff 30%, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      color: rgba(255,255,255,0.6);
      max-width: 480px;
      margin: 0 auto 36px;
      line-height: 1.7;
    }
    .cta-btn {
      background: linear-gradient(135deg, #7c3aed, #2563eb);
      color: white;
      border: none;
      padding: 14px 36px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 99px;
      cursor: pointer;
      box-shadow: 0 8px 30px rgba(124, 58, 237, 0.4);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(124, 58, 237, 0.6);
    }
    .features {
      display: flex;
      gap: 16px;
      margin-top: 60px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .feature-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      padding: 24px;
      width: 160px;
      text-align: center;
    }
    .feature-card .icon { font-size: 28px; margin-bottom: 10px; }
    .feature-card .label { font-size: 13px; color: rgba(255,255,255,0.7); }
  `;

  // Create a short title from the prompt
  const title = prompt.length > 40 ? prompt.substring(0, 40) + '…' : prompt;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Generated Website</title>
      <style>${css}</style>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet"/>
    </head>
    <body>
      <div class="badge">✨ AI Generated</div>
      <h1>${title}</h1>
      <p>This is a preview of your AI-generated website. Connect your backend API to get real generated code tailored to your prompt.</p>
      <button class="cta-btn">Get Started →</button>
      <div class="features">
        <div class="feature-card"><div class="icon">⚡</div><div class="label">Fast Build</div></div>
        <div class="feature-card"><div class="icon">🎨</div><div class="label">Custom Design</div></div>
        <div class="feature-card"><div class="icon">📱</div><div class="label">Responsive</div></div>
        <div class="feature-card"><div class="icon">🤖</div><div class="label">AI Powered</div></div>
      </div>
    </body>
    </html>
  `;

  return { html, css };
}
