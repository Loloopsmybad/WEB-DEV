"use client";

import { motion } from "framer-motion";

export default function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      
      <motion.div
  animate={{ x: [0, 60, -30, 0], y: [0, -40, 20, 0] }}
  transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
  className="absolute top-20 left-20 w-[520px] h-[520px] bg-blue-400/40 blur-[120px] rounded-full"
/>

<motion.div
  animate={{ x: [0, -70, 30, 0], y: [0, 60, -20, 0] }}
  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
  className="absolute bottom-10 right-10 w-[480px] h-[480px] bg-cyan-300/40 blur-[120px] rounded-full"
/>
    </div>
  );
}