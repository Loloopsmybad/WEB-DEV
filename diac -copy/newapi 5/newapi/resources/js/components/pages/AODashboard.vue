<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">
          Case Review Dashboard
        </h1>
        <p class="text-gray-500 mt-1">
          Review arbitration filings submitted by user
        </p>
      </div>

      <div class="text-sm text-gray-500">
        {{ new Date().toLocaleDateString() }}
      </div>
    </div>

    <!-- Card Container -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">

      <div class="px-6 py-4 border-b bg-gray-50">
        <h2 class="font-semibold text-lg text-gray-700">
          Pending Arbitration Cases
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">

          <thead class="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th class="px-6 py-4">Case ID</th>
              <th class="px-6 py-4">User</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">

            <tr v-for="caseItem in cases"
                :key="caseItem.id"
                class="hover:bg-gray-50 transition">

              <td class="px-6 py-4 font-medium text-gray-800">
                #ARB-{{ caseItem.id }}
              </td>

              <td class="px-6 py-4 text-gray-600">
                {{ caseItem.user?.name }}
              </td>

              <td class="px-6 py-4">
                <span
                  :class="statusClass(caseItem.status)"
                  class="px-3 py-1 rounded-full text-xs font-semibold">
                  {{ caseItem.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-right space-x-2">

                <button
                  @click="approve(caseItem.id)"
                  class="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium shadow">
                  Approve
                </button>

                <button
                  @click="openReject(caseItem.id)"
                  class="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium shadow">
                  Reject
                </button>

              </td>

            </tr>

            <tr v-if="cases.length === 0">
              <td colspan="4" class="text-center py-8 text-gray-400">
                No pending cases found
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>


    <!-- Reject Modal -->
    <div v-if="showReject"
         class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div class="bg-white p-6 rounded-2xl w-[400px] shadow-2xl animate-fadeIn">

        <h2 class="font-semibold text-lg mb-4 text-gray-800">
          Reject Case
        </h2>

        <textarea v-model="rejectNote"
          class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
          placeholder="Enter rejection reason">
        </textarea>

        <div class="mt-5 flex justify-end space-x-2">
          <button
            @click="showReject=false"
            class="px-4 py-2 border rounded-lg text-sm">
            Cancel
          </button>

          <button
            @click="rejectCase"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">
            Confirm Reject
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios'

const cases = ref([])
const showReject = ref(false)
const rejectId = ref(null)
const rejectNote = ref('')

const fetchCases = async () => {
  const res = await axios.get('/api/admin/cases')
  cases.value = res.data
}

const approve = async (id) => {
  await axios.post(`/api/admin/cases/${id}/approve`)
  fetchCases()
}

const openReject = (id) => {
  rejectId.value = id
  showReject.value = true
}

const rejectCase = async () => {
  await axios.post(`/api/admin/cases/${rejectId.value}/reject`, {
    note: rejectNote.value
  })

  showReject.value = ''
  rejectNote.value = ''
  fetchCases()
}

onMounted(fetchCases)

const statusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700'
    case 'approved':
      return 'bg-green-100 text-green-700'
    case 'rejected':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}
</script>
