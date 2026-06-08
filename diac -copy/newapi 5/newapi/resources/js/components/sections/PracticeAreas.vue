<template>
  <section class="bg-primary py-24">
    <!-- Heading -->
    <div class="max-w-6xl mx-auto mb-16">
      <h2 class="text-white text-2xl font-semibold">
        We have expertise in a diverse spectrum of practice areas
      </h2>
    </div>

    <!-- Grid -->
    <div class="max-w-6xl mx-auto grid grid-cols-2 gap-y-12 gap-x-20">
      <div
        v-for="(area, index) in areas"
        :key="index"
        class="flex gap-5 text-white hover:bg-white/10 p-4 transition"
      >
        <!-- Icon -->
        <div class="text-3xl">
          {{ area.icon }}
        </div>

        <!-- Text -->
        <div>
          <h3 class="font-semibold mb-1">
            {{ area.title }}
          </h3>
          <p class="text-sm text-white/80">
            {{ area.desc }}
          </p>
        </div>
      </div>
    </div>

    <!-- Button -->
    <div class="max-w-6xl mx-auto mt-16">
      <button
        class="border border-white text-white px-6 py-2 hover:bg-white hover:text-primary transition"
      >
        Our Practice →
      </button>
    </div>
  </section>
</template>

<script setup>
const areas = [
  {
    icon: '⚖️',
    title: 'Commercial Arbitration',
    desc: 'Resolution of commercial and contractual disputes through institutional arbitration.',
  },
  {
    icon: '🏢',
    title: 'Corporate & Shareholder Disputes',
    desc: 'Arbitration support for corporate governance and shareholder matters.',
  },
  {
    icon: '🌍',
    title: 'International Arbitration',
    desc: 'Cross-border dispute resolution with globally aligned procedures.',
  },
  {
    icon: '🏗️',
    title: 'Infrastructure & Construction',
    desc: 'Specialised arbitration for construction and infrastructure projects.',
  },
  {
    icon: '📑',
    title: 'Ad Hoc to Institutional Transition',
    desc: 'Facilitating smooth transition from ad hoc arbitration to institutional frameworks.',
  },
  {
    icon: '🤝',
    title: 'Mediation & Conciliation',
    desc: 'Assisted resolution through structured mediation and conciliation processes.',
  },
]

</script>
