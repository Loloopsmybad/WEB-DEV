<template>
  <div class="max-w-6xl mx-auto px-6 py-10">

    <!-- SECTION TITLE -->
    <div class="mb-6">
      <span
        class="inline-block bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded"
      >
        SECTION D: COUNSEL FOR CLAIMANT(S)
      </span>
      <p class="text-sm text-gray-500 mt-2">
        (If any counsel details are mentioned in Memo of Parties)
      </p>
    </div>

    <!-- EMPTY STATE -->
    <div v-if="counsels.length === 0" class="text-center text-gray-400 py-12">
      No counsel added yet
    </div>

    <!-- COUNSEL CARD -->
    <div
      v-for="(counsel, index) in counsels"
      :key="index"
      class="bg-white border rounded-lg p-6 mb-6 relative"
    >
      <h3 class="text-red-700 font-semibold mb-4">
        Counsel {{ index + 1 }}
      </h3>

      <!-- DELETE -->
      <button
        class="absolute top-4 right-4 text-red-600 hover:text-red-800"
        @click="removeCounsel(index)"
      >
        🗑
      </button>

      <div class="space-y-4">

        <input
          type="text"
          placeholder="Name of Counsel *"
          v-model="counsel.name"
          class="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-red-600"
        />

        <input
          type="email"
          placeholder="Email ID *"
          v-model="counsel.email"
          class="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-red-600"
        />

        <input
          type="text"
          placeholder="Mobile Number *"
          v-model="counsel.mobile"
          class="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-red-600"
        />

        <textarea
          placeholder="Complete Address"
          v-model="counsel.address"
          rows="3"
          class="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-red-600"
        ></textarea>

        <input
          type="text"
          placeholder="Enrollment Number (Optional)"
          v-model="counsel.enrollment"
          class="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-red-600"
        />

      </div>
    </div>

    <!-- ADD COUNSEL -->
    <button
      class="mb-10 px-6 py-2 border border-red-700 text-red-700 rounded-full hover:bg-red-50"
      @click="addCounsel"
    >
      + Add Counsel
    </button>


  </div>
</template>

<script setup>
import { ref } from 'vue'

const counsels = ref([])

const addCounsel = () => {
  counsels.value.push({
    name: '',
    email: '',
    mobile: '',
    address: '',
    enrollment: '',
  })
}

const removeCounsel = (index) => {
  counsels.value.splice(index, 1)
}
</script>
