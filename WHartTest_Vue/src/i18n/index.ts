import arcoEnUS from '@arco-design/web-vue/es/locale/lang/en-us';
import arcoZhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';

export const APP_LOCALES = ['zh-CN', 'en-US'] as const;
export type AppLocale = (typeof APP_LOCALES)[number];
export type MessageParams = Record<string, string | number>;

export const DEFAULT_APP_LOCALE: AppLocale = 'zh-CN';
export const LOCALE_STORAGE_KEY = 'wharttest-app-locale';

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export const isAppLocale = (value: unknown): value is AppLocale => (
  typeof value === 'string' && APP_LOCALES.includes(value as AppLocale)
);

export const getSavedLocale = (): AppLocale => {
  if (!isBrowser()) {
    return DEFAULT_APP_LOCALE;
  }

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isAppLocale(savedLocale) ? savedLocale : DEFAULT_APP_LOCALE;
};

export const applyDocumentLanguage = (locale: AppLocale) => {
  if (!isBrowser()) {
    return;
  }

  document.documentElement.lang = locale;
};

type AppMessageKey =
  | 'locale.switcherLabel'
  | 'locale.switchToChinese'
  | 'locale.switchToEnglish'
  | 'layout.themeToDefault'
  | 'layout.themeToBlack'
  | 'layout.logout'
  | 'layout.admin'
  | 'login.openDialog'
  | 'login.closeDialog'
  | 'login.showPassword'
  | 'login.hidePassword'
  | 'register.title'
  | 'register.subtitle'
  | 'register.submit'
  | 'register.submitting'
  | 'register.passwordMismatch'
  | 'register.invalidEmail'
  | 'register.fillRequired'
  | 'register.success'
  | 'register.unexpectedError'
  | 'register.existingAccount'
  | 'register.loginNow'
  | 'register.usernamePlaceholder'
  | 'register.emailPlaceholder'
  | 'register.passwordPlaceholder'
  | 'register.confirmPasswordPlaceholder'
  | 'common.confirm'
  | 'common.cancel'
  | 'common.close'
  | 'common.copy'
  | 'common.retry'
  | 'common.delete'
  | 'common.expand'
  | 'common.collapse'
  | 'common.previewHtml'
  | 'common.previewDiagram'
  | 'common.openInNewTab'
  | 'common.download'
  | 'common.open'
  | 'common.upload'
  | 'common.send'
  | 'common.stop'
  | 'common.image'
  | 'common.default'
  | 'common.enabled'
  | 'common.disabled'
  | 'common.loading'
  | 'common.noDescription'
  | 'chat.screenshot'
  | 'chat.floatingPreview'
  | 'chat.thinking'
  | 'chat.empty'
  | 'chat.releaseToUpload'
  | 'chat.imageSelected'
  | 'chat.clearImages'
  | 'chat.inputPlaceholder'
  | 'chat.inputPlaceholderVision'
  | 'chat.imageOnly'
  | 'chat.pastedImage'
  | 'chat.pastedImages'
  | 'chat.previewDiagramUnavailable'
  | 'chat.previewHtmlUnavailable'
  | 'chat.copySuccess'
  | 'chat.copyFailed'
  | 'chat.diagramPreview'
  | 'chat.htmlPreview'
  | 'chat.selectProjectFirst'
  | 'chat.startConversation'
  | 'chat.toolScreenshot'
  | 'chat.previewing'
  | 'layout.projectPlaceholder';

type MessageCatalog = Record<AppMessageKey, Record<AppLocale, string>>;

const APP_MESSAGES: MessageCatalog = {
  'locale.switcherLabel': {
    'zh-CN': '语言切换',
    'en-US': 'Language switcher',
  },
  'locale.switchToChinese': {
    'zh-CN': '切换到中文',
    'en-US': 'Switch to Chinese',
  },
  'locale.switchToEnglish': {
    'zh-CN': '切换到英语',
    'en-US': 'Switch to English',
  },
  'layout.themeToDefault': {
    'zh-CN': '切换到默认主题',
    'en-US': 'Switch to default theme',
  },
  'layout.themeToBlack': {
    'zh-CN': '切换到黑色主题',
    'en-US': 'Switch to black theme',
  },
  'layout.logout': {
    'zh-CN': '登出',
    'en-US': 'Log out',
  },
  'layout.admin': {
    'zh-CN': '管理员',
    'en-US': 'Administrator',
  },
  'layout.projectPlaceholder': {
    'zh-CN': '请选择项目',
    'en-US': 'Select a project',
  },
  'login.openDialog': {
    'zh-CN': '打开登录弹窗',
    'en-US': 'Open login dialog',
  },
  'login.closeDialog': {
    'zh-CN': '关闭登录弹窗',
    'en-US': 'Close login dialog',
  },
  'login.showPassword': {
    'zh-CN': '显示密码',
    'en-US': 'Show password',
  },
  'login.hidePassword': {
    'zh-CN': '隐藏密码',
    'en-US': 'Hide password',
  },
  'register.title': {
    'zh-CN': '注册新账户',
    'en-US': 'Create an account',
  },
  'register.subtitle': {
    'zh-CN': '欢迎加入WHartTest',
    'en-US': 'Welcome to WHartTest',
  },
  'register.submit': {
    'zh-CN': '注册',
    'en-US': 'Register',
  },
  'register.submitting': {
    'zh-CN': '注册中...',
    'en-US': 'Registering...',
  },
  'register.passwordMismatch': {
    'zh-CN': '两次输入的密码不一致',
    'en-US': 'The passwords do not match',
  },
  'register.invalidEmail': {
    'zh-CN': '请输入有效的邮箱地址',
    'en-US': 'Enter a valid email address',
  },
  'register.fillRequired': {
    'zh-CN': '请填写所有必填字段',
    'en-US': 'Fill in all required fields',
  },
  'register.success': {
    'zh-CN': '注册成功！请登录。',
    'en-US': 'Registration succeeded. Please sign in.',
  },
  'register.unexpectedError': {
    'zh-CN': '注册过程中发生意外错误。',
    'en-US': 'An unexpected error occurred during registration.',
  },
  'register.existingAccount': {
    'zh-CN': '已经有账户了?',
    'en-US': 'Already have an account?',
  },
  'register.loginNow': {
    'zh-CN': '点此登录',
    'en-US': 'Sign in now',
  },
  'register.usernamePlaceholder': {
    'zh-CN': '请输入用户名',
    'en-US': 'Enter username',
  },
  'register.emailPlaceholder': {
    'zh-CN': '请输入邮箱地址',
    'en-US': 'Enter email address',
  },
  'register.passwordPlaceholder': {
    'zh-CN': '请输入密码',
    'en-US': 'Enter password',
  },
  'register.confirmPasswordPlaceholder': {
    'zh-CN': '请再次输入密码',
    'en-US': 'Confirm password',
  },
  'common.confirm': {
    'zh-CN': '确认',
    'en-US': 'Confirm',
  },
  'common.cancel': {
    'zh-CN': '取消',
    'en-US': 'Cancel',
  },
  'common.close': {
    'zh-CN': '关闭',
    'en-US': 'Close',
  },
  'common.copy': {
    'zh-CN': '复制',
    'en-US': 'Copy',
  },
  'common.retry': {
    'zh-CN': '重试',
    'en-US': 'Retry',
  },
  'common.delete': {
    'zh-CN': '删除',
    'en-US': 'Delete',
  },
  'common.expand': {
    'zh-CN': '展开',
    'en-US': 'Expand',
  },
  'common.collapse': {
    'zh-CN': '收起',
    'en-US': 'Collapse',
  },
  'common.previewHtml': {
    'zh-CN': '预览 HTML',
    'en-US': 'Preview HTML',
  },
  'common.previewDiagram': {
    'zh-CN': '预览图表',
    'en-US': 'Preview diagram',
  },
  'common.openInNewTab': {
    'zh-CN': '新标签打开',
    'en-US': 'Open in new tab',
  },
  'common.download': {
    'zh-CN': '下载',
    'en-US': 'Download',
  },
  'common.open': {
    'zh-CN': '打开',
    'en-US': 'Open',
  },
  'common.upload': {
    'zh-CN': '上传',
    'en-US': 'Upload',
  },
  'common.send': {
    'zh-CN': '发送',
    'en-US': 'Send',
  },
  'common.stop': {
    'zh-CN': '停止',
    'en-US': 'Stop',
  },
  'common.image': {
    'zh-CN': '图片',
    'en-US': 'Image',
  },
  'common.default': {
    'zh-CN': '默认',
    'en-US': 'Default',
  },
  'common.enabled': {
    'zh-CN': '启用',
    'en-US': 'Enabled',
  },
  'common.disabled': {
    'zh-CN': '禁用',
    'en-US': 'Disabled',
  },
  'common.loading': {
    'zh-CN': '加载中...',
    'en-US': 'Loading...',
  },
  'common.noDescription': {
    'zh-CN': '暂无描述',
    'en-US': 'No description',
  },
  'chat.screenshot': {
    'zh-CN': '工具截图',
    'en-US': 'Tool screenshot',
  },
  'chat.floatingPreview': {
    'zh-CN': '悬浮预览中',
    'en-US': 'Floating preview',
  },
  'chat.thinking': {
    'zh-CN': '思考过程',
    'en-US': 'Thinking',
  },
  'chat.empty': {
    'zh-CN': '开始与 WHartTest 的对话吧',
    'en-US': 'Start a conversation with WHartTest',
  },
  'chat.releaseToUpload': {
    'zh-CN': '释放以上传图片',
    'en-US': 'Release to upload images',
  },
  'chat.imageSelected': {
    'zh-CN': '已选择 {count} 张图片',
    'en-US': '{count} image(s) selected',
  },
  'chat.clearImages': {
    'zh-CN': '清空',
    'en-US': 'Clear',
  },
  'chat.inputPlaceholder': {
    'zh-CN': '请输入你的消息... (Shift+Enter换行，Enter发送)',
    'en-US': 'Enter your message... (Shift+Enter for a new line, Enter to send)',
  },
  'chat.inputPlaceholderVision': {
    'zh-CN': '输入消息、拖拽、粘贴或选择图片... (Shift+Enter换行，Enter发送)',
    'en-US': 'Enter text, drag, paste, or choose images... (Shift+Enter for a new line, Enter to send)',
  },
  'chat.imageOnly': {
    'zh-CN': '请查看图片',
    'en-US': 'Please check the image',
  },
  'chat.pastedImage': {
    'zh-CN': '图片已粘贴',
    'en-US': 'Image pasted',
  },
  'chat.pastedImages': {
    'zh-CN': '已粘贴 {count} 张图片',
    'en-US': '{count} images pasted',
  },
  'chat.previewDiagramUnavailable': {
    'zh-CN': '未检测到可预览的图表XML',
    'en-US': 'No diagram XML available for preview',
  },
  'chat.previewHtmlUnavailable': {
    'zh-CN': '未检测到可预览的HTML内容',
    'en-US': 'No HTML content available for preview',
  },
  'chat.copySuccess': {
    'zh-CN': '复制成功',
    'en-US': 'Copied successfully',
  },
  'chat.copyFailed': {
    'zh-CN': '复制失败，请手动复制',
    'en-US': 'Copy failed. Please copy manually.',
  },
  'chat.diagramPreview': {
    'zh-CN': '图表预览',
    'en-US': 'Diagram preview',
  },
  'chat.htmlPreview': {
    'zh-CN': 'HTML 预览',
    'en-US': 'HTML preview',
  },
  'chat.selectProjectFirst': {
    'zh-CN': '请先选择一个项目',
    'en-US': 'Select a project first',
  },
  'chat.startConversation': {
    'zh-CN': '开始与 WHartTest 的对话吧',
    'en-US': 'Start a conversation with WHartTest',
  },
  'chat.toolScreenshot': {
    'zh-CN': '📷 工具截图',
    'en-US': '📷 Tool screenshot',
  },
  'chat.previewing': {
    'zh-CN': '预览中',
    'en-US': 'Previewing',
  },
};

const interpolate = (template: string, params?: MessageParams) => {
  if (!params) {
    return template;
  }

  return Object.entries(params).reduce((result, [key, value]) => (
    result.split(`{${key}}`).join(String(value))
  ), template);
};

export const translate = (locale: AppLocale, key: AppMessageKey, params?: MessageParams) => {
  const message = APP_MESSAGES[key]?.[locale] ?? APP_MESSAGES[key]?.[DEFAULT_APP_LOCALE] ?? key;
  return interpolate(message, params);
};

export const getArcoLocale = (locale: AppLocale) => (
  locale === 'en-US' ? arcoEnUS : arcoZhCN
);

export const toServerLanguage = (locale: AppLocale) => (
  locale === 'en-US' ? 'en' : 'zh-Hans'
);

const preserveWhitespace = (original: string, translated: string) => {
  const leading = original.match(/^\s*/)?.[0] ?? '';
  const trailing = original.match(/\s*$/)?.[0] ?? '';
  return `${leading}${translated}${trailing}`;
};

const LEGACY_EXACT_EN_MAP: Record<string, string> = {
  '中': 'ZH',
  '首页': 'Home',
  '项目管理': 'Projects',
  '需求管理': 'Requirements',
  'UI自动化': 'UI Automation',
  '任务中心': 'Task Center',
  '测试管理': 'Test Management',
  '用例管理': 'Case Management',
  '测试套件': 'Test Suites',
  '执行历史': 'Execution History',
  'LLM对话': 'LLM Chat',
  '知识库管理': 'Knowledge Base',
  '系统管理': 'System',
  '用户管理': 'Users',
  '组织管理': 'Organizations',
  '权限管理': 'Permissions',
  'LLM配置': 'LLM Configs',
  'KEY管理': 'Key Management',
  'MCP配置': 'MCP Configs',
  'Skills管理': 'Skills',
  '收起': 'Collapse',
  '请选择项目': 'Select a project',
  '当前版本:': 'Version:',
  '点击查看完整更新日志': 'View full release notes',
  '新版本可用': 'Update available',
  '管理员': 'Administrator',
  '登出': 'Log out',
  '账号登录': 'Account Login',
  '点击展开登录框': 'Click to open the sign-in dialog',
  '欢迎回来': 'Welcome back',
  '请登录您的账户': 'Sign in to your account',
  '请输入用户名': 'Enter username',
  '请输入密码': 'Enter password',
  '请输入用户名和密码': 'Enter username and password',
  '记住我': 'Remember me',
  '登录': 'Sign in',
  '登录中...': 'Signing in...',
  '登录成功！': 'Signed in successfully!',
  '还没有账号?': 'No account yet?',
  '立即注册': 'Register now',
  '注册新账户': 'Create an account',
  '欢迎加入WHartTest': 'Welcome to WHartTest',
  '请输入邮箱地址': 'Enter email address',
  '请再次输入密码': 'Confirm password',
  '注册': 'Register',
  '注册中...': 'Registering...',
  '已经有账户了?': 'Already have an account?',
  '点此登录': 'Sign in now',
  '语言切换': 'Language switcher',
  '切换到默认主题': 'Switch to default theme',
  '切换到黑色主题': 'Switch to black theme',
  '知识库': 'Knowledge Base',
  '提示词：': 'Prompt:',
  '选择提示词': 'Select prompt',
  '默认': 'Default',
  '管理提示词': 'Manage prompts',
  '工具审批': 'Tool approval',
  '微信接入': 'WeChat access',
  '清除对话': 'Clear chat',
  '开始与 WHartTest 的对话吧': 'Start a conversation with WHartTest',
  '图表预览': 'Diagram preview',
  'HTML 预览': 'HTML preview',
  '工具执行审批': 'Tool execution approval',
  '以下操作需要您的确认后才能执行': 'The following action requires your approval before execution.',
  '执行参数': 'Execution parameters',
  '记住此选择': 'Remember this choice',
  '开启': 'On',
  '关闭': 'Off',
  '公开': 'Public',
  '私有': 'Private',
  '图片': 'Image',
  '发送': 'Send',
  '停止': 'Stop',
  '释放以上传图片': 'Release to upload images',
  '需要审批': 'Approval required',
  '打开': 'Open',
  '下载': 'Download',
  '思考过程': 'Thinking',
  '复制': 'Copy',
  '引用': 'Quote',
  '重试': 'Retry',
  '删除': 'Delete',
  '预览图表': 'Preview diagram',
  '新标签打开': 'Open in new tab',
  '悬浮预览中': 'Floating preview',
  '工具审批偏好设置': 'Tool approval settings',
  '暂无需要审批的工具': 'No tools need approval',
  '请先添加 MCP 配置并同步工具': 'Add an MCP configuration and sync tools first',
  '取消': 'Cancel',
  '选择知识库': 'Select knowledge base',
  '相似度阈值:': 'Similarity threshold:',
  '检索数量:': 'Retrieval count:',
  '已绑定': 'Bound',
  '运行中': 'Running',
  '异常': 'Error',
  '扫码区': 'QR area',
  '连接微信账号': 'Connect WeChat account',
  '点击上方按钮生成二维码': 'Click the button above to generate a QR code.',
  '会话状态：': 'Session status:',
  '更新时间：': 'Updated at:',
  '账号区': 'Account area',
  '已绑定账号': 'Bound account',
  '可直接启停监听，不需要重新创建绑定': 'Start or stop listening directly without rebinding.',
  '最近收消息': 'Latest received message',
  '最近发消息': 'Latest sent message',
  '我的提示词': 'My prompts',
  '加载中...': 'Loading...',
  '暂无提示词': 'No prompts yet',
  '创建您的第一个提示词来开始使用': 'Create your first prompt to get started.',
  '暂无描述': 'No description',
  '启用': 'Enabled',
  '禁用': 'Disabled',
  '编辑': 'Edit',
  '设为默认': 'Set as default',
  '新建提示词': 'Create prompt',
  '编辑提示词': 'Edit prompt',
  '请选择提示词类型': 'Select prompt type',
  '请输入提示词名称': 'Enter prompt name',
  '请输入提示词描述（可选）': 'Enter prompt description (optional)',
  '请输入提示词内容': 'Enter prompt content',
  '未命名对话': 'Untitled conversation',
  '基础信息': 'Basic information',
  '状态设置': 'Status settings',
  '激活配置': 'Activate config',
  '已激活': 'Active',
  '未激活': 'Inactive',
  '全局共享': 'Global sharing',
  '仅自己可见': 'Private to me',
  '当前激活': 'Currently active',
  '连接配置': 'Connection settings',
  '系统提示词': 'System prompt',
  '请求策略': 'Request policy',
  '运行能力': 'Runtime capabilities',
  '多模态输入': 'Multimodal input',
  '上下文摘要': 'Context summarization',
  '人工审批': 'Human approval',
  '流式输出': 'Streaming output',
  '当前模块未单独配置': 'This module has no dedicated configuration',
  '默认供应商': 'Default provider',
  '默认模型': 'Default model',
  '默认 API URL': 'Default API URL',
  '未填写': 'Not set',
  '未设置': 'Not set',
  '测试成功': 'Test succeeded',
  '测试失败': 'Test failed',
  '获取模型列表失败': 'Failed to fetch model list',
  '请先填写当前页签的 API URL': 'Fill in the API URL for the current tab first',
  '请先保存配置，再测试当前页签': 'Save the configuration before testing this tab',
  '复制成功': 'Copied successfully',
  '复制失败，请手动复制': 'Copy failed. Please copy manually.',
  '图片已粘贴': 'Image pasted',
  '已停止生成': 'Generation stopped',
  '消息已删除': 'Message deleted',
  '对话历史已清空': 'Chat history cleared',
  '对话已删除': 'Conversation deleted',
  '批量删除对话失败': 'Bulk delete failed',
  '消息内容不能为空！': 'Message content cannot be empty.',
  '请先选择一个项目': 'Select a project first',
  '请先选择一个知识库': 'Select a knowledge base first',
  '未找到可用的 LLM 配置': 'No available LLM configuration found',
  '获取LLM配置失败': 'Failed to get LLM configuration',
  '请添加或初始化提示词后才能开始对话': 'Add or initialize prompts before starting a conversation.',
  '系统提示词更新成功': 'System prompt updated successfully',
  '更新系统提示词失败': 'Failed to update the system prompt',
  '无法获取项目或会话信息': 'Unable to get project or session information',
  '正在执行工具...': 'Executing tool...',
  '已拒绝执行': 'Execution denied',
  '操作失败，请重试': 'Action failed. Please try again.',
  '获取会话列表失败': 'Failed to get sessions',
  '获取会话列表失败，请稍后重试': 'Failed to get sessions. Please try again later.',
  '加载聊天历史失败，将开始新的对话': 'Failed to load chat history. Starting a new conversation.',
  '未检测到可预览的图表XML': 'No diagram XML available for preview',
  '未检测到可预览的HTML内容': 'No HTML content available for preview',
  '当前环境不支持全屏预览': 'Fullscreen preview is not supported in the current environment',
  '未找到对应的消息': 'The corresponding message was not found',
  '未找到对应的用户消息': 'The corresponding user message was not found',
  '未找到该消息': 'Message not found',
  '服务器回滚可能未完成，但本地消息已删除': 'Server rollback may still be running, but the local message was deleted.',
  '删除消息失败，请稍后重试': 'Failed to delete the message. Please try again later.',
  '新对话': 'New conversation',
  '加载会话历史失败': 'Failed to load conversation history',
  '没有选择项目，无法删除会话': 'No project selected. Unable to delete the conversation.',
  '删除对话失败': 'Failed to delete the conversation',
  '删除对话失败，请稍后重试': 'Failed to delete the conversation. Please try again later.',
  '对话历史已从服务器删除': 'Chat history deleted from the server',
  '服务器删除可能未完成，但本地对话已清除': 'Server deletion may still be running, but the local conversation was cleared.',
  '删除聊天历史失败，请稍后重试': 'Failed to delete chat history. Please try again later.',
  '请选择用户': 'Select a user',
  '选择用户': 'Select user',
  '请选择角色': 'Select a role',
  '状态': 'Status',
  '描述': 'Description',
  '名称': 'Name',
  '创建时间': 'Created at',
  '更新时间': 'Updated at',
  '创建者': 'Created by',
  '操作': 'Actions',
  '删除成功': 'Deleted successfully',
  '删除失败': 'Delete failed',
  '更新成功': 'Updated successfully',
  '更新失败': 'Update failed',
  '创建成功': 'Created successfully',
  '创建失败': 'Creation failed',
  '失败': 'Failed',
  '成功': 'Succeeded',
  '未登录或会话已过期': 'Not signed in or the session has expired',
  '未登录或登录已过期': 'Not signed in or the session has expired',
  '登录已过期，请重新登录': 'Session expired. Please sign in again.',
  '网络连接超时或服务器无响应': 'Network timeout or no server response',
  '未知错误': 'Unknown error',
  '请填写必填项': 'Fill in the required fields',
  '用户名': 'Username',
  '邮箱': 'Email',
  '角色': 'Role',
  '密码': 'Password',
  '用例名称': 'Case Name',
  '前置条件': 'Preconditions',
  '测试内容': 'Test content',
  '测试结果:': 'Test result:',
  '优先级': 'Priority',
  '测试类型': 'Test type',
  '审核状态': 'Review status',
  '模块': 'Module',
  '所属模块': 'Module',
  '模块名称': 'Module name',
  '模块管理': 'Module management',
  '暂无模块数据': 'No module data',
  '选择': 'Select',
  '搜索套件名称': 'Search suite name',
  '搜索用例名称': 'Search case name',
  '统计': 'Statistics',
  '等待中': 'Waiting',
  '执行中': 'Running',
  '已完成': 'Completed',
  '已取消': 'Cancelled',
  '通过': 'Passed',
  '跳过': 'Skipped',
  '执行人': 'Executor',
  '执行状态': 'Execution status',
  '触发类型': 'Trigger type',
  '执行时长': 'Duration',
  '开始时间': 'Start time',
  '时长': 'Duration',
  '浏览器': 'Browser',
  '定位类型': 'Locator type',
  '可选': 'Optional',
  '未配置': 'Not configured',
  '调度策略': 'Schedule',
  '分块大小': 'Chunk size',
  '分块重叠': 'Chunk overlap',
  '页面管理': 'Pages',
  '页面步骤': 'Page Steps',
  '测试用例': 'Test Cases',
  '执行记录': 'Execution Records',
  '批量执行': 'Batch Execution',
  '公共数据': 'Public Data',
  '环境配置': 'Environment Configs',
  '执行器': 'Actuators',
  '元素管理': 'Element Management',
  '步骤详情': 'Step Details',
  '用例步骤': 'Case Steps',
  '编辑模块': 'Edit module',
  '新增模块': 'Create module',
  '编辑用例': 'Edit case',
  '新增用例': 'Create case',
  '父模块': 'Parent module',
  '页面': 'Page',
  '页面名称': 'Page name',
  '页面 URL': 'Page URL',
  '所属页面': 'Page',
  '元素名称': 'Element name',
  '步骤名称': 'Step name',
  '定位表达式': 'Locator expression',
  '无头模式': 'Headless mode',
  '刷新': 'Refresh',
  '详情': 'Details',
  '新增环境': 'Add environment',
  '编辑环境配置': 'Edit environment config',
  '新增环境配置': 'Create environment config',
  '环境名称': 'Environment name',
  '基础 URL': 'Base URL',
  '用例等级': 'Case level',
  '用例描述': 'Case description',
  '如：开发环境、测试环境': 'Example: development or test environment',
  '如：http://localhost:3000': 'Example: http://localhost:3000',
  '无头': 'Headless',
  '有头': 'Headed',
  '视口宽度': 'Viewport width',
  '视口高度': 'Viewport height',
  '超时(ms)': 'Timeout (ms)',
  '启用新增': 'Enable create',
  '启用查改删': 'Enable read/update/delete',
  '主机地址': 'Host',
  '端口': 'Port',
  '数据库用户名': 'Database username',
  '数据库密码': 'Database password',
  '数据库': 'Database',
  'localhost 或 127.0.0.1': 'localhost or 127.0.0.1',
  '要连接的数据库名称': 'Database name to connect',
  '已设为默认': 'Set as default',
  '设置失败': 'Set failed',
  '编辑数据': 'Edit data',
  '新增数据': 'Create data',
  '变量名': 'Variable name',
  '变量值': 'Variable value',
  '数据类型': 'Data type',
  '字符串': 'String',
  '整数': 'Integer',
  '列表': 'List',
  '字典': 'Dictionary',
  '编辑元素': 'Edit element',
  '新增元素': 'Create element',
  '下标': 'Index',
  '等待时间（秒）': 'Wait time (seconds)',
  '在 iframe 中': 'Inside iframe',
  'iframe 定位表达式': 'Iframe locator expression',
  '请输入 iframe 定位表达式': 'Enter iframe locator expression',
  '可选描述': 'Optional description',
  '备用定位表达式1': 'Backup locator 1',
  '备用定位表达式2': 'Backup locator 2',
  'iframe设置': 'Iframe settings',
  'iframe定位表达式': 'Iframe locator expression',
  '编辑页面': 'Edit page',
  '新增页面': 'Create page',
  '请输入页面名称': 'Enter page name',
  '请输入页面 URL': 'Enter page URL',
  '请输入描述': 'Enter description',
  '编辑页面步骤': 'Edit page step',
  '新增页面步骤': 'Create page step',
  '新增步骤': 'Add step',
  '编辑步骤': 'Edit step',
  '添加步骤': 'Add step',
  '编辑操作': 'Edit action',
  '添加操作': 'Add action',
  '操作类型': 'Action type',
  '操作方法': 'Action method',
  '选择元素': 'Select element',
  '鼠标操作': 'Mouse actions',
  '输入操作': 'Input actions',
  '其他': 'Other',
  '点击': 'Click',
  '双击': 'Double click',
  '悬停': 'Hover',
  '填充': 'Fill',
  '输入': 'Type',
  '清空': 'Clear',
  '等待': 'Wait',
  '截图': 'Screenshot',
  '选择下拉': 'Select option',
  '断言元素': 'Assertion element',
  '断言方法': 'Assertion method',
  '元素可见': 'Element visible',
  '元素隐藏': 'Element hidden',
  '文本断言': 'Text assertion',
  '值断言': 'Value assertion',
  '数量断言': 'Count assertion',
  'SQL 配置': 'SQL config',
  'JSON 格式 SQL 配置': 'SQL config in JSON format',
  '自定义变量': 'Custom variable',
  'JSON 格式变量定义': 'Variable definition in JSON format',
  '条件配置': 'Condition config',
  'JSON 格式条件配置': 'Condition config in JSON format',
  '输入内容': 'Input text',
  '等待时间(毫秒)': 'Wait time (ms)',
  '截图文件名': 'Screenshot filename',
  '可选，留空自动生成': 'Optional, leave blank to auto-generate',
  '选项值': 'Option value',
  '期望文本': 'Expected text',
  '期望值': 'Expected value',
  '期望数量': 'Expected count',
  '请输入要填充的文本': 'Enter the text to fill',
  '请输入要键入的文本': 'Enter the text to type',
  '默认1000': 'Default 1000',
  '请输入要选择的选项值': 'Enter the option value to select',
  '请输入期望的文本内容': 'Enter the expected text',
  '请输入期望的值': 'Enter the expected value',
  '请输入期望的元素数量': 'Enter the expected element count',
  '搜索元素名称': 'Search element name',
  '搜索环境名称': 'Search environment name',
  '搜索页面名称/URL': 'Search page name / URL',
  '搜索变量名': 'Search variable name',
  '搜索步骤名称': 'Search step name',
  '请选择数据类型': 'Select a data type',
  '请选择定位类型': 'Select a locator type',
  '请选择操作类型': 'Select an action type',
  '请选择用例等级': 'Select a case level',
  '请选择元素': 'Select an element',
  '请输入变量名': 'Enter variable name',
  '请输入变量值': 'Enter variable value',
  '请输入元素名称': 'Enter element name',
  '请输入定位表达式': 'Enter locator expression',
  '请输入模块名称': 'Enter module name',
  '请输入步骤名称': 'Enter step name',
  '请输入环境名称': 'Enter environment name',
  '请输入用例名称': 'Enter case name',
  '请输入用例描述': 'Enter case description',
  '选择模块': 'Select module',
  '请选择模块': 'Select module',
  '选择页面': 'Select page',
  '请选择页面': 'Select page',
  '选择页面步骤': 'Select page step',
  '请选择页面步骤': 'Select page step',
  '选择执行器': 'Select actuator',
  '请选择执行器': 'Select actuator',
  '执行环境': 'Execution environment',
  '请选择一个在线的执行器': 'Select an online actuator',
  '暂无在线执行器': 'No online actuators',
  '在线': 'Online',
  '离线': 'Offline',
  '请先选择执行器': 'Select an actuator first',
  '请先选择模块': 'Select a module first',
  '请先选择父模块': 'Select a parent module first',
  '请先选择要删除的用例': 'Select the cases to delete first',
  '请先选择要执行的用例': 'Select the cases to execute first',
  '没有可用的执行器，请先启动执行器': 'No actuators are available. Start one first',
  '没有可用的执行器，请先启动执行器服务': 'No actuator is available. Start the actuator service first.',
  '请先启动执行器服务：cd WHartTest_Actuator && python main.py': 'Start the actuator service first: cd WHartTest_Actuator && python main.py',
  '该页面步骤没有操作': 'This page step has no actions',
  '该模块下有子模块，请先删除子模块': 'This module has child modules. Delete them first',
  '存在关联，无法删除。请先解除关联': 'Linked data prevents deletion. Remove the associations first',
  '获取元素列表失败': 'Failed to fetch element list',
  '获取公共数据失败': 'Failed to fetch public data',
  '获取操作步骤失败': 'Failed to fetch action steps',
  '获取模块列表失败': 'Failed to fetch module list',
  '获取模块树失败': 'Failed to fetch module tree',
  '获取步骤列表失败': 'Failed to fetch step list',
  '获取环境配置失败': 'Failed to fetch environment configs',
  '获取用例列表失败': 'Failed to fetch case list',
  '获取页面列表失败': 'Failed to fetch page list',
  '获取页面步骤列表失败': 'Failed to fetch page step list',
  '发送执行命令失败': 'Failed to send execution command',
  '发送批量执行命令失败': 'Failed to send batch execution command',
  '批量删除': 'Batch delete',
  '批量删除失败': 'Batch delete failed',
  '批量删除用例时发生错误': 'An error occurred while batch deleting cases',
  'WebSocket 连接失败': 'WebSocket connection failed',
  'WebSocket 连接失败，请刷新页面重试': 'WebSocket connection failed. Refresh and try again',
  '添加成功': 'Added successfully',
  '添加失败': 'Add failed',
  '排序已保存': 'Order saved',
  '保存排序失败': 'Failed to save order',
  '执行记录详情': 'Execution record details',
  '批量执行详情': 'Batch execution details',
  '执行追踪': 'Execution trace',
  '无权限访问任务中心': 'Task Center access denied',
  '请联系管理员分配任务中心查看权限': 'Contact an administrator to get Task Center view permission.',
  '请在顶部选择一个项目': 'Select a project from the top bar first',
  '任务名称最大长度为50字符': 'Task name must be at most 50 characters',
  '测试套件模块必须关联一个测试套件': 'The test suite module must be linked to a test suite',
  '测试套件必须属于当前项目': 'The test suite must belong to the current project',
  'UI用例必须属于当前项目': 'UI cases must belong to the current project',
  '仅执行一次时必须指定执行时间': 'A one-time task must specify an execution time',
  '每天执行时必须指定时间': 'A daily task must specify a time',
  '每周执行时必须选择至少一天': 'A weekly task must select at least one day',
  '每周执行时必须指定时间': 'A weekly task must specify a time',
  '每小时执行时必须指定分钟数': 'An hourly task must specify the minute',
  '批次名称': 'Batch name',
  '执行进度': 'Execution progress',
  '成功率': 'Success rate',
  '用例统计': 'Case summary',
  '错误信息': 'Error message',
  '步骤': 'Step',
  '消息': 'Message',
  '结束时间': 'End time',
  '元素数': 'Element count',
  '操作数': 'Action count',
  '步骤数': 'Step count',
  '暂无模块': 'No modules',
  '暂无步骤，请添加页面步骤': 'No steps yet. Please add page steps',
  '暂无操作步骤': 'No action steps',
  '暂无控制台消息': 'No console messages',
  '暂无快照': 'No snapshots',
  '暂无操作记录': 'No action records',
  '正在加载 Trace 数据...': 'Loading trace data...',
  '此执行记录没有 Trace 数据': 'This execution record has no trace data',
  '加载 Trace 数据失败': 'Failed to load trace data',
  '刷新 Trace 数据失败': 'Failed to refresh trace data',
  '确定删除？': 'Delete this item?',
  '确定删除该元素？': 'Delete this element?',
  '确定删除该操作？': 'Delete this action?',
  '确定删除该步骤？': 'Delete this step?',
  '确定删除该用例？': 'Delete this case?',
  '确定删除该页面？关联的元素也会被删除。': 'Delete this page? Related elements will also be deleted.',
  '确定删除此执行记录？关联的截图、视频、Trace文件将一并删除。': 'Delete this execution record? Related screenshots, videos, and trace files will be deleted too.',
  '确定删除此批量执行记录？关联的执行记录将一并删除。': 'Delete this batch execution record? Related execution records will be deleted too.',
  '确定要删除选中的用例吗？此操作不可恢复。': 'Delete the selected cases? This action cannot be undone.',
  '连接时间': 'Connected at',
  '状态已更新': 'Status updated',
  'IP地址': 'IP address',
  '模式': 'Mode',
  '手动执行': 'Manual',
  'API 触发': 'API',
  '定时执行': 'Scheduled',
  '待执行': 'Pending',
  '全部成功': 'All succeeded',
  '部分失败': 'Partially failed',
  '全部失败': 'All failed',
  '原始数据': 'Raw data',
  '文本': 'Text',
  '类型': 'Type',
  '是': 'Yes',
  '否': 'No',
  '切换页面URL': 'Switch page URL',
  '失败重试次数': 'Retry count on failure',
  '等待时间': 'Wait time',
  '等待(秒)': 'Wait (seconds)',
  'P0 - 冒烟': 'P0 - Smoke',
  'P1 - 核心': 'P1 - Core',
  'P2 - 重要': 'P2 - Important',
  'P3 - 一般': 'P3 - Normal',
  '点击 (click)': 'Click (click)',
  '双击 (dblclick)': 'Double click (dblclick)',
  '悬停 (hover)': 'Hover (hover)',
  '填充 (fill)': 'Fill (fill)',
  '输入 (type)': 'Type (type)',
  '清空 (clear)': 'Clear (clear)',
  '等待 (wait)': 'Wait (wait)',
  '截图 (screenshot)': 'Screenshot (screenshot)',
  '选择下拉 (select_option)': 'Select option (select_option)',
  '成功:': 'Passed:',
  '失败:': 'Failed:',
  '总计:': 'Total:',
};

const LEGACY_REGEX_EN_MAP: Array<[RegExp, (...groups: string[]) => string]> = [
  [/^已选择\s*(\d+)\s*张图片$/, (count) => `${count} image(s) selected`],
  [/^已粘贴\s*(\d+)\s*张图片$/, (count) => `${count} images pasted`],
  [/^工具\s+(.+)\s+已被设为始终拒绝，自动拒绝执行$/, (toolName) => `Tool ${toolName} is set to always deny and was rejected automatically`],
  [/^成功删除\s+(\d+)\s+个对话$/, (count) => `Deleted ${count} conversation(s) successfully`],
  [/^删除完成：成功\s+(\d+)\s+个，失败\s+(\d+)\s+个$/, (ok, failed) => `Delete completed: ${ok} succeeded, ${failed} failed`],
  [/^成功获取\s+(\d+)\s+个模型$/, (count) => `Fetched ${count} model(s) successfully`],
  [/^(.+)\s+已存在，无需重复上传$/, (fileName) => `${fileName} already exists and will not be uploaded again`],
  [/^已设置\s+(.+)\s+为始终允许$/, (name) => `Always allow set for ${name}`],
  [/^已设置\s+(.+)\s+为始终拒绝$/, (name) => `Always deny set for ${name}`],
  [/^操作失败:\s+(.+)$/, (detail) => `Action failed: ${detail}`],
  [/^加载失败:\s+(.+)$/, (detail) => `Load failed: ${detail}`],
  [/^保存失败:\s+(.+)$/, (detail) => `Save failed: ${detail}`],
  [/^删除失败:\s+(.+)$/, (detail) => `Delete failed: ${detail}`],
  [/^获取Key列表失败:\s+(.+)$/, (detail) => `Failed to fetch key list: ${detail}`],
  [/^操作失败:\s+(.+)$/, (detail) => `Action failed: ${detail}`],
  [/^开始批量执行\s+(\d+)\s+个用例$/, (count) => `Starting batch execution of ${count} case(s)`],
  [/^用例执行成功:\s+(\d+)\/(\d+)\s+步骤通过$/, (passed, total) => `Case execution succeeded: ${passed}/${total} steps passed`],
  [/^用例执行失败:\s+(.+)$/, (detail) => `Case execution failed: ${detail}`],
  [/^执行成功:\s+(\d+)\/(\d+)\s+步骤通过$/, (passed, total) => `Execution succeeded: ${passed}/${total} steps passed`],
  [/^执行失败:\s+(.+)$/, (detail) => `Execution failed: ${detail}`],
  [/^成功删除\s+(\d+)\s+个用例$/, (count) => `Deleted ${count} case(s) successfully`],
  [/^开始执行用例:\s+(.+)$/, (name) => `Starting case execution: ${name}`],
  [/^元素管理\s*-\s*(.*)$/, (name) => `Element Management - ${name}`.trim()],
  [/^步骤详情\s*-\s*(.*)$/, (name) => `Step Details - ${name}`.trim()],
  [/^用例步骤\s*-\s*(.*)$/, (name) => `Case Steps - ${name}`.trim()],
  [/^确定要删除模块\s+"(.+)"\s+吗？$/, (name) => `Delete module "${name}"?`],
  [/^强制更新完成！更新了\s+(\d+)\s+个提示词$/, (count) => `Force update completed. Updated ${count} prompt(s).`],
  [/^初始化完成！创建了\s+(\d+)\s+个提示词，跳过\s+(\d+)\s+个$/, (created, skipped) => `Initialization completed. Created ${created} prompt(s) and skipped ${skipped}.`],
  [/^会话状态：(.+)$/, (value) => `Session status: ${value}`],
  [/^更新时间：(.+)$/, (value) => `Updated at: ${value}`],
];

export const translateLegacyText = (text: string, locale: AppLocale) => {
  if (locale !== 'en-US') {
    return text;
  }

  const trimmed = text.trim();
  if (!trimmed) {
    return text;
  }

  const exact = LEGACY_EXACT_EN_MAP[trimmed];
  if (exact) {
    return preserveWhitespace(text, exact);
  }

  for (const [pattern, resolver] of LEGACY_REGEX_EN_MAP) {
    const match = trimmed.match(pattern);
    if (!match) {
      continue;
    }

    return preserveWhitespace(text, resolver(...match.slice(1)));
  }

  return text;
};

export const translateMaybeMessage = (
  value: string,
  locale: AppLocale,
  key?: AppMessageKey,
  params?: MessageParams,
) => {
  if (key) {
    return translate(locale, key, params);
  }

  return translateLegacyText(value, locale);
};
