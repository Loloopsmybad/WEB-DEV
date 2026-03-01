"use client";

import InnerLayout from "../components/InnerLayout";
import Reveal from "../components/Reveal";

export default function CiscoExcessPage() {
  return (
    <InnerLayout
      title="Cisco Excess & Surplus Programs"
      description="Helping organizations recover value from surplus Cisco infrastructure while enabling faster redeployment through our global sourcing network."
    >
      {/* Explanation Blocks */}
      <Reveal>
        <section className="py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Surplus Asset Recovery",
              desc: "Turn unused Cisco hardware into capital through structured buyback programs.",
            },
            {
              title: "Certified Refurbishment",
              desc: "Hardware is inspected and prepared for reliable redeployment worldwide.",
            },
            {
              title: "Rapid Global Distribution",
              desc: "Our logistics network ensures fast delivery to enterprise teams globally.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-10 rounded-3xl bg-white/60 backdrop-blur-xl border border-black/10"
            >
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-black/60">{item.desc}</p>
            </div>
          ))}
        </section>
      </Reveal>

      {/* CTA Section */}
      <section className="py-20 flex justify-center">
        <div className="max-w-3xl w-full text-center p-12 rounded-3xl bg-white/70 backdrop-blur-xl border border-black/10">
          <h3 className="text-2xl font-semibold">
            Have Excess Cisco Inventory?
          </h3>
          <p className="mt-4 text-black/60">
            Connect with our specialists to evaluate your infrastructure and
            explore recovery options.
          </p>

          <button className="mt-8 px-8 py-3 rounded-full bg-[#0b0f14] text-white">
            Request Evaluation
          </button>
        </div>
      </section>
    </InnerLayout>
  );
}