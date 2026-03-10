// components/PromptInput.jsx
// ============================================================
// AI prompt input box with add, upload, and send icon buttons
// ============================================================

import React, { useState, useRef } from 'react';
import '../styles/PromptInput.css';

/**
 * PromptInput Component
 * ---------------------
 * Props:
 *   onGenerate  (function) — called with the prompt string when user clicks Send
 *   isLoading   (boolean)  — shows a spinner and disables the button while generating
 */
function PromptInput({ onGenerate, isLoading }) {
    // Track the text the user has typed
    const [prompt, setPrompt] = useState('');

    // Track whether the textarea is focused (used for glow effect)
    const [isFocused, setIsFocused] = useState(false);

    // Ref to the hidden file input element for the Upload button
    const fileInputRef = useRef(null);

    // ── Handle Send ──
    // Only send if there's text and we're not already loading
    function handleSend() {
        const trimmed = prompt.trim();
        if (!trimmed || isLoading) return;
        onGenerate(trimmed); // bubble up to parent (App.jsx)
    }

    // ── Allow Ctrl+Enter to submit ──
    function handleKeyDown(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handleSend();
        }
    }

    // ── Handle file upload ──
    // Opens the OS file picker; in a real app you'd upload the file to your server
    function handleUploadClick() {
        fileInputRef.current?.click();
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            // Append the file name as a reference in the prompt
            setPrompt((prev) => prev + (prev ? '\n' : '') + `[Attached: ${file.name}]`);
        }
    }

    // ── Handle Add (+) ──
    // Inserts a helpful starter template into the textarea
    function handleAdd() {
        setPrompt((prev) =>
            prev ? prev : 'Create a modern landing page for a '
        );
    }

    return (
        <div className={`prompt-wrapper ${isFocused ? 'focused' : ''}`}>

            {/* ── Main input card ── */}
            <div className="prompt-box">

                {/* ── Text area where the user types their prompt ── */}
                <textarea
                    className="prompt-textarea"
                    placeholder="Describe the website you want to create..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    rows={2}
                    aria-label="Website description prompt"
                    disabled={isLoading}
                />

                {/* ── Toolbar: icons on left, send button on right ── */}
                <div className="prompt-toolbar">

                    {/* Left icons: Add and Upload */}
                    <div className="prompt-toolbar-left">

                        {/* Add starter text */}
                        <button
                            className="icon-btn"
                            onClick={handleAdd}
                            title="Add starter template"
                            aria-label="Add starter text"
                            disabled={isLoading}
                        >
                            ＋
                        </button>

                        {/* Upload a file reference */}
                        <button
                            className="icon-btn"
                            onClick={handleUploadClick}
                            title="Attach a file"
                            aria-label="Upload file"
                            disabled={isLoading}
                        >
                            📎
                        </button>

                        {/* Hidden native file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept=".txt,.pdf,.png,.jpg,.jpeg"
                        />
                    </div>

                    {/* Right: Send button */}
                    <button
                        className="send-btn"
                        onClick={handleSend}
                        disabled={!prompt.trim() || isLoading}
                        aria-label="Generate website"
                    >
                        {isLoading ? (
                            // Spinning loader while waiting for API
                            <>
                                <span className="spinner" aria-hidden="true" />
                                Generating…
                            </>
                        ) : (
                            <>
                                ✦ Generate
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* ── Helper hint text ── */}
            <p className="prompt-hint">
                Press <kbd>Ctrl + Enter</kbd> to generate · Be as descriptive as possible
            </p>
        </div>
    );
}

export default PromptInput;
