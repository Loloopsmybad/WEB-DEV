"use client";

import InnerLayout from "../components/InnerLayout";
import Reveal from "../components/Reveal";
import Image from "next/image";
import Stats from "../sections/Stats"

export default function ServicesPage() {
  return (
    <InnerLayout
      title="Enterprise Hardware Services"
      description="From data center relocation to infrastructure deployment, our specialists support organizations through every stage of the hardware lifecycle."
    >
      <Reveal>
        <section className="py-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Data Center Relocation",
              desc: "Secure planning and execution for relocating enterprise infrastructure without downtime.",
            },
            {
              title: "Infrastructure Audits",
              desc: "Comprehensive hardware audits helping organizations optimize and modernize their environments.",
            },
            {
              title: "Deployment & Staging",
              desc: "Pre-configured hardware staging to accelerate global rollouts.",
            },
            {
              title: "Engineering Support",
              desc: "Experienced specialists assisting with sourcing, design, and integration of enterprise systems.",
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
      <Stats />
      <Reveal>
  <section className="py-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6">

    {/* Text */}
    <div>
      <h2 className="text-3xl font-semibold">
        Extensive Inventory. Rapid Deployment.
      </h2>

      <p className="mt-6 text-black/60 leading-relaxed">
        With large-scale on-site inventory and dedicated staging environments,
        we help organizations deploy enterprise infrastructure faster.
        Our logistics network ensures systems are prepared, validated,
        and shipped without delay.
      </p>

      <ul className="mt-8 space-y-3 text-black/70">
        <li>• Thousands of enterprise components in stock</li>
        <li>• Same-day global shipping capability</li>
        <li>• Pre-configured staging & testing</li>
        <li>• Dedicated fulfillment specialists</li>
      </ul>
    </div>

    {/* Glass Visual */}
     <div className="relative h-[320px] rounded-[32px] overflow-hidden border border-black/10 shadow-x1">
      <Image
        src="/images/buyback/buyback.jpeg"
        alt="Warehouse Facility"
        fill
        className="object-cover"
      />
    </div>

  </section>
</Reveal>

    </InnerLayout>
  );
}