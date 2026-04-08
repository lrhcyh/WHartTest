<template>
  <div class="llm-config-management">
    <div class="page-header">
      <div class="header-copy">
        <h1 class="page-title">{{ pageText.pageTitle }}</h1>
        <p class="page-desc">
          {{ pageText.pageDesc }}
        </p>
      </div>
      <div class="header-actions">
        <a-button @click="showPromptManagement">
          <template #icon><icon-file /></template>
          {{ pageText.promptManagement }}
        </a-button>
        <a-button type="primary" @click="handleAddNewConfig">
          <template #icon><icon-plus /></template>
          {{ pageText.addConfig }}
        </a-button>
      </div>
    </div>

    <LlmConfigTable
      :configs="llmConfigs"
      :loading="isLoading"
      :pagination="pagination"
      @edit="handleEditConfig"
      @delete="handleDeleteConfig"
      @toggle-active="handleToggleActive"
      @toggle-global="handleToggleGlobal"
      @page-change="handlePageChange"
      @page-size-change="handlePageSizeChange"
    />

    <LlmConfigFormModal
      :visible="isModalVisible"
      :config-data="currentConfig"
      :form-loading="isFormLoading"
      @submit="handleSubmitConfig"
      @cancel="handleCloseModal"
    />

    <SystemPromptModal
      :visible="isPromptModalVisible"
      :current-llm-config="currentLlmConfigForPrompt"
      :loading="false"
      @cancel="closePromptModal"
      @prompts-updated="handlePromptsUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { Button as AButton, Message } from '@arco-design/web-vue';
import { IconFile, IconPlus } from '@arco-design/web-vue/es/icon';
import type { PaginationProps } from '@arco-design/web-vue';
import LlmConfigFormModal from '@/features/langgraph/components/LlmConfigFormModal.vue';
import LlmConfigTable from '@/features/langgraph/components/LlmConfigTable.vue';
import SystemPromptModal from '@/features/langgraph/components/SystemPromptModal.vue';
import {
  activateLlmConfigBundle,
  createLlmConfigBundle,
  deleteLlmConfigBundle,
  getCurrentRuntimeLlmConfig,
  getLlmConfigBundleDetails,
  listLlmConfigBundles,
  patchLlmConfigBundle,
  toggleGlobalLlmConfigBundle,
} from '@/features/langgraph/services/llmConfigService';
import type {
  CreateLlmConfigBundleRequest,
  LlmConfigBundle,
} from '@/features/langgraph/types/llmConfig';
import { useAppI18n } from '@/composables/useAppI18n';
import { useLlmConfigRefresh } from '@/composables/useLlmConfigRefresh';
import { useProjectStore } from '@/store/projectStore';

const projectStore = useProjectStore();
const { triggerLlmConfigRefresh } = useLlmConfigRefresh();
const { isEnglish } = useAppI18n();

const pageText = computed(() => (
  isEnglish.value
    ? {
        pageTitle: 'LLM Configuration Management',
        pageDesc: 'Each config includes 5 fixed module tabs. The default slot is "LLM Chat", and unconfigured modules inherit it as a whole slot.',
        promptManagement: 'Prompt Management',
        addConfig: 'New Config',
        fetchConfigsFailed: 'Failed to fetch config list',
        fetchConfigDetailFailed: 'Failed to fetch config details',
        deleteConfigSuccess: 'Config deleted successfully',
        deleteConfigFailed: 'Failed to delete config',
        activateSuccess: 'Config activated',
        deactivateAndDisableGlobal: 'Config deactivated and global sharing disabled',
        deactivateSuccess: 'Config deactivated',
        activateFailed: 'Failed to activate config',
        deactivateFailed: 'Failed to deactivate config',
        globalEnabled: 'Global sharing enabled',
        globalDisabled: 'Global sharing disabled',
        toggleGlobalFailed: 'Failed to update global sharing',
        updateConfigSuccess: 'Config updated successfully',
        createConfigSuccess: 'Config created successfully',
        updateConfigFailed: 'Failed to update config',
        createConfigFailed: 'Failed to create config',
        promptUpdated: 'Prompts updated',
      }
    : {
        pageTitle: 'LLM 配置管理',
        pageDesc: '每条配置固定包含 5 个模块页签。默认槽位是“LLM对话”，其余未配置模块将整槽位继承它。',
        promptManagement: '提示词管理',
        addConfig: '新增配置',
        fetchConfigsFailed: '获取配置列表失败',
        fetchConfigDetailFailed: '获取配置详情失败',
        deleteConfigSuccess: '配置删除成功',
        deleteConfigFailed: '删除配置失败',
        activateSuccess: '配置已激活',
        deactivateAndDisableGlobal: '配置已停用，并关闭全局共享',
        deactivateSuccess: '配置已停用',
        activateFailed: '激活配置失败',
        deactivateFailed: '停用配置失败',
        globalEnabled: '已开启全局共享',
        globalDisabled: '已关闭全局共享',
        toggleGlobalFailed: '更新全局开关失败',
        updateConfigSuccess: '配置更新成功',
        createConfigSuccess: '配置创建成功',
        updateConfigFailed: '更新配置失败',
        createConfigFailed: '创建配置失败',
        promptUpdated: '提示词已更新',
      }
));

const llmConfigs = ref<LlmConfigBundle[]>([]);
const isLoading = ref(false);
const isFormLoading = ref(false);
const isModalVisible = ref(false);
const currentConfig = ref<LlmConfigBundle | null>(null);

const isPromptModalVisible = ref(false);
const currentLlmConfigForPrompt = ref<{ id: number; name: string; system_prompt?: string } | null>(null);

const pagination = reactive<PaginationProps>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: true,
  showPageSize: true,
});

const fetchLlmConfigs = async () => {
  isLoading.value = true;
  try {
    const response = await listLlmConfigBundles();
    if (response.status === 'success' && response.data) {
      llmConfigs.value = response.data;
      pagination.total = response.data.length;
    } else {
      Message.error(response.message || pageText.value.fetchConfigsFailed);
    }
  } catch (error) {
    console.error('Error fetching LLM config bundles:', error);
    Message.error(pageText.value.fetchConfigsFailed);
  } finally {
    isLoading.value = false;
  }
};

const handlePageChange = (page: number) => {
  pagination.current = page;
};

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize;
  pagination.current = 1;
};

const handleAddNewConfig = () => {
  currentConfig.value = null;
  isModalVisible.value = true;
};

const handleEditConfig = async (bundle: LlmConfigBundle) => {
  isLoading.value = true;
  try {
    const response = await getLlmConfigBundleDetails(bundle.id);
    if (response.status === 'success' && response.data) {
      currentConfig.value = response.data;
      isModalVisible.value = true;
    } else {
      Message.error(response.message || pageText.value.fetchConfigDetailFailed);
    }
  } catch (error) {
    Message.error(pageText.value.fetchConfigDetailFailed);
  } finally {
    isLoading.value = false;
  }
};

const handleDeleteConfig = async (bundleId: number) => {
  isLoading.value = true;
  try {
    const response = await deleteLlmConfigBundle(bundleId);
    if (response.status === 'success') {
      Message.success(pageText.value.deleteConfigSuccess);
      await fetchLlmConfigs();
      triggerLlmConfigRefresh();
    } else {
      Message.error(response.message || pageText.value.deleteConfigFailed);
    }
  } catch (error) {
    Message.error(pageText.value.deleteConfigFailed);
  } finally {
    isLoading.value = false;
  }
};

const handleToggleActive = async (bundle: LlmConfigBundle, isActive: boolean) => {
  try {
    const response = isActive
      ? await activateLlmConfigBundle(bundle.id)
      : await patchLlmConfigBundle(bundle.id, {
        is_active: false,
        ...(bundle.is_global ? { is_global: false } : {}),
      });

    if (response.status === 'success') {
      if (isActive) {
        Message.success(pageText.value.activateSuccess);
      } else if (bundle.is_global) {
        Message.success(pageText.value.deactivateAndDisableGlobal);
      } else {
        Message.success(pageText.value.deactivateSuccess);
      }
      await fetchLlmConfigs();
      triggerLlmConfigRefresh();
    } else {
      Message.error(response.message || (isActive ? pageText.value.activateFailed : pageText.value.deactivateFailed));
      await fetchLlmConfigs();
    }
  } catch (error) {
    Message.error(isActive ? pageText.value.activateFailed : pageText.value.deactivateFailed);
    await fetchLlmConfigs();
  }
};

const handleToggleGlobal = async (bundleId: number, isGlobal: boolean) => {
  try {
    const response = await toggleGlobalLlmConfigBundle(bundleId, isGlobal);
    if (response.status === 'success') {
      Message.success(isGlobal ? pageText.value.globalEnabled : pageText.value.globalDisabled);
      await fetchLlmConfigs();
      triggerLlmConfigRefresh();
    } else {
      Message.error(response.message || pageText.value.toggleGlobalFailed);
      await fetchLlmConfigs();
    }
  } catch (error) {
    Message.error(pageText.value.toggleGlobalFailed);
    await fetchLlmConfigs();
  }
};

const handleSubmitConfig = async (data: CreateLlmConfigBundleRequest, id?: number) => {
  isFormLoading.value = true;
  try {
    const response = id
      ? await patchLlmConfigBundle(id, data)
      : await createLlmConfigBundle(data);

    if (response.status === 'success') {
      Message.success(id ? pageText.value.updateConfigSuccess : pageText.value.createConfigSuccess);
      isModalVisible.value = false;
      currentConfig.value = null;
      await fetchLlmConfigs();
      triggerLlmConfigRefresh();
    } else {
      Message.error(response.message || (id ? pageText.value.updateConfigFailed : pageText.value.createConfigFailed));
    }
  } catch (error) {
    console.error('Error saving LLM bundle:', error);
    Message.error(id ? pageText.value.updateConfigFailed : pageText.value.createConfigFailed);
  } finally {
    isFormLoading.value = false;
  }
};

const handleCloseModal = () => {
  isModalVisible.value = false;
  currentConfig.value = null;
};

const showPromptManagement = async () => {
  try {
    const response = await getCurrentRuntimeLlmConfig('llm_chat');
    if (response.status === 'success' && response.data?.bundle_id) {
      currentLlmConfigForPrompt.value = {
        id: response.data.bundle_id,
        name: response.data.bundle_name || response.data.config_name,
        system_prompt: response.data.system_prompt,
      };
    } else {
      currentLlmConfigForPrompt.value = null;
    }
  } catch (error) {
    currentLlmConfigForPrompt.value = null;
  }
  isPromptModalVisible.value = true;
};

const closePromptModal = () => {
  isPromptModalVisible.value = false;
};

const handlePromptsUpdated = () => {
  Message.success(pageText.value.promptUpdated);
};

watch(
  () => projectStore.currentProjectId,
  (newProjectId, oldProjectId) => {
    if (newProjectId !== oldProjectId) {
      pagination.current = 1;
      void fetchLlmConfigs();
    }
  }
);

onMounted(() => {
  void fetchLlmConfigs();
});
</script>

<style scoped>
.llm-config-management {
  padding: 20px;
}

.page-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.header-copy {
  grid-column: 2;
  justify-self: center;
  max-width: 720px;
  text-align: center;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.page-desc {
  margin: 8px 0 0;
  color: var(--color-text-2);
  font-size: 13px;
}

.header-actions {
  display: flex;
  grid-column: 3;
  justify-self: end;
  gap: 12px;
}

@media (max-width: 768px) {
  .page-header {
    grid-template-columns: 1fr;
  }

  .header-copy,
  .header-actions {
    grid-column: auto;
    width: 100%;
    justify-self: stretch;
  }
}
</style>
