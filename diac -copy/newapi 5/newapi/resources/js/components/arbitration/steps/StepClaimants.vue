<template>
  <div class="max-w-6xl mx-auto px-6 py-10 space-y-10">
  
    <!-- ================= CLAIMANTS ================= -->
    <div>
  
      <span class="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold">
        SECTION C: CLAIMANT DETAILS
      </span>
  
      <div
        v-for="(c,index) in form.claimants"
        :key="index"
        class="bg-white border p-6 rounded mt-6 space-y-4"
      >
        <h3 class="font-semibold text-red-600">Claimant {{ index+1 }}</h3>
  
        <input 
  v-model="c.name" 
  placeholder="Name *" 
  class="input"
/>

<input 
  v-model="c.email"
  type="email"
  placeholder="Email *"
  class="input"
  @blur="validateEmail(c)"
/>

<p v-if="c.emailError" class="error">{{ c.emailError }}</p>

<input 
  v-model="c.mobile"
  type="tel"
  maxlength="10"
  placeholder="Mobile *"
  class="input"
  @input="validateMobile(c)"
/>

<p v-if="c.mobileError" class="error">{{ c.mobileError }}</p>

<textarea 
  v-model="c.address"
  placeholder="Complete Address *"
  class="input">
</textarea>

  
        <button
          v-if="form.claimants.length>1"
          @click="removeClaimant(index)"
          class="text-red-500 text-sm"
        >
          Remove
        </button>
  
      </div>
  
      <button
        @click="addClaimant"
        class="mt-6 px-5 py-2 border border-red-600 text-red-600 rounded-full"
      >
        + Add Another Claimant
      </button>
  
    </div>
  
  
    <!-- ================= COUNSEL ================= -->
    <div>
  
      <span class="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold">
        SECTION D: COUNSEL FOR CLAIMANT(S)
      </span>
  
      <p class="text-xs text-gray-500 mt-2">
        (To apply if Counsel details are mentioned in Memo of Parties)
      </p>
  
      <!-- EMPTY STATE -->
      <div v-if="form.counsels.length===0" class="mt-8 text-center text-gray-400">
        No counsel added yet
      </div>
  
      <!-- COUNSEL LIST -->
      <div
        v-for="(co,index) in form.counsels"
        :key="index"
        class="bg-white border p-6 rounded mt-6 space-y-4"
      >
        <h3 class="font-semibold text-red-600">Counsel {{ index+1 }}</h3>
  
        <input v-model="co.name" placeholder="Counsel Name" class="input"/>
        <input v-model="co.email" placeholder="Email" class="input"/>
        <input v-model="co.mobile" placeholder="Mobile" class="input"/>
        <textarea v-model="co.address" placeholder="Address" class="input"/>
  
        <button
          @click="removeCounsel(index)"
          class="text-red-500 text-sm"
        >
          Remove
        </button>
  
      </div>
  
      <button
        @click="addCounsel"
        class="mt-6 px-6 py-2 border border-black rounded-full"
      >
        + Add Counsel
      </button>
  
    </div>
  
  </div>
  </template>
  
  <script setup>
  import { reactive, watch, onMounted } from 'vue'
  
  const props = defineProps({
    draft:Object
  })
  
  const emit = defineEmits(['update'])
  
  /* ================= FORM ================= */
  
  const form = reactive({
    claimants:[],
    counsels:[]
  })
  
  /* ================= CLAIMANTS ================= */
  /* EMAIL VALIDATION */
const validateEmail = (c)=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if(!c.email){
    c.emailError = 'Email is required'
  }
  else if(!emailRegex.test(c.email)){
    c.emailError = 'Invalid email format'
  }
  else{
    c.emailError = ''
  }
}


/* 🇮🇳 INDIAN MOBILE VALIDATION */
const validateMobile = (c)=>{

  // allow only numbers
  c.mobile = c.mobile.replace(/\D/g,'')

  const indianMobileRegex = /^[6-9]\d{9}$/

  if(!c.mobile){
    c.mobileError = 'Mobile required'
  }
  else if(!indianMobileRegex.test(c.mobile)){
    c.mobileError = 'Enter valid Indian mobile number'
  }
  else{
    c.mobileError = ''
  }
}

  const addClaimant = ()=>{
    form.claimants.push({
      name:'',
      email:'',
      mobile:'',
      address:''
    })
  }
  
  const removeClaimant = (i)=>{
    form.claimants.splice(i,1)
  }
  
  /* ================= COUNSELS ================= */
  
  const addCounsel = ()=>{
    form.counsels.push({
      name:'',
      email:'',
      mobile:'',
      address:''
    })
  }
  
  const removeCounsel = (i)=>{
    form.counsels.splice(i,1)
  }
  
  /* ================= AUTO SAVE ================= */
  
  watch(form,()=>{
    emit('update',JSON.parse(JSON.stringify(form)))
  },{deep:true})
  
  /* ================= LOAD PREVIOUS DATA ================= */
  
  onMounted(()=>{
  
    if(props.draft?.claimants){
      Object.assign(form,props.draft.claimants)
    }
  
    // first claimant auto
    if(form.claimants.length===0){
      addClaimant()
    }
  
  })
  </script>
  
  <style scoped>
  .input{
    width:100%;
    border:1px solid #ddd;
    padding:10px;
    border-radius:8px;
  }

  .error{
  color:#ef4444;
  font-size:12px;
  margin-top:-8px;
  margin-bottom:10px;
}

  </style>
  
  