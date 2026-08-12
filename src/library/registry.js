const toTitle = (slug) =>
  slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

export const SOURCES = {
  troffo: {
    id: 'troffo',
    label: 'Troffo Core',
    shortLabel: 'Troffo',
    author: 'Troffo',
    url: 'local://troffo',
    license: 'Local project',
    tone: 'core',
  },
  beautiful: {
    id: 'beautiful',
    label: 'Beautiful AI',
    shortLabel: 'Beautiful',
    author: 'Beautiful UI',
    url: 'https://beautiful-ui-five.vercel.app/',
    license: 'Local study reference',
    tone: 'beautiful',
  },
  alignui: {
    id: 'alignui',
    label: 'AlignUI · MIT',
    shortLabel: 'AlignUI',
    author: 'Doğukan Çavuş',
    url: 'https://www.alignui.com/',
    repository: 'https://github.com/alignui/alignui-nextjs-typescript-starter',
    license: 'MIT',
    tone: 'align',
  },
  metal: {
    id: 'metal',
    label: 'Liquid Metal · MIT',
    shortLabel: 'Metal',
    author: 'Jakub Antalik',
    url: 'https://metal.jakubantalik.com/',
    repository: 'https://github.com/Jakubantalik/metal-fx',
    license: 'MIT',
    tone: 'metal',
  },
  beam: {
    id: 'beam',
    label: 'Border Beam · MIT',
    shortLabel: 'Beam',
    author: 'Jakub Antalik',
    url: 'https://beam.jakubantalik.com/',
    repository: 'https://github.com/Jakubantalik/Libraries/tree/main/packages/border-beam',
    license: 'MIT',
    tone: 'beam',
  },
  orbs: {
    id: 'orbs',
    label: 'Thinking Orbs · MIT',
    shortLabel: 'Orbs',
    author: 'Jakub Antalik & Alex Brinza',
    url: 'https://orbs.jakubantalik.com/',
    repository: 'https://github.com/Jakubantalik/thinking-orbs',
    license: 'MIT',
    tone: 'orbs',
  },
  transitions: {
    id: 'transitions',
    label: 'Transitions.dev · Free',
    shortLabel: 'Transitions',
    author: 'Jakub Antalik',
    url: 'https://transitions.dev/',
    repository: 'https://github.com/Jakubantalik/transitions.dev',
    license: 'Transitions.dev snippet license',
    tone: 'transition',
  },
  'transitions-pro': {
    id: 'transitions-pro',
    label: 'Transitions.dev · Pro',
    shortLabel: 'Transitions Pro',
    author: 'Jakub Antalik',
    url: 'https://transitions.dev/pro.html',
    license: 'Restricted / purchase required',
    tone: 'restricted',
  },
}

const baseEntry = ({ id, name, source, category, description, importPath, ...rest }) => ({
  id,
  name,
  source,
  category,
  description,
  importPath,
  status: 'local',
  kind: 'component',
  useWhen: `需要 ${name} 的${category}界面时`,
  avoidWhen: '需求与组件语义不匹配，或仅需简单静态文本时',
  dependencies: [],
  exports: ['default'],
  props: [],
  example: importPath ? `import Component from '${importPath}'\n\n<Component />` : '',
  tags: [category, source],
  ...rest,
})

const alignFiles = [
  'accordion', 'alert', 'avatar', 'avatar-empty-icons', 'avatar-group',
  'avatar-group-compact', 'badge', 'breadcrumb', 'button', 'button-group',
  'checkbox', 'color-picker', 'command-menu', 'compact-button', 'datepicker',
  'digit-input', 'divider', 'dot-stepper', 'drawer', 'dropdown', 'fancy-button',
  'file-format-icon', 'file-upload', 'hint', 'horizontal-stepper', 'input', 'kbd',
  'label', 'link-button', 'modal', 'notification', 'notification-provider',
  'pagination', 'popover', 'progress-bar', 'progress-circle', 'radio',
  'segmented-control', 'select', 'slider', 'social-button', 'status-badge',
  'svg-rating-icons', 'switch', 'tab-menu-horizontal', 'tab-menu-vertical',
  'table', 'tag', 'textarea', 'tooltip', 'vertical-stepper',
]

const formComponents = new Set([
  'checkbox', 'color-picker', 'datepicker', 'digit-input', 'file-upload', 'input',
  'label', 'radio', 'select', 'slider', 'switch', 'textarea',
])
const navigationComponents = new Set([
  'breadcrumb', 'command-menu', 'dot-stepper', 'horizontal-stepper', 'pagination',
  'segmented-control', 'tab-menu-horizontal', 'tab-menu-vertical', 'vertical-stepper',
])
const overlayComponents = new Set([
  'drawer', 'dropdown', 'modal', 'notification', 'notification-provider', 'popover', 'tooltip',
])
const dataComponents = new Set(['avatar', 'avatar-empty-icons', 'avatar-group', 'avatar-group-compact', 'badge', 'file-format-icon', 'progress-bar', 'progress-circle', 'status-badge', 'svg-rating-icons', 'table', 'tag'])

const alignCategory = (slug) => {
  if (formComponents.has(slug)) return 'Forms'
  if (navigationComponents.has(slug)) return 'Navigation'
  if (overlayComponents.has(slug)) return 'Overlays'
  if (dataComponents.has(slug)) return 'Data Display'
  return 'Actions & Layout'
}

const alignDescriptions = {
  accordion: '可折叠内容组，基于 Radix Accordion。',
  alert: '带状态、图标和关闭操作的反馈容器。',
  avatar: '用户或组织头像，支持状态、品牌标和通知。',
  button: 'AlignUI 主按钮，包含三种语义、四种模式与四种尺寸。',
  input: '带图标、前后缀、错误状态和尺寸的输入控件。',
  select: '支持分组、滚动与图标的无障碍选择器。',
  table: '带悬浮行、分隔和语义单元格的数据表。',
}

const alignEntries = alignFiles.map((slug) => {
  const name = toTitle(slug)
  const importPath = `@/alignui/components/ui/${slug}`
  return baseEntry({
    id: `alignui-${slug}`,
    name,
    source: 'alignui',
    category: alignCategory(slug),
    description: alignDescriptions[slug] || `AlignUI 官方开源 ${name} 基础组件。`,
    importPath,
    exports: ['Root', '相关子组件'],
    dependencies: ['React', 'Tailwind CSS', 'Radix / Remix Icon（按组件）'],
    props: [
      { name: 'className', type: 'string', required: false },
      { name: 'children', type: 'ReactNode', required: false },
      { name: 'variant / size', type: 'component specific', required: false },
    ],
    example: `import * as ${name.replaceAll(' ', '')} from '${importPath}'\n\n<${name.replaceAll(' ', '')}.Root />`,
    tags: ['AlignUI', 'MIT', alignCategory(slug), slug],
  })
})

const beautifulNames = [
  'ApprovalCard', 'ChatComposer', 'CodeBlock', 'ContextCards', 'DiffTable',
  'FilterTable', 'FineTuneCard', 'InsightCards', 'LoadingState', 'PromptBar',
  'RecommendationCard', 'RecordsTable', 'SearchList', 'SelectionActions',
  'SidebarNav', 'StreamingText', 'TaskRows', 'ThinkingState', 'ToolChips',
]

const beautifulCategory = (name) => {
  if (/Table|Records/.test(name)) return 'Data & Tables'
  if (/Loading|Thinking|Streaming/.test(name)) return 'AI States'
  if (/Composer|Prompt|Search/.test(name)) return 'AI Input'
  if (/Sidebar|Selection|Tool/.test(name)) return 'Agent Actions'
  return 'AI Cards'
}

const beautifulEntries = beautifulNames.map((name) =>
  baseEntry({
    id: `beautiful-${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
    name,
    source: 'beautiful',
    category: beautifulCategory(name),
    description: `面向 AI 产品工作流的 ${name} 视觉组件。`,
    importPath: `@/beautiful-ai/components/${name}`,
    props: [{ name: 'variant', type: 'string', required: false }],
    dependencies: ['React', 'Beautiful AI compiled styles'],
    tags: ['AI Native', beautifulCategory(name), name],
  }),
)

const effectEntries = [
  baseEntry({
    id: 'metal-metal-fx',
    name: 'MetalFx',
    source: 'metal',
    category: 'Effects',
    description: '实时 WebGL 液态金属边框，可包裹按钮或任意单一元素。',
    importPath: '@/effects/metal',
    exports: ['MetalFx'],
    props: [
      { name: 'preset', type: "'chromatic' | 'silver' | 'gold'", default: 'chromatic' },
      { name: 'strength', type: 'number', default: 1 },
      { name: 'variant', type: "'button' | 'circle'", default: 'button' },
    ],
    example: "import { MetalFx } from '@/effects/metal'\n\n<MetalFx preset=\"chromatic\"><button>Upgrade</button></MetalFx>",
    dependencies: ['React', 'WebGL'],
    tags: ['WebGL', 'metal', 'animated border'],
  }),
  baseEntry({
    id: 'beam-border-beam',
    name: 'BorderBeam',
    source: 'beam',
    category: 'Effects',
    description: '围绕内容旋转或呼吸的彩色光束边框。',
    importPath: '@/effects/beam',
    exports: ['BorderBeam'],
    props: [
      { name: 'size', type: "'sm' | 'md' | 'line' | 'pulse-inner' | 'pulse-outside'", default: 'md' },
      { name: 'colorVariant', type: "'colorful' | 'mono' | 'ocean' | 'sunset'", default: 'colorful' },
      { name: 'strength', type: 'number', default: 1 },
    ],
    example: "import { BorderBeam } from '@/effects/beam'\n\n<BorderBeam><div>Build anything...</div></BorderBeam>",
    dependencies: ['React', 'CSS masks'],
    tags: ['beam', 'glow', 'animated border'],
  }),
  baseEntry({
    id: 'orbs-thinking-orb',
    name: 'ThinkingOrb',
    source: 'orbs',
    category: 'AI States',
    description: 'AI 与 Agent 界面的九种点阵思考状态动画。',
    importPath: '@/effects/orbs',
    exports: ['ThinkingOrb'],
    props: [
      { name: 'state', type: 'working | searching | solving | listening | …', default: 'working' },
      { name: 'size', type: '64 | 20', default: 64 },
      { name: 'speed', type: 'number', default: 1 },
    ],
    example: "import { ThinkingOrb } from '@/effects/orbs'\n\n<ThinkingOrb state=\"listening\" size={64} />",
    dependencies: ['React', 'Canvas 2D'],
    tags: ['agent', 'thinking', 'canvas', 'loading'],
  }),
]

export const transitionFree = [
  ['card-resize', 'Card resize'], ['number-pop-in', 'Number pop-in'],
  ['notification-badge', 'Notification badge'], ['text-states-swap', 'Text states swap'],
  ['menu-dropdown', 'Menu dropdown'], ['modal', 'Modal open / close'],
  ['panel-reveal', 'Panel reveal'], ['page-side-by-side', 'Page side-by-side'],
  ['icon-swap', 'Icon swap'], ['success-check', 'Success check'],
  ['avatar-group-hover', 'Avatar group hover'], ['error-state-shake', 'Error state shake'],
  ['input-clear-dissolve', 'Input clear with dissolve'], ['skeleton-reveal', 'Skeleton loader and reveal'],
  ['shimmer-text', 'Shimmer text'], ['tabs-sliding', 'Tabs sliding'],
  ['tooltip', 'Tooltip open / close'], ['texts-reveal', 'Texts reveal'],
  ['card-tilt', '3D tilt'], ['plus-menu-morph', 'Dropdown menu morph'],
  ['accordion', 'Accordion'], ['toast', 'Toast open / close'],
  ['like-button', 'Like button'], ['learn-more-hover', 'Learn more hover'],
  ['checkbox-check', 'Checkbox check'], ['spinning-counter', 'Spinning counter'],
  ['toggle', 'Toggle'],
]

const transitionEntries = transitionFree.map(([slug, name]) =>
  baseEntry({
    id: `transitions-${slug}`,
    name,
    source: 'transitions',
    category: 'Motion',
    kind: 'recipe',
    description: `Transitions.dev 的 ${name} 免费 CSS / React 过渡配方。`,
    importPath: `@/transitions-dev/recipes/${slug}.md`,
    exports: ['CSS recipe', 'React recipe when provided'],
    dependencies: ['CSS custom properties', 'React optional'],
    props: [{ name: 'motion tokens', type: 'CSS custom properties', required: false }],
    useWhen: `界面需要 ${name} 动效反馈时`,
    avoidWhen: '用户启用减少动态效果且没有提供静态回退时',
    example: `Read and apply: src/transitions-dev/recipes/${slug}.md`,
    tags: ['motion', 'copy-paste', 'free', slug],
  }),
)

export const transitionPro = [
  ['confetti-burst', 'Confetti burst'], ['gooey-plus-menu', 'Gooey plus menu'],
  ['card-stack-hover', 'Card stack hover'], ['organic-shimmer', 'Organic shimmer'],
  ['drag-drop-with-physics', 'Drag & drop with physics'], ['image-open-tilt', 'Image open tilt'],
  ['spinner-to-check-morph', 'Spinner to check morph'], ['pro-gradient-text', 'Pro gradient text'],
  ['delete-with-smoky-dissolve', 'Delete with smoky dissolve'],
]

const restrictedEntries = transitionPro.map(([slug, name]) =>
  baseEntry({
    id: `transitions-pro-${slug}`,
    name,
    source: 'transitions-pro',
    category: 'Motion · Pro',
    kind: 'external',
    status: 'restricted',
    description: `${name} 是 Transitions.dev Pro 受限组件；本地仅保留索引。`,
    importPath: null,
    exports: [],
    dependencies: [],
    props: [],
    useWhen: '已合法购买并将源码放入本地后再接入',
    avoidWhen: '未获得 Pro 下载权限时不要复制或生成替代源码',
    example: '',
    externalUrl: `https://transitions.dev/detail.html?t=${slug}`,
    tags: ['Pro', 'restricted', 'external only'],
  }),
)

const troffoEntries = [
  baseEntry({
    id: 'troffo-sidebar-shell',
    name: 'Sidebar Shell',
    source: 'troffo',
    category: 'Navigation',
    description: 'Troffo 原生的 284px 应用侧边栏、项目分组和收起逻辑。',
    importPath: '@/App.jsx',
    exports: ['Sidebar'],
    tags: ['sidebar', 'dashboard', 'navigation'],
  }),
  baseEntry({
    id: 'troffo-dashboard-card',
    name: 'Dashboard Card',
    source: 'troffo',
    category: 'Dashboard',
    description: 'Troffo 原生 KPI、数据卡和图表容器视觉。',
    importPath: '@/App.jsx',
    exports: ['Kpi', 'SpendingsChart'],
    tags: ['KPI', 'analytics', 'chart'],
  }),
]

export const componentRegistry = [
  ...troffoEntries,
  ...beautifulEntries,
  ...alignEntries,
  ...effectEntries,
  ...transitionEntries,
  ...restrictedEntries,
]

export const getRegistryEntry = (id) => componentRegistry.find((entry) => entry.id === id)

export const getAgentContract = (entry) => ({
  id: entry.id,
  name: entry.name,
  source: SOURCES[entry.source].label,
  author: SOURCES[entry.source].author,
  sourceUrl: SOURCES[entry.source].url,
  license: SOURCES[entry.source].license,
  status: entry.status,
  kind: entry.kind,
  category: entry.category,
  description: entry.description,
  useWhen: entry.useWhen,
  avoidWhen: entry.avoidWhen,
  importPath: entry.importPath,
  exports: entry.exports,
  dependencies: entry.dependencies,
  props: entry.props,
  example: entry.example,
  externalUrl: entry.externalUrl,
})
