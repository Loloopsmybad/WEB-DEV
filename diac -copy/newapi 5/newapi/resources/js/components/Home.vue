
<template>
  <div class="font-sans">
    <!-- NAVBAR -->
    <header class="bg-primary text-white px-6 md:px-12 py-5">
      <div class="flex items-center">
        <!-- Logo -->
        <div class="text-2xl font-bold leading-none">
          Harmony Nexus
          <div class="text-xs tracking-widest" style="margin-left: 48px;
    margin-top: 5px;">Arbitration</div>
        </div>

        <!-- Desktop Menu -->
        <nav class="ml-auto hidden md:flex gap-8 text-sm">
          <a class="hover:underline cursor-pointer">About Us</a>
          <a class="hover:underline cursor-pointer">Expertise</a>
          <router-link
  to="/arbitration"
  class="hover:underline cursor-pointer"
>
  Arbitration
</router-link>

          <a class="hover:underline cursor-pointer">Sustainability</a>
          <a class="hover:underline cursor-pointer">Insights</a>
          <a class="hover:underline cursor-pointer">Offices</a>
          <a class="hover:underline cursor-pointer">Careers</a>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="ml-auto md:hidden text-2xl"
          @click="menuOpen = !menuOpen"
        >
          ☰
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="menuOpen"
        class="md:hidden mt-6 border-t border-white/20 pt-4 space-y-4 text-sm"
      >
        <a class="block">About Us</a>
        <a class="block">Expertise</a>
        <a class="block">People</a>
        <a class="block">Sustainability</a>
        <a class="block">Insights</a>
        <a class="block">Offices</a>
        <a class="block">Careers</a>
      </div>
    </header>

    <!-- PAGE SECTIONS -->
    <HeroSlider />
    <StatsSection />
    <AwardsSlider />
    <PracticeAreas />
    <InsightsSection />
    <FooterSection />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import HeroSlider from './sliders/HeroSlider.vue'
import StatsSection from './sections/StatsSection.vue'
import AwardsSlider from './sliders/AwardsSlider.vue'
import PracticeAreas from './sections/PracticeAreas.vue'
import InsightsSection from './sections/InsightsSection.vue'
import FooterSection from './sections/FooterSection.vue'



const menuOpen = ref(false)
</script>
