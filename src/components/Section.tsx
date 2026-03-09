"use client";

import { useState } from "react";

interface SectionProps {
    title: string;
    summary: string;
    content: string;
    index: number;
}

export default function Section({ title, summary, content, index }: SectionProps) {
    const [isOpen, setIsOpen] = useState(index === 0);

    return (
        <div style={{
            borderTop: "var(--rule)",
            padding: "1.5rem 0",
        }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
                <div style={{ flex: 1 }}>
                    <h3 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem",
                        color: "var(--ink)",
                    }}>{title}</h3>
                    {!isOpen && (
                        <p style={{
                            fontSize: "0.95rem",
                            color: "var(--muted)",
                            lineHeight: 1.5,
                        }}>{summary}</p>
                    )}
                </div>
                <span style={{
                    fontSize: "1.2rem",
                    marginLeft: "1rem",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                }}>
                    ▾
                </span>
            </div>

            {isOpen && (
                <div style={{
                    marginTop: "1rem",
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                    color: "var(--ink)",
                    whiteSpace: "pre-wrap",
                }}>
                    {content}
                </div>
            )}
        </div>
    );
}
