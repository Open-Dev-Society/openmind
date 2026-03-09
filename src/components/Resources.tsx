"use client";

import type { Resource } from "@/lib/types";

interface ResourcesProps {
    resources: Resource[];
}

export default function Resources({ resources }: ResourcesProps) {
    if (!resources || resources.length === 0) return null;

    return (
        <section style={{
            marginTop: "4rem",
            padding: "3rem 2rem",
            background: "var(--paper2)",
            borderTop: "2px solid var(--ink)",
        }}>
            <h3 style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "var(--gold)",
                marginBottom: "2rem",
                textAlign: "center",
            }}>
        // DON'T_JUST_TAKE_OUR_WORD_FOR_IT
            </h3>

            <div style={{
                maxWidth: "800px",
                margin: "0 auto",
                display: "grid",
                gap: "2rem",
            }}>
                {resources.map((res, i) => (
                    <div key={i} style={{
                        paddingBottom: "1.5rem",
                        borderBottom: i === resources.length - 1 ? "none" : "var(--rule)",
                    }}>
                        <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "block",
                                fontFamily: "var(--font-serif)",
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                color: "var(--ink)",
                                textDecoration: "underline",
                                marginBottom: "0.5rem",
                            }}
                        >
                            {res.label}
                        </a>
                        <p style={{
                            fontSize: "0.9rem",
                            color: "var(--muted)",
                            lineHeight: 1.5,
                            fontStyle: "italic",
                        }}>
                            {res.why}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
