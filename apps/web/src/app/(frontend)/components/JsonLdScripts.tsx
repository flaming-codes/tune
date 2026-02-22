import React from 'react'
import { JsonLdScript } from 'next-seo'

interface JsonLdScriptsProps {
  scriptIdPrefix: string
  items: Record<string, unknown>[]
}

export function JsonLdScripts({ scriptIdPrefix, items }: JsonLdScriptsProps) {
  if (!items.length) return null

  return (
    <>
      {items.map((item, index) => (
        <JsonLdScript
          key={`${scriptIdPrefix}-${index}`}
          scriptKey={`${scriptIdPrefix}-${index}`}
          id={`${scriptIdPrefix}-${index}`}
          data={item}
        />
      ))}
    </>
  )
}
