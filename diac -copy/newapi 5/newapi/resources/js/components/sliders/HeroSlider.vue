<template>
  <section class="relative bg-gray-100 overflow-hidden">
    <!-- SLIDE CONTENT -->
    <div class="px-24 py-32 flex">
      <!-- LEFT TEXT -->
      <div class="w-3/5">
        <h1 class="text-primary text-5xl font-semibold leading-tight mb-6">
          {{ slides[current].title }}
        </h1>

        <p class="text-gray-700 text-lg max-w-2xl">
          {{ slides[current].description }}
        </p>
      </div>

      <!-- RIGHT EMPTY (DESIGN SPACE) -->
      <div class="w-2/5"></div>
    </div>

    <!-- ARROWS -->
    <div class="absolute right-24 bottom-20 flex gap-2">
      <button
        @click="prev"
        class="border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-white"
      >
        ←
      </button>
      <button
        @click="next"
        class="border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-white"
      >
        →
      </button>
    </div>

    <!-- DOTS -->
    <div class="absolute left-24 bottom-20 flex gap-3">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        class="w-3 h-3 rounded-full cursor-pointer"
        :class="current === index ? 'bg-primary' : 'border border-primary'"
        @click="current = index"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const current = ref(0)

const slides = [
  {
    title:
      'A neutral and trusted institution for effective dispute resolution.',
    description:
      'Harmony Nexus Arbitration provides a structured, efficient and impartial platform for resolving commercial disputes through arbitration and alternative dispute resolution mechanisms.',
  },
  {
    title:
      'Where disputes meet resolution through fairness, efficiency and expertise.',
    description:
      'We aim to promote confidence in arbitration by ensuring procedural integrity, transparency and institutional support for parties and tribunals.',
  },
]


const next = () => {
  current.value = (current.value + 1) % slides.length
}

const prev = () => {
  current.value =
    (current.value - 1 + slides.length) % slides.length
}
</script>
