import { z } from 'zod'

export const analyticsEventTypeSchema = z.enum(['page', 'track', 'identify'])

const analyticsPropertiesSchema = z.record(z.string(), z.unknown())

export const analyticsIngestSchema = z
  .object({
    eventType: analyticsEventTypeSchema,
    eventName: z.string().trim().min(1).max(120).optional(),
    path: z.string().trim().max(500).optional(),
    url: z.string().trim().max(2000).optional(),
    referrer: z.string().trim().max(2000).optional(),
    locale: z.string().trim().max(32).optional(),
    userId: z.string().trim().max(120).optional(),
    anonymousId: z.string().trim().max(120).optional(),
    sessionId: z.string().trim().max(120).optional(),
    properties: analyticsPropertiesSchema.optional(),
    context: analyticsPropertiesSchema.optional(),
    occurredAt: z.union([z.iso.datetime(), z.date()]).optional(),
    userAgent: z.string().trim().max(1000).optional(),
    ipAddress: z.string().trim().max(120).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.eventType === 'track' && !value.eventName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['eventName'],
        message: 'eventName is required for track events',
      })
    }
  })

export type AnalyticsIngestInput = z.input<typeof analyticsIngestSchema>
export type AnalyticsEventData = z.infer<typeof analyticsIngestSchema>

export function normalizeAnalyticsEvent(
  input: unknown,
  meta?: { ipAddress?: string; userAgent?: string },
): AnalyticsEventData {
  const parsed = analyticsIngestSchema.parse(input)

  return {
    ...parsed,
    eventName: parsed.eventName ?? (parsed.eventType === 'page' ? 'page_view' : 'identify'),
    occurredAt:
      typeof parsed.occurredAt === 'string'
        ? parsed.occurredAt
        : (parsed.occurredAt ?? new Date()).toISOString(),
    ipAddress: parsed.ipAddress ?? meta?.ipAddress,
    userAgent: parsed.userAgent ?? meta?.userAgent,
  }
}
