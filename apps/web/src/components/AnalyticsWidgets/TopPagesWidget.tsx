import type { WidgetServerProps } from 'payload'

import { getTopViewedPages } from '@/lib/analytics/dashboardStats'

function TopPagesList({
  title,
  rows,
}: {
  title: string
  rows: Array<{ path: string; views: number }>
}) {
  return (
    <div
      style={{
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '10px',
        display: 'grid',
        gap: '0.5rem',
        padding: '1rem',
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
        {title}
      </p>

      {rows.length === 0 ? (
        <p style={{ color: 'var(--theme-elevation-600)', margin: 0 }}>No page views yet</p>
      ) : (
        <ol
          style={{
            display: 'grid',
            gap: '0.45rem',
            listStyle: 'decimal',
            margin: 0,
            paddingLeft: '1rem',
          }}
        >
          {rows.map((row) => (
            <li
              key={`${title}-${row.path}`}
              style={{
                alignItems: 'baseline',
                color: 'var(--theme-text)',
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={row.path}
              >
                {row.path}
              </span>
              <strong style={{ color: 'var(--theme-elevation-700)', fontSize: '0.95rem' }}>
                {row.views}
              </strong>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default async function TopPagesWidget({ req }: WidgetServerProps) {
  const topPages = await getTopViewedPages(req.payload, 5)

  return (
    <div className="card" style={{ display: 'grid', gap: '1rem', padding: '1.5rem' }}>
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
        Top Viewed Pages
      </h3>

      <div
        style={{
          display: 'grid',
          gap: '0.9rem',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        }}
      >
        <TopPagesList title="Last 24h" rows={topPages.last24Hours} />
        <TopPagesList title="Last 7 days" rows={topPages.last7Days} />
      </div>
    </div>
  )
}
