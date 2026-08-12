import { useEffect, useState } from 'react'

const labelFor = (slug) => slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

export default function TransitionPreview({ slug, restricted = false }) {
  const [active, setActive] = useState(false)
  const [count, setCount] = useState(24)

  useEffect(() => {
    setActive(false)
    setCount(24)
  }, [slug])

  if (restricted) {
    return (
      <div className="restricted-preview">
        <div className="restricted-preview__lock">PRO</div>
        <strong>{labelFor(slug)}</strong>
        <p>受限源码未复制。本地仅保留官方索引和购买后接入位置。</p>
      </div>
    )
  }

  if (slug === 'number-pop-in' || slug === 'spinning-counter') {
    return <div className="motion-preview"><div key={count} className="motion-number">{count}</div><button type="button" onClick={() => setCount((value) => value + 7)}>Update number</button></div>
  }

  if (slug === 'checkbox-check') {
    return <div className="motion-preview"><button type="button" className={`motion-checkbox${active ? ' is-active' : ''}`} onClick={() => setActive((value) => !value)} aria-pressed={active}><span>✓</span></button><p>Click to toggle</p></div>
  }

  if (slug === 'toggle') {
    return <div className="motion-preview"><button type="button" className={`motion-toggle${active ? ' is-active' : ''}`} onClick={() => setActive((value) => !value)} aria-pressed={active}><span /></button><p>{active ? 'Enabled' : 'Disabled'}</p></div>
  }

  if (slug === 'like-button') {
    return <div className="motion-preview"><button type="button" className={`motion-like${active ? ' is-active' : ''}`} onClick={() => setActive((value) => !value)}>♥</button><p>{active ? 'Liked' : 'Like'}</p></div>
  }

  if (slug === 'shimmer-text') {
    return <div className="motion-preview"><div className="motion-shimmer">Generating interface…</div></div>
  }

  if (slug === 'skeleton-reveal') {
    return <div className="motion-preview"><button type="button" onClick={() => setActive((value) => !value)}>{active ? 'Show skeleton' : 'Reveal content'}</button><div className={`motion-skeleton${active ? ' is-revealed' : ''}`}><span /><span /><span /></div></div>
  }

  if (slug === 'error-state-shake') {
    return <div className="motion-preview"><input key={active} className={active ? 'motion-shake' : ''} defaultValue="invalid@email" /><button type="button" onClick={() => setActive((value) => !value)}>Validate</button></div>
  }

  return (
    <div className="motion-preview">
      <div className={`motion-demo motion-demo--${slug}${active ? ' is-active' : ''}`}>
        <span>{labelFor(slug)}</span>
        <small>{active ? 'Active state' : 'Rest state'}</small>
      </div>
      <button type="button" onClick={() => setActive((value) => !value)}>{active ? 'Reset transition' : 'Run transition'}</button>
    </div>
  )
}
