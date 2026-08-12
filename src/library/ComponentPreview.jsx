import AlignUIPreview from './AlignUIPreview'
import BeautifulPreview from './BeautifulPreview'
import EffectsPreview from './EffectsPreview'
import TransitionPreview from './TransitionPreview'

function TroffoPreview({ id }) {
  if (id === 'troffo-sidebar-shell') {
    return <div className="troffo-preview"><aside><strong>Troffo</strong><span className="is-active">▦ Dashboard</span><span>◇ Reports</span><span>✦ Ask AI</span><span>▣ Library</span></aside><main><i /><i /><i /><div /></main></div>
  }
  return <div className="troffo-kpi-preview"><article><span>Lead Conversion</span><strong>32%</strong><small>↗ +2% vs last week</small></article><article><span>Retention</span><strong>78%</strong><small>↗ +5% vs last month</small></article></div>
}

export default function ComponentPreview({ entry }) {
  if (entry.source === 'alignui') return <AlignUIPreview slug={entry.id.replace('alignui-', '')} />
  if (entry.source === 'beautiful') return <BeautifulPreview name={entry.name} />
  if (['metal', 'beam', 'orbs'].includes(entry.source)) return <EffectsPreview source={entry.source} />
  if (entry.source === 'transitions') return <TransitionPreview slug={entry.id.replace('transitions-', '')} />
  if (entry.source === 'transitions-pro') return <TransitionPreview slug={entry.id.replace('transitions-pro-', '')} restricted />
  return <TroffoPreview id={entry.id} />
}
