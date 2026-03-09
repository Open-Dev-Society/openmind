// Core types shared across the OpenMind v2.0 application
// Focused strictly on the Case Study Engine.

export type QuestionType = 'business' | 'historical' | 'scientific';

export interface V2AnalysisSection {
  title: string;
  summary: string;
  content: string;
}

export interface Resource {
  label: string;
  url: string;
  why: string;
}

export interface AnalysisResult {
  topic_clean: string;
  question_type: QuestionType;
  framing: string;
  sections: V2AnalysisSection[];
  honest_resources: Resource[];
  transparency_note: string;
}

export interface ClassifyResponse {
  type: QuestionType;
  confidence: number;
}

export interface AnalyzeRequest {
  topic: string;
  type?: QuestionType;
}

export interface AnalyzeResponse {
  result?: AnalysisResult;
  error?: string;
}
