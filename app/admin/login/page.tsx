'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, AlertCircle, Lock } from 'lucide-react'
import { SITE_NAME } from '@/lib/navigation.config'

type ApiError = {
  code?: string
  message?: string
  details?: unknown
}

export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        const apiError: ApiError = data.error

        setError(
          typeof apiError === 'string'
            ? apiError
            : apiError?.message || 'Invalid credentials'
        )
        return
      }

      router.push('/admin')
    } catch {
      setError('Connection error. Please check your network.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-radial-glow opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <div className="text-center">
            <h1 className="font-display font-800 text-xl text-slate-50">
              {SITE_NAME}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Internal Operations Platform
            </p>
          </div>
        </div>

        <div className="card-surface rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-700 text-base text-slate-200">
                Admin Sign In
              </h2>
              <p className="text-xs text-slate-600">
                Authorized personnel only
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-sm text-slate-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-11 bg-white/[0.04] border border-white/[0.10] rounded-xl text-sm text-slate-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="flex items-center justify-center gap-2.5 w-full px-6 py-3.5 mt-2 rounded-xl font-semibold text-sm bg-accent-600 text-white disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-700 mt-5">
          Protected system. All access is logged and monitored.
        </p>
      </div>
    </div>
  )
}