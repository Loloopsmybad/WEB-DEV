<template>
  <div class="max-w-6xl mx-auto">

    <!-- ===================== -->
    <!-- SECTION G: DOCUMENTS -->
    <!-- ===================== -->
    <!-- ===================== -->
<!-- ULTRA UPLOAD UI -->
<!-- ===================== -->

<!-- ===================== -->
<!-- ULTIMATE UPLOAD UI -->
<!-- ===================== -->

<div class="mb-12">

<span class="section-tag">
  SECTION G: DOCUMENT UPLOADS
</span>

<div class="upload-card">

  <!-- ===== Reference Order ===== -->
  <div class="upload-group">

    <label>Certified Copy of Reference Order</label>

    <div
      class="upload-box"
      @dragover.prevent
      @drop.prevent="dropFile($event,'reference_order')"
      @click="$refs.refFile.click()"
    >
      <p>📂 Drag & Drop or Click to Upload</p>
      <input
        ref="refFile"
        type="file"
        class="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        @change="handleFile($event,'reference_order')"
      />
    </div>

    <div v-if="form.reference_order" class="file-chip">
      {{ getIcon(form.reference_order.name) }}
      {{ form.reference_order.name }}
      <button @click="removeFile('reference_order')">✕</button>
    </div>

  </div>

  <!-- ===== Memo ===== -->
  <div class="upload-group">

    <label>Memo of Parties</label>

    <div
      class="upload-box"
      @dragover.prevent
      @drop.prevent="dropFile($event,'memo_parties')"
      @click="$refs.memoFile.click()"
    >
      <p>📂 Drag & Drop or Click to Upload</p>

      <input
        ref="memoFile"
        type="file"
        class="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        @change="handleFile($event,'memo_parties')"
      />
    </div>

    <div v-if="form.memo_parties" class="file-chip">
      {{ getIcon(form.memo_parties.name) }}
      {{ form.memo_parties.name }}
      <button @click="removeFile('memo_parties')">✕</button>
    </div>

  </div>

  <!-- ===== OTHER DOCS ===== -->
  <div class="upload-group">

    <label>Any Other Relevant Documents</label>

    <div
      class="upload-box"
      @dragover.prevent
      @drop.prevent="dropFile($event,'other_docs')"
      @click="$refs.otherFile.click()"
    >
      <p>📂 Drag Multiple Files</p>

      <input
        ref="otherFile"
        type="file"
        multiple
        class="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        @change="handleFile($event,'other_docs')"
      />
    </div>

    <div class="flex flex-wrap gap-2 mt-3">
      <div
        v-for="(file,i) in form.other_docs"
        :key="i"
        class="file-chip animate-pop"
      >
        {{ getIcon(file.name) }}
        {{ file.name }}
        <button @click="removeOther(i)">✕</button>
      </div>
    </div>

  </div>

</div>

</div>

    <!-- ===================== -->
    <!-- SECTION H: DECLARATION -->
    <!-- ===================== -->
    <div>
      <span class="inline-block bg-primary text-white px-4 py-2 rounded font-semibold">
        SECTION H: REGISTRY DECLARATION
      </span>

      <div class="mt-6 bg-white border rounded-lg p-6 space-y-4">

        <p class="text-gray-700">
          The above particulars are true and correct as per judicial record.
        </p>

        <label class="flex items-center gap-3">
          <input type="checkbox" v-model="form.declaration" />
          <span>I confirm and accept the above declaration (Legally binding)</span>
        </label>

        <div class="bg-green-50 border border-green-200 rounded p-4 text-green-700">
          <ul class="space-y-1">
            <li>✔ Data transmitted securely</li>
            <li>✔ PDF generated</li>
            <li>✔ Audit trail created</li>
          </ul>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from 'vue'

/* ================= RECEIVE FROM WIZARD ================= */
const props = defineProps({
  draft:Object
})

const emit = defineEmits(['update'])

/* ================= LOCAL FORM ================= */
const form = reactive({
  reference_order:null,
  memo_parties:null,
  other_docs:[],
  declaration:false
})

/* ================= ALLOWED FILE TYPES ================= */
const allowedTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

/* ================= FILE HANDLER ================= */
const handleFile = (e,key)=>{
  const files = Array.from(e.target.files)

  const valid = files.filter(f=>{
    if(!allowedTypes.includes(f.type)){
      alert('Only JPG PNG PDF DOC DOCX allowed')
      return false
    }
    return true
  })

  if(key==='other_docs'){
    form.other_docs = valid
  }else{
    form[key] = valid[0] || null
  }
}



/* ================= DRAG & DROP ================= */
const dropFile = (e,key)=>{
  const files = Array.from(e.dataTransfer?.files || [])
  handleFile({target:{files}}, key)
}

/* ================= REMOVE FILE ================= */
const removeFile = (key)=>{
  form[key] = null
}

const removeOther = (index)=>{
  form.other_docs.splice(index,1)
}

/* ================= FILE ICON ENGINE ================= */
const getIcon = (name)=>{
  const ext = name.split('.').pop().toLowerCase()

  if(['jpg','jpeg','png'].includes(ext)) return '🖼️'
  if(ext === 'pdf') return '📕'
  if(['doc','docx'].includes(ext)) return '📘'
  return '📄'
}

/* ================= AUTO SYNC TO WIZARD ================= */
watch(form,()=>{
  emit('update', form)
},{deep:true})

/* ================= LOAD OLD DATA ================= */
onMounted(()=>{
  if(props.draft?.documents){
    Object.assign(form, props.draft.documents)
  }
})


const isImage = (file)=>{
  if(!file?.type) return false
  return file.type.startsWith('image/')
}

const previewUrl = (file)=>{
  if(!file) return ''
  return URL.createObjectURL(file)
}

const openFile = (file)=>{
  if(!file) return
  const url = URL.createObjectURL(file)
  window.open(url,'_blank')
}

</script>

<style scoped>

/* ================= ULTIMATE UPLOAD ================= */

.section-tag{
  background:#1e355e;
  color:white;
  padding:8px 14px;
  border-radius:10px;
  font-weight:600;
}

.upload-card{
  margin-top:18px;
  background:white;
  border:1px solid #e5e7eb;
  border-radius:20px;
  padding:28px;
  display:flex;
  flex-direction:column;
  gap:26px;
}

.upload-group label{
  font-weight:500;
  margin-bottom:6px;
  display:block;
}

.upload-box{
  border:2px dashed #d1d5db;
  border-radius:16px;
  padding:28px;
  text-align:center;
  cursor:pointer;
  background:#fafafa;
  transition:.3s;
}

.upload-box:hover{
  border-color:#1e355e;
  background:#f3f6ff;
  transform:translateY(-1px);
}

.file-chip{
  background:#eef2ff;
  border-radius:999px;
  padding:7px 14px;
  font-size:13px;
  display:flex;
  align-items:center;
  gap:8px;
}

.file-chip button{
  border:none;
  background:none;
  cursor:pointer;
}

/* POP ANIMATION */
@keyframes pop{
  0%{transform:scale(.9);opacity:.6}
  100%{transform:scale(1);opacity:1}
}

.animate-pop{
  animation:pop .25s ease;
}

</style>