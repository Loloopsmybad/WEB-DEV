<template>
  <div class="max-w-6xl mx-auto px-6 py-10">

    <!-- ================= SECTION E : RESPONDENTS ================= -->
    <span class="inline-block bg-red-600 text-white text-sm px-4 py-2 rounded mb-6">
      SECTION E: RESPONDENT DETAILS
    </span>

    <div
      v-for="(respondent,index) in form.respondents"
      :key="index"
      class="border rounded-lg p-6 mb-6"
    >
      <h3 class="text-red-600 font-semibold mb-4">
        Respondent {{ index+1 }}
      </h3>

      <input v-model="respondent.name" class="input" placeholder="Name *" />
      <input v-model="respondent.email" class="input" placeholder="Email ID *" />
      <input v-model="respondent.mobile" class="input" placeholder="Mobile Number *" />
      <textarea v-model="respondent.address" class="input" placeholder="Complete Address *"></textarea>

    </div>

    <button class="outline-btn mb-10" @click="addRespondent">
      + Add Another Respondent
    </button>
    <br>


    <!-- ================= SECTION F : COUNSEL ================= -->
    <span class="inline-block bg-red-600 text-white text-sm px-4 py-2 rounded mb-2">
      SECTION F: COUNSEL FOR RESPONDENT(S)
    </span>

    <p class="text-gray-500 text-sm mb-6">
      (To apply if counsel details are represented in Minutes of Procedure)
    </p>

    <div v-if="form.counsels.length===0" class="text-center text-gray-400 my-10">
      No counsel added yet
    </div>

    <div
      v-for="(counsel,index) in form.counsels"
      :key="index"
      class="border rounded-lg p-6 mb-6"
    >
      <h3 class="font-semibold mb-4">
        Counsel {{ index+1 }}
      </h3>

      <input v-model="counsel.name" class="input" placeholder="Name of Counsel" />
      <input v-model="counsel.email" class="input" placeholder="Email ID" />
      <input v-model="counsel.mobile" class="input" placeholder="Mobile Number" />
      <textarea v-model="counsel.address" class="input" placeholder="Complete Address"></textarea>
      <input v-model="counsel.enrollment" class="input" placeholder="Enrollment Number (Optional)" />
    </div>

    <button class="outline-btn" @click="addCounsel">
      + Add Counsel
    </button>

  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from 'vue'

/* 🔥 RECEIVE FROM WIZARD */
const props = defineProps({
  draft:Object
})

const emit = defineEmits(['update'])


/* ================= FORM STATE ================= */
const form = reactive({
  respondents:[
    {
      name:'',
      email:'',
      mobile:'',
      address:''
    }
  ],
  counsels:[]
})


/* ================= ADD FUNCTIONS ================= */
const addRespondent = ()=>{
  form.respondents.push({
    name:'',
    email:'',
    mobile:'',
    address:''
  })
}

const addCounsel = ()=>{
  form.counsels.push({
    name:'',
    email:'',
    mobile:'',
    address:'',
    enrollment:''
  })
}


/* ================= AUTO EMIT TO WIZARD ================= */
watch(form,()=>{
  emit('update',JSON.parse(JSON.stringify(form)))
},{deep:true})


/* ================= LOAD OLD DRAFT ================= */
onMounted(()=>{

  if(props.draft?.respondents){
    Object.assign(form,props.draft.respondents)
  }

})
</script>

<style scoped>
.input{
  width:100%;
  border:1px solid #e5e7eb;
  padding:12px;
  border-radius:8px;
  margin-bottom:14px;
}

.outline-btn{
  border:1px solid #ef4444;
  color:#ef4444;
  padding:10px 18px;
  border-radius:999px;
}
</style>
