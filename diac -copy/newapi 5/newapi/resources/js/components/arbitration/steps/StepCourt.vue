<template>
  <div>

    <div class="space-y-6 bg-white p-8 rounded shadow">

      <div>
        <label>Diary Number</label>
        <input v-model="form.diary_number" class="input"/>
      </div>

      <div>
        <label>Name of Court</label>
        <input value="High Court Of Delhi" disabled class="input bg-gray-100"/>
      </div>

      <div>
  <label class="block mb-1">Hon'ble Justice Name</label>

  <div class="relative">
    
    <!-- SEARCH INPUT -->
    <input
      v-model="justiceSearch"
      @focus="openDropdown=true"
      @input="filterJustice"
      placeholder="Search Justice Name..."
      class="input"
    />

    <!-- DROPDOWN -->
    <div
      v-if="openDropdown"
      class="absolute z-50 w-full bg-white border rounded shadow max-h-60 overflow-auto mt-1"
    >
      <div
        v-for="(j,i) in filteredJustices"
        :key="i"
        @click="selectJustice(j)"
        class="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
      >
        {{ j }}
      </div>

      <div v-if="!filteredJustices.length" class="p-3 text-gray-400 text-sm">
        No justice found
      </div>
    </div>

  </div>
</div>


      <div>
        <label>Petition Type</label>
        <select v-model="form.petition_type" class="input">
          <option value="">Select</option>
          <option value="ARB.P.">ARB.P.</option>
          <option value="OMP">OMP</option>
          <option value="FAO">FAO</option>
        </select>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <input
          v-model="form.petition_number"
          placeholder="Petition Number"
          class="input"
        />

        <select v-model="form.year" class="input">
          <option value="">Year</option>
          <option v-for="y in years" :key="y" :value="y">
            {{ y }}
          </option>
        </select>
      </div>

      <div v-if="caseRef" class="bg-blue-50 border p-4 rounded">
        <b>{{ caseRef }}</b>
      </div>

      <div>
  <label class="block text-sm font-medium mb-1">
    Date Of Order
  </label>

  <input
    type="date"
    v-model="form.date_of_order"
    class="border rounded px-3 py-2 w-full"
  />
</div>

      <div>
        <label>Case Title</label>
        <textarea
          v-model="form.case_title"
          rows="3"
          class="input"
        ></textarea>
      </div>

    </div>

  </div>
</template>
<script setup>
import { reactive, computed, watch, onMounted, ref } from 'vue'

/* ================= PROPS + EMIT ================= */
const props = defineProps({
  draft:Object
})

const emit = defineEmits(['update'])

/* ================= FORM STATE ================= */
const form = reactive({
  diary_number:'',
  justice_name:'',
  petition_type:'',
  petition_number:'',
  year:'',
  case_title:''
})

/* ================= YEARS ================= */
const years = Array.from({length:20},(_,i)=>new Date().getFullYear()-i)

/* ================= AUTO CASE REF ================= */
const caseRef = computed(()=>{
  if(!form.petition_type||!form.petition_number||!form.year) return ''
  return `${form.petition_type} ${form.petition_number}/${form.year}`
})

/* ================= AUTOSAVE TO WIZARD ================= */
watch(form,()=>{
  emit('update',JSON.parse(JSON.stringify(form)))
},{deep:true})

/* ================= JUSTICE DROPDOWN ENGINE ================= */

const openDropdown = ref(false)
const justiceSearch = ref('')
const filteredJustices = ref([])

const justices = [
"HMJ Devendra Kumar Upadhyaya",
"HMJ V. Kameswar Rao",
"HMJ Nitin Wasudeo Sambre",
"HMJ Dinesh Mehta",
"HMJ Vivek Chaudhary",
"HMJ Prathiba M. Singh",
"HMJ Navin Chawla",
"HMJ C. Hari Shankar",
"HMJ Anil Khetarpal",
"HMJ Avneesh Jhingan",
"HMJ Subramonium Prasad",
"HMJ Jyoti Singh",
"HMJ Prateek Jalan",
"HMJ Anup J. Bhambhani",
"HMJ Sanjeev Narula",
"HMJ Manoj Kumar Ohri",
"HMJ Jasmeet Singh",
"HMJ Amit Bansal",
"HMJ Purushaindra K. Kaurav",
"HMJ Chandrasekharan Sudha",
"HMJ Neena Bansal Krishna",
"HMJ Swarana Kanta Sharma",
"HMJ Mini Pushkarna",
"HMJ Vikas Mahajan",
"HMJ Tushar Rao Gedela",
"HMJ Manmeet Pritam Singh Arora",
"HMJ Sachin Datta",
"HMJ Amit Mahajan",
"HMJ Saurabh Banerjee",
"HMJ Anish Dayal",
"HMJ Amit Sharma",
"HMJ Om Prakash Shukla",
"HMJ Girish Kathpalia",
"HMJ Manoj Jain",
"HMJ Ravinder Dudeja",
"HMJ Ajay Digpaul",
"HMJ Harish Vaidyanathan Shankar",
"HMJ Tejas Dhirenbhai Karia",
"HMJ Renu Bhatnagar",
"HMJ Rajneesh Kumar Gupta",
"HMJ Vinod Kumar",
"HMJ Shail Jain",
"HMJ Madhu Jain",
"HMJ Vimal Kumar Yadav"
]

filteredJustices.value = justices

const filterJustice = ()=>{
  const term = justiceSearch.value.toLowerCase()
  filteredJustices.value = justices.filter(j =>
    j.toLowerCase().includes(term)
  )
}

const selectJustice = (name)=>{
  form.justice_name = name
  justiceSearch.value = name
  openDropdown.value = false
}

/* ================= LOAD DRAFT (🔥 FINAL FIX) ================= */

onMounted(()=>{

  if(props.draft?.court){

    Object.assign(form, props.draft.court)

    /* 🔥 dropdown me value show karne ka REAL FIX */
    justiceSearch.value = props.draft.court.justice_name || ''
  }

})
</script>



<style scoped>
.input{
  width:100%;
  border:1px solid #d1d5db;
  border-radius:8px;
  padding:10px;
  margin-top:4px;
}


</style>
