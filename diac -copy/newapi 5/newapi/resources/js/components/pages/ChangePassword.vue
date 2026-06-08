<template>

    <UserLayout>
    
    <div class="flex justify-center py-12">
    
    <div class="bg-white rounded-2xl shadow-lg border w-[520px] p-10">
    
    <h2 class="text-2xl font-bold mb-2">
    Change Password
    </h2>
    
    <p class="text-gray-500 text-sm mb-6">
    Update your account password
    </p>
    
    <div class="space-y-5">
    
    <!-- CURRENT PASSWORD -->
    <div>
    <label class="label">Current Password</label>
    <input v-model="form.current_password" type="password" class="input">
    </div>
    
    <!-- NEW PASSWORD -->
    <div>
    <label class="label">New Password</label>
    <input v-model="form.password" type="password" class="input">
    </div>
    
    <!-- CONFIRM -->
    <div>
    <label class="label">Confirm Password</label>
    <input v-model="form.password_confirmation" type="password" class="input">
    </div>
    
    <!-- PASSWORD STRENGTH -->
    <div v-if="form.password">
    
    <p class="text-xs mb-1 text-gray-500">
    Password Strength
    </p>
    
    <div class="h-2 bg-gray-200 rounded">
    
    <div
    :class="strengthClass"
    :style="{width: strength + '%'}"
    class="h-2 rounded transition-all"
    ></div>
    
    </div>
    
    </div>
    
    <button
    @click="updatePassword"
    class="btn"
    >
    Update Password
    </button>
    
    </div>
    
    </div>
    
    </div>
    
    </UserLayout>
    
    </template>
    
    <script setup>
    
    import { ref, computed } from 'vue'
    import axios from '@/axios'
    import UserLayout from '@/layouts/UserLayout.vue'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()
    
    const form = ref({
    current_password:'',
    password:'',
    password_confirmation:''
    })
    
    /* ================= PASSWORD STRENGTH ================= */
    
    const strength = computed(()=>{
    
    const p = form.value.password
    
    if(!p) return 0
    if(p.length < 6) return 30
    if(p.length < 8) return 60
    return 100
    
    })
    
    const strengthClass = computed(()=>{
    
    if(strength.value < 40) return 'bg-red-500'
    if(strength.value < 80) return 'bg-yellow-500'
    return 'bg-green-500'
    
    })
    
    /* ================= UPDATE PASSWORD ================= */
    
    const updatePassword = async () => {
    
    try{
    
    await axios.post('/change-password',form.value)
    
    alert('Password updated successfully')
    
    /* 🔐 logout after password change */
    
    localStorage.clear()
    
    router.push('/login')
    
    }catch(e){
    
    alert(e.response?.data?.message || 'Password update failed')
    
    }
    
    }
    
    </script>
    
    <style scoped>
    
    .label{
    display:block;
    font-size:14px;
    margin-bottom:4px;
    color:#555;
    }
    
    .input{
    width:100%;
    padding:10px 14px;
    border:1px solid #e5e7eb;
    border-radius:8px;
    }
    
    .btn{
    width:100%;
    background:#4f46e5;
    color:white;
    padding:12px;
    border-radius:8px;
    font-weight:600;
    margin-top:10px;
    }
    
    .btn:hover{
    background:#4338ca;
    }
    
    </style>