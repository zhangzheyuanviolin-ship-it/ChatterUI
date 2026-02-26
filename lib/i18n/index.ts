import { getLocales } from 'expo-localization'

type TranslationParams = Record<string, string | number | boolean | null | undefined>

const zhCN: Record<string, string> = {
    Settings: '设置',
    Style: '外观',
    'Change Theme': '更改主题',
    'Replace Chat Background': '替换聊天背景',
    'Import Chat Background': '导入聊天背景',
    'Delete Chat Background': '删除聊天背景',
    'Delete Background': '删除背景',
    'Are you sure you want to delete this background? This cannot be undone!':
        '确定要删除这个背景吗？此操作无法撤销！',
    Cancel: '取消',
    Chat: '聊天',
    'Auto Scroll': '自动滚动',
    'Autoscrolls text during generations': '生成回复时自动滚动文本',
    'Use First Message': '使用首条消息',
    'Disabling this will make new chats start blank, needed by specific models':
        '关闭后，新聊天将从空白开始，某些模型需要此设置',
    'Load Chat On Startup': '启动时加载聊天',
    'Loads the most recent chat on startup': '应用启动时加载最近一次聊天',
    'Auto Load User': '自动加载用户',
    'When opening a chat, automatically loads the User the chat was created with':
        '打开聊天时自动加载创建该聊天时使用的用户',
    'Send on Enter': '回车发送',
    'Submits messages when Enter is pressed': '按下回车键时发送消息',
    'Show Tokens Per Second': '显示每秒 Token',
    'Show tokens per second when using local models': '使用本地模型时显示每秒生成的 Token',
    'Quick Delete': '快速删除',
    'Toggle delete button in chat options bar': '在聊天选项栏中显示或隐藏删除按钮',
    'Save Scroll Position': '保存滚动位置',
    'Automatically move to last scrolled position in chat': '自动恢复到上次聊天滚动位置',
    'Automatically Generate Titles': '自动生成标题',
    'Automatically generates titles for chats (only in Remote mode)':
        '自动为聊天生成标题（仅远程模式）',
    'Wide Chat': '宽屏聊天',
    'Removes whitespace for wider chat': '减少留白以显示更宽的聊天内容',
    'Alternate User and Character Positions': '交替显示用户与角色位置',
    'Left align character chats and right aligns user chats': '角色消息左对齐，用户消息右对齐',
    'Character Management': '角色管理',
    'Regenerate Default Card': '重新生成默认卡片',
    'This will add the default AI Bot card to your character list.':
        '这会将默认 AI Bot 卡片添加到你的角色列表中。',
    'Create Default Card': '创建默认卡片',
    'Hidden Tags': '隐藏标签',
    'Hide characters with the following tags from the character list.':
        '在角色列表中隐藏带有以下标签的角色。',
    Generation: '生成',
    'Print Context': '打印上下文',
    'Prints the generation context to logs for debugging': '将生成上下文打印到日志中用于调试',
    'Bypass Context Length': '忽略上下文长度',
    'Ignores context length limits when building prompts': '构建提示词时忽略上下文长度限制',
    Notifications: '通知',
    'Enable Notifications': '启用通知',
    'Sends notifications when the app is in the background': '应用在后台时发送通知',
    'Notification Sound': '通知声音',
    'Notification Vibration': '通知振动',
    'Show Text In Notification': '通知中显示文本',
    'Shows generated messages in notifications': '在通知中显示生成的消息内容',
    Screen: '屏幕',
    'Unlock Orientation': '解锁屏幕方向',
    'Allows landscape on phones (App restart required)': '允许手机横屏（需要重启应用）',
    'Database Management': '数据库管理',
    "WARNING: only import if you are certain it's from the same version!":
        '警告：仅在确认数据库来自同一应用版本时导入！',
    'Export Database': '导出数据库',
    'Import Database': '导入数据库',
    'Download Successful!': '下载成功！',
    'Failed to copy database: {error}': '复制数据库失败：{error}',
    'Somehow the db is already deleted': '数据库似乎已经被删除',
    'Copy Successful, Restarting now.': '复制成功，正在重启应用。',
    'Failed to import database: {error}': '导入数据库失败：{error}',
    'WARNING: Different Version': '警告：版本不一致',
    'The imported database file has a different app version ({dbVersion}) to installed version ({appVersion}).\n\nImporting this database may break or corrupt the database. It is recommended to use the same app version.':
        '导入的数据库文件版本（{dbVersion}）与当前安装版本（{appVersion}）不一致。\n\n导入此数据库可能导致数据库损坏或异常，建议使用相同版本。',
    'Import Anyways': '仍然导入',
    'Are you sure you want to export the database file?\n\nIt will automatically be downloaded to Downloads':
        '确定要导出数据库文件吗？\n\n文件会自动下载到 Downloads 文件夹',
    'Are you sure you want to import this database? This may will destroy the current database!\n\nA backup will automatically be downloaded.\n\nApp will restart automatically':
        '确定要导入这个数据库吗？这可能会破坏当前数据库！\n\n系统会自动下载备份。\n\n应用将自动重启',
    Import: '导入',
    Security: '安全',
    'Lock App': '锁定应用',
    'Requires user authentication to open the app. This will not work if you have no device locks enabled.':
        '打开应用时需要进行身份验证。如果设备未启用锁屏，此功能将无法使用。',
    'App Mode': '应用模式',
    Local: '本地',
    Remote: '远程',
    Sampler: '采样器',
    Formatting: '格式化',
    API: '接口',
    Models: '模型',
    TTS: '语音合成',
    Logs: '日志',
    About: '关于',
    '[DEV] Components': '[开发] 组件',
    '[DEV] ColorTest': '[开发] 颜色测试',
    '[DEV] Markdown': '[开发] Markdown',
    'Support ChatterUI': '支持 ChatterUI',
    'Remove attachment {name}': '移除附件 {name}',
    'Deletes this attachment from the message': '从消息中删除该附件',
    'Add attachment': '添加附件',
    'Opens attachment options': '打开附件选项',
    'Add Image': '添加图片',
    'Show input options': '显示输入选项',
    'Reveals chat input action buttons': '显示聊天输入操作按钮',
    'Message input': '消息输入框',
    'Double tap to type your message': '双击后输入消息',
    'Message...': '输入消息...',
    'Stop generation': '停止生成',
    'Send message': '发送消息',
    'Stops the current model response': '停止当前模型回复',
    'Sends your current message': '发送当前输入的消息',
    'Chat actions': '聊天操作',
    'Opens chat action menu': '打开聊天操作菜单',
    'Main Menu': '主菜单',
    'Edit Character': '编辑角色',
    'Chat History': '聊天记录',
    'Start new chat': '开始新聊天',
    'Creates a new conversation': '创建新会话',
    'Open settings drawer': '打开设置侧栏',
    'Close settings drawer': '关闭设置侧栏',
    'Open chats drawer': '打开聊天侧栏',
    'Close chats drawer': '关闭聊天侧栏',
    'Open user list drawer': '打开用户列表侧栏',
    'Close user list drawer': '关闭用户列表侧栏',
    'Toggles side panel': '切换侧边面板',
    'Sort By': '排序方式',
    Recent: '最近',
    Name: '名称',
    Tags: '标签',
    'Filter Tags...': '筛选标签...',
    'Search Name...': '搜索名称...',
    'Results: {count}': '结果：{count}',
    'Hider {status}': '隐藏器{status}',
    Enabled: '已启用',
    Disabled: '已禁用',
}

const getCurrentLanguage = (): 'zh-CN' | 'en' => {
    const locale = getLocales()?.[0]
    const tag = (locale?.languageTag ?? locale?.languageCode ?? '').toLowerCase()
    return tag.startsWith('zh') ? 'zh-CN' : 'en'
}

const format = (template: string, params?: TranslationParams): string => {
    if (!params) return template
    return template.replace(/\{(\w+)\}/g, (match, key: string) => {
        const value = params[key]
        return value === undefined || value === null ? match : String(value)
    })
}

export const t = (key: string, params?: TranslationParams): string => {
    const value = getCurrentLanguage() === 'zh-CN' ? (zhCN[key] ?? key) : key
    return format(value, params)
}

