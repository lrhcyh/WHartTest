<template>
  <a-table
    :columns="columns"
    :data="configs"
    :loading="loading"
    row-key="id"
    :pagination="pagination"
    table-layout-fixed
    :header-cell-style="{ textAlign: 'center' }"
    @page-change="(page: number) => emit('page-change', page)"
    @page-size-change="(pageSize: number) => emit('page-size-change', pageSize)"
  >
    <template #visibility="{ record }">
      <div class="visibility-cell">
        <a-tag :color="record.is_owner ? 'arcoblue' : 'gray'">
          {{ record.is_owner ? text.myConfig : text.sharedBy(record.owner_username) }}
        </a-tag>
      </div>
    </template>

    <template #status="{ record }">
      <div class="status-cell">
        <a-tag :color="record.is_active ? 'green' : 'gray'">
          {{ record.is_active ? text.active : text.inactive }}
        </a-tag>
        <a-switch
          v-if="record.is_owner"
          :model-value="record.is_active"
          size="small"
          :disabled="loading"
          @change="(value) => emit('toggle-active', record, !!value)"
        >
          <template #checked>{{ text.on }}</template>
          <template #unchecked>{{ text.off }}</template>
        </a-switch>
        <span class="status-source">
          {{ record.is_owner ? text.ownerStatusSource : text.readonlyStatusSource }}
        </span>
      </div>
    </template>

    <template #globalShare="{ record }">
      <div class="global-share-cell">
        <a-switch
          v-if="record.is_owner"
          :model-value="record.is_global"
          size="small"
          @change="(value) => emit('toggle-global', record.id, !!value)"
        >
          <template #checked>{{ text.public }}</template>
          <template #unchecked>{{ text.private }}</template>
        </a-switch>
        <a-tag v-else :color="record.is_global ? 'green' : 'gray'">
          {{ record.is_global ? text.enabled : text.disabled }}
        </a-tag>
      </div>
    </template>

    <template #slots="{ record }">
      <div class="slot-summary-list">
        <div
          v-for="slot in orderedSlots(record)"
          :key="slot.slot_key"
          class="slot-summary-item"
        >
          <span class="slot-summary-label">{{ getSlotLabel(slot.slot_key) }}</span>
          <span class="slot-summary-value">
            {{ getSlotSummary(record, slot) }}
          </span>
        </div>
      </div>
    </template>

    <template #updatedAt="{ record }">
      {{ formatDateTime(record.updated_at) }}
    </template>

    <template #actions="{ record }">
      <a-space class="actions-cell" wrap>
        <a-button type="primary" size="small" @click="emit('edit', record)">
          <template #icon><icon-edit /></template>
          {{ record.can_edit ? text.edit : text.view }}
        </a-button>
        <a-popconfirm
          v-if="record.is_owner"
          :content="text.deleteConfirm"
          type="warning"
          @ok="emit('delete', record.id)"
        >
          <a-button type="primary" status="danger" size="small">
            <template #icon><icon-delete /></template>
            {{ text.delete }}
          </a-button>
        </a-popconfirm>
      </a-space>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Table as ATable,
  Button as AButton,
  Tag as ATag,
  Switch as ASwitch,
  Popconfirm as APopconfirm,
  type TableColumnData,
  type PaginationProps,
} from '@arco-design/web-vue';
import { IconDelete, IconEdit } from '@arco-design/web-vue/es/icon';
import type { LlmBundleSlot, LlmConfigBundle, LlmModuleKey } from '@/features/langgraph/types/llmConfig';
import { LLM_MODULE_TABS } from '@/features/langgraph/types/llmConfig';
import { useAppI18n } from '@/composables/useAppI18n';
import { formatDateTime } from '@/utils/formatters';

interface Props {
  configs: LlmConfigBundle[];
  loading: boolean;
  pagination?: PaginationProps;
}

withDefaults(defineProps<Props>(), {
  configs: () => [],
  loading: false,
  pagination: () => ({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: true,
    showPageSize: true,
  }),
});
const { isEnglish } = useAppI18n();
const text = computed(() => (
  isEnglish.value
    ? {
        myConfig: 'My config',
        sharedBy: (owner: string) => `Shared by ${owner}`,
        active: 'Active',
        inactive: 'Inactive',
        on: 'On',
        off: 'Off',
        ownerStatusSource: 'Available to current user',
        readonlyStatusSource: 'Read-only for current user',
        public: 'Public',
        private: 'Private',
        enabled: 'Enabled',
        disabled: 'Disabled',
        edit: 'Edit',
        view: 'View',
        delete: 'Delete',
        deleteConfirm: 'Delete this config? This action cannot be undone.',
        unconfigured: 'Not configured',
        configName: 'Config name',
        visibility: 'Visibility',
        status: 'Status',
        globalShare: 'Global share',
        slotsSummary: '5-module summary',
        updatedAt: 'Updated at',
        actions: 'Actions',
      }
    : {
        myConfig: '我的配置',
        sharedBy: (owner: string) => `共享自 ${owner}`,
        active: '已激活',
        inactive: '未激活',
        on: '开启',
        off: '关闭',
        ownerStatusSource: '当前用户可直接使用',
        readonlyStatusSource: '当前用户只读可见',
        public: '公开',
        private: '私有',
        enabled: '已开启',
        disabled: '未开启',
        edit: '编辑',
        view: '查看',
        delete: '删除',
        deleteConfirm: '确定要删除这个配置吗？此操作不可撤销。',
        unconfigured: '未配置',
        configName: '配置名称',
        visibility: '归属',
        status: '状态',
        globalShare: '全局共享',
        slotsSummary: '5个模块摘要',
        updatedAt: '更新时间',
        actions: '操作',
      }
));
const slotLabels = computed<Record<LlmModuleKey, string>>(() => (
  isEnglish.value
    ? {
        llm_chat: 'LLM Chat',
        requirement_review: 'Requirement Review',
        testcase_generation: 'Case Generation',
        testcase_execution: 'Case Execution',
      }
    : {
        llm_chat: 'LLM对话',
        requirement_review: '需求评审',
        testcase_generation: '用例生成',
        testcase_execution: '用例执行',
      }
));

const emit = defineEmits<{
  (e: 'edit', config: LlmConfigBundle): void;
  (e: 'delete', configId: number): void;
  (e: 'toggle-active', config: LlmConfigBundle, isActive: boolean): void;
  (e: 'toggle-global', configId: number, isGlobal: boolean): void;
  (e: 'page-change', page: number): void;
  (e: 'page-size-change', pageSize: number): void;
}>();

const moduleOrder = LLM_MODULE_TABS.map((item) => item.key);

const getSlotLabel = (slotKey: LlmModuleKey) => {
  return slotLabels.value[slotKey] || slotKey;
};

const orderedSlots = (bundle: LlmConfigBundle): LlmBundleSlot[] => {
  const slotMap = new Map(bundle.slots.map((slot) => [slot.slot_key, slot]));
  return moduleOrder
    .map((slotKey) => slotMap.get(slotKey))
    .filter((slot): slot is LlmBundleSlot => Boolean(slot));
};

const getDefaultSlot = (bundle: LlmConfigBundle) => {
  return bundle.slots.find((slot) => slot.slot_key === 'llm_chat');
};

const getSlotSummary = (bundle: LlmConfigBundle, slot: LlmBundleSlot) => {
  if (slot.slot_key !== 'llm_chat' && !slot.is_configured) {
    return getDefaultSlot(bundle)?.name || text.value.unconfigured;
  }
  return slot.name || text.value.unconfigured;
};

const columns = computed<TableColumnData[]>(() => [
  { title: text.value.configName, dataIndex: 'config_name', ellipsis: true, tooltip: true, align: 'center' as const },
  { title: text.value.visibility, dataIndex: 'visibility', slotName: 'visibility', align: 'center' as const },
  { title: text.value.status, dataIndex: 'status', slotName: 'status', align: 'center' as const },
  { title: text.value.globalShare, dataIndex: 'globalShare', slotName: 'globalShare', align: 'center' as const },
  { title: text.value.slotsSummary, dataIndex: 'slots', slotName: 'slots', align: 'center' as const },
  { title: text.value.updatedAt, dataIndex: 'updated_at', slotName: 'updatedAt', align: 'center' as const },
  { title: text.value.actions, slotName: 'actions', align: 'center' as const },
]);
</script>

<style scoped>
.actions-cell {
  justify-content: center;
}

.visibility-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.global-share-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.status-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  text-align: center;
}

.slot-summary-list {
  display: grid;
  gap: 6px;
}

.slot-summary-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.slot-summary-label {
  min-width: 92px;
  color: var(--color-text-2);
  font-size: 12px;
}

.slot-summary-value {
  color: var(--color-text-1);
  font-size: 12px;
  line-height: 1.4;
}

.status-source {
  display: block;
  color: var(--color-text-3);
  font-size: 12px;
  text-align: center;
}
</style>
