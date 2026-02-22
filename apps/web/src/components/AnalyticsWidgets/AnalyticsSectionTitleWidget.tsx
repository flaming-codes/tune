import type { WidgetServerProps } from 'payload'

export default async function AnalyticsSectionTitleWidget({ req: _req }: WidgetServerProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.1rem 0.25rem 0.4rem',
      }}
    >
      <h2
        style={{
          color: 'var(--theme-text)',
          fontSize: '2rem',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        Analytics
      </h2>
    </div>
  )
}
