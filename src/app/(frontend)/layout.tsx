import React from 'react'
import './styles.css'

export const metadata = {
  title: 'Tierarztpraxis Dr. Tune Lazri | Wien',
  description: 'Tierarztpraxis Dr. Tune Lazri in Wien. Hausbesuche, Vorsorge, Diagnostik, Operationen. Mit Leidenschaft für Ihre Lieblinge.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="theme-bg-primary theme-text-primary antialiased theme-transition">
        {children}
      </body>
    </html>
  )
}
