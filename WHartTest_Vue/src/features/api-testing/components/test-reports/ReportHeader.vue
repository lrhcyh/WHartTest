<template>
  <div class="report-header-shell sticky top-0 z-10">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <a-button class="custom-back-button" @click="$emit('back')">
            <template #icon><icon-left /></template>
            返回
          </a-button>
          <div>
            <h2 class="report-title text-xl font-medium">{{ report?.name }}</h2>
            <div class="flex items-center gap-2 mt-1">
              <icon-code class="report-subtle-text" />
              <span class="report-subtle-text">{{ report?.testcase_name }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex flex-col items-end">
            <a-tag :color="getStatusColor(report?.status)" size="medium">
              {{ getStatusText(report?.status) }}
            </a-tag>
            <span class="report-subtle-text text-xs mt-1">执行时长: {{ formatDuration(report?.duration) }}</span>
          </div>
          <a-button type="outline" status="success" @click="$emit('export')">
            <template #icon><icon-download /></template>
            导出报告
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconLeft, IconCode, IconDownload } from '@arco-design/web-vue/es/icon'
import { formatDuration } from '@/utils/formatters'
import type { TestReportResponse } from './TestReportDetail.vue'

defineProps<{
  report: TestReportResponse | null
  loading: boolean
}>()

defineEmits<{
  (e: 'back'): void
  (e: 'export'): void
}>()

const getStatusColor = (status?: string) => {
  const statusMap: Record<string, string> = {
    success: 'green',
    failure: 'red',
    error: 'orange',
  }
  return statusMap[status || ''] || 'gray'
}

const getStatusText = (status?: string) => {
  const statusMap: Record<string, string> = {
    success: '成功',
    failure: '失败',
    error: '错误',
  }
  return statusMap[status || ''] || '未知'
}
</script>

<style scoped>
@reference "tailwindcss";
.report-header-shell {
  background: var(--api-report-header-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--api-report-shell-border);
}

.report-title {
  color: var(--api-report-text);
}

.report-subtle-text {
  color: var(--api-report-text-subtle);
}

.custom-back-button {
  background: var(--api-report-inline-bg) !important;
  border-color: var(--api-report-inline-border) !important;
  color: var(--api-report-text-muted) !important;
  
  &:hover {
    background: var(--api-report-card-hover) !important;
    border-color: rgba(var(--theme-accent-rgb), 0.2) !important;
    color: var(--api-report-text) !important;
  }
  
  &:active {
    background: var(--api-report-card-bg) !important;
    border-color: var(--api-report-inline-border) !important;
    color: var(--api-report-text-muted) !important;
  }
}
</style> 