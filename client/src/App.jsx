import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import IdeaInput from "./components/IdeaInput";
import LoadingState from "./components/LoadingState";
import ResultsPanel from "./components/ResultsPanel";
import Footer from "./components/Footer";

const API_BASE = "/api";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingJudge, setIsLoadingJudge] = useState(false);
  const [results, setResults] = useState(null);
  const [judgeResults, setJudgeResults] = useState(null);
  const [judgeMode, setJudgeMode] = useState(false);
  const [error, setError] = useState(null);
  const [currentIdea, setCurrentIdea] = useState("");
  const resultsRef = useRef(null);

  const scrollToResults = () => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  // ── Generate co-founder analysis ────────────────────────
  const handleGenerate = async (idea) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    setJudgeResults(null);
    setJudgeMode(false);
    setCurrentIdea(idea);
    scrollToResults();

    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, judgeMode: false }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Toggle Judge Mode ──────────────────────────────────
  const handleToggleJudgeMode = async () => {
    // If turning OFF judge mode
    if (judgeMode) {
      setJudgeMode(false);
      return;
    }

    // If turning ON and we already have judge results
    if (judgeResults) {
      setJudgeMode(true);
      return;
    }

    // Fetch judge results
    setIsLoadingJudge(true);
    setJudgeMode(true);

    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: currentIdea, judgeMode: true }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate judge pitch");
      }

      setJudgeResults(data);
    } catch (err) {
      setError(err.message);
      setJudgeMode(false);
    } finally {
      setIsLoadingJudge(false);
    }
  };

  // ── Reset ──────────────────────────────────────────────
  const handleReset = () => {
    setResults(null);
    setJudgeResults(null);
    setJudgeMode(false);
    setError(null);
    setCurrentIdea("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-gray-950 bg-noise">
      <Navbar />

      <main className="relative z-10">
        {/* Hero + Input (always visible when no results) */}
        {!results && !isLoading && (
          <>
            <HeroSection />
            <IdeaInput onGenerate={handleGenerate} isLoading={isLoading} />
          </>
        )}

        {/* Loading animation */}
        <div ref={resultsRef}>
          <AnimatePresence>
            {isLoading && <LoadingState />}
          </AnimatePresence>
        </div>

        {/* Error */}
        {error && !isLoading && (
          <div className="mx-auto max-w-3xl px-6 py-8">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
              <p className="text-sm font-medium text-red-400">{error}</p>
              <button
                onClick={handleReset}
                className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/20"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {results && !isLoading && (
            <ResultsPanel
              results={results}
              judgeResults={judgeResults}
              judgeMode={judgeMode}
              onToggleJudgeMode={handleToggleJudgeMode}
              onReset={handleReset}
              isLoadingJudge={isLoadingJudge}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
