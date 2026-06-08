<template>
    <div class="min-h-screen flex bg-gray-100">
    
      <!-- ================= SIDEBAR ================= -->
      <aside class="w-64 bg-gradient-to-b from-blue-900 to-indigo-900 text-white flex flex-col">
    
        <div class="p-6 text-xl font-bold border-b border-blue-800">
          Harmony Nexus
        </div>
    
        <nav class="p-4 space-y-2">

          

<router-link to="/dashboard" class="sidebar-link">
  📊 Dashboard
</router-link>

<div>

<div
  class="sidebar-link cursor-pointer"
  @click="toggleSetting"
>
  <span>⚙️ Setting</span>
  <span>{{ openSetting ? '⌄' : '›' }}</span>
</div>

<div v-if="openSetting" class="ml-4 mt-1 space-y-1">

  <router-link to="/audit-logs" class="sidebar-sublink">
    Audit Logs
  </router-link>

  <router-link to="/data-logs" class="sidebar-sublink">
    Data Logs
  </router-link>

</div>

</div>

<router-link to="/cases" class="sidebar-link">
  📄 Case Management
  <span class="float-right">›</span>
</router-link>

<router-link to="/rooms" class="sidebar-link">
  🏢 Rooms Availability
  <span class="float-right">›</span>
</router-link>

<router-link to="/category" class="sidebar-link">
  ⚪ Category
  <span class="float-right">›</span>
</router-link>

<router-link to="/logs" class="sidebar-link">
  📁 Data Logs
</router-link>

<router-link to="/users" class="sidebar-link">
  👤 Manage User
</router-link>

<router-link to="/daw" class="sidebar-link">
  ✈️ DAW
  <span class="float-right">›</span>
</router-link>

<router-link to="/master-setup" class="sidebar-link">
  ⚙️ Master Setup
  <span class="float-right">›</span>
</router-link>

<router-link to="/arbitrator" class="sidebar-link">
  📋 Arbitrator Empanelment
</router-link>

<router-link to="/grievance" class="sidebar-link">
  📄 All Grievance
</router-link>

<router-link to="/feedback" class="sidebar-link">
  📄 All Feedbacks
</router-link>

<router-link to="/internship" class="sidebar-link">
  👨‍🎓 Applied Internship
</router-link>

<router-link to="/system-logs" class="sidebar-link">
  📁 Logs
  <span class="float-right">›</span>
</router-link>

<router-link to="/reports" class="sidebar-link">
  📊 Reports
</router-link>

</nav>
    
        <div class="p-4 border-t border-blue-800">
          <button
            @click="logout"
            class="w-full bg-red-600 hover:bg-red-500 py-2 rounded-lg text-sm font-semibold">
            Logout
          </button>
        </div>
    
      </aside>
    
    
      <!-- ================= MAIN ================= -->
      <main class="flex-1 flex flex-col">
    
        <!-- 🔥 GLOBAL HEADER -->
        <div class="bg-white shadow px-8 py-5 flex justify-between items-center">
    
          <div>
            <h1 class="text-2xl font-bold text-gray-800">
              Super Admin
            </h1>
            
          </div>
    
        <!-- RIGHT SIDE -->
<div class="flex items-center gap-6">

<!-- 🔔 REALTIME NOTIFICATION BELL -->
<div class="relative cursor-pointer" @click="toggleNotification">

  <svg xmlns="http://www.w3.org/2000/svg"
    class="w-7 h-7 text-gray-600 hover:text-indigo-700 transition"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">

    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M15 17h5l-1.405-1.405C18.211 15.211 18 14.704 18 14.172V11a6 6 0 
      10-12 0v3.172c0 .532-.211 1.039-.595 
      1.423L4 17h5m6 0a3 3 0 
      11-6 0m6 0H9" />
  </svg>

  <!-- 🔥 BADGE -->
  <span
    v-if="notifications.length"
    class="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
    {{ notifications.length }}
  </span>

  <!-- 🔥 DROPDOWN -->
  <div
    v-if="showNotification"
    class="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-xl z-50">

    <div class="p-4 border-b font-semibold text-gray-700">
      Notifications
    </div>

    <div v-if="notifications.length === 0" class="p-4 text-gray-400 text-sm">
      No Notifications
    </div>

    <div
      v-for="(n,i) in notifications"
      :key="i"
      class="p-4 border-b hover:bg-gray-50 text-sm">

      <p class="font-medium text-gray-700">{{ n.title }}</p>
      <p class="text-gray-500 text-xs">{{ n.time }}</p>
    </div>

  </div>

</div>

<!-- 👤 USER INFO -->
<!-- 👤 USER PROFILE DROPDOWN -->
<div class="relative">

<div
class="flex items-center gap-3 cursor-pointer"
@click="toggleProfile"
>

<div class="text-right">
  <p class="font-semibold text-gray-700">
    Welcome
  </p>
  <p class="text-sm text-gray-500">
    {{ user?.name || 'Client User' }}
  </p>
</div>

<div
  class="w-12 h-12 bg-indigo-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow">
  {{ user?.name?.charAt(0) || 'U' }}
</div>

</div>

<!-- DROPDOWN -->
<div
v-if="showProfile"
class="absolute right-0 mt-3 w-52 bg-white border rounded-xl shadow-xl z-50">

<button
  @click="goProfile"
  class="dropdown-item"
>
  👤 Profile Settings
</button>

<button
  @click="goPassword"
  class="dropdown-item"
>
  🔑 Change Password
</button>

<button
  @click="logout"
  class="dropdown-item text-red-600"
>
  🚪 Logout
</button>

</div>

</div>

</div>
    
        </div>
    
        <!-- 🔥 PAGE CONTENT SLOT -->
        <div class="flex-1">
          <slot />
        </div>
    
      </main>
    
    </div>
    </template>
    
    <script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/axios'

const router = useRouter()


const openSetting = ref(false)

const toggleSetting = () => {
  openSetting.value = !openSetting.value
}

/* ================= USER ================= */

const user = ref(null)

const loadUser = async () => {

  try{

    const res = await axios.get('/user')

    user.value = res.data

  }catch(e){

    console.error('User load failed')

  }

}

/* ================= NOTIFICATION ================= */

const notifications = ref([])
const showNotification = ref(false)

const loadNotifications = async () => {

  try{

    const res = await axios.get('/notifications')

    notifications.value = res.data

  }catch(e){

    console.error('Notification load failed')

  }

}

const toggleNotification = () => {

  showNotification.value = !showNotification.value

}

/* ================= PROFILE DROPDOWN ================= */

const showProfile = ref(false)

const toggleProfile = () => {

  showProfile.value = !showProfile.value

}

/* ================= NAVIGATION ================= */

const goProfile = () => {

  router.push('/profile')

}

const goPassword = () => {

  router.push('/change-password')

}

const logout = () => {

  localStorage.clear()

  router.push('/login')

}

/* ================= INIT ================= */

onMounted(()=>{

  loadUser()
  loadNotifications()

})

</script>
    
    <style scoped>
    .sidebar-link{
display:flex;
justify-content:space-between;
align-items:center;
padding:10px 14px;
border-radius:6px;
font-size:14px;
transition:0.2s;
}

.sidebar-link:hover{
background:#7a0000;
}

.router-link-active{
background:#8a0000;
}

    .dropdown-item{
  display:block;
  width:100%;
  text-align:left;
  padding:10px 14px;
  font-size:14px;
}

.dropdown-item:hover{
  background:#f3f4f6;
}

.sidebar-sublink{
display:block;
padding:8px 12px;
border-radius:6px;
font-size:14px;
}

.sidebar-sublink:hover{
background:#7a0000;
}

    </style>