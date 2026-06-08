<template>
  <div class="max-w-5xl mx-auto p-8 bg-white shadow rounded-xl">

    <h1 class="text-2xl font-bold mb-6">
      Review Arbitration Details
    </h1>

    <!-- STEP 1 -->
    <Section title="Claimants">
      <pre>{{ draft.step_1 }}</pre>
    </Section>

    <!-- STEP 2 -->
    <Section title="Respondents">
      <pre>{{ draft.step_2 }}</pre>
    </Section>

    <!-- STEP 3 -->
    <Section title="Arbitrator">
      <pre>{{ draft.step_3 }}</pre>
    </Section>

    <!-- STEP 4 -->
    <Section title="Documents">
      <pre>{{ draft.step_4 }}</pre>
    </Section>

    <!-- STEP 5 -->
    <Section title="Declaration">
      <pre>{{ draft.step_5 }}</pre>
    </Section>

    <!-- ACTIONS -->
    <div class="flex justify-between mt-8">
      <button
        class="px-6 py-2 border rounded-lg"
        @click="$router.push('/arbitration')"
      >
        Edit Details
      </button>

      <div class="space-x-4">
        <button
          class="px-6 py-2 bg-gray-700 text-white rounded-lg"
          @click="previewPdf"
        >
          Preview PDF
        </button>

        <button
          class="px-6 py-2 bg-green-700 text-white rounded-lg"
          @click="finalSubmit"
        >
          Final Submit
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const draft = ref({})

onMounted(async () => {
  const res = await axios.get('/api/arbitration/draft')
  draft.value = res.data
})

const previewPdf = () => {
  window.open('/api/arbitration/pdf', '_blank')
}

const finalSubmit = async () => {
  await axios.post('/api/arbitration/submit')
  alert('Arbitration submitted successfully')
}
</script>

<script>
export default {
  components: {
    Section: {
      props: ['title'],
      template: `
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">{{ title }}</h2>
          <div class="bg-gray-100 p-4 rounded">
            <slot />
          </div>
        </div>
      `,
    },
  },
}
</script>
