"use client";

import Reveal from "../components/Reveal";
import Image from "next/image";

export default function LogisticsPage() {
  return (
    <main className="text-[#0b0f14] px-6">

      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-semibold">
          Global Logistics & Rapid Deployment
        </h1>

        <p className="mt-6 max-w-2xl text-black/60">
          Our export specialists coordinate fast international shipping, ensuring
          mission-critical enterprise hardware reaches teams worldwide without delay.
        </p>

      </section>

      <Reveal>

        <section>
        <div className="relative h-[320px] rounded-[32px] overflow-hidden border border-black/10">
  <Image
    src="/images/logistics/logistics.jpg"
    alt="Logistics operations"
    fill
    className="object-cover"
  />
</div>
        </section>
        
        </Reveal>


      {/* Key Points */}
      <Reveal>
        <section className="py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Same-Day Shipping",
            "Export Documentation",
            "Global Warehousing",
            "Custom Packaging",
            "Dedicated Specialists",
            "Secure International Delivery",
          ].map((item, i) => (
            <div
              key={i}
              className="p-10 rounded-3xl bg-white/60 backdrop-blur-xl border border-black/10"
            >
              <h3 className="text-lg font-semibold">{item}</h3>
            </div>
          ))}
        </section>
      </Reveal>

    </main>
  );
}