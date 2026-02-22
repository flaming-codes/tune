'use client'

import React from 'react'
import { Banner } from '@payloadcms/ui/elements/Banner'
import { Button } from '@payloadcms/ui/elements/Button'
import { Collapsible } from '@payloadcms/ui/elements/Collapsible'
import { CopyToClipboard } from '@payloadcms/ui/elements/CopyToClipboard'
import { Gutter } from '@payloadcms/ui/elements/Gutter'
import { Pill } from '@payloadcms/ui/elements/Pill'

type NetworkInfoClientProps = {
  allIps: string[]
  cmsUrl: string | undefined
  formUrl: string | undefined
  primaryIp: string | undefined
}

export default function NetworkInfoClient({
  allIps,
  cmsUrl,
  formUrl,
  primaryIp,
}: NetworkInfoClientProps) {
  if (!primaryIp) {
    return (
      <Gutter>
        <Banner type="error">No network interfaces detected</Banner>
      </Gutter>
    )
  }

  return (
    <div className="card">
      {/* Header with Status */}
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <h3
          style={{
            color: 'var(--theme-text)',
            fontSize: '1rem',
            fontWeight: 600,
            margin: 0,
          }}
        >
          Network
        </h3>
        <Pill pillStyle="success">Online</Pill>
      </div>

      {/* Primary IP with Copy */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label
          style={{
            color: 'var(--theme-elevation-500)',
            display: 'block',
            fontSize: '0.75rem',
            letterSpacing: '0.025em',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
          }}
        >
          Primary IP
        </label>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          <code
            style={{
              backgroundColor: 'var(--theme-elevation-100)',
              borderRadius: '4px',
              color: 'var(--theme-text)',
              flex: 1,
              fontFamily: 'var(--font-mono)',
              fontSize: '1.125rem',
              padding: '0.5rem 0.75rem',
            }}
          >
            {primaryIp}
          </code>
          <CopyToClipboard value={primaryIp} />
        </div>
      </div>

      {/* Quick Access URLs */}
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: '1fr 1fr',
          marginBottom: allIps.length > 1 ? '1.5rem' : 0,
        }}
      >
        {/* CMS URL */}
        <div>
          <label
            style={{
              color: 'var(--theme-elevation-500)',
              display: 'block',
              fontSize: '0.75rem',
              letterSpacing: '0.025em',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            CMS (Admin)
          </label>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <code
              style={{
                backgroundColor: 'var(--theme-elevation-50)',
                borderRadius: '4px',
                color: 'var(--theme-elevation-700)',
                flex: 1,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                overflow: 'hidden',
                padding: '0.375rem 0.5rem',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={cmsUrl}
            >
              {cmsUrl}
            </code>
            <CopyToClipboard value={cmsUrl} />
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <Button buttonStyle="primary" el="anchor" newTab size="small" url={cmsUrl}>
              Open CMS
            </Button>
          </div>
        </div>

        {/* Form Page URL */}
        <div>
          <label
            style={{
              color: 'var(--theme-elevation-500)',
              display: 'block',
              fontSize: '0.75rem',
              letterSpacing: '0.025em',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            Form Page
          </label>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <code
              style={{
                backgroundColor: 'var(--theme-elevation-50)',
                borderRadius: '4px',
                color: 'var(--theme-elevation-700)',
                flex: 1,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                overflow: 'hidden',
                padding: '0.375rem 0.5rem',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={formUrl}
            >
              {formUrl}
            </code>
            <CopyToClipboard value={formUrl} />
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <Button buttonStyle="secondary" el="anchor" newTab size="small" url={formUrl}>
              Open Form
            </Button>
          </div>
        </div>
      </div>

      {/* All Interfaces (if more than one) */}
      {allIps.length > 1 && (
        <Collapsible header={`All Interfaces (${allIps.length})`} initCollapsed={true}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              paddingTop: '0.5rem',
            }}
          >
            {allIps.map((ip, index) => (
              <code
                key={index}
                style={{
                  backgroundColor: 'var(--theme-elevation-50)',
                  borderRadius: '4px',
                  color: 'var(--theme-elevation-600)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.5rem',
                }}
              >
                {ip}
              </code>
            ))}
          </div>
        </Collapsible>
      )}
    </div>
  )
}
