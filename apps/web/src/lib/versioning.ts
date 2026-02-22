import type { CollectionConfig, GlobalConfig } from 'payload'

export const DEFAULT_MAX_VERSIONS = 50
export const DEFAULT_AUTOSAVE_INTERVAL_MS = 1200

type SharedVersionsOptions = {
  autosaveIntervalMs?: number
  showSaveDraftButton?: boolean
}

type CollectionVersionsOptions = SharedVersionsOptions & {
  maxPerDoc?: number
}

type GlobalVersionsOptions = SharedVersionsOptions & {
  max?: number
}

function createDraftsConfig(options: SharedVersionsOptions = {}) {
  return {
    autosave: {
      interval: options.autosaveIntervalMs ?? DEFAULT_AUTOSAVE_INTERVAL_MS,
      showSaveDraftButton: options.showSaveDraftButton ?? false,
    },
  }
}

export function createCollectionVersions(
  options: CollectionVersionsOptions = {},
): NonNullable<CollectionConfig['versions']> {
  return {
    maxPerDoc: options.maxPerDoc ?? DEFAULT_MAX_VERSIONS,
    drafts: createDraftsConfig(options),
  }
}

export function createGlobalVersions(
  options: GlobalVersionsOptions = {},
): NonNullable<GlobalConfig['versions']> {
  return {
    max: options.max ?? DEFAULT_MAX_VERSIONS,
    drafts: createDraftsConfig(options),
  }
}
