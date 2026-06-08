<template>
  <div class="bg-white border rounded-xl p-8 space-y-7">

    <!-- TITLE -->
    <div class="border-b pb-4">
      <h2 class="text-lg font-semibold text-gray-800">
        Arbitrator Appointment
      </h2>
    </div>

    <!-- CHECKBOX -->
    <div class="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
      <input
        type="checkbox"
        v-model="form.appointedByCourt"
        class="w-5 h-5"
      />

      <label class="text-sm">
        Has an Arbitrator been appointed by the Hon'ble Court?
      </label>
    </div>

    <!-- ============================= -->
    <!-- 🔥 CONDITIONAL ARBITRATOR FORM -->
    <!-- ============================= -->

    <div
      v-if="form.appointedByCourt"
      class="space-y-6 border-t pt-6"
    >

      <!-- Arbitrator Name -->
      <div>
        <label class="label">Arbitrator Name</label>
        <input v-model="form.name" class="input"/>
      </div>

      <!-- Email -->
      <div>
        <label class="label">Email</label>
        <input v-model="form.email" class="input"/>
      </div>

      <!-- Mobile -->
      <div>
        <label class="label">Mobile</label>
        <input v-model="form.mobile" class="input"/>
      </div>

      <!-- Address -->
      <div>
        <label class="label">Address</label>
        <textarea v-model="form.address" rows="3" class="input"></textarea>
      </div>

    </div>

  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from 'vue'

const props = defineProps({
  draft:Object
})

const emit = defineEmits(['update'])

const form = reactive({
  appointedByCourt:false,
  name:'',
  email:'',
  mobile:'',
  address:''
})

watch(form,()=>{
  emit('update',JSON.parse(JSON.stringify(form)))
},{deep:true})

onMounted(()=>{
  if(props.draft?.arbitrator){
    Object.assign(form, props.draft.arbitrator)
  }
})
</script>

<style scoped>
.input{
  width:100%;
  border:1px solid #e5e7eb;
  border-radius:10px;
  padding:10px 12px;
  margin-top:4px;
}
.label{
  font-size:13px;
  font-weight:500;
  color:#374151;
}
</style>