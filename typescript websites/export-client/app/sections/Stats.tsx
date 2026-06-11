"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { number: "50+", label: "Countries Served" },
    { number: "12M+", label: "Components Exported" },
    { number: "ISO", label: "Certified Processes" },
    { number: "24/7", label: "Global Logistics" },
  ];

  return (
    <section className="py-24 bg-white/50 backdrop-blur-x1 border-y border-black/10 px-6 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl w-full">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <h3 className="text-3xl font-semibold text-[#0b0f14]">
              {item.number}
            </h3>
            <p className="text-sm text-black/60 mt-2">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}