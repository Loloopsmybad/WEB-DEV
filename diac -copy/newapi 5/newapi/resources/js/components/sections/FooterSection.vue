<template>
  <footer class="bg-primary text-white">
    <!-- Main footer -->
    <div
      class="max-w-6xl mx-auto px-6 md:px-0 py-20 grid grid-cols-1 md:grid-cols-4 gap-12"
    >
      <!-- About -->
      <div>
       <h3 class="text-lg font-semibold mb-4">
  Harmony Nexus Arbitration
</h3>

<p class="text-sm text-white/80 leading-relaxed">
  Harmony Nexus Arbitration is an independent arbitration institution
  committed to providing a neutral, efficient and transparent framework
  for dispute resolution.
</p>

      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="font-semibold mb-4">Quick Links</h4>
        <ul class="space-y-2 text-sm text-white/80">
          <li><a class="hover:underline cursor-pointer">About Us</a></li>
          <li><a class="hover:underline cursor-pointer">People</a></li>
          <li><a class="hover:underline cursor-pointer">Careers</a></li>
          <li><a class="hover:underline cursor-pointer">Insights</a></li>
        </ul>
      </div>

      <!-- Practice Areas -->
      <div>
        <h4 class="font-semibold mb-4">Practice Areas</h4>
        <ul class="space-y-2 text-sm text-white/80">
          <li>Litigation & ADR</li>
          <li>Taxation</li>
          <li>Corporate</li>
          <li>Competition Law</li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="font-semibold mb-4">Contact</h4>
        <p class="text-sm text-white/80">
  New Delhi, India<br />
  contact@harmonynexusarbitration.com
</p>

      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/20 py-4 text-center text-xs text-white/70">
      © {{ year }} Harmony Nexus Arbitration. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
