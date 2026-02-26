'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react'
import { leadFormSchema, type LeadFormSchema } from '@/lib/utils/validation'
import { submitLead } from '@/lib/api/leads.api'
import { cn } from '@/lib/utils/cn'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const SERVICE_OPTIONS = [
  { value: 'software_engineering',  label: 'Software Engineering' },
  { value: 'growth_intelligence',   label: 'Growth & Intelligence' },
  { value: 'business_foundation',   label: 'Business Foundation' },
  { value: 'not_sure',              label: 'Not sure yet — let\'s talk' },
]

interface InputFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

function FieldWrapper({ label, error, required, children }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">
        {label}
        {required && <span className="ml-1 text-accent-400">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

const inputBase = cn(
  'w-full px-4 py-3 bg-white/[0.04] border border-white/[0.10] rounded-xl',
  'text-sm text-slate-200 placeholder:text-slate-600',
  'transition-all duration-200',
  'focus:outline-none focus:border-accent-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-accent-500/15',
  'hover:border-white/[0.16]'
)

const inputError = 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/15'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverError, setServerError] = useState<string>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormSchema>({
    resolver: zodResolver(leadFormSchema),
  })

  const onSubmit = async (data: LeadFormSchema) => {
    setStatus('loading')
    setServerError('')

    const result = await submitLead(data)

    if (result.success) {
      setStatus('success')
      reset()
    } else {
      setStatus('error')
      setServerError(result.error ?? 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-teal-400" />
        </div>
        <div>
          <h3 className="font-display font-700 text-xl text-slate-100 mb-2">
            Message received
          </h3>
          <p className="text-sm text-slate-400 max-w-sm">
            Thank you for reaching out. Our team will review your inquiry and respond within one business day.
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-accent-400 hover:text-accent-300 transition-colors duration-200 underline underline-offset-2"
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>

      {/* Name + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldWrapper label="Full Name" required error={errors.fullName?.message}>
          <input
            {...register('fullName')}
            type="text"
            placeholder="Alexandra Chen"
            autoComplete="name"
            className={cn(inputBase, errors.fullName && inputError)}
          />
        </FieldWrapper>
        <FieldWrapper label="Company Name" required error={errors.companyName?.message}>
          <input
            {...register('companyName')}
            type="text"
            placeholder="Acme Corporation"
            autoComplete="organization"
            className={cn(inputBase, errors.companyName && inputError)}
          />
        </FieldWrapper>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldWrapper label="Email Address" required error={errors.email?.message}>
          <input
            {...register('email')}
            type="email"
            placeholder="alex@company.com"
            autoComplete="email"
            className={cn(inputBase, errors.email && inputError)}
          />
        </FieldWrapper>
        <FieldWrapper label="Phone Number" error={errors.phone?.message}>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            className={cn(inputBase, errors.phone && inputError)}
          />
        </FieldWrapper>
      </div>

      {/* Job title */}
      <FieldWrapper label="Job Title" error={errors.jobTitle?.message}>
        <input
          {...register('jobTitle')}
          type="text"
          placeholder="Chief Technology Officer"
          autoComplete="organization-title"
          className={cn(inputBase)}
        />
      </FieldWrapper>

      {/* Service interest */}
      <FieldWrapper label="Service Interest" required error={errors.serviceInterest?.message}>
        <select
          {...register('serviceInterest')}
          className={cn(
            inputBase,
            'appearance-none cursor-pointer',
            errors.serviceInterest && inputError
          )}
          defaultValue=""
        >
          <option value="" disabled className="bg-navy-900 text-slate-500">
            Select a service area...
          </option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-navy-900 text-slate-200">
              {opt.label}
            </option>
          ))}
        </select>
      </FieldWrapper>

      {/* Message */}
      <FieldWrapper label="Tell us about your project" required error={errors.message?.message}>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Describe your goals, current challenges, timeline, and any relevant context..."
          className={cn(inputBase, 'resize-none', errors.message && inputError)}
        />
      </FieldWrapper>

      {/* Server error */}
      {status === 'error' && serverError && (
        <div className="flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'flex items-center justify-center gap-2.5 w-full px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200',
          'bg-accent-600 hover:bg-accent-700 text-white',
          'hover:shadow-[0_0_24px_rgba(59,130,246,0.35)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
          'disabled:opacity-60 disabled:cursor-not-allowed'
        )}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending your message...
          </>
        ) : (
          <>
            Send Inquiry
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-xs text-slate-600 text-center">
        We respond within one business day. Your information is kept strictly confidential.
      </p>
    </form>
  )
}
