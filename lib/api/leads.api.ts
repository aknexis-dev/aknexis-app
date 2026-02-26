import type { LeadFormData, FormStatus } from '@/types'

interface ApiResponse {
  success: boolean
  message?: string
  error?: string
}

export async function submitLead(data: LeadFormData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json() as ApiResponse

    if (!response.ok) {
      return {
        success: false,
        error: result.error ?? 'Something went wrong. Please try again.',
      }
    }

    return { success: true }
  } catch {
    return {
      success: false,
      error: 'Unable to connect. Please check your connection and try again.',
    }
  }
}
