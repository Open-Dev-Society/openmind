import { NextRequest } from "next/server";
import { CASE_STUDY_PROMPT } from "@/lib/prompts";
import type { QuestionType } from "@/lib/types";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const apiKey = process.env.SIRAY_API_TOKEN;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "SIRAY_API_TOKEN is not configured." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { topic, type } = await req.json();

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Topic is required." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (topic.length > 300) {
      return new Response(JSON.stringify({ error: "Topic is too long. Please keep it under 300 characters." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const questionType = type as QuestionType;

    // v2.1: Strictly using Case Study Engine
    const response = await fetch("https://api.siray.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: CASE_STUDY_PROMPT },
          { role: "user", content: `Topic: "${topic}"` }
        ],
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Analysis failed." }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (err) {
    console.error("Analysis error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong during analysis." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
