// pages/Home.jsx
// ============================================================
// Main page — assembles Sidebar, HeroSection, TemplateCards,
// and PreviewPane. State is passed down as props.
// ============================================================

import React from 'react';
import HeroSection from '../components/HeroSection';
import TemplateCards from '../components/TemplateCards';
import PreviewPane from '../components/PreviewPane';

/**
 * Home Page
 * ---------
 * Props (passed from App.jsx):
 *   onGenerate       (function) — triggers website generation
 *   onSelectTemplate (function) — fills prompt from a template card
 *   isLoading        (boolean)  — true while API call is pending
 *   generatedSite    (object|null) — { html, css } returned by API
 *   currentPrompt    (string)   — the prompt being processed
 */
function Home({ onGenerate, onSelectTemplate, isLoading, generatedSite, currentPrompt }) {
    return (
        <main>
            {/* ── Step 1: Hero with prompt input ── */}
            <HeroSection onGenerate={onGenerate} isLoading={isLoading} />

            {/* ── Step 2: Template cards ── */}
            <TemplateCards onSelectTemplate={onSelectTemplate} />

            {/* ── Step 3: Preview (only shown once something is generated or loading) ── */}
            {(generatedSite || isLoading) && (
                <PreviewPane
                    generatedSite={generatedSite}
                    isLoading={isLoading}
                    prompt={currentPrompt}
                />
            )}
        </main>
    );
}

export default Home;
