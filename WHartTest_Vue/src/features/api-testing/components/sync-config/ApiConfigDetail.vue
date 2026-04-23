<script setup lang="ts">
import { computed } from 'vue'
import type { ApiSyncConfig } from '../../services/syncService'
import { useThemeStore } from '@/store/themeStore'

const props = defineProps<{
  visible: boolean
  config: ApiSyncConfig | null
  fieldOptions: { label: string; value: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isBlack)

const handleClose = () => {
  emit('update:visible', false)
}
</script>

<template>
  <a-modal
    :visible="visible"
    title="同步配置详情"
    :width="780"
    :modal-class="isDarkTheme ? 'api-config-detail-modal api-config-detail-modal--dark' : 'api-config-detail-modal api-config-detail-modal--light'"
    @ok="handleClose"
    @cancel="handleClose"
    @close="handleClose"
  >
    <div class="detail-card p-4 rounded-lg mb-6">
      <div class="grid grid-cols-2 gap-8">
        <div>
          <div class="detail-title text-base font-medium mb-4">基本信息</div>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="detail-label w-[4.5rem]">接口名称：</span>
              <span class="detail-value">{{ config?.interface_info?.name }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="detail-label w-[4.5rem]">用例名称：</span>
              <span class="detail-value">{{ config?.testcase_info?.name }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="detail-label w-[4.5rem]">步骤名称：</span>
              <span class="detail-value">{{ config?.step_info?.name }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="detail-label w-[3.75rem]">创建者：</span>
              <span class="detail-value">{{ config?.created_by_info?.username || '-' }}</span>
            </div>
          </div>
        </div>

        <div>
          <div class="detail-title text-base font-medium mb-4">状态信息</div>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="detail-label w-[4.5rem]">同步模式：</span>
              <a-tag color="arcoblue" size="medium" class="rounded-md">
                {{ config?.sync_mode === 'auto' ? '自动同步' : '手动同步' }}
              </a-tag>
            </div>
            <div class="flex items-center gap-3">
              <span class="detail-label w-[4.5rem]">同步状态：</span>
              <a-tag :color="config?.sync_enabled ? 'green' : 'red'" size="medium" class="rounded-md">
                {{ config?.sync_enabled ? '已启用' : '已禁用' }}
              </a-tag>
            </div>
            <div class="flex items-center gap-3">
              <span class="detail-label w-[4.25rem]">创建时间：</span>
              <span class="detail-value">{{ config?.created_at ? new Date(config.created_at).toLocaleString() : '-' }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="detail-label w-[4.25rem]">更新时间：</span>
              <span class="detail-value">{{ config?.updated_at ? new Date(config.updated_at).toLocaleString() : '-' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-if="config">
      <div class="space-y-6">
        <div class="detail-card p-4 rounded-lg">
          <div class="detail-title text-base font-medium mb-4">同步字段</div>
          <div class="flex flex-wrap gap-2">
            <template v-for="field in config.sync_fields" :key="field">
              <a-tag color="arcoblue" size="medium" class="rounded-md">
                {{ fieldOptions.find(opt => opt.value === field)?.label || field }}
              </a-tag>
            </template>
          </div>
        </div>

        <div v-if="config.sync_mode === 'auto'" class="detail-card p-4 rounded-lg">
          <div class="detail-title text-base font-medium mb-4">监视字段</div>
          <div class="flex flex-wrap gap-2">
            <template v-for="field in config.sync_trigger?.fields_to_watch" :key="field">
              <a-tag color="arcoblue" size="medium" class="rounded-md">
                {{ fieldOptions.find(opt => opt.value === field)?.label || field }}
              </a-tag>
            </template>
          </div>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<style scoped>
@reference "tailwindcss";
:deep(.api-config-detail-modal--light) {
  --api-detail-bg: rgba(255, 255, 255, 0.98);
  --api-detail-border: rgba(148, 163, 184, 0.18);
  --api-detail-card-bg: rgba(248, 250, 252, 0.96);
  --api-detail-text: var(--color-text-1);
  --api-detail-subtle: var(--color-text-3);
}

:deep(.api-config-detail-modal--dark) {
  --api-detail-bg: rgba(31, 41, 55, 1);
  --api-detail-border: rgba(55, 65, 81, 1);
  --api-detail-card-bg: rgba(17, 24, 39, 0.5);
  --api-detail-text: rgb(229, 231, 235);
  --api-detail-subtle: rgb(156, 163, 175);
}

:deep(.api-config-detail-modal .arco-modal) {
  background: var(--api-detail-bg);
  border: 1px solid var(--api-detail-border);
}

:deep(.api-config-detail-modal .arco-modal-header) {
  background: var(--api-detail-bg);
  border-color: var(--api-detail-border);
  padding-bottom: 1rem;
}

:deep(.api-config-detail-modal .arco-modal-title) {
  color: var(--api-detail-text);
  font-size: 1.125rem;
  font-weight: 500;
}

:deep(.api-config-detail-modal .arco-modal-footer) {
  background: var(--api-detail-bg);
  border-color: var(--api-detail-border);
  margin-top: 1.5rem;
}

:deep(.api-config-detail-modal .arco-modal-body) {
  padding: 1.5rem;
}

.detail-card {
  background: var(--api-detail-card-bg);
}

.detail-title,
.detail-value {
  color: var(--api-detail-text);
}

.detail-label {
  color: var(--api-detail-subtle);
}
</style> 