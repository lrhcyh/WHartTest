<template>
  <div class="api-testing-container">
    <TestTaskForm :mode="mode" :id="id" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TestTaskForm from '../components/testtasks/TestTaskForm.vue'

const props = defineProps<{ id?: string | number }>()
const mode = computed(() => props.id ? 'edit' : 'create')
</script>

<style scoped>
.api-testing-container {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  overflow: hidden;
}

:global(:root[data-theme='black']) .api-testing-container {
  background-color: rgb(17, 24, 39);
}
</style>
