import type { AdminViewServerProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { Button } from '@payloadcms/ui/elements/Button'
import { CopyToClipboard } from '@payloadcms/ui/elements/CopyToClipboard'
import { Pill } from '@payloadcms/ui/elements/Pill'
import React from 'react'
import { getLocalIpAddress } from '@/lib/getLocalIp'

export default async function LocalIpWidget({
  initPageResult,
  params: _params,
  searchParams,
}: AdminViewServerProps) {
  const ip = getLocalIpAddress()
  const formUrl = ip ? `http://${ip}` : undefined
  const adminUrl = ip ? `http://${ip}/admin` : undefined

  if (!initPageResult.req.user) {
    return (
      <Gutter>
        <p>You must be logged in to view this page.</p>
      </Gutter>
    )
  }

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '2rem 0',
            maxWidth: '480px',
          }}
        >
          <h1
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--theme-text)',
              margin: 0,
            }}
          >
            Local IP Address
          </h1>

          {ip ? (
            <>
              {/* IP display + copy */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <code
                  style={{
                    fontSize: '1.5rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--theme-text)',
                    backgroundColor: 'var(--theme-elevation-100)',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                  }}
                >
                  {ip}
                </code>
                <CopyToClipboard value={ip} />
              </div>

              {/* Quick-access links */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button buttonStyle="primary" el="anchor" newTab url={formUrl}>
                  Form Page
                </Button>
                <Button buttonStyle="secondary" el="anchor" newTab url={adminUrl}>
                  Admin
                </Button>
              </div>
            </>
          ) : (
            <Pill pillStyle="error">No local IP address found</Pill>
          )}
        </div>
      </Gutter>
    </DefaultTemplate>
  )
}
