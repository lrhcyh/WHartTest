<script setup lang="ts">
import { ref, computed } from 'vue'
import { Message } from '@arco-design/web-vue'
import type { Function } from '../../services/functionService'
import { testFunction } from '../../services/functionService'
import MonacoEditor from '@guolao/vue-monaco-editor'
import { useThemeStore } from '@/store/themeStore'

const props = defineProps<{
  mode: 'create' | 'edit'
  loading?: boolean
  initialValues?: Function
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit', values: Partial<Function>): void
}>()

const themeStore = useThemeStore()

const form = ref({
  name: props.initialValues?.name || '',
  code: props.initialValues?.code || '',
  description: props.initialValues?.description || ''
})

const testArgs = ref('{}')
const testLoading = ref(false)
const testResult = ref('')
const editorTheme = computed(() => (themeStore.isBlack ? 'vs-dark' : 'vs'))

const codeEditorOptions = {
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  fontSize: 14,
  tabSize: 4,
  renderLineHighlight: 'all',
  roundedSelection: false,
  occurrencesHighlight: 'off',
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'on',
  smoothScrolling: true,
  mouseWheelZoom: true,
  padding: { top: 10, bottom: 10 }
}

const handleSubmit = () => {
  if (!form.value.name.trim()) {
    Message.warning('请输入函数名称')
    return
  }
  if (!form.value.code.trim()) {
    Message.warning('请输入函数代码')
    return
  }
  emit('submit', form.value)
}

const handleTest = async () => {
  if (!form.value.code.trim()) {
    Message.warning('请先输入函数代码')
    return
  }

  let parsedArgs
  try {
    parsedArgs = JSON.parse(testArgs.value)
  } catch (error) {
    Message.error('测试参数格式不正确，请输入有效的JSON')
    return
  }

  try {
    testLoading.value = true
    const response = await testFunction({
      code: form.value.code,
      test_args: parsedArgs
    })
    
    testResult.value = response.data?.result || '测试结果为空'
    Message.success('测试运行成功')
  } catch (error: any) {
    console.error('测试运行失败:', error)
    testResult.value = error.response?.data?.message || '测试运行失败'
    Message.error(error.response?.data?.message || '测试运行失败')
  } finally {
    testLoading.value = false
  }
}
</script>

<template>
  <div class="function-form-shell h-full flex flex-col rounded-lg overflow-hidden">
    <!-- 头部区域 -->
    <div class="form-header px-6 py-4 border-b">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold form-title">
          {{ mode === 'create' ? '新建函数' : '编辑函数' }}
        </h2>
        <div class="flex gap-2">
          <a-button @click="emit('cancel')" class="secondary-button">
            取消
          </a-button>
          <a-button
            type="primary"
            :loading="loading"
            @click="handleSubmit"
            class="!bg-blue-500 !border-blue-500 hover:!bg-blue-600 hover:!border-blue-600"
          >
            {{ mode === 'create' ? '创建' : '保存' }}
          </a-button>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="flex-1 min-h-0 overflow-y-auto">
      <div class="p-6">
        <a-form :model="form" layout="vertical">
          <!-- 基本信息 -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <a-form-item field="name" label="函数名称" class="!mb-0">
              <a-input
                v-model="form.name"
                placeholder="请输入函数名称"
                class="field-control"
              />
            </a-form-item>
            <a-form-item field="description" label="函数描述" class="!mb-0">
              <a-input
                v-model="form.description"
                placeholder="请输入函数描述"
                class="field-control"
              />
            </a-form-item>
          </div>

          <!-- 代码编辑器 -->
          <div class="mb-6">
            <div class="section-title mb-2 text-sm">函数代码</div>
            <div class="editor-shell">
              <MonacoEditor
                v-model:value="form.code"
                language="python"
                :theme="editorTheme"
                :options="codeEditorOptions"
                style="height: 400px; width: 100%;"
              />
            </div>
          </div>

          <!-- 测试区域 -->
          <div class="test-shell rounded-lg p-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-base font-medium section-title">函数测试</h3>
              <a-button
                type="primary"
                size="small"
                :loading="testLoading"
                @click="handleTest"
                class="!bg-purple-500 !border-purple-500 hover:!bg-purple-600 hover:!border-purple-600"
              >
                运行测试
              </a-button>
            </div>
            
            <div class="mb-4">
              <div class="text-sm helper-text mb-2">测试参数 (JSON格式)</div>
              <a-textarea
                v-model="testArgs"
                placeholder='{"arg1": "value1"}'
                :auto-size="{ minRows: 3, maxRows: 6 }"
                class="field-control !font-mono !text-sm"
              />
            </div>

            <div v-if="testResult">
              <div class="text-sm helper-text mb-2">测试结果</div>
              <a-textarea
                v-model="testResult"
                :style="{ height: '150px' }"
                readonly
                class="field-control"
              />
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@reference "tailwindcss";
:root {
  color-scheme: light dark;
}

.function-form-shell {
  background: var(--func-shell-bg);
  border: 1px solid var(--func-shell-border);
  box-shadow: var(--func-shell-shadow);
}

.form-header {
  border-bottom-color: var(--func-shell-border);
}

.form-title,
.section-title {
  color: var(--func-text);
}

.helper-text {
  color: var(--func-text-subtle);
}

.secondary-button {
  background: color-mix(in srgb, var(--func-card-bg) 88%, var(--theme-page-bg) 12%) !important;
  border-color: var(--func-shell-border) !important;
  color: var(--func-text-muted) !important;
}

.editor-shell {
  border: 1px solid var(--func-editor-border);
  border-radius: 0.5rem;
  overflow: hidden;
  background: var(--func-editor-bg);
}

.test-shell {
  background: color-mix(in srgb, var(--func-card-bg) 86%, var(--theme-page-bg) 14%);
  border: 1px solid var(--func-card-border);
}

:deep(.arco-form-item-label) {
  > label {
    color: var(--func-text);
  }
}

:deep(.arco-form-item-content) {
  @apply h-full;
}

:deep(.field-control .arco-input-wrapper),
:deep(.field-control .arco-textarea-wrapper) {
  background: var(--func-input-bg) !important;
  border-color: var(--func-input-border) !important;

  &:hover,
  &:focus-within {
    border-color: rgba(var(--theme-accent-rgb), 0.42) !important;
    background: var(--func-input-hover-bg) !important;
  }
}

:deep(.field-control .arco-textarea),
:deep(.field-control .arco-input) {
  color: var(--func-text) !important;
  
  &::placeholder {
    color: var(--func-text-subtle) !important;
  }
}

:deep(.arco-btn) {
  @apply rounded-lg;
}

/* 滚动条样式 */
.overflow-y-auto {
  &::-webkit-scrollbar {
    @apply w-2;
  }
  
  &::-webkit-scrollbar-track {
    @apply bg-transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--func-editor-scrollbar);
    border-radius: 9999px;
    
    &:hover {
      filter: brightness(1.08);
    }
  }
}
</style> 