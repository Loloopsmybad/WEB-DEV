<template>

    <UserLayout>
    
    <div class="flex justify-center py-12">
    
    <div class="bg-white rounded-2xl shadow-lg border w-[520px] p-10">
    
    <!-- TITLE -->
    <div class="mb-8">
    
    <h2 class="text-2xl font-bold text-gray-800">
    Profile Settings
    </h2>
    
    <p class="text-sm text-gray-500">
    Update your personal information
    </p>
    
    </div>
    
    <!-- FORM -->
    
    <div class="space-y-6">
    
    <!-- NAME -->
    <div>
    <label class="block text-sm font-medium text-gray-600 mb-1">
    Full Name
    </label>
    
    <input
    v-model="form.name"
    class="input"
    />
    </div>
    
    <!-- EMAIL -->
    <div>
    <label class="block text-sm font-medium text-gray-600 mb-1">
    Email Address
    </label>
    
    <input
    v-model="form.email"
    class="input"
    />
    </div>
    
    <!-- MOBILE -->
    <div>
    <label class="block text-sm font-medium text-gray-600 mb-1">
    Mobile Number
    </label>
    
    <input
    v-model="form.mobile"
    class="input"
    />
    </div>
    
    <!-- BUTTON -->
    <div class="pt-4">
    
    <button
    @click="updateProfile"
    class="update-btn"
    >
    Update Profile
    </button>
    
    </div>
    
    </div>
    
    </div>
    
    </div>
    
    </UserLayout>
    
    </template>
    
    <script setup>

import { ref, onMounted } from 'vue'
import axios from '@/axios'
import { useRouter } from 'vue-router'
import UserLayout from '@/layouts/UserLayout.vue'

const router = useRouter()

/* ================= FORM ================= */

const form = ref({
  name:'',
  email:'',
  mobile:''
})

/* ================= LOAD USER ================= */

const loadUser = async () => {

  try{

    const res = await axios.get('/user')

    form.value.name = res.data.name
    form.value.email = res.data.email
    form.value.mobile = res.data.mobile

  }catch(e){
    console.error('User load failed')
  }

}

/* ================= UPDATE PROFILE ================= */

const updateProfile = async () => {

  try{

    await axios.post('/profile/update', form.value)

    alert('Profile updated successfully')

  }catch(e){

    alert('Update failed')

  }

}

/* ================= INIT ================= */

onMounted(()=>{
  loadUser()
})

</script>
    
    
    <style scoped>

  .input{
width:100%;
padding:10px 14px;
border:1px solid #e5e7eb;
border-radius:8px;
transition:.2s;
}

.input:focus{
outline:none;
border-color:#6366f1;
box-shadow:0 0 0 2px rgba(99,102,241,.15);
}

.update-btn{
width:100%;
background:#4f46e5;
color:white;
padding:12px;
border-radius:8px;
font-weight:600;
transition:.2s;
}

.update-btn:hover{
background:#4338ca;
}
    
    </style>