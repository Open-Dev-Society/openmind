"use client";

import { EXAMPLE_TOPICS } from "@/lib/prompts";
import { QuestionType } from "@/lib/types";
import { track } from "@vercel/analytics";

interface TopicInputProps {
  topic: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: (topic?: string, type?: QuestionType) => void;
}

export default function TopicInput({
  topic,
  loading,
  onChange,
  onSubmit
}: TopicInputProps) {

  return (
    <div style={{
      maxWidth: "850px",
      margin: "2rem auto",
      padding: "0 2rem",
      position: "relative",
      zIndex: 10,
    }}>
      <div style={{
        position: "relative",
        background: "var(--paper)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>

        <input
          type="text"
          value={topic}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="Company, historical nexus, or scientific frontier..."
          disabled={loading}
          style={{
            width: "100%",
            padding: "1.2rem 4rem 1.2rem 0", // Added right padding to prevent text overlap with the button
            fontSize: "clamp(1.2rem, 4vw, 1.85rem)", // Responsive font size
            fontFamily: "var(--font-serif)",
            background: "transparent",
            border: "none",
            borderBottom: "1px solid var(--gold)",
            outline: "none",
            color: "var(--ink)",
            textAlign: "center",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            letterSpacing: "-0.01em",
          }}
          onFocus={(e) => {
            e.target.style.borderBottomWidth = "3px";
            e.target.style.borderBottomColor = "var(--gold)";
            e.target.parentElement!.style.transform = "scale(1)";
          }}
          onBlur={(e) => {
            e.target.style.borderBottomWidth = "1px";
            e.target.style.borderBottomColor = "var(--rule)";
            e.target.parentElement!.style.transform = "scale(1)";
          }}
        />
        <button
          onClick={() => {
            track('topic_submit_clicked', { topic });
            onSubmit();
          }}
          disabled={loading || !topic.trim()}
          style={{
            position: "absolute",
            right: "0",
            top: "55%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)", // Responsive arrow size
            cursor: "pointer",
            opacity: loading ? 0.3 : 0.6, // Always visible, slightly faded when not loading
            color: "var(--gold)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            padding: "0.5rem",
            zIndex: 2, // Ensure button stays clickable above text
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) translateX(5px)";
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) translateX(0)";
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          →
        </button>
      </div>

      {/* Example Chips — High Fidelity */}
      <div style={{
        marginTop: "3rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "center",
        width: "100%", // Ensure the container spans the full width
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          color: "var(--faded)",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          width: "100%",
          textAlign: "center",
          marginBottom: "0.8rem",
          fontWeight: 600,
          display: "block", // Ensure this takes a full row
        }}>
          AVAILABLE ANALYSIS TEMPLATES
        </span>
        {EXAMPLE_TOPICS.map((chip) => (
          <button
            key={chip}
            onClick={() => {
              track('example_chip_clicked', { chip });
              onChange(chip);
              onSubmit(chip);
              // Small delay to let the UI update then scroll down to the processing indicator
              setTimeout(() => {
                window.scrollBy({ top: 300, behavior: 'smooth' });
              }, 100);
            }}
            disabled={loading}
            style={{
              padding: "0.6rem 1.4rem",
              background: "white",
              border: "1px solid var(--paper2)",
              borderRadius: "4px",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "var(--muted)",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              letterSpacing: "0.02em",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = "var(--gold)";
              (e.target as HTMLButtonElement).style.color = "var(--gold)";
              (e.target as HTMLButtonElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = "var(--paper2)";
              (e.target as HTMLButtonElement).style.color = "var(--muted)";
              (e.target as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
