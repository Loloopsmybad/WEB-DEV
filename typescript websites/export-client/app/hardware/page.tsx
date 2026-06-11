"use client";

import InnerLayout from "../components/InnerLayout";
import Reveal from "../components/Reveal";

export default function HardwarePage() {
  return (
    <InnerLayout
      title="Enterprise IT Hardware Supply"
      description="Access one of the industry’s largest inventories of refurbished enterprise infrastructure — sourced, tested, and delivered globally."
    >
      <Reveal>
        <section className="py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Network Switches",
            "Enterprise Servers",
            "Storage Systems",
            "Routers & Firewalls",
            "Optics & Modules",
            "Data Center Components",
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
    </InnerLayout>
  );
}