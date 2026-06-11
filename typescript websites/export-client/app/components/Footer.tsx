"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-black/10 bg-white/70 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">

        {/* Brand */}
        <div>
          <h3 className="font-semibold text-[#0b0f14]/80">AN-infratech</h3>
          <p className="mt-4 text-black/60">
            Global sourcing and export solutions for enterprise hardware,
            logistics, and infrastructure deployment.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4 text-[#0b0f14]/80">Company</h4>
          <div className="space-y-2 text-[#0b0f14]/80">
            <Link href="/about">About</Link><br/>
            <Link href="/services">Services</Link><br/>
            <Link href="/resources">Resources</Link><br/>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="font-semibold mb-4 text-[#0b0f14]/80">Solutions</h4>
          <div className="space-y-2 text-[#0b0f14]/80">
            <Link href="/hardware">Hardware</Link><br/>
            <Link href="/buyback">Buyback</Link><br/>
            <Link href="/logistics">Logistics</Link><br/>
            <Link href="/cisco-excess">Cisco Excess</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 text-[#0b0f14]/80">Headquarters</h4>
          <p className="text-[#0b0f14]/80">
            Enterprise Operations Center<br/>
            INDIA<br/>
            ..............
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/10 py-6 text-center text-xs text-[#0b0f14]/80">
        © {new Date().getFullYear()} AN-infratech. All rights reserved.
      </div>
    </footer>
  );
}