<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">
          Secure Login
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Arbitration Filing System
        </p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMsg" class="mb-4 text-red-600 text-sm text-center">
        {{ errorMsg }}
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          v-model="form.email"
          placeholder="Your Username"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
        />
      </div>

      <!-- Password -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          v-model="form.password"
          placeholder="••••••••"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
        />
      </div>

      <!-- Captcha -->
      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Captcha
        </label>

        <div class="flex items-center gap-3 mb-2">
          <div
            class="px-4 py-2 rounded-md bg-gray-200 font-bold tracking-widest text-gray-800"
          >
            {{ captcha }}
          </div>

          <button
            type="button"
            @click="generateCaptcha"
            class="text-blue-700 hover:text-blue-900"
          >
            ⟳
          </button>
        </div>

        <input
          type="text"
          v-model="form.captcha"
          placeholder="Enter captcha"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
        />
      </div>

      <!-- Button -->
      <button
        @click="login"
        :disabled="loading"
        class="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <p class="text-xs text-gray-400 text-center mt-6">
        © Harmony Nexus Arbitration
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../../axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  captcha: '',
})

const captcha = ref('')
const loading = ref(false)
const errorMsg = ref('')

/* 🔹 Generate Captcha */
const generateCaptcha = () => {
  captcha.value = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase()
}

/* 🔹 Login Function */
const login = async () => {

  errorMsg.value = ''

  if (form.value.captcha !== captcha.value) {
    errorMsg.value = 'Invalid captcha'
    generateCaptcha()
    return
  }

  loading.value = true

  try {

    const res = await axios.post('/login', {
      email: form.value.email,
      password: form.value.password,
    })

    /* 🔹 Save Token */
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('role', res.data.role)

    /* 🔹 Role Based Redirect */

    if (res.data.role === 'admin') {
      router.push('/admin')

    } else if (res.data.role === 'administrative_officer') {
      router.push('/ao')

    } else if (res.data.role === 'accounts') {
      router.push('/accounts')

    } else if (res.data.role === 'case_filer_manager') {
      router.push('/case-manager')

    } else {
      router.push('/dashboard')
    }

  } catch (e) {

    errorMsg.value = 'Invalid email or password'
    generateCaptcha()

  } finally {

    loading.value = false

  }

}

/* 🔹 Load Captcha on page load */
onMounted(() => {
  generateCaptcha()
})
</script>