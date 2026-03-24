"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function GlobalMap() {
  const nodes = [
    { top: "35%", left: "50%" }, // Europe
    { top: "50%", left: "60%" }, // India
    { top: "50%", left: "67%" }, // India
    { top: "40%", left: "75%" }, // Asia
    { top: "38%", left: "20%" }, // USA
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative">

  <h2 className="text-4xl font-semibold mb-12">
    Global Export Network
  </h2>

  <div className="relative w-full max-w-3xl aspect-[1.9/1] rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-black/10 shadow-sm">

    {/* Map Background */}
    <div className="absolute inset-0 pointer-events-none">
      <Image
        src="/images/contact/map.jpg"
        alt="World Map"
        fill
        className="object-contain opacity-80"
      />
    </div>

    {/* Nodes */}
    {nodes.map((node, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ top: node.top, left: node.left }}
      >
        {/* Pulse of dots */}
        <motion.div
          animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
          className="absolute w-8 h-8 bg-blue-400/30 rounded-full -translate-x-1/2 -translate-y-1/2"
        />

        {/* dots position */}
        <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-600 rounded-full shadow-md -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    ))}

  </div>
</section>
  );
}