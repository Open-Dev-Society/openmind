"use client";

import { useState, useEffect } from "react";

export default function SponsorBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Delay appearance slightly so it "pops up" after initial load
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div style={{
            position: "fixed",
            top: "1.5rem",
            right: "1.5rem",
            width: "320px",
            background: "var(--paper)",
            border: "1px solid var(--paper2)",
            borderTop: "3px solid var(--gold)",
            padding: "1.2rem",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            zIndex: 100,
            fontFamily: "var(--font-sans)",
            animation: "slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
            <style>{`
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                <h4 style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    margin: 0,
                    fontWeight: 600,
                }}>
          // Project Support
                </h4>
                <button
                    onClick={() => setIsVisible(false)}
                    title="Dismiss"
                    style={{
                        background: "none",
                        border: "none",
                        color: "var(--muted)",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        lineHeight: 1,
                        padding: "0 0.2rem",
                        opacity: 0.6,
                        transition: "opacity 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
                >
                    ×
                </button>
            </div>

            <p style={{
                fontSize: "0.85rem",
                color: "var(--ink)",
                margin: "0 0 1.2rem 0",
                lineHeight: 1.6,
            }}>
                OpenMind processes deep causal analysis using real compute credits. Help keep this engine free and open-source by donating.
            </p>

            <div style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                height: "1px",
                background: "var(--rule)",
                opacity: 0.5
            }} />

            <p style={{
                fontSize: "0.8rem",
                color: "var(--muted)",
                margin: "0 0 1rem 0",
                fontStyle: "italic",
            }}>
                Compute officially sponsored by <a href="https://siray.ai" target="_blank" rel="noreferrer" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 600, fontFamily: "var(--font-serif)" }}>Siray.ai</a>.
            </p>

            <div style={{ display: "flex", gap: "0.8rem" }}>
                <a
                    href="https://github.com/sponsors/ravixalgorithm"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        flex: 1,
                        display: "block",
                        textAlign: "center",
                        padding: "0.6rem",
                        background: "var(--gold)",
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        borderRadius: "4px",
                        transition: "opacity 0.2s"
                    }}
                >
                    Keep OpenMind Free
                </a>
            </div>
        </div>
    );
}
