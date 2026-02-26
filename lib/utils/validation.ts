import { z } from 'zod'

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(val),
      { message: 'Please enter a valid phone number' }
    ),
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .max(200, 'Company name must be under 200 characters'),
  jobTitle: z.string().optional(),
  serviceInterest: z.enum([
    'software_engineering',
    'growth_intelligence',
    'business_foundation',
    'not_sure',
  ], { required_error: 'Please select a service area' }),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be under 2000 characters'),
})

export type LeadFormSchema = z.infer<typeof leadFormSchema>
