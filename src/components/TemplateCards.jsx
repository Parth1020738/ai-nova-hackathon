// components/TemplateCards.jsx
// ============================================================
// Section showing example website templates the user can click
// to auto-fill the prompt input box
// ============================================================

import React from 'react';
import '../styles/TemplateCards.css';

// ── Template data ──
// Each template has an icon, title, description, and a starter prompt
const TEMPLATES = [
    {
        id: 'portfolio',
        icon: '🎨',
        title: 'Portfolio',
        desc: 'Showcase your work and skills',
        prompt: 'Create a stunning portfolio website for a UI/UX designer with a dark theme and project gallery.',
    },
    {
        id: 'saas',
        icon: '🚀',
        title: 'SaaS Landing',
        desc: 'Convert visitors to customers',
        prompt: 'Build a modern SaaS landing page with a hero section, features list, pricing table, and CTA buttons.',
    },
    {
        id: 'blog',
        icon: '✍️',
        title: 'Blog',
        desc: 'Share your thoughts and stories',
        prompt: 'Design a clean minimal blog homepage with a header, featured post, article cards, and newsletter signup.',
    },
    {
        id: 'ecommerce',
        icon: '🛍️',
        title: 'E-Commerce',
        desc: 'Sell your products online',
        prompt: 'Create an elegant e-commerce product page with a hero banner, product grid, and shopping cart icon.',
    },
    {
        id: 'restaurant',
        icon: '🍽️',
        title: 'Restaurant',
        desc: 'Invite guests with style',
        prompt: 'Build a warm and inviting restaurant website with a hero image, menu section, and reservation form.',
    },
    {
        id: 'nonprofit',
        icon: '🌱',
        title: 'Non-Profit',
        desc: 'Inspire people to donate',
        prompt: 'Design a compassionate non-profit website with a mission statement, impact stats, and donation CTA.',
    },
];

/**
 * TemplateCards Component
 * -----------------------
 * Props:
 *   onSelectTemplate (function) — called with template.prompt when a card is clicked
 */
function TemplateCards({ onSelectTemplate }) {
    return (
        <section className="templates-section" aria-labelledby="templates-title">

            {/* ── Header row ── */}
            <div className="templates-header">
                <h2 className="templates-title" id="templates-title">
                    🗂️ Start from a template
                </h2>
                <button className="browse-btn" onClick={() => alert('More templates coming soon!')}>
                    Browse all templates →
                </button>
            </div>

            {/* ── Cards grid ── */}
            <div className="templates-grid" role="list">
                {TEMPLATES.map((tpl) => (
                    <button
                        key={tpl.id}
                        className="template-card"
                        role="listitem"
                        onClick={() => onSelectTemplate && onSelectTemplate(tpl.prompt)}
                        aria-label={`Use ${tpl.title} template`}
                        title={tpl.prompt}
                    >
                        <span className="card-icon" aria-hidden="true">{tpl.icon}</span>
                        <div className="card-title">{tpl.title}</div>
                        <div className="card-desc">{tpl.desc}</div>
                    </button>
                ))}
            </div>

        </section>
    );
}

export default TemplateCards;
