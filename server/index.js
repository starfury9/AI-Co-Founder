import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── Gemini setup ──────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// ── Prompts ───────────────────────────────────────────────────
const CO_FOUNDER_PROMPT = `You are an experienced startup co-founder, product manager, and technical architect.

Given a startup idea, perform the following tasks step by step:

## 1. Idea Clarity
- Define the core problem being solved
- Identify the target users (be specific)
- Explain why this problem matters right now
- Describe the unique angle or insight

## 2. MVP Design
- List 3–5 essential features only (no more)
- Describe a simple user flow in numbered steps
- Explicitly mention what should NOT be built initially
- Suggest one "wow" feature that differentiates this

## 3. Technical Plan
- Recommend frontend and backend stack with reasoning
- List key APIs, services, or third-party tools needed
- Explain the high-level architecture in simple terms
- Mention deployment strategy

## 4. Execution Roadmap
- Provide a detailed 2-week sprint plan (Day 1-3, Day 4-7, Day 8-10, Day 11-14)
- List the first 5 concrete action steps to start TODAY
- Identify the biggest risk and how to mitigate it

## 5. Judge Pitch
- Write a compelling 30-second elevator pitch
- Include a one-liner hook that grabs attention
- Clearly explain the tech innovation
- End with impact statement

IMPORTANT FORMATTING RULES:
- Use markdown headings (## for sections, ### for subsections)
- Use bullet points and numbered lists
- Keep language concise, realistic, and practical
- Do NOT use generic filler — be specific to this idea
- Each section should be clearly separated`;

const JUDGE_MODE_PROMPT = `You are presenting a startup project to a panel of expert hackathon judges.

Given a startup idea, reframe and explain it as a compelling hackathon presentation.

Your response must cover:

## Impact & Vision
- What real-world problem does this solve?
- How many people are affected?
- What does the world look like if this succeeds?

## Innovation & Uniqueness
- What makes this approach different from existing solutions?
- What is the creative or technical insight?
- Why hasn't this been done before (or done well)?

## Technical Depth
- What is the architecture?
- How is AI/Gemini used in a non-trivial way?
- What are the hardest technical challenges solved?

## Demo Walkthrough
- Describe the ideal 60-second live demo flow
- What is the "wow moment" judges will remember?

## Why This Team Should Win
- Summarize the project's strongest arguments
- Address potential judge concerns proactively
- End with a memorable closing statement

FORMATTING RULES:
- Use markdown headings and bullet points
- Be persuasive but honest
- Focus on IMPACT, INNOVATION, and TECHNICAL DEPTH
- Write as if speaking to judges, not reading a document`;

// ── Routes ────────────────────────────────────────────────────

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Generate co-founder analysis
app.post("/api/generate", async (req, res) => {
  try {
    const { idea, judgeMode } = req.body;

    if (!idea || idea.trim().length === 0) {
      return res.status(400).json({ error: "Please provide a startup idea." });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      return res.status(500).json({
        error: "Gemini API key not configured. Please add your key to server/.env",
      });
    }

    const prompt = judgeMode ? JUDGE_MODE_PROMPT : CO_FOUNDER_PROMPT;
    const fullPrompt = `${prompt}\n\n---\n\nSTARTUP IDEA:\n${idea.trim()}`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    // Parse sections from markdown response
    const sections = parseMarkdownSections(text);

    res.json({
      success: true,
      raw: text,
      sections,
      mode: judgeMode ? "judge" : "cofounder",
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    if (error.message?.includes("API_KEY")) {
      return res.status(401).json({ error: "Invalid Gemini API key." });
    }

    res.status(500).json({
      error: "Failed to generate analysis. Please try again.",
      details: error.message,
    });
  }
});

// ── Helpers ───────────────────────────────────────────────────

function parseMarkdownSections(markdown) {
  const sections = [];
  const lines = markdown.split("\n");
  let currentSection = null;

  for (const line of lines) {
    // Match ## headings (level 2)
    const h2Match = line.match(/^##\s+(?:\d+\.\s*)?(.+)/);
    if (h2Match) {
      if (currentSection) {
        currentSection.content = currentSection.content.trim();
        sections.push(currentSection);
      }
      currentSection = {
        title: h2Match[1].trim(),
        content: "",
      };
      continue;
    }

    if (currentSection) {
      currentSection.content += line + "\n";
    }
  }

  // Push last section
  if (currentSection) {
    currentSection.content = currentSection.content.trim();
    sections.push(currentSection);
  }

  return sections;
}

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  AI Co-Founder API running on http://localhost:${PORT}`);
  console.log(`  Health check: http://localhost:${PORT}/api/health\n`);
});
