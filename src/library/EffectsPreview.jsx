import { useState } from 'react'
import { BorderBeam } from '@/effects/beam'
import { MetalFx } from '@/effects/metal'
import { ThinkingOrb } from '@/effects/orbs'

const orbStates = ['working', 'searching', 'solving', 'listening', 'connecting', 'weaving', 'composing', 'breathing', 'shaping']

export default function EffectsPreview({ source }) {
  const [orbState, setOrbState] = useState('working')

  if (source === 'metal') {
    return (
      <div className="effect-preview effect-preview--dark">
        <MetalFx preset="chromatic" theme="dark" strength={0.9}>
          <button type="button" className="effect-preview__metal-button">Upgrade to Pro</button>
        </MetalFx>
        <p>Real-time WebGL shader · chromatic preset</p>
      </div>
    )
  }

  if (source === 'beam') {
    return (
      <div className="effect-preview effect-preview--dark">
        <BorderBeam size="md" colorVariant="colorful" theme="dark" strength={0.78}>
          <div className="effect-preview__beam-card">
            <span>Agent</span>
            <strong>Build anything...</strong>
            <small>Animated border beam</small>
          </div>
        </BorderBeam>
      </div>
    )
  }

  return (
    <div className="effect-preview effect-preview--orbs">
      <div className="effect-preview__orb-main">
        <ThinkingOrb state={orbState} size={64} theme="light" />
        <strong>{orbState.charAt(0).toUpperCase() + orbState.slice(1)}…</strong>
      </div>
      <div className="effect-preview__orb-list">
        {orbStates.map((state) => (
          <button key={state} type="button" className={state === orbState ? 'is-active' : ''} onClick={() => setOrbState(state)}>
            <ThinkingOrb state={state} size={20} theme="light" />
            {state}
          </button>
        ))}
      </div>
    </div>
  )
}
