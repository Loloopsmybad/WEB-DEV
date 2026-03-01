"use client";

import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="text-[#0b0f14] px-6 flex justify-center">

      <section className="max-w-3xl w-full py-24 text-center">
        <h1 className="text-5xl font-semibold">
          Speak With Our Specialists
        </h1>

        <p className="mt-6 text-black/60">
          Request inventory details, discuss logistics, or connect with our
          enterprise hardware experts.
        </p>

        <div className="mt-12 p-12 rounded-3xl bg-white/70 backdrop-blur-xl border border-black/10">
          <input
            placeholder="Your Name"
            className="w-full mb-4 p-4 rounded-xl border border-black/10"
          />

          <input
            placeholder="Email Address"
            className="w-full mb-4 p-4 rounded-xl border border-black/10"
          />

          <textarea
            placeholder="How can we help?"
            className="w-full mb-6 p-4 rounded-xl border border-black/10"
          />

          <button className="px-8 py-3 rounded-full bg-[#0b0f14] text-white">
            Submit Request
          </button>
        </div>

        <section className="py-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6">

  {/* Text Side */}
  <div>
    <h2 className="text-3xl font-semibold">
      Our Headquarters
    </h2>

    <p className="mt-6 text-black/60 leading-relaxed">
      Located at the center of our global operations, our headquarters
      supports engineering, logistics, and customer success teams working
      together to deliver enterprise infrastructure worldwide.
    </p>

    <div className="mt-8 space-y-2 text-black/70">
      <p>.....</p>
      <p>Enterprise Operations Center</p>
      <p>INDIA</p>
      <p>......</p>
    </div>
  </div>

  {/* Visual Placeholder */}
 <div className="relative h-[320px] rounded-[32px] overflow-hidden border border-black/10">
   <Image
     src="/images/contact/map2.jpg"
     alt="Logistics operations"
     fill
     className="object-cover"
   />
 </div>

</section>

      </section>

    </main>
  );
}