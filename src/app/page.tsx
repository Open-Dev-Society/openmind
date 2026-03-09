"use client";

import { useState, useCallback } from "react";
import Masthead from "@/components/Masthead";
import TopicInput from "@/components/TopicInput";
import Section from "@/components/Section";
import Resources from "@/components/Resources";
import StarPrompt from "@/components/StarPrompt";
import type { AnalysisResult, QuestionType } from "@/lib/types";
import { track } from "@vercel/analytics";

export default function HomePage() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [panelsVisible, setPanelsVisible] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [showStarPrompt, setShowStarPrompt] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const analyze = useCallback(async (inputTopic?: string, overrideType?: QuestionType) => {
    const t = (inputTopic ?? topic).trim();
    if (!t) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setPanelsVisible(false);
    setStreamingText("");

    try {
      let detectedType: QuestionType = overrideType || 'business';

      // 1. Classification (Always needed for the specific Case Study prompt)
      if (!overrideType) {
        const classRes = await fetch("/api/classify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: t }),
        });
        const classData = await classRes.json();
        detectedType = classData.type || 'business';
      }

      // 2. Analysis with Streaming
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: t, type: detectedType }),
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.error ?? "Analysis failed.");
        setLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "").trim();
            if (dataStr === "[DONE]") break;
            try {
              const data = JSON.parse(dataStr);
              const text = data.choices?.[0]?.delta?.content ?? "";
              accumulated += text;
              setStreamingText(accumulated);
            } catch (e) {
              // Ignore partial JSON
            }
          }
        }
      }

      // 3. Final Parse
      try {
        const cleaned = accumulated.replace(/```json|```/g, "").trim();
        const finalResult: AnalysisResult = JSON.parse(cleaned);
        setResult(finalResult);
        setPanelsVisible(true);

        // Track success
        track('analysis_completed', {
          topic: t,
          type: detectedType
        });

        // Show Star Prompt after a small delay
        setTimeout(() => setShowStarPrompt(true), 2000);
      } catch (e) {
        console.error("Parse error:", e, accumulated);
        setError("Failed to parse the analysis. The AI might have returned malformed JSON.");
      }

    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [topic]);

  const copyToClipboard = async () => {
    if (!result) return;

    let md = `# ${result.topic_clean}\n\n`;
    md += `*${result.framing}*\n\n`;

    result.sections.forEach(s => {
      md += `## ${s.title}\n`;
      md += `**${s.summary}**\n\n`;
      md += `${s.content}\n\n`;
    });

    md += `---\n\n`;
    if (result.honest_resources && result.honest_resources.length > 0) {
      md += `### Resources\n`;
      result.honest_resources.forEach(r => {
        md += `- [${r.label}](${r.url})\n`;
      });
      md += `\n`;
    }

    md += `*${result.transparency_note}*\n\n`;
    md += `Generated with OpenMind`;

    try {
      await navigator.clipboard.writeText(md);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      track('analysis_copied', { topic: result.topic_clean });
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy analysis.");
    }
  };

  const shareUrl = "https://opendevsociety.vercel.app";
  const shareTitle = result ? `I just ran a deep causal analysis on "${result.topic_clean}" using OpenMind.\n\n` : "";

  const shareOnX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
    track('shared_on_x', { topic: result?.topic_clean });
  };

  const shareOnLinkedIn = () => {
    // LinkedIn share-offsite requires just the URL.
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
    track('shared_on_linkedin', { topic: result?.topic_clean });
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <Masthead />

      {/* Central Search Container - Tight to Header */}
      <div style={{
        marginTop: "1rem",
        paddingBottom: "1.5rem",
        position: "relative",
      }}>
        {/* Transparency Disclaimer — Refined Glassmorphism */}
        <div style={{
          textAlign: "center",
          padding: "1.2rem 2rem",
          marginBottom: "1.5rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--muted)",
          maxWidth: "720px",
          margin: "0 auto",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          lineHeight: 1.8,
          background: "var(--paper2)",
          border: "1px solid var(--rule)",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        }}>
          <span style={{ color: "var(--gold)", fontWeight: 700 }}>// EPHEMERAL_DISCLAIMER:</span>
          <br />
          "AI as an analytical starting point, not a verdict. Reasoning over consensus."
        </div>

        <TopicInput
          topic={topic}
          loading={loading}
          onChange={setTopic}
          onSubmit={analyze}
        />
      </div>

      {!result && !loading && (
        <div style={{
          marginTop: "1.5rem",
          textAlign: "center",
          opacity: 0.8,
        }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--faded)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Select a research path above or enter a custom query
          </p>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            marginTop: "2rem",
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.05rem",
          }}>
            {[
              { label: "Business", query: "The Fall of WeWork", type: "business" },
              { label: "History", query: "The Fall of the Roman Empire", type: "history" },
              { label: "Science", query: "The Discovery of Penicillin", type: "science" }
            ].map((example, i) => (
              <button
                key={i}
                onClick={() => {
                  setTopic(example.query);
                  analyze(example.query, example.type as QuestionType);
                }}
                style={{
                  background: "transparent",
                  border: "1px dashed var(--rule)",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "8px",
                  color: "var(--muted)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "center"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.color = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--rule)";
                  e.currentTarget.style.color = "var(--muted)";
                }}
              >
                <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--gold)", marginBottom: "0.4rem", fontStyle: "normal" }}>
                  {example.label}
                </span>
                "{example.query}"
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && !streamingText && (
        <div style={{
          textAlign: "center",
          padding: "6rem 2rem",
          animation: "fadeUp 0.8s ease-out"
        }}>
          <style>{`
            @keyframes abstractSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          <img
            src="/logo.png"
            alt="Processing..."
            style={{
              width: "50px",
              height: "50px",
              margin: "0 auto 1.5rem",
              display: "block",
              animation: "abstractSpin 3s infinite cubic-bezier(0.4, 0, 0.2, 1)", // Smooth, slightly easing spin
              opacity: 0.85
            }}
          />
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            color: "var(--muted)",
            textTransform: "uppercase"
          }}>
            Connecting to analytical kernel...
          </p>
        </div>
      )}

      {/* Streaming Preview — Elevated Lab Feed */}
      {loading && streamingText && (
        <div style={{
          maxWidth: "850px",
          margin: "5rem auto 0",
          padding: "2.5rem",
          background: "var(--ink)",
          border: "1px solid #333",
          borderRadius: "4px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          lineHeight: 1.7,
          color: "#bdbdbd",
          maxHeight: "450px",
          overflow: "auto",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          position: "relative",
        }}>
          <div style={{
            position: "sticky",
            top: 0,
            background: "var(--ink)",
            paddingBottom: "1.5rem",
            marginBottom: "1rem",
            borderBottom: "1px solid #222",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <strong style={{ color: "var(--gold)", letterSpacing: "0.1em" }}>
              // LIVE_DATA_STREAM...
            </strong>
            <span style={{ fontSize: "0.6rem", color: "#666" }}>NODE: GEMINI-2.5-FLASH-LITE</span>
          </div>
          <div style={{ opacity: 0.9 }}>
            {streamingText}
            <span style={{
              display: "inline-block",
              width: "8px",
              height: "15px",
              background: "var(--gold)",
              marginLeft: "4px",
              verticalAlign: "middle",
              animation: "blink 0.8s infinite"
            }} />
          </div>
        </div>
      )}

      {error && (
        <div style={{
          maxWidth: "600px",
          margin: "3rem auto",
          padding: "1.5rem",
          border: "1px solid var(--red)",
          background: "rgba(163, 42, 30, 0.02)",
          fontSize: "0.95rem",
          color: "var(--red)",
          fontFamily: "var(--font-mono)",
          textAlign: "center",
        }}>
          [!] CRITICAL_ERROR: {error}
        </div>
      )}

      {result && (
        <div style={{
          maxWidth: "1000px",
          margin: "6rem auto 0",
          padding: "0 2rem",
          opacity: panelsVisible ? 1 : 0,
          transform: panelsVisible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "var(--gold)",
              fontWeight: 500,
              display: "block",
              marginBottom: "1.5rem",
            }}>
              — {result.question_type} case study —
            </span>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
              fontWeight: 900,
              color: "var(--ink)",
              margin: "0 0 2rem",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}>
              {result.topic_clean}
            </h2>
            <div style={{
              height: "1.5px",
              background: "var(--ink)",
              width: "100px",
              margin: "0 auto 2.5rem",
              opacity: 0.15,
            }} />
            <p style={{
              fontSize: "1.25rem",
              color: "var(--ink)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              maxWidth: "720px",
              margin: "0 auto",
              lineHeight: 1.5,
              opacity: 0.85,
            }}>
              {result.framing}
            </p>
          </div>

          <div style={{ marginTop: "5rem" }}>
            {result.sections.map((section, i) => (
              <Section
                key={i}
                index={i}
                title={section.title}
                summary={section.summary}
                content={section.content}
              />
            ))}
          </div>

          <div style={{
            marginTop: "5rem",
            padding: "2.5rem",
            border: "1.5px solid var(--rule)",
            background: "var(--paper2)",
            fontFamily: "var(--font-sans)",
          }}>
            <h4 style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--gold)",
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--rule)",
              paddingBottom: "0.8rem",
            }}>
              Transparency Report
            </h4>
            <p style={{
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "var(--muted)",
              fontStyle: "italic",
            }}>
              {result.transparency_note}
            </p>
          </div>

          <Resources resources={result.honest_resources} />

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "4rem", paddingBottom: "2rem", flexWrap: "wrap" }}>
            <button
              onClick={copyToClipboard}
              style={{
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                padding: "0.8rem 1.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                cursor: "pointer",
                borderRadius: "4px",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy as Markdown
            </button>

            <button
              onClick={shareOnX}
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
                border: "1px solid var(--ink)",
                padding: "0.8rem 1.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                cursor: "pointer",
                borderRadius: "4px",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
              Share on X
            </button>

            <button
              onClick={shareOnLinkedIn}
              style={{
                background: "var(--blue)",
                color: "var(--paper)",
                border: "1px solid var(--blue)",
                padding: "0.8rem 1.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                cursor: "pointer",
                borderRadius: "4px",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--blue)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--blue)"; e.currentTarget.style.color = "var(--paper)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              Share on LinkedIn
            </button>
          </div>
        </div>
      )}

      <footer style={{
        textAlign: "center",
        padding: "2rem",
        marginTop: "2rem",
        borderTop: "1px dashed var(--gold)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.6rem",
        letterSpacing: "0.15em",
        color: "var(--faded)",
        textTransform: "uppercase",
      }}>
        OpenMind v2.1 ◆ Open Dev Society Laboratory ◆ AGPL-3.0
      </footer>

      <StarPrompt
        show={showStarPrompt}
        onClose={() => setShowStarPrompt(false)}
      />

      {/* Beautiful Toast Notification Component */}
      <div style={{
        position: "fixed",
        bottom: "2.5rem",
        left: "50%",
        transform: `translateX(-50%) translateY(${toastVisible ? "0" : "150%"})`,
        opacity: toastVisible ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        background: "var(--ink)",
        color: "var(--gold)",
        padding: "1rem 2rem",
        borderRadius: "30px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        zIndex: 1000,
        border: "1px solid rgba(181, 141, 42, 0.2)"
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied to Clipboard
      </div>
    </main>
  );
}
