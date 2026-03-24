"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Outstanding service and rapid delivery. Their inventory depth helped us meet critical deployment deadlines.",
      name: "Senior Network Engineer",
    },
    {
      text: "Reliable global logistics and expert sourcing. A trusted partner for enterprise hardware needs.",
      name: "IT Procurement Lead",
    },
    {
      text: "Professional team with deep product knowledge. They consistently deliver quality refurbished equipment.",
      name: "Infrastructure Manager",
    },
  ];

  return (
    <section className="py-28 px-6 flex flex-col items-center">
      <h2 className="text-4xl font-semibold mb-14">
        Trusted by Global Teams
      </h2>

      <div className="flex gap-8 overflow-x-auto max-w-6xl w-full pb-4">
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="min-w-[320px] p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-black/10 shadow-sm"
          >
            <p className="text-black/70 leading-relaxed">
              {item.text}
            </p>

            <span className="block mt-6 text-sm font-medium text-[#0b0f14]">
              — {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}