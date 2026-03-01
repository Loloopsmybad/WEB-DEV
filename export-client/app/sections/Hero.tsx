"use client";

import LiquidChrome from "../components/LiquidChrome";

export default function Hero() {
  return (
    <section className="h-screen">

      <LiquidChrome
        baseColor={[0.1, 0.15, 0.32]}
        speed={0.1}
        amplitude={0.4}
        frequencyX={3}
        frequencyY={2}
        interactive={true}
        className="h-full w-full"
      >
        <div className="flex h-full w-full items-center justify-center px-6">

          {/* GLASS CONTAINER */}
          <div className="relative w-full max-w-6xl h-[380px] rounded-3xl overflow-hidden">

            {/* Content */}
            <div className="relative z-10 text-center backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl px-5 py-25 shadow-2xl">

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-semibold bg-gradient-to-r from-[#ff7f7f] via-[#111111] to-blue-500 bg-clip-text text-transparent">
                Enterprise IT Hardware, Delivered Globally
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-black/80 max-w-3xl mx-auto leading-relaxed">
  With one of the world’s largest on-site inventories and expert product specialists,
  we help organizations source refurbished enterprise hardware fast — when deadlines matter.
</p>

            </div>

          </div>

        </div>
      </LiquidChrome>

    </section>
  );
}