import Hero from "./sections/Hero";
import BrandStrip from "./sections/BrandStrip";
import FinalCTA from "./sections/FinalCTA";
import Testimonials from "./sections/Testimonials";
import GlobalMap from "./sections/GlobalMap";
import Reveal from "./components/Reveal";
import Stats from "./sections/Stats";
import Image from "next/image";
import Capabilities from "./sections/Capabilities";

export default function Home() {
  return (
    <main className="text-[#0b0f14]">
  <Hero />
  <BrandStrip />

  <Reveal>
    <Stats />
  </Reveal>

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
    <div className="relative h-[320px] rounded-[32px] overflow-hidden border border-black/10">
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
    <Capabilities />
  </Reveal>

  <Reveal>
    <GlobalMap />
  </Reveal>

  <Reveal>
  <section className="py-24 max-w-6xl mx-auto text-center px-6">

    <h2 className="text-3xl font-semibold">
      Trusted Across Leading Enterprise Platforms
    </h2>

    <p className="mt-6 text-black/60 max-w-2xl mx-auto">
      Our sourcing network spans major enterprise manufacturers, enabling
      organizations to deploy reliable infrastructure backed by proven
      hardware ecosystems.
    </p>

    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        "Cisco",
        "Dell",
        "HP",
        "IBM",
        "NetApp",
        "Juniper",
        "Arista",
        "Lenovo",
      ].map((brand, i) => (
        <div
          key={i}
          className="h-28 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-xl border border-black/10">
          {<Image
  src={`/images/brands/${brand.toLowerCase()}.svg`}
  alt={brand}
  width={100}
  height={40}
  className="max-h-10 w-auto opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
/>}
        </div>
      ))}
    </div>

  </section>
</Reveal>


  <Reveal>
  <Testimonials />
  </Reveal>

  <FinalCTA />
 
</main>
  );
}