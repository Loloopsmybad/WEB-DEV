"use client";

import { motion } from "framer-motion";

export default function BrandStrip() {
  const brands = [
    "CISCO",
    "DELL",
    "HP",
    "IBM",
    "NETAPP",
    "ARISTA",
    "JUNIPER",
    "LENOVO",
  ];

  return (
    <section className="py-16 overflow-hidden whitespace-nowrap">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <p className="text-sm tracking-wide text-black/90">
          TRUSTED HARDWARE PARTNERS
        </p>
      </div>

      <div className="relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          className="flex gap-10 md:gap-16 whitespace-nowrap"
        >
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="text-xl font-semibold text-black/40"
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}