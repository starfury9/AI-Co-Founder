import { motion } from "framer-motion";
import { Rocket, ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="absolute -bottom-20 left-1/2 h-64 w-64 rounded-full bg-pink-500/8 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm"
        >
          <Rocket className="h-4 w-4 text-brand-400" />
          Powered by Google Gemini
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Turn Your Raw Idea Into a{" "}
          <span className="gradient-text">Startup-Ready Plan</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl"
        >
          Paste a rough startup idea. Get back a clear problem definition, MVP features,
          tech architecture, execution roadmap, and a hackathon-winning pitch —{" "}
          <span className="text-white font-medium">all in minutes.</span>
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-5 w-5 text-gray-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
