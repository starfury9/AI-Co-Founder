import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gray-950/80 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-400" />
          <span className="text-sm font-semibold text-white">AI Co-Founder</span>
        </div>
        <p className="text-xs text-gray-500">
          Built for the Gemini Hackathon. Powered by Google Gemini.
        </p>
        <p className="mt-1 text-xs text-gray-600">
          Not a chatbot — a structured reasoning engine.
        </p>
      </div>
    </footer>
  );
}
