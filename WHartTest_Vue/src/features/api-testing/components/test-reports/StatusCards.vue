<template>
  <div class="status-cards-shell grid grid-cols-5 gap-4">
    <!-- 成功步骤 -->
    <div class="status-card rounded-lg aspect-square">
      <div class="h-full flex flex-col items-center justify-center px-4">
        <icon-check-circle class="text-5xl text-green-500/70" />
        <p class="text-green-400 text-sm mt-2">成功步骤</p>
        <h3 class="text-3xl font-semibold text-green-500 mt-1">{{ report?.success_count }}</h3>
        <p class="text-gray-400 text-xs mt-1">占比 {{ Number(report?.success_rate || 0) * 100 }}%</p>
      </div>
    </div>

    <!-- 失败步骤 -->
    <div class="status-card rounded-lg aspect-square">
      <div class="h-full flex flex-col items-center justify-center px-4">
        <icon-close-circle class="text-5xl text-red-500/70" />
        <p class="text-red-400 text-sm mt-2">失败步骤</p>
        <h3 class="text-3xl font-semibold text-red-500 mt-1">{{ report?.fail_count }}</h3>
        <p class="text-gray-400 text-xs mt-1">占比 {{ failRate }}%</p>
      </div>
    </div>

    <!-- 错误步骤 -->
    <div class="status-card rounded-lg aspect-square">
      <div class="h-full flex flex-col items-center justify-center px-4">
        <icon-exclamation-circle class="text-5xl text-orange-500/70" />
        <p class="text-orange-400 text-sm mt-2">错误步骤</p>
        <h3 class="text-3xl font-semibold text-orange-500 mt-1">{{ report?.error_count }}</h3>
        <p class="text-gray-400 text-xs mt-1">占比 {{ errorRate }}%</p>
      </div>
    </div>

    <!-- 总步骤 -->
    <div class="status-card rounded-lg aspect-square">
      <div class="h-full flex flex-col items-center justify-center px-4">
        <icon-list class="text-5xl text-blue-500/70" />
        <p class="text-blue-400 text-sm mt-2">总步骤</p>
        <h3 class="text-3xl font-semibold text-blue-500 mt-1">{{ totalSteps }}</h3>
        <p class="text-gray-400 text-xs mt-1">执行完成</p>
      </div>
    </div>

    <!-- 成功率卡片 -->
    <div class="status-card rounded-lg aspect-square">
      <div class="h-full flex flex-col items-center justify-center">
        <div class="relative w-24 h-24">
          <!-- 背景圆环 -->
          <svg class="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke-width="8"
              :stroke="progressTrackColor"
              fill="none"
              class="stroke-current"
            />
            <!-- 进度圆环 -->
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke-width="8"
              :stroke="progressColor"
              fill="none"
              class="stroke-current"
              :style="{
                strokeDasharray: `${2 * Math.PI * 44}`,
                strokeDashoffset: `${2 * Math.PI * 44 * (1 - (report?.success_rate || 0))}`,
                transition: 'stroke-dashoffset 0.5s ease'
              }"
            />
          </svg>
          <!-- 中间的文字 -->
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-2xl font-bold" :class="progressTextColor">
              {{ Math.round((report?.success_rate || 0) * 100) }}%
            </span>
            <span class="text-xs text-gray-400">成功率</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/store/themeStore'
import { 
  IconCheckCircle,
  IconCloseCircle,
  IconExclamationCircle,
  IconList
} from '@arco-design/web-vue/es/icon'
import type { TestReportResponse } from './TestReportDetail.vue'

const props = defineProps<{
  report: TestReportResponse | null
  totalSteps: number
  failRate: number
  errorRate: number
}>()

const themeStore = useThemeStore()

const progressColor = computed(() => {
  const rate = props.report?.success_rate || 0
  if (rate >= 0.9) return '#22c55e' // 绿色
  if (rate >= 0.7) return '#f97316' // 橙色
  return '#ef4444' // 红色
})

const progressTrackColor = computed(() => themeStore.isBlack ? 'rgba(75, 85, 99, 0.3)' : 'rgba(148, 163, 184, 0.28)')

const progressTextColor = computed(() => {
  const rate = props.report?.success_rate || 0
  if (rate >= 0.9) return 'text-green-500'
  if (rate >= 0.7) return 'text-orange-500'
  return 'text-red-500'
})
</script>

<style scoped>
@reference "tailwindcss";
circle {
  transition: stroke-dashoffset 0.5s ease;
}

.status-cards-shell .text-gray-400 {
  color: var(--api-report-text-subtle);
}

.status-card {
  background: color-mix(in srgb, var(--api-report-card-bg) 88%, var(--theme-page-bg) 12%);
  border: 1px solid var(--api-report-shell-border);
  backdrop-filter: blur(10px);
}

.aspect-square {
  @apply transition-all duration-200;
  
  &:hover {
    background: var(--api-report-card-hover);
    border-color: rgba(var(--theme-accent-rgb), 0.12);
    transform: scale(1.02);
  }
}
</style> 