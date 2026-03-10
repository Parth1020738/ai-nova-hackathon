// App.jsx
// ============================================================
// Root component — manages application state and renders layout
// ============================================================

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import { generateWebsite } from './utilities/api';
import './styles/App.css';

function App() {
  // ── Navigation state ──
  // Tracks which sidebar item is active
  const [activeNav, setActiveNav] = useState('home');

  // ── Mobile sidebar state ──
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Generation state ──
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSite, setGeneratedSite] = useState(null); // { html, css }
  const [currentPrompt, setCurrentPrompt] = useState('');

  // ── Handle generate request from PromptInput ──
  async function handleGenerate(prompt) {
    setIsLoading(true);
    setCurrentPrompt(prompt);
    setGeneratedSite(null); // clear previous result

    try {
      const result = await generateWebsite(prompt);
      setGeneratedSite(result);
    } catch (err) {
      console.error('Generation failed:', err);
      alert('Failed to generate website. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // ── Handle template card click ──
  // When user clicks a template, we auto-generate using its preset prompt
  function handleSelectTemplate(prompt) {
    handleGenerate(prompt);
  }

  // ── Handle sidebar nav clicks ──
  function handleNavClick(id) {
    setActiveNav(id);
    setSidebarOpen(false); // close sidebar on mobile after navigation

    // Placeholder: in a multi-page app you'd navigate here
    if (id !== 'home') {
      alert(`"${id.charAt(0).toUpperCase() + id.slice(1)}" page coming soon!`);
    }
  }

  return (
    <div className="app-container">

      {/* ── Mobile hamburger button (only visible on small screens) ── */}
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={sidebarOpen}
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 200,
          display: 'none', // shown via CSS media query below
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          padding: '6px 10px',
          fontSize: 20,
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        ☰
      </button>

      {/* ── Sidebar overlay for mobile ── */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99,
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Left Sidebar ── */}
      <Sidebar
        activeItem={activeNav}
        onNavClick={handleNavClick}
        isOpen={sidebarOpen}
      />

      {/* ── Main page content ── */}
      <div className="main-content">
        {activeNav === 'home' && (
          <Home
            onGenerate={handleGenerate}
            onSelectTemplate={handleSelectTemplate}
            isLoading={isLoading}
            generatedSite={generatedSite}
            currentPrompt={currentPrompt}
          />
        )}
      </div>

      {/* ── Mobile: CSS to show the hamburger button ── */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </div>
  );
}

export default App;
