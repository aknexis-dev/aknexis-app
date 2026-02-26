// ============================================================
// ADMIN DATA HOOKS — React hooks for admin dashboard data
// Lightweight SWR-style hooks without external dependencies.
// Phase-2: swap with SWR or React Query for caching.
// ============================================================

'use client'

import { useState, useEffect, useCallback } from 'react'
import type {
  DashboardStats, Lead, Client, Project, UploadedFile, AuthUser,
  ListLeadsParams, ListClientsParams, ListProjectsParams, ListFilesParams,
} from '@/lib/api/client'
import {
  dashboardApi, leadsApi, clientsApi, projectsApi, filesApi, usersApi,
  ApiClientError,
} from '@/lib/api/client'
import type { PaginationMeta } from '@/lib/utils/api.response'

// ── Generic list hook ─────────────────────────────────────────

interface UseListState<T> {
  data:    T[]
  meta:    PaginationMeta | undefined
  loading: boolean
  error:   string | null
  refetch: () => void
}

function useList<T, P extends Record<string, unknown>>(
  fetcher: (params: P) => Promise<{ data: T[]; meta?: PaginationMeta }>,
  params:  P,
  // Stringify params so effect deps stay stable
  paramsKey: string
): UseListState<T> {
  const [data,    setData]    = useState<T[]>([])
  const [meta,    setMeta]    = useState<PaginationMeta | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const [tick,    setTick]    = useState(0)

  const refetch = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    fetcher(params)
      .then(({ data: d, meta: m }) => {
        if (cancelled) return
        setData(d)
        setMeta(m)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof ApiClientError ? err.message : 'Failed to load data.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey, tick])

  return { data, meta, loading, error, refetch }
}

// ── Generic single-item hook ──────────────────────────────────

interface UseItemState<T> {
  data:    T | null
  loading: boolean
  error:   string | null
  refetch: () => void
}

function useItem<T>(
  fetcher: (id: string) => Promise<T>,
  id:      string | null
): UseItemState<T> {
  const [data,    setData]    = useState<T | null>(null)
  const [loading, setLoading] = useState(!!id)
  const [error,   setError]   = useState<string | null>(null)
  const [tick,    setTick]    = useState(0)

  const refetch = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    if (!id) { setLoading(false); return }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetcher(id)
      .then((d) => { if (!cancelled) setData(d) })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof ApiClientError ? err.message : 'Failed to load.')
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [id, tick]) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch }
}

// ── Dashboard ─────────────────────────────────────────────────

export function useDashboardStats(): {
  stats:   DashboardStats | null
  loading: boolean
  error:   string | null
  refetch: () => void
} {
  const [stats,   setStats]   = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const [tick,    setTick]    = useState(0)

  const refetch = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    dashboardApi.getStats()
      .then((d) => { if (!cancelled) setStats(d) })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof ApiClientError ? err.message : 'Failed to load stats.')
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [tick])

  return { stats, loading, error, refetch }
}

// ── Leads ─────────────────────────────────────────────────────

export function useLeads(params: ListLeadsParams = {}) {
  return useList<Lead, ListLeadsParams>(
    leadsApi.list,
    params,
    JSON.stringify(params)
  )
}

export function useLead(id: string | null) {
  return useItem<Lead>(leadsApi.get, id)
}

// ── Clients ───────────────────────────────────────────────────

export function useClients(params: ListClientsParams = {}) {
  return useList<Client, ListClientsParams>(
    clientsApi.list,
    params,
    JSON.stringify(params)
  )
}

export function useClient(id: string | null) {
  return useItem<Client>(clientsApi.get, id)
}

export function useClientProjects(clientId: string | null) {
  const [data,    setData]    = useState<Project[]>([])
  const [loading, setLoading] = useState(!!clientId)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    if (!clientId) { setLoading(false); return }
    let cancelled = false
    setLoading(true)

    clientsApi.getProjects(clientId)
      .then((d) => { if (!cancelled) setData(d) })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof ApiClientError ? err.message : 'Failed to load projects.')
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [clientId])

  return { data, loading, error }
}

// ── Projects ──────────────────────────────────────────────────

export function useProjects(params: ListProjectsParams = {}) {
  return useList<Project, ListProjectsParams>(
    projectsApi.list,
    params,
    JSON.stringify(params)
  )
}

export function useProject(id: string | null) {
  return useItem<Project>(projectsApi.get, id)
}

// ── Files ─────────────────────────────────────────────────────

export function useFiles(params: ListFilesParams = {}) {
  return useList<UploadedFile, ListFilesParams>(
    filesApi.list,
    params,
    JSON.stringify(params)
  )
}

export function useFile(id: string | null) {
  return useItem<UploadedFile>(filesApi.get, id)
}

// ── Users ─────────────────────────────────────────────────────

export function useUsers(page = 1, limit = 20) {
  return useList<AuthUser, { page: number; limit: number }>(
    (p) => usersApi.list(p.page, p.limit),
    { page, limit },
    `users:${page}:${limit}`
  )
}

// ── Auth state ────────────────────────────────────────────────

export function useCurrentUser() {
  const [user,    setUser]    = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { authApi } = require('@/lib/api/client') as typeof import('@/lib/api/client')
    authApi.me()
      .then((u: AuthUser) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  return { user, loading, isAdmin: user?.role === 'admin', isManager: user?.role !== 'staff' }
}
