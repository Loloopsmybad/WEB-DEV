"use client";

export default function ResourcesPage() {
  return (
    <main className="text-[#0b0f14] px-6">

      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-semibold">
          Resources & Industry Insights
        </h1>

        <p className="mt-6 max-w-2xl text-black/60">
          Explore enterprise hardware guidance, sourcing insights, and global
          infrastructure trends from our product specialists.
        </p>
      </section>

      <section className="py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          "Hardware Buying Guides",
          "Lifecycle Management",
          "Data Center Optimization",
        ].map((item, i) => (
          <div
            key={i}
            className="p-10 rounded-3xl bg-white/60 backdrop-blur-xl border border-black/10"
          >
            <h3 className="text-lg font-semibold">{item}</h3>
          </div>
        ))}
      </section>

    </main>
  );
}