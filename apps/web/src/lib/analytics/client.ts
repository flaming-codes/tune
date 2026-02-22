'use client'

import Analytics from 'analytics'

import { normalizeAnalyticsEvent } from './schema'
import { envClient } from '@/env/client'

const SESSION_STORAGE_KEY = 'med-site.analytics.session-id'
const ANON_STORAGE_KEY = 'med-site.analytics.anonymous-id'

let analyticsInstance: ReturnType<typeof Analytics> | null = null
const isAnalyticsEnabled = envClient.NEXT_PUBLIC_ANALYTICS_ENABLED

function getOrCreateStorageId(storageKey: string): string {
  const current = window.localStorage.getItem(storageKey)
  if (current) return current

  const created = crypto.randomUUID()
  window.localStorage.setItem(storageKey, created)
  return created
}

function getClientContext() {
  return {
    locale: navigator.language,
    userAgent: navigator.userAgent,
    path: window.location.pathname,
    url: window.location.href,
    referrer: document.referrer || undefined,
    sessionId: getOrCreateStorageId(SESSION_STORAGE_KEY),
    anonymousId: getOrCreateStorageId(ANON_STORAGE_KEY),
  }
}

function postAnalyticsEvent(event: Record<string, unknown>) {
  return fetch('/api/analytics-events', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(event),
    keepalive: true,
  })
}

function payloadTransportPlugin() {
  return {
    name: 'payload-transport',
    page: async ({ payload }: { payload?: Record<string, unknown> }) => {
      const context = getClientContext()
      await postAnalyticsEvent(
        normalizeAnalyticsEvent({
          eventType: 'page',
          ...context,
          properties: payload,
        }),
      )
    },
    track: async ({
      payload,
    }: {
      payload?: { event?: string; properties?: Record<string, unknown> }
    }) => {
      const context = getClientContext()
      await postAnalyticsEvent(
        normalizeAnalyticsEvent({
          eventType: 'track',
          eventName: payload?.event,
          properties: payload?.properties,
          ...context,
        }),
      )
    },
    identify: async ({
      payload,
    }: {
      payload?: { userId?: string; traits?: Record<string, unknown> }
    }) => {
      const context = getClientContext()
      await postAnalyticsEvent(
        normalizeAnalyticsEvent({
          eventType: 'identify',
          userId: payload?.userId,
          properties: payload?.traits,
          ...context,
        }),
      )
    },
  }
}

export function getAnalytics() {
  if (typeof window === 'undefined') return null
  if (!isAnalyticsEnabled) return null

  if (!analyticsInstance) {
    analyticsInstance = Analytics({
      app: 'med-site-web',
      plugins: [payloadTransportPlugin()],
    })
  }

  return analyticsInstance
}

export function trackPage(properties?: Record<string, unknown>) {
  if (!isAnalyticsEnabled) return
  getAnalytics()?.page(properties)
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (!isAnalyticsEnabled) return
  getAnalytics()?.track(eventName, properties)
}

export function identifyUser(userId: string, traits?: Record<string, unknown>) {
  if (!isAnalyticsEnabled) return
  getAnalytics()?.identify(userId, traits)
}
