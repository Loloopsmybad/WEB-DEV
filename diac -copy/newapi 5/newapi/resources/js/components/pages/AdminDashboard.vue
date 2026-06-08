<template>

  <AdminLayout>
  
<div class="p-6 bg-gray-100 min-h-screen">

  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold text-gray-800">
      Dashboard <span class="text-gray-500 text-lg">Control panel</span>
    </h1>
  </div>

  <!-- Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

    <!-- Registered Cases -->
    <div class="bg-blue-900 text-white rounded-lg shadow p-6 relative hover:bg-blue-800 transition">
      <div class="text-3xl font-bold">0</div>
      <div class="mt-2 text-sm">Registered Cases</div>

      <div class="absolute right-4 top-6 opacity-20 text-6xl">
        📚
      </div>

      <div class="mt-4 text-sm border-t border-blue-700 pt-2 cursor-pointer">
        More info →
      </div>
    </div>

    <!-- Today's Hearing -->
    <div class="bg-blue-900 text-white rounded-lg shadow p-6 relative hover:bg-blue-800 transition">
      <div class="text-3xl font-bold">0</div>
      <div class="mt-2 text-sm">Today's Hearing</div>

      <div class="absolute right-4 top-6 opacity-20 text-6xl">
        ⚖️
      </div>

      <div class="mt-4 text-sm border-t border-blue-700 pt-2 cursor-pointer">
        More info →
      </div>
    </div>

    <!-- Total Rooms -->
    <div class="bg-blue-900 text-white rounded-lg shadow p-6 relative hover:bg-blue-800 transition">
      <div class="text-3xl font-bold">0</div>
      <div class="mt-2 text-sm">Total Rooms</div>

      <div class="absolute right-4 top-6 opacity-20 text-6xl">
        🏢
      </div>

      <div class="mt-4 text-sm border-t border-blue-700 pt-2 cursor-pointer">
        More info →
      </div>
    </div>

  </div>

  <!-- Notification -->
  <div class="mt-8 bg-white shadow rounded-lg">

    <div class="bg-blue-900 text-white px-4 py-3 rounded-t-lg flex justify-between">
      <span>Latest Notifications</span>
      <span class="text-xl">+</span>
    </div>

    <div class="p-4 text-gray-500 text-sm">
      No new notification.
    </div>

  </div>

</div>


  
  </AdminLayout>
  
  </template>
  
  <script setup>
  import AdminLayout from '@/layouts/AdminLayout.vue'
  </script>