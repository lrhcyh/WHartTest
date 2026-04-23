<template>
  <div class="basic-info-shell rounded-lg border">
    <div class="basic-info-header p-4 border-b">
      <h3 class="basic-title text-lg font-medium">基本信息</h3>
    </div>
    <div class="p-4">
      <div class="grid grid-cols-2 gap-4">
        <!-- 左列 -->
        <div class="space-y-3">
          <!-- 报告ID -->
          <div class="info-item">
            <icon-code class="text-lg text-gray-400" />
            <div class="flex-1">
              <div class="text-sm text-gray-400">报告ID</div>
              <div class="text-base text-gray-200 mt-1">{{ report?.id }}</div>
            </div>
          </div>
          
          <!-- 测试用例 -->
          <div class="info-item">
            <icon-code class="text-lg text-gray-400" />
            <div class="flex-1">
              <div class="text-sm text-gray-400">测试用例</div>
              <div class="text-base text-gray-200 mt-1">{{ report?.testcase_name }}</div>
              <div class="text-sm text-gray-400 mt-1">用例ID: {{ report?.testcase }}</div>
            </div>
          </div>

          <!-- 开始时间 -->
          <div class="info-item">
            <icon-calendar class="text-lg text-gray-400" />
            <div class="flex-1">
              <div class="text-sm text-gray-400">开始时间</div>
              <div class="text-base text-gray-200 mt-1">{{ formatDateTime(report?.start_time) }}</div>
            </div>
          </div>
        </div>

        <!-- 右列 -->
        <div class="space-y-3">
          <!-- 执行环境 -->
          <div class="info-item">
            <icon-desktop class="text-lg text-gray-400" />
            <div class="flex-1">
              <div class="text-sm text-gray-400">执行环境</div>
              <div class="text-base text-gray-200 mt-1">{{ report?.environment_info?.name }}</div>
              <div class="text-sm text-gray-400 mt-1">环境ID: {{ report?.environment }}</div>
              <div class="text-sm text-gray-400 mt-1">项目: {{ report?.environment_info?.project?.name }} (ID: {{ report?.environment_info?.project?.id }})</div>
              <div v-if="report?.environment_info?.base_url" class="text-sm text-blue-400 font-mono mt-1">
                Base URL: {{ report?.environment_info?.base_url }}
              </div>
              <div v-if="report?.environment_info?.description" class="text-sm text-gray-400 mt-1">
                描述: {{ report?.environment_info?.description }}
              </div>
            </div>
          </div>

          <!-- 执行人 -->
          <div class="info-item">
            <icon-user class="text-xl text-gray-400" />
            <div class="flex-1">
              <div class="text-sm text-gray-400">执行人</div>
              <div class="text-base text-gray-200 mt-1">{{ report?.executed_by_info?.username }}</div>
              <div class="text-sm text-gray-400 mt-1">用户ID: {{ report?.executed_by }}</div>
              <div class="text-sm text-gray-400 mt-1">邮箱: {{ report?.executed_by_info?.email || '未设置' }}</div>
              <div v-if="report?.executed_by_info?.first_name || report?.executed_by_info?.last_name" class="text-sm text-gray-400 mt-1">
                姓名: {{ [report?.executed_by_info?.first_name, report?.executed_by_info?.last_name].filter(Boolean).join(' ') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCalendar, IconDesktop, IconUser, IconInfoCircle, IconCode } from '@arco-design/web-vue/es/icon'
import { formatDateTime } from '@/utils/formatters'
import type { TestReportResponse } from './TestReportDetail.vue'

defineProps<{
  report: TestReportResponse | null
}>()
</script>

<style scoped>
@reference "tailwindcss";
.basic-info-shell {
  background: color-mix(in srgb, var(--api-report-card-bg) 88%, var(--theme-page-bg) 12%);
  border-color: var(--api-report-shell-border);
  backdrop-filter: blur(10px);
}

.basic-info-header {
  border-color: var(--api-report-shell-border);
}

.basic-title {
  color: var(--api-report-text);
}

.basic-info-shell .text-gray-400 {
  color: var(--api-report-text-subtle);
}

.basic-info-shell .text-gray-200,
.basic-info-shell .text-gray-300 {
  color: var(--api-report-text-muted);
}

.info-item {
  @apply flex items-start gap-3 p-3 rounded-lg transition-all duration-200;
  background: var(--api-report-inline-bg);
  border: 1px solid var(--api-report-inline-border);
  
  &:hover {
    background: var(--api-report-card-hover);
    border-color: rgba(var(--theme-accent-rgb), 0.12);
  }
}
</style> 