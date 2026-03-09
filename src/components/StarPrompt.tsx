"use client";

import { useState, useEffect } from "react";

interface StarPromptProps {
    show: boolean;
    onClose: () => void;
}

export default function StarPrompt({ show, onClose }: StarPromptProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => setVisible(true), 500);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [show]);

    if (!show) return null;

    return (
        <div style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            maxWidth: "320px",
            background: "var(--paper)",
            border: "1px solid var(--gold)",
            padding: "1.5rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            zIndex: 1000,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            fontFamily: "var(--font-serif)",
        }}>
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "var(--faded)",
                }}
            >
                ×
            </button>

            <h5 style={{
                margin: "0 0 0.5rem",
                fontSize: "1.1rem",
                color: "var(--ink)",
                fontWeight: 700
            }}>
                Found this insightful?
            </h5>

            <p style={{
                margin: "0 0 1.2rem",
                fontSize: "0.85rem",
                lineHeight: 1.5,
                color: "var(--muted)",
                fontStyle: "italic"
            }}>
                OpenMind is free and open-source. Help us grow by starring the research kernel on GitHub.
            </p>

            <a
                href="https://github.com/open-dev-society/openstock"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                style={{
                    display: "block",
                    textAlign: "center",
                    background: "var(--ink)",
                    color: "white",
                    textDecoration: "none",
                    padding: "0.8rem",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    transition: "background 0.3s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
            >
                ★ Star on GitHub
            </a>
        </div>
    );
}
