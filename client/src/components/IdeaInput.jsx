import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, Lightbulb } from "lucide-react";

const EXAMPLE_IDEAS = [
  "An app that uses AI to analyze food photos and give personalized nutrition advice based on your health goals",
  "A platform where freelancers can form temporary teams for projects, with AI matching skills and work styles",
  "A browser extension that summarizes long email threads and suggests reply drafts using AI",
];

export default function IdeaInput({ onGenerate, isLoading }) {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idea.trim() && !isLoading) {
      onGenerate(idea.trim());
    }
  };

  const handleExample = (example) => {
    setIdea(example);
  };

  return (
    <section className="relative mx-auto max-w-3xl px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 p-1 backdrop-blur-sm"
        >
          {/* Inner content */}
          <div className="rounded-xl bg-gray-900/80 p-6">
            {/* Label */}
            <label
              htmlFor="idea"
              className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-300"
            >
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              Describe your startup idea
            </label>

            {/* Textarea */}
            <textarea
              id="idea"
              rows={5}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., An AI-powered tool that helps college students create study plans from their course syllabi..."
              className="w-full resize-none rounded-xl border border-white/5 bg-gray-800/50 px-4 py-3 text-base text-gray-100 placeholder-gray-600 transition-all focus:border-brand-500/30 focus:ring-2 focus:ring-brand-500/10"
              disabled={isLoading}
            />

            {/* Character count */}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-600">
                {idea.length > 0 && `${idea.length} characters`}
              </span>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={!idea.trim() || isLoading}
              whileHover={{ scale: idea.trim() && !isLoading ? 1.01 : 1 }}
              whileTap={{ scale: idea.trim() && !isLoading ? 0.99 : 1 }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/20 transition-all disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating your plan...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate with AI Co-Founder
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* Example ideas */}
        <div className="mt-6">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-gray-600">
            Try an example
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {EXAMPLE_IDEAS.map((example, i) => (
              <button
                key={i}
                onClick={() => handleExample(example)}
                className="rounded-lg border border-white/5 bg-gray-900/50 px-3 py-2 text-left text-xs text-gray-400 transition-all hover:border-brand-500/20 hover:bg-gray-800/50 hover:text-gray-300"
                disabled={isLoading}
              >
                {example.length > 70 ? example.slice(0, 70) + "..." : example}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
