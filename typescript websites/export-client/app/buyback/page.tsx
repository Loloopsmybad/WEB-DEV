
"use client";
import Reveal from "../components/Reveal";
import Image from "next/image";

export default function BuybackPage() {
  return (
    <main className="text-[#0b0f14] px-6">

      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-semibold">
          IT Asset Recovery & Buyback
        </h1>

        <p className="mt-6 max-w-2xl text-black/60">
          Maximize value from surplus enterprise infrastructure with secure,
          transparent asset recovery programs designed for global organizations.
        </p>
      </section>

      <Reveal>
  <section className="py-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6">

    {/* Visual Glass Block */}
    <div className="relative h-[320px] rounded-[32px] overflow-hidden border border-black/10 shadow-x1">
      <Image
        src="/images/buyback/buyback.jpeg"
        alt="Warehouse Facility"
        fill
        className="object-cover"
      />
    </div>

    {/* Text Content */}
    <div>
      <h2 className="text-3xl font-semibold">
        Secure Data Handling & Responsible Recovery
      </h2>

      <p className="mt-6 text-black/60 leading-relaxed">
        Our asset recovery process prioritizes data security and environmental
        responsibility. Hardware is inspected, sanitized, and processed through
        structured workflows designed for enterprise compliance.
      </p>

      <ul className="mt-8 space-y-3 text-black/70">
        <li>• Secure data sanitization processes</li>
        <li>• Hardware inspection & validation</li>
        <li>• Responsible recycling & disposal practices</li>
        <li>• Transparent recovery workflows</li>
      </ul>
    </div>

  </section>
</Reveal>

    </main>
  );
}