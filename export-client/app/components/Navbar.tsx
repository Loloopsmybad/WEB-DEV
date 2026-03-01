"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      animate={{
        scale: scrolled ? 0.95 : 1,
        y: scrolled ? -4 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full px-4"
    >
      {/* back GLASS CONTAINER */}
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between
        backdrop-blur-2xl rounded-full px-6 py-3
        border border-white/40
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        ${scrolled ? "bg-white/50" : "bg-white/35"}
      `}
      >
        {/* LOGO */}
        <span className="font-semibold text-[#0b0f14] whitespace-nowrap">
          AN-Infratech
        </span>

        {/* CENTER for NAV LIOnks*/}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {/* HARDWARE OPTIONS*/}
          <div
            className="relative py-2"
            onMouseEnter={() => setOpenMenu("hardware")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <span className="cursor-pointer text-[#0b0f14]/75 hover:text-[#3b82f6] transition-colors">
              Hardware
            </span>

            {openMenu === "hardware" && (
              <div
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2
                bg-white/80 backdrop-blur-2xl
                border border-black/10
                rounded-3xl p-8 shadow-xl
                w-[520px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <div>
                  <p className="text-xs uppercase text-black/40 mb-3">Switching</p>
                  <Link href="/hardware" className="block py-1 text-black/70 hover:text-black">Cisco</Link>
                  <Link href="/hardware" className="block py-1 text-black/70 hover:text-black">Juniper</Link>
                  <Link href="/hardware" className="block py-1 text-black/70 hover:text-black">Arista</Link>
                </div>

                <div>
                  <p className="text-xs uppercase text-black/40 mb-3">Servers</p>
                  <Link href="/hardware" className="block py-1 text-black/70 hover:text-black">Dell</Link>
                  <Link href="/hardware" className="block py-1 text-black/70 hover:text-black">HP</Link>
                  <Link href="/hardware" className="block py-1 text-black/70 hover:text-black">Supermicro</Link>
                </div>

                <div>
                  <p className="text-xs uppercase text-black/40 mb-3">Storage</p>
                  <Link href="/hardware" className="block py-1 text-black/70 hover:text-black">NetApp</Link>
                  <Link href="/hardware" className="block py-1 text-black/70 hover:text-black">IBM</Link>
                  <Link href="/hardware" className="block py-1 text-black/70 hover:text-black">Western Digital</Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/about" className="text-[#0b0f14]/75 hover:text-[#3b82f6] transition-colors">About</Link>
          <Link href="/cisco-excess" className="text-[#0b0f14]/75 hover:text-[#3b82f6] transition-colors">Cisco Excess</Link>
          <Link href="/buyback" className="text-[#0b0f14]/75 hover:text-[#3b82f6] transition-colors">Buyback</Link>
          <Link href="/logistics" className="text-[#0b0f14]/75 hover:text-[#3b82f6] transition-colors">Logistics</Link>
          <Link href="/resources" className="text-[#0b0f14]/75 hover:text-[#3b82f6] transition-colors">Resources</Link>
          <Link href="/services" className="text-[#0b0f14]/75 hover:text-[#3b82f6] transition-colors">Services</Link>
        </div>

        {/* RIGHT  CTA BUTTON */}
        <Link
          href="/contact"
          className="hidden md:block bg-[#0b0f14] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#8c52ff] transition-all"
        >
          Contact
        </Link>

        {/* Phone MENU ICON */}
        <button
        onClick={() => setMobileOpen(!mobileOpen)} 
        className="md:hidden text-[#0b0f14] text-xl">
          ☰
        </button>
      </div>

      {/* Phone MENU */}
{mobileOpen && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="md:hidden mt-4 backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-black/10 shadow-xl"
  >
    <div className="flex flex-col gap-4 text-[#0b0f14] text-sm">
      <Link href="/hardware">Hardware</Link>
      <Link href="/about">About</Link>
      <Link href="/cisco-excess">Cisco Excess</Link>
      <Link href="/buyback">Buyback</Link>
      <Link href="/logistics">Logistics</Link>
      <Link href="/resources">Resources</Link>
      <Link href="/services">Services</Link>
      <Link href="/contact">Contact</Link>
    </div>
  </motion.div>
)}
    </motion.nav>
  );
}