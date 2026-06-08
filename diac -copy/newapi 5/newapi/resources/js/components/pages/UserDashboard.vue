<template>

  <UserLayout>
  
  <div class="p-8">
  
  <!-- ================= STATS ================= -->
  
  <div class="grid grid-cols-4 gap-6 mb-6">
  
  <div class="stat-card">
  <p>Drafts Pending</p>
  <h3>{{ drafts }}</h3>
  </div>
  
  <div class="stat-card">
  <p>Sent for Approval</p>
  <h3>{{ sentForApproval }}</h3>
  </div>
  
  <div class="stat-card">
  <p>Corrections Needed</p>
  <h3 class="text-red-600">{{ corrections }}</h3>
  </div>
  
  <div class="stat-card">
  <p>Successfully Registered</p>
  <h3 class="text-green-600">{{ registered }}</h3>
  </div>
  
  </div>
  
  
  <!-- ================= CASE LIST ================= -->
  
  <div class="bg-white rounded-xl shadow p-6">
  
  <div class="flex justify-between mb-4">
  
  <h2 class="text-lg font-semibold">
  My Arbitration Cases
  </h2>
  
  <button
  @click="goForm"
  class="bg-indigo-900 text-white px-6 py-2 rounded-lg"
  >
  + Start New Case
  </button>
  
  </div>
  
  
  <table class="w-full text-sm">
  
  <thead>
  
  <tr class="text-left border-b text-gray-500">
  
  <th class="pb-2">Case ID</th>
  <th>Status</th>
  <th>Review Note</th>
  <th>Review Status</th>
  
  </tr>
  
  </thead>
  
  
  <tbody>
  
  <tr
  v-for="c in cases"
  :key="c.id"
  class="border-t hover:bg-gray-50"
  >
  
  <td class="py-3 font-semibold">
  #ARB-{{ c.id }}
  </td>
  
  <td>
  
  <span v-if="c.status==='draft'" class="badge yellow">
  Draft
  </span>
  
  <span
  v-else-if="c.status==='submitted' && c.review_status==='pending'"
  class="badge blue"
  >
  Sent for Approval
  </span>
  
  <span v-else-if="c.review_status==='approved'" class="badge green">
  Registered
  </span>
  
  <span v-else-if="c.review_status==='rejected'" class="badge red">
  Correction Needed
  </span>
  
  </td>
  
  <td>
  {{ c.review_note || '-' }}
  </td>
  
  <td>
  
  <span v-if="c.review_status==='pending'" class="badge blue">
  Under Review
  </span>
  
  <span v-else-if="c.review_status==='approved'" class="badge green">
  Approved
  </span>
  
  <span v-else-if="c.review_status==='rejected'" class="badge red">
  Rejected
  </span>
  
  </td>
  
  </tr>
  
  </tbody>
  
  </table>
  
  </div>
  
  </div>
  
  </UserLayout>
  
  </template>
  
  
  <script setup>
  
  import { ref, onMounted, computed } from 'vue'
  import axios from '@/axios'
  import { useRouter } from 'vue-router'
  import UserLayout from '@/layouts/UserLayout.vue'
  
  /* ================= ROUTER ================= */
  
  const router = useRouter()
  
  
  /* ================= CASE DATA ================= */
  
  const cases = ref([])
  
  
  /* ================= LOAD CASES ================= */
  
  const loadCases = async () => {
  
  try{
  
  const res = await axios.get('/arbitration/my-cases')
  
  cases.value = res.data.data || []
  
  }catch(e){
  
  console.error('Case load failed')
  
  }
  
  }
  
  
  onMounted(()=>{
  
  loadCases()
  
  })
  
  
  /* ================= NAVIGATION ================= */
  
  const goForm = () => {
  
  router.push('/arbitration')
  
  }
  
  
  /* ================= STATS ================= */
  
  const drafts = computed(()=>{
  
  return cases.value.filter(c => c.status === 'draft').length
  
  })
  
  
  const sentForApproval = computed(()=>{
  
  return cases.value.filter(c =>
  c.status === 'submitted' && c.review_status === 'pending'
  ).length
  
  })
  
  
  const corrections = computed(()=>{
  
  return cases.value.filter(c =>
  c.review_status === 'rejected'
  ).length
  
  })
  
  
  const registered = computed(()=>{
  
  return cases.value.filter(c =>
  c.review_status === 'approved'
  ).length
  
  })
  
  </script>
  
  
  <style scoped>
  
  .stat-card{
  background:white;
  padding:18px;
  border-radius:12px;
  box-shadow:0 2px 10px rgba(0,0,0,0.05);
  }
  
  .stat-card p{
  color:#6b7280;
  font-size:14px;
  }
  
  .stat-card h3{
  font-size:26px;
  font-weight:bold;
  }
  
  .badge{
  padding:4px 10px;
  border-radius:999px;
  font-size:12px;
  font-weight:600;
  }
  
  .blue{ background:#dbeafe; color:#1d4ed8;}
  .green{ background:#dcfce7; color:#16a34a;}
  .red{ background:#fee2e2; color:#dc2626;}
  .yellow{ background:#fef9c3; color:#ca8a04;}
  
  </style>