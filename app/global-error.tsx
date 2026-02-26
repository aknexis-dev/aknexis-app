'use client'

import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-navy-950 text-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="font-display font-700 text-2xl text-slate-200 mb-3">Something went wrong</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            An unexpected error occurred. Our team has been notified. Please try again or contact us if the issue persists.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={reset}
              className="px-5 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold text-sm rounded-xl transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-5 py-3 bg-white/[0.05] hover:bg-white/[0.09] text-slate-300 font-semibold text-sm rounded-xl border border-white/[0.09] transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
