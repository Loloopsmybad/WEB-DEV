"use client";

import InnerLayout from "../components/InnerLayout";
import Image from "next/image";
import Reveal from "../components/Reveal";

export default function AboutPage() {
  return (
    <InnerLayout
      title="Built for Enterprise Infrastructure"
      description="With decades of experience, dedicated product specialists, and one of the industry’s largest on-site inventories, we help organizations deploy infrastructure faster worldwide."
    >
      <Reveal>
        <section className="py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {[
            {
              title: "40,000+ Sq Ft Inventory",
              desc: "Extensive warehouse facilities supporting rapid global shipping.",
            },
            {
              title: "Expert Engineers",
              desc: "Specialists with deep enterprise infrastructure knowledge.",
            },
            {
              title: "Global Reach",
              desc: "Serving organizations worldwide with fast logistics.",
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

      <Reveal>
  <section className="py-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

    {/* Text Side */}
    <div>
      <h2 className="text-3xl font-semibold">
        Engineering Labs & Global Warehousing
      </h2>

      <p className="mt-6 text-black/60 leading-relaxed">
        Our facilities include dedicated testing labs, staging environments,
        and large-scale inventory warehousing designed to support rapid
        enterprise deployment. Every system undergoes inspection and
        preparation by experienced engineers before shipment.
      </p>

      <ul className="mt-8 space-y-3 text-black/70">
        <li>• Dedicated technical testing environments</li>
        <li>• Large-scale inventory storage & staging</li>
        <li>• Hardware validation by experienced engineers</li>
        <li>• Secure global fulfillment operations</li>
      </ul>
    </div>

    {/* Visual Glass Panel */}
    <div className="relative h-[320px] rounded-[32px] overflow-hidden border border-black/10 shadow-x1">
  <Image
    src="/images/about/warehouse.jpg"
    alt="Warehouse Facility"
    fill
    className="object-cover"
  />
</div>

  </section>
</Reveal>

      <Reveal>
  <section className="py-28 max-w-4xl mx-auto text-center">

    <h2 className="text-3xl font-semibold">
      Our Journey
    </h2>

    <p className="mt-6 text-black/60">
      From enterprise infrastructure roots to global hardware sourcing,
      our team has grown alongside the evolving data center landscape.
    </p>

    <div className="mt-14 space-y-10">

      {[
        {
          year: "Early Foundations",
          text: "Built from enterprise infrastructure expertise with a focus on engineering-driven solutions.",
        },
        {
          year: "Global Expansion",
          text: "Expanded sourcing and logistics capabilities to support organizations worldwide.",
        },
        {
          year: "Modern Infrastructure Partner",
          text: "Today, we help enterprises deploy reliable hardware faster through extensive inventory and technical expertise.",
        },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-3 h-3 bg-[#0b0f14] rounded-full mb-3"></div>
          <h3 className="font-semibold">{item.year}</h3>
          <p className="text-black/60 mt-2 max-w-xl">{item.text}</p>
        </div>
      ))}

    </div>

  </section>
</Reveal>


<Reveal>
  <section className="py-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

    {/* Visual Panel */}
    <div className="relative h-[320px] rounded-[32px] overflow-hidden border border-black/10 shadow-x1">
  <Image
    src="/images/about/Hardware-Testing-Engineer.jpg"
    alt="Warehouse Facility"
    fill
    className="object-cover"
  />
</div>

    {/* Text Content */}
    <div>
      <h2 className="text-3xl font-semibold">
        Engineering Expertise at Every Stage
      </h2>

      <p className="mt-6 text-black/60 leading-relaxed">
        Our technical specialists support enterprises with sourcing,
        validation, and deployment planning. Each system undergoes
        inspection and preparation by experienced engineers to ensure
        reliability and performance.
      </p>

      <ul className="mt-8 space-y-3 text-black/70">
        <li>• Certified infrastructure specialists</li>
        <li>• Hardware validation & testing processes</li>
        <li>• Solution design & deployment support</li>
        <li>• Dedicated product expertise</li>
      </ul>
    </div>

  </section>
</Reveal>


    </InnerLayout>
  );
}