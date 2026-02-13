import { motion } from "framer-motion";
import { Brain, Cpu, Layers, Route, Megaphone } from "lucide-react";

const STEPS = [
  { icon: Brain, label: "Analyzing your idea...", color: "text-blue-400" },
  { icon: Cpu, label: "Designing MVP features...", color: "text-purple-400" },
  { icon: Layers, label: "Planning tech architecture...", color: "text-pink-400" },
  { icon: Route, label: "Building execution roadmap...", color: "text-orange-400" },
  { icon: Megaphone, label: "Crafting your pitch...", color: "text-green-400" },
];

export default function LoadingState() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 p-8 backdrop-blur-sm"
      >
        {/* Pulsing brain */}
        <div className="mb-8 flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-purple-500/20"
          >
            <Brain className="h-10 w-10 text-brand-400" />
          </motion.div>
        </div>

        <h3 className="mb-2 text-center text-xl font-bold text-white">
          Your AI Co-Founder is thinking...
        </h3>
        <p className="mb-8 text-center text-sm text-gray-400">
          Gemini is reasoning through your idea step by step
        </p>

        {/* Animated steps */}
        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4, duration: 0.4 }}
              className="flex items-center gap-3 rounded-xl bg-gray-800/30 px-4 py-3"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  delay: i * 0.4,
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <step.icon className={`h-5 w-5 ${step.color}`} />
              </motion.div>
              <span className="text-sm text-gray-300">{step.label}</span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  delay: i * 0.4 + 0.2,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="ml-auto h-1 max-w-[100px] rounded-full bg-gradient-to-r from-brand-500/30 to-purple-500/30"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
