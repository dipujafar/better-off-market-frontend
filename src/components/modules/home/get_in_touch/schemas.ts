import { z } from 'zod'

export const subscriptionFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  counties: z
    .array(z.string())
    .min(1, 'Please select at least one county'),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      'Image must be less than 5MB'
    )
    .refine(
      (file) => !file || file.type.startsWith('image/'),
      'File must be an image'
    ),
})

export type SubscriptionFormData = z.infer<typeof subscriptionFormSchema>