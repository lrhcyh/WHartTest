<template>
  <div class="api-testing-container">
    <TestCaseForm
      v-if="projectId"
      :project-id="projectId"
      mode="create"
      @success="handleSuccess"
      @cancel="goBackToTestCases"
    />
    <div v-else class="flex items-center justify-center h-full text-gray-500">
      请先选择项目
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/store/projectStore'
import TestCaseForm from '../components/testcases/TestCaseForm.vue'

const router = useRouter()
const route = useRoute()
const projectStore = useProjectStore()
const projectId = computed(() => projectStore.currentProjectId)

const getReturnQuery = () => ({
  tab: typeof route.query.tab === 'string' ? route.query.tab : 'testcases'
})

const goBackToTestCases = () => {
  router.push({ path: '/api-testing', query: getReturnQuery() })
}

const handleSuccess = (payload: { id: number }) => {
  router.replace({
    name: 'ApiTestCaseEdit',
    params: { id: payload.id },
    query: getReturnQuery()
  })
}
</script>

<style scoped>
.api-testing-container {
  height: 100%;
  background-color: rgb(17, 24, 39);
  border-radius: 8px;
  overflow: hidden;
}
</style>
