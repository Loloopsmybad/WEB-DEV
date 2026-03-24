"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 flex justify-center">
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="max-w-5xl w-full text-center bg-white/70 backdrop-blur-2xl border border-black/10 rounded-[40px] p-16 shadow-lg"
      >
        <h2 className="text-4xl font-semibold text-[#0b0f14]">
          Ready to Source Enterprise Hardware Faster?
        </h2>

        <p className="mt-6 text-black/60 max-w-2xl mx-auto">
          Connect with our product specialists to request inventory, discuss logistics,
          or find hard-to-source components for your next deployment.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <button className="px-8 py-3 rounded-full bg-[#0b0f14] text-white">
            Request a Quote
          </button>

          <button className="px-8 py-3 rounded-full border border-black/20">
            Contact Sales
          </button>
        </div>
      </motion.div>
    </section>
  );
}