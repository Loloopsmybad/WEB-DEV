<template>
  <div class="max-w-6xl mx-auto px-6 py-10">

    <!-- ===================== -->
    <!-- 🔥 PROFESSIONAL STEPPER -->
    <!-- ===================== -->
    <!-- ===================== -->
<!-- 🔥 ULTRA STEPPER -->
<!-- ===================== -->
<div class="ultra-stepper mb-10">

<!-- Progress Line -->
<div class="progress-line">
  <div
    class="progress-fill"
    :style="{ width: ((currentStep)/(steps.length-1))*100 + '%' }"
  ></div>
</div>

<!-- Steps -->
<div class="flex justify-between relative z-10">

  <div
    v-for="(step,index) in steps"
    :key="index"
    class="step-item"
  >

    <div
      class="step-circle"
      :class="{
        active:index===currentStep,
        done:index<currentStep
      }"
    >
      <span v-if="index>=currentStep">{{index+1}}</span>
      <span v-else>✓</span>
    </div>

    <p
      class="step-label"
      :class="{ active:index===currentStep }"
    >
      {{step.label}}
    </p>

  </div>

</div>
</div>

    <!-- ===================== -->
    <!-- ACTIVE STEP CARD -->
    <!-- ===================== -->
    <div class="bg-white border rounded-2xl shadow-sm p-8">

      <component
        :is="steps[currentStep].component"
        :draft="draft"
        @update="updateDraft"
      />

      <!-- ACTION BUTTONS -->
      <div class="flex justify-between mt-12 pt-6 border-t">

        <button
          v-if="currentStep>0"
          @click="prevStep"
          class="ghost-btn"
        >
          Previous
        </button>

        <button
          v-if="currentStep < steps.length-1"
          @click="nextStep"
          class="primary-btn ml-auto"
        >
          Next
        </button>

        <button
          v-if="currentStep === steps.length-1"
          @click="showPreview=true"
          class="primary-btn ml-auto"
        >
          Preview
        </button>

      </div>

    </div>

  </div>


  <!-- ===================== -->
  <!-- 🔥 PREMIUM PREVIEW MODAL -->
  <!-- ===================== -->

  
  <!-- ===================== -->
<!-- 🔥 GOD MODE PREVIEW MODAL -->
<!-- ===================== -->
<pre>{{ draft.documents }}</pre>
<div
  v-if="showPreview"
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
>
  <div class="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">

    <!-- ================= HEADER ================= -->
    <div class="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
      <h2 class="text-xl font-bold text-primary">
        Arbitration Case Preview
      </h2>

      <button
        class="ghost-btn"
        @click="showPreview=false"
      >
        Close
      </button>
    </div>

    <div class="p-8 space-y-6">

      <!-- ================= COURT ================= -->
      <details open class="preview-card">
        <summary class="preview-title flex justify-between items-center cursor-pointer">
          Court Details
          <button class="edit-btn" @click.prevent="currentStep=0;showPreview=false">Edit</button>
        </summary>

        <div class="preview-grid">
          <div><span>Diary Number</span><b>{{draft.court?.diary_number || '—'}}</b></div>
          <div><span>Justice</span><b>{{draft.court?.justice_name || '—'}}</b></div>
          <div><span>Petition Type</span><b>{{draft.court?.petition_type || '—'}}</b></div>
          <div><span>Petition Number</span><b>{{draft.court?.petition_number || '—'}}</b></div>
          <div><span>Year</span><b>{{draft.court?.year || '—'}}</b></div>
          <div><span>Case Title</span><b>{{draft.court?.case_title || '—'}}</b></div>
        </div>
      </details>

      <!-- ================= ARBITRATOR ================= -->
      <details class="preview-card">
        <summary class="preview-title flex justify-between items-center cursor-pointer">
          Arbitrator Details
          <button class="edit-btn" @click.prevent="currentStep=1;showPreview=false">Edit</button>
        </summary>

        <div class="preview-grid">
          <div><span>Appointed By Court</span><b>{{draft.arbitrator?.appointedByCourt ? 'Yes':'No'}}</b></div>
          <div><span>Name</span><b>{{draft.arbitrator?.name || '—'}}</b></div>
          <div><span>Email</span><b>{{draft.arbitrator?.email || '—'}}</b></div>
          <div><span>Mobile</span><b>{{draft.arbitrator?.mobile || '—'}}</b></div>
          <div><span>Address</span><b>{{draft.arbitrator?.address || '—'}}</b></div>
        </div>
      </details>

      <!-- ================= CLAIMANTS ================= -->
      <!-- ================= CLAIMANTS ================= -->
<!-- ================= CLAIMANTS ULTRA ENTERPRISE ================= -->
<details class="preview-card">
  <summary class="preview-title flex justify-between items-center cursor-pointer">
    Claimant(s)
    <button class="edit-btn" @click.prevent="currentStep=2;showPreview=false">
      Edit
    </button>
  </summary>

  <div v-if="!draft.claimants?.claimants?.length" class="empty">
    No claimants added
  </div>

  <div
    v-for="(c,i) in draft.claimants?.claimants"
    :key="i"
    class="enterprise-party-card"
  >

    <!-- HEADER -->
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-3">
        <div class="avatar">{{ (c.name || 'U').charAt(0) }}</div>
        <h4 class="font-semibold text-primary">
          Claimant #{{ i+1 }}
        </h4>
      </div>
    </div>

    <!-- GRID -->
    <div class="preview-grid">
      <div><span>Name</span><b>{{c.name || '—'}}</b></div>
      <div><span>Email</span><b>{{c.email || '—'}}</b></div>
      <div><span>Mobile</span><b>{{c.mobile || '—'}}</b></div>
      <div><span>Address</span><b>{{c.address || '—'}}</b></div>
    </div>

  </div>
</details>

      <!-- ================= RESPONDENTS ================= -->
     
<!-- ================= RESPONDENTS ULTRA ENTERPRISE ================= -->
<details class="preview-card">
  <summary class="preview-title flex justify-between items-center cursor-pointer">
    Respondent(s)
    <button class="edit-btn" @click.prevent="currentStep=3;showPreview=false">
      Edit
    </button>
  </summary>

  <div v-if="!draft.respondents?.respondents?.length" class="empty">
    No respondents added
  </div>

  <div
    v-for="(r,i) in draft.respondents?.respondents"
    :key="i"
    class="enterprise-party-card"
  >

    <!-- HEADER -->
    <div class="flex items-center gap-3 mb-5">
      <div class="avatar">{{ (r.name || 'U').charAt(0) }}</div>
      <h4 class="font-semibold text-primary">
        Respondent #{{ i+1 }}
      </h4>
    </div>

    <!-- GRID -->
    <div class="preview-grid">
      <div><span>Name</span><b>{{r.name || '—'}}</b></div>
      <div><span>Email</span><b>{{r.email || '—'}}</b></div>
      <div><span>Mobile</span><b>{{r.mobile || '—'}}</b></div>
      <div><span>Address</span><b>{{r.address || '—'}}</b></div>
    </div>

  </div>

  <!-- COUNSEL -->
  <div class="mt-6 border-t pt-6">
    <h4 class="sub-title">Counsel for Respondents</h4>

    <div
      v-for="(co,i) in draft.respondents?.counsels"
      :key="i"
      class="enterprise-party-card"
    >
      <div class="flex items-center gap-3 mb-5">
        <div class="avatar secondary">C</div>
        <h4 class="font-semibold text-gray-700">
          Counsel #{{ i+1 }}
        </h4>
      </div>

      <div class="preview-grid">
        <div><span>Name</span><b>{{co.name || '—'}}</b></div>
        <div><span>Email</span><b>{{co.email || '—'}}</b></div>
        <div><span>Mobile</span><b>{{co.mobile || '—'}}</b></div>
        <div><span>Address</span><b>{{co.address || '—'}}</b></div>
      </div>
    </div>

  </div>

</details>

     
      <!-- ================= DOCUMENTS ================= -->
      <!-- <pre>{{ draft }}</pre> -->
      <details class="preview-card">
  <summary class="preview-title flex justify-between items-center cursor-pointer">
    Documents & Declaration
    <button
      class="edit-btn"
      @click.prevent="currentStep=4;showPreview=false"
    >
      Edit
    </button>
  </summary>

  <div class="preview-grid mt-6">

    <!-- 🔵 Reference Order -->
    <div>
  <span>Reference Order</span>

  <template v-if="draft.documents?.reference_order">

    <!-- 🖼️ IMAGE DIRECT PREVIEW -->
    <img
      v-if="isImage(draft.documents.reference_order)"
      :src="fileUrl(draft.documents.reference_order)"
      class="mt-2 w-40 rounded-lg border shadow"
    />

    <!-- 📄 DOCUMENT BUTTON -->
    <button
      v-else
      class="preview-btn mt-2"
      @click="openFile(draft.documents.reference_order)"
    >
      View Document
    </button>

  </template>

  <b v-else>Not Uploaded</b>
</div>

    <!-- 🔵 Memo of Parties -->
    <div>
      <span>Memo of Parties</span>

      <img
        v-if="isImage(draft.documents?.memo_parties)"
        :src="fileUrl(draft.documents.memo_parties)"
        class="mt-2 w-40 rounded-lg border"
      />

      <button
        v-else-if="draft.documents?.memo_parties"
        class="preview-btn mt-2"
        @click="openFile(draft.documents.memo_parties)"
      >
        View Document
      </button>

      <b v-if="!draft.documents?.memo_parties">
        Not Uploaded
      </b>
    </div>

    <div>
  <span>Any Other</span>

  <div v-if="draft.documents?.other_docs?.length" class="mt-2 space-y-3">

    <div
      v-for="(doc,i) in draft.documents.other_docs"
      :key="i"
    >

      <!-- IMAGE PREVIEW -->
      <img
        v-if="isImage(doc)"
        :src="fileUrl(doc)"
        class="w-40 rounded-lg border shadow"
      />

      <!-- DOCUMENT BUTTON -->
      <button
        v-else
        class="preview-btn"
        @click="openFile(doc)"
      >
        View Document
      </button>

    </div>

  </div>

  <b v-else>Not Uploaded</b>
</div>

    <!-- 🔵 Declaration -->
    <div>
      <span>Declaration Accepted</span>
      <b>
        {{ draft.documents?.declaration ? 'Yes' : 'No' }}
      </b>
    </div>

  </div>
</details>

      <!-- ================= FOOTER ================= -->
      <div class="flex justify-end gap-4 border-t pt-6">
        <button class="ghost-btn" @click="showPreview=false">
          Edit Case
        </button>

        <button class="primary-btn" @click="finalSubmit">
          Final Submit
        </button>
      </div>

    </div>

  </div>
</div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios'

import StepCourt from './steps/StepCourt.vue'
import StepArbitrator from './steps/StepArbitrator.vue'
import StepClaimants from './steps/StepClaimants.vue'
import StepRespondents from './steps/StepRespondents.vue'
import StepDocumentsDeclaration from './steps/StepDocumentsDeclaration.vue'

/* ================= STATE ================= */
const currentStep = ref(0)
const draft = ref({})
const showPreview = ref(false)

/* ================= STEPS CONFIG ================= */
const steps = [
  { label:'Court Details', component:StepCourt, key:'court', id:1, required:true },
  { label:'Arbitrator', component:StepArbitrator, key:'arbitrator', id:2, required:false },
  { label:'Claimant(s) & Counsel(s)', component:StepClaimants, key:'claimants', id:3, required:true },
  { label:'Respondent(s) & Counsel(s)', component:StepRespondents, key:'respondents', id:4, required:true },
  { label:'Document(s) & Declaration(s)', component:StepDocumentsDeclaration, key:'documents', id:5, required:true },
]

/* ================= LOAD DRAFT ================= */
const loadDraft = async () => {
  try{

    const res = await axios.get('/arbitration/draft')

    draft.value = {
      id: res.data.id,
      court: res.data.data_json?.court || {},
      arbitrator: res.data.data_json?.arbitrator || {},
      claimants: res.data.data_json?.claimants || {},
      respondents: res.data.data_json?.respondents || {},
      documents: res.data.data_json?.documents || {},
    }

    if(res.data.status === 'draft' && res.data.current_step){
  currentStep.value = res.data.current_step - 1
}else{
  currentStep.value = 0
}

  }catch(e){
    console.error('Draft load failed')
  }
}

onMounted(loadDraft)

/* ================= UPDATE STEP DATA ================= */
const updateDraft = (data) => {
  const key = steps[currentStep.value].key
  draft.value[key] = data
}

/* ================= VALIDATION ================= */
const validateStep = () => {
  const step = steps[currentStep.value]
  if(!step.required) return true

  const data = draft.value[step.key] || {}
  return Object.keys(data).length > 0
}

/* ================= NEXT ================= */
const nextStep = async () => {

if(!validateStep()){
  alert('Please fill mandatory fields')
  return
}

const stepId = steps[currentStep.value].id
const key = steps[currentStep.value].key

try {

  // 🔥 If NOT documents step (normal JSON save)
  if(key !== 'documents'){

    await axios.post(`/arbitration/step/${stepId}`, {
      data: draft.value[key]
    })

  } else {

    // 🔥 DOCUMENT STEP → send as FormData
    const formData = new FormData()
    const docs = draft.value.documents || {}

    if(docs.reference_order)
      formData.append('reference_order', docs.reference_order)

    if(docs.memo_parties)
      formData.append('memo_parties', docs.memo_parties)

    docs.other_docs?.forEach((file,i)=>{
      formData.append(`other_docs[${i}]`, file)
    })

    formData.append('declaration', docs.declaration)

    await axios.post(`/arbitration/step/${stepId}`, formData, {
      headers:{ 'Content-Type':'multipart/form-data' }
    })
  }

  currentStep.value++

} catch(e) {
  console.error(e)
  alert('Step save failed')
}
}

/* ================= PREVIOUS ================= */
const prevStep = () => currentStep.value--

/* ================= FINAL SUBMIT ================= */
const finalSubmit = async () => {

try{

  const formData = new FormData()

  // 🔹 Normal data
  formData.append('court', JSON.stringify(draft.value.court))
  formData.append('arbitrator', JSON.stringify(draft.value.arbitrator))
  formData.append('claimants', JSON.stringify(draft.value.claimants))
  formData.append('respondents', JSON.stringify(draft.value.respondents))

  // 🔹 Files
  const docs = draft.value.documents

  if(docs.reference_order){
    formData.append('reference_order', docs.reference_order)
  }

  if(docs.memo_parties){
    formData.append('memo_parties', docs.memo_parties)
  }

  docs.other_docs?.forEach((file,i)=>{
    formData.append(`other_docs[${i}]`, file)
  })

  formData.append('declaration', docs.declaration)

  // 🔹 API Call
  const res = await axios.post('/arbitration/submit', formData, {
    headers:{ 'Content-Type':'multipart/form-data' }
  })

  // 🔹 Success message
  alert('Case Submitted Successfully')

  // 🔹 Reset form data
  draft.value = {
    court: {},
    arbitrator: {},
    claimants: [],
    respondents: [],
    documents:{
      reference_order:null,
      memo_parties:null,
      other_docs:[],
      declaration:false
    }
  }

  // 🔹 File inputs clear (important)
  document.querySelectorAll('input[type=file]').forEach(el=>{
    el.value = null
  })

  showPreview.value = false

  // 🔹 Redirect
  window.location.href = '/dashboard'

}catch(e){

  console.error(e)
  alert('Submit Failed')

}

}
const isImage = (file)=>{
  if(!file) return false
  return file.type?.startsWith('image/')
}

const fileUrl = (file)=>{
  if(!file) return ''
  return URL.createObjectURL(file)
}

const openFile = (file)=>{
  if(!file) return
  const url = URL.createObjectURL(file)
  window.open(url,'_blank')
}

const getIcon = (name)=>{
  if(!name) return '📄'
  const ext = name.split('.').pop().toLowerCase()

  if(['jpg','jpeg','png'].includes(ext)) return '🖼️'
  if(ext==='pdf') return '📕'
  if(['doc','docx'].includes(ext)) return '📘'
  return '📄'
}

</script>
  
<style scoped>

/* ================= PREVIEW CARD ================= */
.preview-card{
  border:1px solid #e5e7eb;
  border-radius:18px;
  padding:24px;
  margin-bottom:26px;
  background:#ffffff;
  box-shadow:0 1px 2px rgba(0,0,0,0.03);
}

.preview-title{
  font-weight:700;
  color:#1e355e;
  margin-bottom:18px;
  font-size:17px;
}

/* ================= GRID ================= */
.preview-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:18px;
}

.preview-grid span{
  font-size:12px;
  color:#6b7280;
  display:block;
  margin-bottom:3px;
}

.preview-grid b{
  font-size:14px;
  color:#111827;
}

/* ================= ITEM BOX ================= */
.item-box{
  border:1px solid #e5e7eb;
  padding:14px;
  border-radius:12px;
  margin-bottom:12px;
  background:#f9fafb;
  transition:.2s;
}

.item-box:hover{
  background:#f3f4f6;
}

.sub-title{
  font-weight:600;
  margin-bottom:12px;
  color:#374151;
}

.empty{
  color:#9ca3af;
  font-size:14px;
}

/* ================= BUTTONS ================= */
.primary-btn{
  background:#1e355e;
  color:white;
  padding:12px 30px;
  border-radius:999px;
  transition:.25s;
}

.primary-btn:hover{
  background:#16284a;
  transform:translateY(-1px);
}

.ghost-btn{
  border:1px solid #e5e7eb;
  padding:12px 30px;
  border-radius:999px;
  transition:.25s;
}

.ghost-btn:hover{
  background:#f3f4f6;
}

/* ================= ULTRA STEPPER ================= */

.ultra-stepper{
  position:relative;
  padding-top:14px;
}

.progress-line{
  position:absolute;
  top:28px;
  left:0;
  width:100%;
  height:3px;
  background:#e5e7eb;
  border-radius:999px;
}

.progress-fill{
  height:100%;
  background:#1e355e;
  border-radius:999px;
  transition:.4s ease;
}

.step-item{
  display:flex;
  flex-direction:column;
  align-items:center;
  width:100%;
}

.step-circle{
  width:42px;
  height:42px;
  border-radius:999px;
  background:#e5e7eb;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:14px;
  font-weight:600;
  color:#6b7280;
  transition:.3s;
}

.step-circle.active{
  background:#1e355e;
  color:white;
  box-shadow:0 0 0 6px rgba(30,53,94,0.08);
}

.step-circle.done{
  background:#16a34a;
  color:white;
}

.step-label{
  margin-top:8px;
  font-size:13px;
  color:#9ca3af;
  text-align:center;
}

.step-label.active{
  color:#1e355e;
  font-weight:600;
}

.edit-btn{
  font-size:12px;
  background:#eef2ff;
  padding:4px 10px;
  border-radius:999px;
}
.edit-btn:hover{
  background:#dbe4ff;
}

.enterprise-party-card{
  margin-top:18px;
  border:1px solid #e5e7eb;
  border-radius:16px;
  padding:20px;
  background:#fafafa;
}

.avatar{
  width:38px;
  height:38px;
  border-radius:999px;
  background:#1e355e;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:600;
}

.avatar.secondary{
  background:#6b7280;
}

.preview-btn{
  background:#eef2ff;
  color:#1e355e;
  padding:6px 14px;
  border-radius:8px;
  font-size:13px;
  transition:.2s;
}
.preview-btn:hover{
  background:#dbeafe;
}

</style>

  