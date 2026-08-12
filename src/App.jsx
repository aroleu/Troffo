import { useState } from 'react'
import {
  CaretDoubleDown,
  CaretDoubleUp,
  CaretDown,
  Cards,
  CirclesFour,
  Folder,
  Folders,
  HouseSimple,
  Info,
  Path,
  SidebarSimple,
  Sparkle,
} from '@phosphor-icons/react'
import LibraryView from './library/LibraryView'

/**
 * 品牌标记：Vizually 的字母标（stylized "V"）。
 * 这是产品 logo 而非 UI 图标——Phosphor 不含字母形字形，故按设计稿逐点描摹内联还原。
 * 顶点取自 TROFFO.jpeg 的逐行墨迹扫描（16px 网格）。
 */
function BrandMark({ size = 18 }) {
  return (
    <svg
      className="brand__mark"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      {/* 三角顶点：左 (0.4,5.7)、右上 (15.0,0.8)、下 (12.1,15.6)，取自逐行墨迹扫描 */}
      <path d="M0.4 5.7 15.0 0.8 12.1 15.6Z" fill="currentColor" />
      {/* 白色切口垂直于上边缘（斜率互为负倒数），自上边缘向内延伸约 5.7 单位 */}
      <path d="M8.2 3.1 9.95 8.3" stroke="var(--surface, #fff)" strokeWidth="0.85" />
    </svg>
  )
}

/**
 * Phosphor 图标统一入口。图标的几何轮廓由 Phosphor 提供，weight 只负责
 * 视觉层级；导航等小尺寸图标统一使用 bold，避免细线在缩放后显得生硬。
 */
function PhosphorIcon({ icon: Icon, className = '', ...props }) {
  return <Icon className={`phosphor-icon${className ? ` ${className}` : ''}`} {...props} />
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: HouseSimple },
  // CirclesFour 的字形内边距远大于同组其它图标（ink 占比 0.688 对 ~0.81），
  // 按 22px 渲染只有 15.1px 墨迹，视觉上明显偏小。用 transform 放大做光学补偿，
  // 这样不影响 22px 的布局盒，整列图标与文字仍严格对齐。
  { id: 'dashboard', label: 'Dashboard', Icon: CirclesFour, iconBoost: true },
  { id: 'reports', label: 'Reports', Icon: Cards },
  { id: 'connectors', label: 'Connectors', Icon: Path },
  { id: 'ask-ai', label: 'Ask AI', Icon: Sparkle, badge: 'New', weight: 'fill' },
  { id: 'library', label: 'Library', Icon: Folders },
]

const PROJECTS = [
  { id: 'vay-inc', label: 'Vay Inc' },
  { id: 'wiom', label: 'Wiom' },
  { id: 'nori', label: 'Nori' },
]

const KPIS = [
  { id: 'lead', label: 'Lead Conversion', value: '32%', delta: '+2%', note: 'vs last week' },
  { id: 'retention', label: 'Customer Retention', value: '78%', delta: '+5%', note: 'vs last month' },
  { id: 'ticket', label: 'Avg. Ticket Size', value: '$1.2k', delta: '+8%', note: 'vs last month' },
  { id: 'churn', label: 'Churn Rate', value: '4.1%', delta: '-1%', note: 'vs last month', down: true },
]

const TABS = ['Expenses', 'Analytics', 'Financial Records', 'Compliance Measures', 'Forecast']

/** 柱状图数据：每组两根柱，第二根为当期（深色）。值域 0–1000。 */
const CHART_DATA = [
  { month: 'Jan', prev: 420, current: 610 },
  { month: 'Feb', prev: 380, current: 470 },
  { month: 'Mar', prev: 520, current: 780 },
  { month: 'Apr', prev: 460, current: 540 },
  { month: 'May', prev: 610, current: 850 },
  { month: 'Jun', prev: 500, current: 430 },
  { month: 'Jul', prev: 640, current: 920 },
  { month: 'Aug', prev: 470, current: 660 },
  { month: 'Sep', prev: 560, current: 720 },
  { month: 'Oct', prev: 430, current: 580 },
  { month: 'Nov', prev: 590, current: 810 },
  { month: 'Dec', prev: 510, current: 690 },
]

const AXIS_LABELS = ['$1000', '$800', '$600', '$400', '$200', '$0']
const CHART_MAX = 1000

function Sidebar({ activeNav, onNavigate, activeProject, onSelectProject, onClose }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <BrandMark size={20} />
        <span className="brand__name">Vizually</span>
        <button type="button" className="sidebar__close" aria-label="Close sidebar" onClick={onClose}>
          <PhosphorIcon icon={SidebarSimple} size={18} weight="bold" />
        </button>
      </div>

      <nav className="nav" aria-label="Main">
        {NAV_ITEMS.map(({ id, label, Icon, badge, weight = 'bold', iconBoost }) => {
          const isActive = id === activeNav
          const iconWeight = id === 'ask-ai' ? weight : isActive ? 'bold' : weight
          return (
            <button
              key={id}
              type="button"
              className={`nav__item${isActive ? ' nav__item--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onNavigate(id)}
            >
              <span className={`nav__icon${iconBoost ? ' nav__icon--boost' : ''}`}>
                <PhosphorIcon icon={Icon} size={22} weight={iconWeight} />
              </span>
              <span className="nav__label">{label}</span>
              {badge ? <span className="badge">{badge}</span> : null}
            </button>
          )
        })}
      </nav>

      <p className="nav__group-label" id="projects-label">
        Projects
      </p>

      <nav className="nav" aria-labelledby="projects-label">
        {PROJECTS.map(({ id, label }) => {
          const isActive = id === activeProject
          return (
            <button
              key={id}
              type="button"
              className={`nav__item${isActive ? ' nav__item--active' : ''}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onSelectProject(id)}
            >
              <span className="nav__icon">
                <PhosphorIcon icon={Folder} size={22} weight="bold" />
              </span>
              <span className="nav__label">{label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

function Kpi({ label, value, delta, note, down }) {
  // 设计稿的涨跌标记是双层 chevron（非单箭头），对应 Phosphor CaretDouble*。
  const DeltaIcon = down ? CaretDoubleDown : CaretDoubleUp

  return (
    <div className="kpi">
      <p className="kpi__label">{label}</p>
      <p className="kpi__value">{value}</p>
      <p className={`kpi__delta${down ? ' kpi__delta--down' : ''}`}>
        <span className="kpi__delta-value">
          <PhosphorIcon icon={DeltaIcon} size={14} weight="bold" />
          {delta}
        </span>
        <span className="kpi__delta-note">{note}</span>
      </p>
    </div>
  )
}

function SpendingsChart() {
  return (
    <div className="chart">
      <div className="chart__axis" aria-hidden="true">
        {AXIS_LABELS.map((label) => (
          <span key={label} className="chart__axis-label">
            {label}
          </span>
        ))}
      </div>

      <div className="chart__plot">
        <div className="chart__gridlines" aria-hidden="true">
          {AXIS_LABELS.map((label) => (
            <span key={label} className="chart__gridline" />
          ))}
        </div>

        <div className="chart__bars" role="img" aria-label="每月支出对比柱状图，共 12 个月">
          {CHART_DATA.map(({ month, prev, current }) => (
            <div key={month} className="chart__group" title={`${month}: $${current}`}>
              <span className="chart__bar" style={{ height: `${(prev / CHART_MAX) * 100}%` }} />
              <span
                className="chart__bar chart__bar--accent"
                style={{ height: `${(current / CHART_MAX) * 100}%` }}
              />
            </div>
          ))}
        </div>

        <div className="chart__labels" aria-hidden="true">
          {CHART_DATA.map(({ month }) => (
            <span key={month} className="chart__label">
              {month}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [activeProject, setActiveProject] = useState(null)
  const [activeTab, setActiveTab] = useState('Expenses')
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 720)
  const isLibrary = activeNav === 'library'

  return (
    <div className="page">
      <div className={`app${sidebarOpen ? '' : ' app--sidebar-closed'}`}>
        <Sidebar
          activeNav={activeNav}
          onClose={() => setSidebarOpen(false)}
          onNavigate={(id) => {
            setActiveNav(id)
            setActiveProject(null)
            if (window.innerWidth <= 720) setSidebarOpen(false)
          }}
          activeProject={activeProject}
          onSelectProject={(id) => {
            setActiveProject(id)
            setActiveNav(null)
            if (window.innerWidth <= 720) setSidebarOpen(false)
          }}
        />

        {sidebarOpen ? <button type="button" className="sidebar-backdrop" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} /> : null}

        <div className="main">
          <header className="topbar">
            <button
              type="button"
              className="topbar__icon"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              onClick={() => setSidebarOpen((isOpen) => !isOpen)}
            >
              <PhosphorIcon icon={SidebarSimple} size={18} weight="bold" />
            </button>
            <span className="topbar__title">{isLibrary ? 'Component Library' : 'Dashboard'}</span>
          </header>

          {isLibrary ? (
            <main className="content content--library">
              <LibraryView />
            </main>
          ) : (
          <main className="content">
            <section className="overview">
              <h1 className="t-title-lg" style={{ margin: 0 }}>
                Overview
              </h1>
              <p className="overview__desc">
                Track and analyze key performance indicators to monitor financial health
              </p>
            </section>

            <section className="kpis" aria-label="Key performance indicators">
              {KPIS.map((kpi) => (
                <Kpi key={kpi.id} {...kpi} />
              ))}
            </section>

            <div className="tabs" role="tablist" aria-label="Dashboard sections">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={tab === activeTab}
                  className={`tab${tab === activeTab ? ' tab--active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <section className="section">
              <h2 className="section__title">
                Spends
                <span className="section__title-info">
                  <PhosphorIcon icon={Info} size={14} weight="bold" />
                </span>
              </h2>
              <p className="section__desc">Current monthly recurring revenue rate</p>
            </section>

            <section className="card">
              <div className="card__head">
                <p className="card__title">Spendings</p>
                <span className="card__head-spacer" />
                <div className="legend">
                  <span className="legend__item">
                    <span className="legend__dot" />
                    Last year
                  </span>
                  <span className="legend__item">
                    <span className="legend__dot legend__dot--accent" />
                    This year
                  </span>
                  <button type="button" className="legend__item">
                    2024
                    <PhosphorIcon icon={CaretDown} size={14} weight="bold" />
                  </button>
                </div>
              </div>
              <div className="card__body">
                <SpendingsChart />
              </div>
            </section>
          </main>
          )}
        </div>
      </div>
    </div>
  )
}
