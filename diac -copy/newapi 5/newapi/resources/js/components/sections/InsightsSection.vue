<template>
  <section class="bg-gray-50 py-24">
    <!-- Heading -->
    <div class="max-w-6xl mx-auto mb-14 px-6 md:px-0">
      <h2 class="text-primary text-2xl font-semibold">
        Latest News & Insights
      </h2>
      <p class="text-gray-600 mt-2">
        Perspectives, updates and thought leadership from our lawyers.
      </p>
    </div>

    <!-- Cards -->
    <div
      class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-0"
    >
      <article
        v-for="(item, index) in insights"
        :key="index"
        class="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition transform hover:-translate-y-1"
      >
        <!-- Image -->
        <div class="h-48 bg-gray-200 overflow-hidden">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Content -->
        <div class="p-6">
          <p class="text-xs text-gray-500 mb-2">
            {{ item.date }}
          </p>

          <h3 class="text-primary text-lg font-semibold leading-snug">
            {{ item.title }}
          </h3>

          <a
            class="inline-block mt-4 text-sm text-primary font-medium hover:underline cursor-pointer"
          >
            Read more →
          </a>
        </div>
      </article>
    </div>

    <!-- View all -->
    <div class="max-w-6xl mx-auto mt-14 px-6 md:px-0">
      <button
        class="border border-primary text-primary px-6 py-2 hover:bg-primary hover:text-white transition"
      >
        View all insights →
      </button>
    </div>
  </section>
</template>

<script setup>
const insights = [
  {
    title: 'The growing role of institutional arbitration in India',
    date: '15 Jan 2026',
    image: 'https://dummyimage.com/600x400/e5e7eb/000&text=Arbitration',
  },
  {
    title: 'Ad hoc vs institutional arbitration: key considerations',
    date: '02 Jan 2026',
    image: 'https://dummyimage.com/600x400/e5e7eb/000&text=ADR',
  },
  {
    title: 'Ensuring efficiency and neutrality in arbitral proceedings',
    date: '18 Dec 2025',
    image: 'https://dummyimage.com/600x400/e5e7eb/000&text=Dispute+Resolution',
  },
]

</script>
