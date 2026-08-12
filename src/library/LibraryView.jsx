import { useEffect, useMemo, useState } from 'react'
import {
  ArrowSquareOut,
  Check,
  Copy,
  FileCode,
  Funnel,
  LockSimple,
  MagnifyingGlass,
  Robot,
  SquaresFour,
} from '@phosphor-icons/react'
import ComponentPreview from './ComponentPreview'
import { componentRegistry, getAgentContract, SOURCES } from './registry'

const sourceOrder = ['troffo', 'beautiful', 'alignui', 'metal', 'beam', 'orbs', 'transitions', 'transitions-pro']

function SourceBadge({ sourceId, compact = false }) {
  const source = SOURCES[sourceId]
  return <span className={`source-badge source-badge--${source.tone}`}>{compact ? source.shortLabel : source.label}</span>
}

function CopyButton({ value, label = 'Copy' }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button type="button" className="copy-button" onClick={copy} disabled={!value}>
      {copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="bold" />}
      {copied ? 'Copied' : label}
    </button>
  )
}

function RegistryStats() {
  const local = componentRegistry.filter((item) => item.status === 'local').length
  const sources = new Set(componentRegistry.map((item) => item.source)).size
  return (
    <div className="library-stats">
      <span><strong>{componentRegistry.length}</strong> catalog entries</span>
      <i />
      <span><strong>{local}</strong> local & callable</span>
      <i />
      <span><strong>{sources}</strong> source groups</span>
    </div>
  )
}

function AgentView({ entry }) {
  const contract = getAgentContract(entry)
  const json = JSON.stringify(contract, null, 2)
  const prompt = entry.status === 'restricted'
    ? `Open ${entry.externalUrl} and request the user-provided licensed source before implementing ${entry.name}. Do not synthesize or copy restricted source.`
    : `Use the Troffo component \"${entry.name}\" (${entry.id}). Import from ${entry.importPath}. Preserve its source attribution and follow this contract:\n${json}`

  return (
    <div className="agent-view">
      <div className="agent-view__notice">
        <Robot size={18} weight="fill" />
        <div><strong>Agent contract</strong><span>Structured metadata for planning, selection and code generation.</span></div>
        <CopyButton value={prompt} label="Copy prompt" />
      </div>

      {entry.status === 'restricted' ? (
        <div className="agent-restricted">
          <LockSimple size={20} weight="bold" />
          <div><strong>No local source contract</strong><p>This entry remains externally indexed until licensed source is supplied locally.</p></div>
        </div>
      ) : null}

      <section className="agent-section">
        <div className="agent-section__head"><h3>Selection guidance</h3></div>
        <div className="agent-guidance">
          <div><span>USE WHEN</span><p>{entry.useWhen}</p></div>
          <div><span>AVOID WHEN</span><p>{entry.avoidWhen}</p></div>
        </div>
      </section>

      <section className="agent-section">
        <div className="agent-section__head"><h3>Interface</h3></div>
        <dl className="contract-list">
          <div><dt>id</dt><dd>{entry.id}</dd></div>
          <div><dt>kind</dt><dd>{entry.kind}</dd></div>
          <div><dt>status</dt><dd>{entry.status}</dd></div>
          <div><dt>importPath</dt><dd>{entry.importPath || 'null — external source only'}</dd></div>
          <div><dt>exports</dt><dd>{entry.exports.length ? entry.exports.join(', ') : 'none'}</dd></div>
          <div><dt>dependencies</dt><dd>{entry.dependencies.length ? entry.dependencies.join(', ') : 'none'}</dd></div>
        </dl>
      </section>

      {entry.props.length ? (
        <section className="agent-section">
          <div className="agent-section__head"><h3>Props</h3></div>
          <div className="props-table">
            <div className="props-table__row props-table__row--head"><span>Name</span><span>Type</span><span>Default</span></div>
            {entry.props.map((prop) => <div key={prop.name} className="props-table__row"><code>{prop.name}</code><code>{prop.type}</code><span>{String(prop.default ?? '—')}</span></div>)}
          </div>
        </section>
      ) : null}

      {entry.example ? (
        <section className="agent-section">
          <div className="agent-section__head"><h3>Usage</h3><CopyButton value={entry.example} /></div>
          <pre className="code-panel"><code>{entry.example}</code></pre>
        </section>
      ) : null}

      <section className="agent-section">
        <div className="agent-section__head"><h3>JSON manifest</h3><CopyButton value={json} /></div>
        <pre className="code-panel code-panel--json"><code>{json}</code></pre>
      </section>
    </div>
  )
}

function HumanView({ entry }) {
  return (
    <div className="human-view">
      <section className={`preview-canvas preview-canvas--${entry.source}`}>
        <ComponentPreview entry={entry} />
      </section>
      <section className="human-notes">
        <div><span>BEST FOR</span><p>{entry.useWhen}</p></div>
        <div><span>CATEGORY</span><p>{entry.category}</p></div>
        <div><span>LOCAL STATUS</span><p>{entry.status === 'local' ? 'Source available and Agent-callable' : 'External index only'}</p></div>
      </section>
    </div>
  )
}

function ComponentDetail({ entry }) {
  const [mode, setMode] = useState('human')
  const source = SOURCES[entry.source]

  useEffect(() => setMode('human'), [entry.id])

  return (
    <article className="component-detail">
      <header className="component-detail__head">
        <div className="component-detail__title-row">
          <div>
            <div className="component-detail__eyebrow"><SourceBadge sourceId={entry.source} /><span>{entry.category}</span></div>
            <h2>{entry.name}</h2>
            <p>{entry.description}</p>
          </div>
          <div className="component-mode" role="tablist" aria-label="Component documentation mode">
            <button type="button" role="tab" aria-selected={mode === 'human'} className={mode === 'human' ? 'is-active' : ''} onClick={() => setMode('human')}><SquaresFour size={15} weight="bold" />Human</button>
            <button type="button" role="tab" aria-selected={mode === 'agent'} className={mode === 'agent' ? 'is-active' : ''} onClick={() => setMode('agent')}><Robot size={15} weight="fill" />Agent</button>
          </div>
        </div>
        <div className="component-detail__source">
          <span>By <strong>{source.author}</strong></span>
          <span>{source.license}</span>
          {source.url.startsWith('http') ? <a href={source.url} target="_blank" rel="noreferrer">Source site <ArrowSquareOut size={13} weight="bold" /></a> : null}
          {source.repository ? <a href={source.repository} target="_blank" rel="noreferrer">Repository <ArrowSquareOut size={13} weight="bold" /></a> : null}
        </div>
      </header>
      <div className="component-detail__body">{mode === 'human' ? <HumanView entry={entry} /> : <AgentView entry={entry} />}</div>
    </article>
  )
}

export default function LibraryView() {
  const [query, setQuery] = useState('')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedId, setSelectedId] = useState('alignui-button')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const categories = useMemo(() => [...new Set(componentRegistry.map((item) => item.category))].sort(), [])
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return componentRegistry.filter((item) => {
      const sourceMatches = sourceFilter === 'all' || item.source === sourceFilter
      const categoryMatches = categoryFilter === 'all' || item.category === categoryFilter
      const haystack = [item.name, item.description, item.category, item.id, ...item.tags].join(' ').toLowerCase()
      return sourceMatches && categoryMatches && (!needle || haystack.includes(needle))
    })
  }, [query, sourceFilter, categoryFilter])

  const selected = componentRegistry.find((item) => item.id === selectedId) || filtered[0] || componentRegistry[0]

  useEffect(() => {
    if (filtered.length && !filtered.some((item) => item.id === selectedId)) setSelectedId(filtered[0].id)
  }, [filtered, selectedId])

  return (
    <div className="library-page">
      <header className="library-hero">
        <div>
          <span className="library-hero__eyebrow">Troffo Component Intelligence</span>
          <h1>One library, built for people and Agents.</h1>
          <p>Troffo Core、Beautiful AI、AlignUI，以及 Jakub Antalik 的动效组件与免费 Transition 配方。</p>
        </div>
        <RegistryStats />
      </header>

      <div className="library-toolbar">
        <label className="library-search"><MagnifyingGlass size={17} weight="bold" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search components, patterns, props…" /><kbd>⌘ K</kbd></label>
        <button type="button" className={`filter-toggle${filtersOpen ? ' is-active' : ''}`} onClick={() => setFiltersOpen((value) => !value)}><Funnel size={16} weight="bold" />Filters</button>
      </div>

      <div className="source-filters" aria-label="Filter by source">
        <button type="button" className={sourceFilter === 'all' ? 'is-active' : ''} onClick={() => setSourceFilter('all')}>All <span>{componentRegistry.length}</span></button>
        {sourceOrder.map((sourceId) => {
          const count = componentRegistry.filter((item) => item.source === sourceId).length
          return <button key={sourceId} type="button" className={sourceFilter === sourceId ? 'is-active' : ''} onClick={() => setSourceFilter(sourceId)}><SourceBadge sourceId={sourceId} compact /><span>{count}</span></button>
        })}
      </div>

      {filtersOpen ? <div className="category-filters"><button type="button" className={categoryFilter === 'all' ? 'is-active' : ''} onClick={() => setCategoryFilter('all')}>All categories</button>{categories.map((category) => <button key={category} type="button" className={categoryFilter === category ? 'is-active' : ''} onClick={() => setCategoryFilter(category)}>{category}</button>)}</div> : null}

      <div className="library-workspace">
        <aside className="component-list" aria-label="Components">
          <div className="component-list__head"><span>{filtered.length} results</span>{(query || sourceFilter !== 'all' || categoryFilter !== 'all') ? <button type="button" onClick={() => { setQuery(''); setSourceFilter('all'); setCategoryFilter('all') }}>Reset</button> : null}</div>
          <div className="component-list__scroll">
            {filtered.map((entry) => (
              <button key={entry.id} type="button" className={`component-row${entry.id === selected.id ? ' is-active' : ''}`} onClick={() => setSelectedId(entry.id)}>
                <span className={`component-row__icon component-row__icon--${SOURCES[entry.source].tone}`}>{entry.status === 'restricted' ? <LockSimple size={15} weight="bold" /> : <FileCode size={15} weight="bold" />}</span>
                <span className="component-row__copy"><strong>{entry.name}</strong><small>{entry.category}</small></span>
                <span className="component-row__source">{SOURCES[entry.source].shortLabel}</span>
              </button>
            ))}
            {!filtered.length ? <div className="component-list__empty">No matching components.<button type="button" onClick={() => { setQuery(''); setSourceFilter('all'); setCategoryFilter('all') }}>Clear filters</button></div> : null}
          </div>
        </aside>
        <ComponentDetail entry={selected} />
      </div>
    </div>
  )
}
