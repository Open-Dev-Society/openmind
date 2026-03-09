"use client";

// Masthead.tsx
// The editorial header that sets the tone for OpenMind.
// Styled like a serious newspaper masthead — authoritative, open, purposeful.

export default function Masthead() {
  return (
    <header style={{
      padding: "2.5rem 2rem 1.5rem",
      textAlign: "center",
      background: "var(--paper)",
      position: "relative",
    }}>
      {/* Editorial rule above - Removed based on user feedback */}

      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "var(--gold)",
        fontWeight: 500,
        marginBottom: "0.8rem",
      }}>
        Open Dev Society Case Study Engine
      </p>

      <h1 style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(3rem, 8vw, 5.5rem)",
        fontWeight: 900,
        lineHeight: 0.9,
        letterSpacing: "-0.04em",
        color: "var(--ink)",
      }}>
        Open<em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 700 }}>Mind</em>
      </h1>

      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.6rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "var(--faded)",
        marginTop: "1.5rem",
      }}>
        Vol. II ◆ No. 2.1 ◆ Est. 2026
      </p>

      {/* Edition bar — refined branding */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "1rem 2.5rem",
        marginTop: "2rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--faded)",
        paddingTop: "1rem",
      }}>
        <span style={{ color: "var(--gold)", whiteSpace: "nowrap" }}>◆ ODS_INITIATIVE</span>
        <span style={{ whiteSpace: "nowrap" }}>OPEN_SOURCE</span>
        <span style={{ whiteSpace: "nowrap" }}>AGPL-3.0_LICENSED</span>
      </div>

    </header>
  );
}
