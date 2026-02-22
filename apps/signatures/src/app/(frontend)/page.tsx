import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Signatures</h1>
        <p className="theme-text-secondary">PayloadCMS foundation is ready.</p>
        <Link className="theme-text-primary underline" href="/admin">
          Open Admin
        </Link>
      </div>
    </main>
  )
}
