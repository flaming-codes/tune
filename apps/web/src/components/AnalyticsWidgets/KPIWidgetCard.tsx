'use client'

import { Pill } from '@payloadcms/ui/elements/Pill'

type KpiMetric = {
  label: string
  value: number
}

type KPIWidgetCardProps = {
  title: string
  badge: string
  metrics: KpiMetric[]
}

export default function KPIWidgetCard({ title, badge, metrics }: KPIWidgetCardProps) {
  return (
    <div className="card" style={{ display: 'grid', gap: '1.25rem', padding: '1.5rem' }}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'space-between',
        }}
      >
        <h3
          style={{
            color: 'var(--theme-text)',
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.015em',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {title}
        </h3>
        <Pill>{badge}</Pill>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '0.9rem',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        }}
      >
        {metrics.map((metric) => (
          <div
            key={metric.label}
            style={{
              background: 'var(--theme-elevation-50)',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: '10px',
              display: 'grid',
              gap: '0.25rem',
              minHeight: '7rem',
              padding: '0.9rem 1rem',
            }}
          >
            <p
              style={{
                color: 'var(--theme-elevation-600)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              {metric.label}
            </p>
            <p
              style={{
                color: 'var(--theme-text)',
                fontSize: '2.35rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                margin: 0,
              }}
            >
              {metric.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
