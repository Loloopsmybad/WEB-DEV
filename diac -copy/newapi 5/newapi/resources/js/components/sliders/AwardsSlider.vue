<template>
  <section class="bg-white py-20">
    <!-- Heading -->
    <h2 class="text-center text-primary text-xl font-semibold mb-12">
      Awards & Recognitions
    </h2>

    <!-- Slider -->
    <div class="relative max-w-6xl mx-auto flex items-center">
      <!-- Left Arrow -->
      <button
        @click="prev"
        class="absolute left-0 z-10 bg-white border border-gray-300 px-3 py-2 hover:bg-primary hover:text-white"
      >
        ←
      </button>

      <!-- Cards -->
      <div class="overflow-hidden w-full">
        <div
          class="flex transition-transform duration-500"
          :style="{ transform: `translateX(-${current * 25}%)` }"
        >
          <div
            v-for="(award, index) in awards"
            :key="index"
            class="w-1/4 px-4"
          >
            <div class="border p-6 h-40 flex items-center justify-center">
              <img
                :src="award.logo"
                :alt="award.title"
                class="max-h-20 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Arrow -->
      <button
        @click="next"
        class="absolute right-0 z-10 bg-white border border-gray-300 px-3 py-2 hover:bg-primary hover:text-white"
      >
        →
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const current = ref(0)

const awards = [
  {
    title: 'Chambers Asia Pacific',
    logo: 'https://dummyimage.com/200x100/cccccc/000&text=Chambers',
  },
  {
    title: 'Legal 500',
    logo: 'https://dummyimage.com/200x100/cccccc/000&text=Legal+500',
  },
  {
    title: 'IBLJ Awards',
    logo: 'https://dummyimage.com/200x100/cccccc/000&text=IBLJ',
  },
  {
    title: 'IFLR',
    logo: 'https://dummyimage.com/200x100/cccccc/000&text=IFLR',
  },
  {
    title: 'Asia Law',
    logo: 'https://dummyimage.com/200x100/cccccc/000&text=AsiaLaw',
  },
]

const next = () => {
  if (current.value < awards.length - 4) {
    current.value++
  }
}

const prev = () => {
  if (current.value > 0) {
    current.value--
  }
}
</script>
