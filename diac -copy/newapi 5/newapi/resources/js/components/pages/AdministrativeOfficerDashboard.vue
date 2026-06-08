<template>
  <div class="min-h-screen flex bg-gray-100">

    <!-- ================= SIDEBAR ================= -->
    <aside
      :class="[
        'bg-indigo-900 text-white flex flex-col transition-all duration-300 shadow-xl',
        sidebarOpen ? 'w-64' : 'w-20'
      ]"
    >

      <div class="p-6 flex justify-between items-center border-b border-indigo-800">
        <span v-if="sidebarOpen" class="font-bold text-lg">
          AO Panel
        </span>

        <button @click="sidebarOpen=!sidebarOpen">
          ☰
        </button>
      </div>

      <nav class="flex-1 p-4 space-y-2">

        <button @click="tab='pending'" :class="sidebarClass('pending')">
          <span v-if="sidebarOpen">Pending</span>
          <span v-if="pendingCount && sidebarOpen"
            class="bg-white text-indigo-700 text-xs px-2 rounded-full ml-auto">
            {{ pendingCount }}
          </span>
        </button>

        <button @click="tab='approved'" :class="sidebarClass('approved')">
          <span v-if="sidebarOpen">Approved</span>
        </button>

        <button @click="tab='rejected'" :class="sidebarClass('rejected')">
          <span v-if="sidebarOpen">Rejected</span>
        </button>

      </nav>

      <div class="p-4 border-t border-indigo-800">
        <button
          @click="logout"
          class="w-full bg-red-600 py-2 rounded-lg text-sm">
          Logout
        </button>
      </div>

    </aside>


    <!-- ================= MAIN ================= -->
    <main class="flex-1 p-10">

      <!-- HEADER -->
      <div class="flex justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold">Case Review Dashboard</h1>
          <p class="text-gray-500">Enterprise Arbitration Management</p>
        </div>

        <div class="text-sm bg-white px-4 py-2 rounded shadow">
          {{ today }}
        </div>
      </div>


      <!-- ================= STATS ================= -->
      <div class="grid grid-cols-3 gap-6 mb-8">

        <div class="stat-card bg-yellow-500">
          <p>Pending</p>
          <h2>{{ pendingCount }}</h2>
        </div>

        <div class="stat-card bg-green-600">
          <p>Approved</p>
          <h2>{{ approvedCount }}</h2>
        </div>

        <div class="stat-card bg-red-600">
          <p>Rejected</p>
          <h2>{{ rejectedCount }}</h2>
        </div>

      </div>


      <!-- ================= FILTER BAR ================= -->
      <div class="bg-white rounded-xl shadow p-4 mb-6 flex justify-between items-center">

        <input
          v-model="search"
          placeholder="Search by case ID or user..."
          class="border rounded-lg px-4 py-2 w-80"
        />

        <select v-model="perPage" class="border rounded-lg px-3 py-2">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>

      </div>


      <!-- ================= TABLE ================= -->
      <div class="bg-white rounded-2xl shadow overflow-hidden">

        <table class="w-full text-sm">

          <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th class="p-4">Case ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Submitted</th>
              <th class="text-right pr-6">Action</th>
            </tr>
          </thead>

          <tbody class="divide-y">

            <tr v-for="c in paginatedCases"
                :key="c.id"
                class="hover:bg-gray-50 transition">

              <td class="p-4 font-semibold">#ARB-{{c.id}}</td>
              <td>{{c.user?.name || 'Client'}}</td>
              <td>
                <span :class="statusBadge(c.review_status)"
                  class="px-3 py-1 rounded-full text-xs capitalize">
                  {{c.review_status}}
                </span>
              </td>
              <td>{{formatDate(c.created_at)}}</td>

              <td class="text-right pr-6">
                <button
                  v-if="tab==='pending'"
                 @click="previewCase(c.id)"
                  class="text-indigo-600 font-semibold">
                  Review
                </button>
              </td>

            </tr>

          </tbody>
        </table>

      </div>


      <!-- ================= PAGINATION ================= -->
      <div class="flex justify-end mt-6 gap-2">

        <button
          @click="page--"
          :disabled="page===1"
          class="px-3 py-1 border rounded">
          Prev
        </button>

        <button
          @click="page++"
          :disabled="page>=totalPages"
          class="px-3 py-1 border rounded">
          Next
        </button>

      </div>

    </main>
  </div>

  <!-- ================= REVIEW MODAL ================= -->
<div v-if="selectedCase"
     class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

  <div class="bg-white rounded-2xl w-full max-w-3xl shadow-2xl p-8">

    <h2 class="text-2xl font-bold mb-6">
      Review Case #ARB-{{ selectedCase.id }}
    </h2>

    <div class="space-y-4 max-h-[50vh] overflow-y-auto">

      <div class="preview-card">
        <h3 class="font-semibold mb-2">Court Details</h3>
        <p><b>Diary:</b> {{ selectedCase.data_json?.court?.diary_number }}</p>
        <p><b>Justice:</b> {{ selectedCase.data_json?.court?.justice_name }}</p>
      </div>

      <div class="preview-card">
        <h3 class="font-semibold mb-2">Claimants</h3>
        <div v-for="c in selectedCase.data_json?.claimants?.list" :key="c.email">
          {{ c.name }} - {{ c.email }}
        </div>
      </div>

      <div class="preview-card">
        <h3 class="font-semibold mb-2">Respondents</h3>
        <div v-for="r in selectedCase.data_json?.respondents?.list" :key="r.email">
          {{ r.name }} - {{ r.email }}
        </div>
      </div>

    </div>

    <!-- Reject Note -->
    <div class="mt-6">
      <label class="text-sm font-medium">Rejection Note</label>
      <textarea
        v-model="reviewNote"
        class="w-full border rounded-lg p-3 mt-2"
        placeholder="Required if rejecting">
      </textarea>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-4 mt-6">
      <button
        @click="selectedCase=null"
        class="px-4 py-2 border rounded-lg">
        Cancel
      </button>

      <button
        @click="submitReview('approved')"
        class="px-4 py-2 bg-green-600 text-white rounded-lg">
        Approve
      </button>

      <button
        @click="submitReview('rejected')"
        class="px-4 py-2 bg-red-600 text-white rounded-lg">
        Reject
      </button>
    </div>

  </div>
</div>
</template>
  

  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from '../../axios'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const cases = ref([])
  const selectedCase = ref(null)
  const reviewNote = ref('')
  const tab = ref('pending')
  
  const fetchCases = async()=>{
   const res = await axios.get('/ao/cases')
   cases.value = res.data
  }
  
  const pendingCount = computed(()=> 
   cases.value.filter(c=>c.review_status==='pending').length
  )
  
  const filteredCases = computed(()=>{
   if(tab.value==='pending')
     return cases.value.filter(c=>c.review_status==='pending')
  
   if(tab.value==='approved')
     return cases.value.filter(c=>c.review_status==='approved')
  
   if(tab.value==='rejected')
     return cases.value.filter(c=>c.review_status==='rejected')
  
   return []
  })
  
  const openCase = (c)=>{
   selectedCase.value = c
   reviewNote.value = ''
  }
  
  const closeModal = ()=>{
   selectedCase.value=null
  }
  
  const submitReview = async(action)=>{
   if(action==='rejected' && !reviewNote.value){
     alert('Rejection note required')
     return
   }
  
   await axios.post(`/ao/review/${selectedCase.value.id}`,{
     action,
     note:reviewNote.value
   })
  
   closeModal()
   fetchCases()
  }
  
  const logout = ()=>{
   localStorage.clear()
   router.push('/login')
  }
  
  const today = computed(()=> new Date().toLocaleDateString('en-IN'))
  const formatDate = d => new Date(d).toLocaleDateString('en-IN')
  
  onMounted(fetchCases)

  const sidebarClass = (value) => {
  return [
    'flex items-center justify-between w-full px-4 py-2 rounded-lg transition text-sm font-medium',
    tab.value === value
      ? 'bg-white text-indigo-900'
      : 'hover:bg-indigo-800'
  ]
}

const statusBadge = (status) => {
  if (status === 'pending')
    return 'bg-yellow-100 text-yellow-700'

  if (status === 'approved')
    return 'bg-green-100 text-green-700'

  if (status === 'rejected')
    return 'bg-red-100 text-red-700'

  return 'bg-gray-100 text-gray-600'
}

const sidebarOpen = ref(true)
const search = ref('')
const perPage = ref(5)
const page = ref(1)

const approvedCount = computed(()=> 
  cases.value.filter(c=>c.review_status==='approved').length
)

const rejectedCount = computed(()=> 
  cases.value.filter(c=>c.review_status==='rejected').length
)

const searchedCases = computed(()=>{
  return filteredCases.value.filter(c =>
    c.id.toString().includes(search.value) ||
    (c.user?.name || '').toLowerCase().includes(search.value.toLowerCase())
  )
})

const totalPages = computed(()=>{
  return Math.ceil(searchedCases.value.length / perPage.value)
})

const paginatedCases = computed(()=>{
  const start = (page.value-1) * perPage.value
  return searchedCases.value.slice(start, start + perPage.value)
})

const previewCase = (id) => {
  window.open(`/api/ao/case-preview/${id}`, '_blank')
}
  </script>
  

  <style scoped>
  .sidebar-link{
  display:block;
  width:100%;
  padding:10px;
  border-radius:8px;
  }
  .sidebar-link:hover{
  background:#3730a3;
  }
  
  .preview-card{
  border:1px solid #e5e7eb;
  padding:14px;
  border-radius:10px;
  background:#fafafa;
  }

  .preview-card {
  border: 1px solid #e5e7eb;
  padding: 16px;
  border-radius: 14px;
  background: #fafafa;
}
.preview-card h3 {
  font-weight: 600;
  margin-bottom: 8px;
}

.stat-card{
  color:white;
  padding:20px;
  border-radius:16px;
  box-shadow:0 10px 20px rgba(0,0,0,0.1);
}
.stat-card h2{
  font-size:28px;
  font-weight:bold;
}
  </style>
  
