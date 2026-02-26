import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-radial-glow opacity-30 pointer-events-none" />

      <div className="relative text-center max-w-lg">
        <div className="font-display font-800 text-[120px] sm:text-[160px] leading-none gradient-text opacity-20 select-none mb-4">
          404
        </div>
        <h1 className="font-display font-700 text-2xl sm:text-3xl text-slate-200 mb-4 -mt-8">
          Page not found.
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
          Let&rsquo;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.05] hover:bg-white/[0.09] text-slate-300 font-semibold text-sm rounded-xl border border-white/[0.09] hover:border-white/[0.16] transition-all duration-200"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
