// components/HeroSection.jsx
// ============================================================
// Centered hero area: badge → heading → subtitle → prompt input
// ============================================================

import React from 'react';
import PromptInput from './PromptInput';
import '../styles/HeroSection.css';

/**
 * HeroSection Component
 * ---------------------
 * Props:
 *   onGenerate  (function) — passed down to PromptInput, fires when user sends a prompt
 *   isLoading   (boolean)  — passed to PromptInput to show spinner during generation
 */
function HeroSection({ onGenerate, isLoading }) {
    return (
        <section className="hero-section" aria-labelledby="hero-heading">

            {/* ── AI badge ── */}
            <div className="hero-badge" aria-hidden="true">
                <span>✦</span>
                <span>Powered by AI</span>
            </div>

            {/* ── Main heading ── */}
            <h1 className="hero-heading" id="hero-heading">
                Ready to build your website?
            </h1>

            {/* ── Subtitle ── */}
            <p className="hero-subtitle">
                Describe your idea and our AI will generate a beautiful, fully responsive
                website for you in seconds — no coding needed.
            </p>

            {/* ── Prompt input box ── */}
            <PromptInput onGenerate={onGenerate} isLoading={isLoading} />

        </section>
    );
}

export default HeroSection;
