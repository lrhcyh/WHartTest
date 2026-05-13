<template>
  <div class="basic-info-shell rounded-lg border">
    <div class="basic-info-header px-4 py-3 border-b">
      <h3 class="basic-title text-base font-medium">基本信息</h3>
    </div>
    <div class="basic-info-grid p-4">
      <div class="info-item">
        <div class="info-item__icon">
          <icon-code class="text-lg text-gray-400" />
        </div>
        <div class="info-item__content">
          <div class="info-item__label">报告ID</div>
          <div class="info-item__value">{{ report?.id || '--' }}</div>
        </div>
      </div>

      <div class="info-item">
        <div class="info-item__icon">
          <icon-code class="text-lg text-gray-400" />
        </div>
        <div class="info-item__content">
          <div class="info-item__label">测试用例</div>
          <div class="info-item__value">{{ report?.testcase_name || '--' }}</div>
          <div class="info-item__chips">
            <span class="info-chip">用例ID: {{ report?.testcase || '--' }}</span>
          </div>
        </div>
      </div>

      <div class="info-item">
        <div class="info-item__icon">
          <icon-calendar class="text-lg text-gray-400" />
        </div>
        <div class="info-item__content">
          <div class="info-item__label">开始时间</div>
          <div class="info-item__value">{{ formatDateTime(report?.start_time) }}</div>
        </div>
      </div>

      <div class="info-item info-item--wide">
        <div class="info-item__icon">
          <icon-desktop class="text-lg text-gray-400" />
        </div>
        <div class="info-item__content">
          <div class="info-item__label">执行环境</div>
          <div class="info-item__value">{{ report?.environment_info?.name || '未绑定环境' }}</div>
          <div class="info-item__chips">
            <span class="info-chip">环境ID: {{ report?.environment || '--' }}</span>
            <span v-if="report?.environment_info?.project?.name" class="info-chip">
              项目: {{ report?.environment_info?.project?.name }}
              <template v-if="report?.environment_info?.project?.id">(ID: {{ report?.environment_info?.project?.id }})</template>
            </span>
          </div>
          <div v-if="report?.environment_info?.base_url" class="info-inline-row">
            <span class="info-inline-key">Base URL</span>
            <span class="info-inline-value">{{ report?.environment_info?.base_url }}</span>
          </div>
          <div v-if="report?.environment_info?.description" class="info-item__summary">
            描述: {{ report?.environment_info?.description }}
          </div>
        </div>
      </div>

      <div class="info-item">
        <div class="info-item__icon">
          <icon-user class="text-lg text-gray-400" />
        </div>
        <div class="info-item__content">
          <div class="info-item__label">执行人</div>
          <div class="info-item__value">{{ report?.executed_by_info?.username || '--' }}</div>
          <div class="info-item__chips">
            <span class="info-chip">用户ID: {{ report?.executed_by || '--' }}</span>
            <span class="info-chip">邮箱: {{ report?.executed_by_info?.email || '未设置' }}</span>
          </div>
          <div
            v-if="report?.executed_by_info?.first_name || report?.executed_by_info?.last_name"
            class="info-item__summary"
          >
            姓名: {{ [report?.executed_by_info?.first_name, report?.executed_by_info?.last_name].filter(Boolean).join(' ') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCalendar, IconDesktop, IconUser, IconCode } from '@arco-design/web-vue/es/icon'
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

.basic-info-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .basic-info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .basic-info-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .info-item--wide {
    grid-column: span 2 / span 2;
  }
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
  display: flex;
  min-height: 112px;
  gap: 12px;
  padding: 14px;
  border-radius: 14px;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  background: var(--api-report-inline-bg);
  border: 1px solid var(--api-report-inline-border);
}

.info-item:hover {
  background: var(--api-report-card-hover);
  border-color: rgba(var(--theme-accent-rgb), 0.12);
  transform: translateY(-1px);
}

.info-item__icon {
  display: flex;
  height: 40px;
  width: 40px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: color-mix(in srgb, var(--api-report-card-bg) 76%, transparent 24%);
  border: 1px solid var(--api-report-inline-border);
}

.info-item__content {
  min-width: 0;
  flex: 1;
}

.info-item__label {
  font-size: 12px;
  color: var(--api-report-text-subtle);
}

.info-item__value {
  margin-top: 4px;
  font-size: 16px;
  font-weight: 600;
  color: var(--api-report-text);
  line-height: 1.4;
  word-break: break-word;
}

.info-item__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.info-chip {
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 12px;
  color: var(--api-report-text-subtle);
  background: color-mix(in srgb, var(--api-report-card-bg) 80%, transparent 20%);
  border: 1px solid var(--api-report-inline-border);
}

.info-inline-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
}

.info-inline-key,
.info-item__summary {
  font-size: 12px;
  color: var(--api-report-text-subtle);
}

.info-inline-value {
  font-size: 12px;
  font-family: var(--font-family-code, 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace);
  color: rgb(96, 165, 250);
  word-break: break-all;
}

.info-item__summary {
  margin-top: 8px;
  line-height: 1.5;
}

@media (max-width: 767px) {
  .info-item {
    min-height: auto;
  }
}
</style> 