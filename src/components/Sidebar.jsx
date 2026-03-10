// components/Sidebar.jsx
// ============================================================
// Left navigation panel with Home, Projects, Templates, Settings
// ============================================================

import React, { useState } from 'react';
import '../styles/Sidebar.css';

// Navigation items — easy to add more here
const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'templates', label: 'Templates', icon: '🗂️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
];

/**
 * Sidebar Component
 * -----------------
 * Props:
 *   activeItem  (string)   — which nav item is currently selected
 *   onNavClick  (function) — called with item.id when user clicks a nav item
 *   isOpen      (boolean)  — controls mobile open/close state
 */
function Sidebar({ activeItem = 'home', onNavClick, isOpen = false }) {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="Main navigation">

            {/* ── Brand / Logo ── */}
            <div className="sidebar-brand">
                <div className="sidebar-brand-icon" aria-hidden="true">✦</div>
                <span className="sidebar-brand-name">BuildAI</span>
            </div>

            {/* ── Navigation Links ── */}
            <nav>
                <ul className="sidebar-nav" role="list">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id} className="sidebar-nav-item">
                            <button
                                className={`sidebar-nav-btn ${activeItem === item.id ? 'active' : ''}`}
                                onClick={() => onNavClick && onNavClick(item.id)}
                                aria-current={activeItem === item.id ? 'page' : undefined}
                            >
                                <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* ── User Avatar (bottom) ── */}
            <div className="sidebar-footer">
                <div className="sidebar-user" role="button" tabIndex={0} aria-label="User profile">
                    <div className="sidebar-avatar" aria-hidden="true">U</div>
                    <span className="sidebar-username">My Account</span>
                </div>
            </div>

        </aside>
    );
}

export default Sidebar;
