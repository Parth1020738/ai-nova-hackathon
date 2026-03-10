// components/PreviewPane.jsx
// ============================================================
// iframe container that renders the AI-generated website HTML+CSS
// ============================================================

import React, { useRef, useEffect } from 'react';
import '../styles/PreviewPane.css';

/**
 * PreviewPane Component
 * ---------------------
 * Receives { html, css } from the parent (App.jsx) and writes
 * them into an iframe's document so the generated site is isolated
 * inside a sandboxed environment.
 *
 * Props:
 *   generatedSite  ({ html: string, css: string } | null)
 *   isLoading      (boolean)  — show spinner while waiting for API
 *   prompt         (string)   — used to show the prompt being processed
 */
function PreviewPane({ generatedSite, isLoading, prompt }) {
    const iframeRef = useRef(null);

    // ── Write generated HTML into the iframe whenever it changes ──
    useEffect(() => {
        if (!generatedSite || !iframeRef.current) return;

        const iframe = iframeRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow.document;

        // Open a blank document in the iframe and write the full HTML
        doc.open();
        doc.write(generatedSite.html);
        doc.close();
    }, [generatedSite]);

    return (
        <section className="preview-section" aria-label="Website preview">

            {/* ── Section header ── */}
            <div className="preview-header">
                <div className="preview-title">
                    {/* Green pulsing dot = "live" indicator */}
                    {generatedSite && <span className="preview-dot" aria-hidden="true" />}
                    Preview
                </div>

                {/* Action buttons */}
                {generatedSite && (
                    <div className="preview-actions">
                        <button
                            className="preview-action-btn"
                            onClick={() => {
                                // Open the generated site in a new browser tab
                                const blob = new Blob([generatedSite.html], { type: 'text/html' });
                                const url = URL.createObjectURL(blob);
                                window.open(url, '_blank');
                            }}
                            title="Open in a new tab"
                        >
                            ↗ Open
                        </button>
                        <button
                            className="preview-action-btn"
                            onClick={() => {
                                // Download the HTML file
                                const blob = new Blob([generatedSite.html], { type: 'text/html' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'generated-website.html';
                                a.click();
                                URL.revokeObjectURL(url);
                            }}
                            title="Download HTML file"
                        >
                            ↓ Download
                        </button>
                    </div>
                )}
            </div>

            {/* ── Browser-chrome mockup ── */}
            <div className="preview-browser">

                {/* Fake address bar */}
                <div className="preview-browser-bar" aria-hidden="true">
                    <div className="browser-dots">
                        <div className="browser-dot red" />
                        <div className="browser-dot yellow" />
                        <div className="browser-dot green" />
                    </div>
                    <div className="browser-url-bar">
                        {generatedSite ? 'preview://generated-website' : 'about:blank'}
                    </div>
                </div>

                {/* ── Content area: loading / placeholder / iframe ── */}
                {isLoading ? (
                    // Show spinner while API call is in progress
                    <div className="preview-loading" role="status" aria-live="polite">
                        <div className="preview-spinner" aria-hidden="true" />
                        <p className="preview-loading-text">
                            Generating your website…
                            {prompt && <><br /><em style={{ fontSize: 12, opacity: 0.6 }}>"{prompt.slice(0, 60)}{prompt.length > 60 ? '…' : ''}"</em></>}
                        </p>
                    </div>
                ) : generatedSite ? (
                    // Show the iframe with the generated site
                    <iframe
                        ref={iframeRef}
                        className="preview-iframe"
                        title="Generated website preview"
                        sandbox="allow-scripts allow-same-origin"
                        aria-label="Generated website preview"
                    />
                ) : (
                    // Empty state before any generation
                    <div className="preview-placeholder" aria-label="No preview yet">
                        <div className="preview-placeholder-icon" aria-hidden="true">🌐</div>
                        <p className="preview-placeholder-text">
                            Your generated website will appear here. Type a prompt above and click <strong>Generate</strong>.
                        </p>
                    </div>
                )}
            </div>

        </section>
    );
}

export default PreviewPane;
