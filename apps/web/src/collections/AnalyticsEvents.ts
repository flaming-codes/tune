import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

import { normalizeAnalyticsEvent } from '@/lib/analytics/schema'

function readHeader(headers: unknown, name: string): string | undefined {
  if (!headers || typeof headers !== 'object') return undefined

  if (
    'get' in headers &&
    typeof (headers as { get: (key: string) => string | null }).get === 'function'
  ) {
    const value = (headers as { get: (key: string) => string | null }).get(name)
    return value ?? undefined
  }

  const bag = headers as Record<string, string | string[] | undefined>
  const value = bag[name] ?? bag[name.toLowerCase()]
  if (Array.isArray(value)) return value[0]
  return value
}

const normalizeEventHook: CollectionBeforeValidateHook = ({ data, req }) => {
  const forwardedFor = readHeader(req.headers, 'x-forwarded-for')
  const ipAddress = forwardedFor?.split(',')[0]?.trim() || readHeader(req.headers, 'x-real-ip')
  const userAgent = readHeader(req.headers, 'user-agent')

  return normalizeAnalyticsEvent((data ?? {}) as Record<string, unknown>, {
    ipAddress,
    userAgent,
  })
}

export const AnalyticsEvents: CollectionConfig = {
  slug: 'analytics-events',
  admin: {
    useAsTitle: 'eventName',
    defaultColumns: ['eventType', 'eventName', 'path', 'occurredAt', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: () => false,
  },
  hooks: {
    beforeValidate: [normalizeEventHook],
  },
  fields: [
    {
      name: 'eventType',
      type: 'select',
      options: [
        { label: 'Page', value: 'page' },
        { label: 'Track', value: 'track' },
        { label: 'Identify', value: 'identify' },
      ],
      required: true,
      index: true,
    },
    { name: 'eventName', type: 'text', required: true, index: true },
    { name: 'path', type: 'text', index: true },
    { name: 'url', type: 'text' },
    { name: 'referrer', type: 'text' },
    { name: 'locale', type: 'text' },
    { name: 'userId', type: 'text', index: true },
    { name: 'anonymousId', type: 'text', index: true },
    { name: 'sessionId', type: 'text', index: true },
    { name: 'properties', type: 'json' },
    { name: 'context', type: 'json' },
    { name: 'userAgent', type: 'text' },
    { name: 'ipAddress', type: 'text', index: true },
    { name: 'occurredAt', type: 'date', required: true, index: true },
  ],
  indexes: [
    { fields: ['eventType', 'occurredAt'] },
    { fields: ['path', 'occurredAt'] },
    { fields: ['anonymousId', 'occurredAt'] },
  ],
}
