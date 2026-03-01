"use client";

import { motion } from "framer-motion";

export default function Capabilities() {
  const items = [
    {
      title: "Enterprise Hardware Supply",
      desc: "Access one of the world’s largest inventories of refurbished enterprise IT hardware ready for rapid deployment.",
    },
    {
      title: "IT Asset Recovery",
      desc: "Secure buyback programs helping organizations recover value from surplus infrastructure and decommissioned equipment.",
    },
    {
      title: "Global Logistics",
      desc: "Same-day and next-day international shipping supported by experienced export specialists.",
    },
    {
      title: "Expert Product Sourcing",
      desc: "Dedicated specialists helping clients locate hard-to-find components and mission-critical infrastructure.",
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6">
      <h2 className="text-4xl font-semibold mb-14">
        What We Do
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="p-10 rounded-3xl bg-white/50 backdrop-blur-xl border border-black/10 shadow-sm transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-[#0b0f14] mb-4">
              {item.title}
            </h3>

            <p className="text-black/60 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}