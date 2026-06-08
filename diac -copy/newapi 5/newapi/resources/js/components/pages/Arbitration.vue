<template>
  <ClientLayout>

    <template #title>
      New Arbitration Filing
    </template>

    <!-- PROGRESS -->
    <StepProgress :current="currentStepIndex" />

    <!-- WIZARD -->
    <ArbitrationWizard @step-changed="updateStep" />

  </ClientLayout>
</template>

<script setup>
import { ref } from 'vue'
import ClientLayout from '@/layouts/UserLayout.vue'
import ArbitrationWizard from '../arbitration/ArbitrationWizard.vue'
import StepProgress from '../arbitration/StepProgress.vue'

const currentStepIndex = ref(0)

const updateStep = (step) => {
  currentStepIndex.value = step
}
</script>