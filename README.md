# AI Co-Founder

> Turn raw startup ideas into product, tech, and pitch in minutes — powered by Gemini.

AI Co-Founder is a structured reasoning system that acts as your virtual co-founder. Paste a rough startup idea and get back:

- **Idea Clarity** — Problem definition, target users, and why it matters
- **MVP Design** — Essential features, user flow, and what NOT to build
- **Tech Plan** — Recommended stack, APIs, and architecture
- **Execution Roadmap** — 2-week plan with concrete action steps
- **Judge Pitch** — A 30-second pitch ready for hackathon judges

## Quick Start

### 1. Get a Gemini API Key

Visit [Google AI Studio](https://aistudio.google.com/apikey) and create a free API key.

### 2. Setup

```bash
# Install all dependencies
npm run install:all

# Add your API key
cp server/.env.example server/.env
# Edit server/.env and add your GEMINI_API_KEY
```

### 3. Run

```bash
npm run dev
```

The app will be available at **http://localhost:5173** with the API server on **http://localhost:3001**.

## Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React + Vite + Tailwind CSS |
| Backend   | Express.js                  |
| AI Engine | Google Gemini API           |
| Icons     | Lucide React                |
| Animation | Framer Motion               |

## How Gemini is Used

- **Multi-step reasoning** — Processes a raw idea through 5 structured analysis stages
- **Long-context understanding** — Maintains coherence across all output sections
- **Structured outputs** — Returns organized, actionable sections (not chat)
- **Natural language to Technical translation** — Converts vague ideas into concrete tech plans
- **Judge Mode** — Reframes the entire output for hackathon presentation

## Project Structure

```
ai-co-founder/
├── client/          # React frontend
│   └── src/
│       ├── components/
│       └── App.jsx
├── server/          # Express API
│   └── index.js
├── package.json     # Root scripts
└── README.md
```

## No Login. No Database. No Overdesign.

This project is intentionally lean — built to demonstrate the power of Gemini's reasoning capabilities.

## License

MIT
