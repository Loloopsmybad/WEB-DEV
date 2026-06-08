<template>
    <div class="relative">
    
      <!-- 🔔 BELL ICON -->
      <button @click="toggle" class="relative">
        <i class="fa-solid fa-bell text-xl"></i>
    
        <span
          v-if="unreadCount>0"
          class="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
          {{ unreadCount }}
        </span>
      </button>
    
      <!-- DROPDOWN -->
      <div
        v-if="open"
        class="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-lg z-50">
    
        <div class="p-3 font-semibold border-b">
          Notifications
        </div>
    
        <div class="max-h-80 overflow-y-auto">
    
          <div
            v-for="n in notifications"
            :key="n.id"
            class="p-3 border-b hover:bg-gray-50">
    
            <p class="font-semibold text-sm">{{n.title}}</p>
            <p class="text-xs text-gray-500">{{n.message}}</p>
    
          </div>
    
          <div
            v-if="notifications.length===0"
            class="p-4 text-center text-gray-400">
            No notifications
          </div>
    
        </div>
      </div>
    
    </div>
    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue'
    import api from '@/axios'
    
    const open = ref(false)
    const notifications = ref([])
    const unreadCount = ref(0)
    
    const toggle = ()=>{
      open.value = !open.value
    }
    
    const loadNotifications = async ()=>{
      const res = await api.get('/notifications')
      notifications.value = res.data
    
      unreadCount.value =
        res.data.filter(n=>!n.is_read).length
    }
    
    /* 🔥 REALTIME GOD MODE */
    setInterval(()=>{
      loadNotifications()
    },5000)
    
    onMounted(()=>{
      loadNotifications()
    })
    </script>