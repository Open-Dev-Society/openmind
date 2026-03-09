import { NextRequest, NextResponse } from "next/server";
import { CLASSIFIER_PROMPT } from "@/lib/prompts";
import type { ClassifyResponse } from "@/lib/types";

export async function POST(req: NextRequest): Promise<NextResponse<ClassifyResponse | { error: string }>> {
    const apiKey = process.env.SIRAY_API_TOKEN;

    if (!apiKey) {
        return NextResponse.json(
            { error: "SIRAY_API_TOKEN not configured" },
            { status: 500 }
        );
    }

    try {
        const { topic } = await req.json();

        if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
            return NextResponse.json({ error: "Topic is required." }, { status: 400 });
        }

        if (topic.length > 300) {
            return NextResponse.json({ error: "Topic is too long. Please keep it under 300 characters." }, { status: 400 });
        }

        const response = await fetch("https://api.siray.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "google/gemini-2.5-flash-lite",
                messages: [{ role: "user", content: `${CLASSIFIER_PROMPT}\n\nInput: "${topic}"` }],
                temperature: 0,
            }),
        });

        if (!response.ok) {
            throw new Error("Classification failed");
        }

        const data = await response.json();
        const rawText = data.choices?.[0]?.message?.content ?? "{}";
        const cleaned = rawText.replace(/```json|```/g, "").trim();
        const result = JSON.parse(cleaned);

        return NextResponse.json(result);
    } catch (err) {
        console.error("Classification error:", err);
        return NextResponse.json({ error: "Failed to classify input" }, { status: 500 });
    }
}
