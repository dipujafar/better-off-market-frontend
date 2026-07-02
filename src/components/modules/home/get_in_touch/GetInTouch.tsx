'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { subscriptionFormSchema, type SubscriptionFormData } from '@/lib/schemas'
import { CountySelector } from './county-selector'
import { Upload, Loader2, Check, AlertCircle } from 'lucide-react'

export function SubscriptionForm() {
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      email: '',
      counties: [],
      image: undefined,
    },
  })

  const counties = watch('counties')
  const imageFile = watch('image')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Image must be less than 5MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select an image file')
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        setErrorMessage('')
      }
      reader.readAsDataURL(file)

      setValue('image', file)
    }
  }

  const onSubmit = async (data: SubscriptionFormData) => {
    setStatus('loading')
    setErrorMessage('')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log('Form submitted:', {
        email: data.email,
        counties: data.counties,
        hasImage: !!data.image,
        imageSize: data.image?.size,
      })

      setStatus('success')
      reset()
      setPreview(null)

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 rounded-3xl p-8 md:p-12 text-white">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Get notified of new listings in your area
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Enter your email and we&apos;ll alert you when new properties are added
              near you. Never miss an investment opportunity again.
            </p>
          </div>

          {/* Right Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-100">
                Upload Image (Optional)
              </label>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!preview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-blue-200 rounded-lg p-6 hover:border-white transition-colors cursor-pointer bg-blue-700/30"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload size={24} className="text-blue-100" />
                      <span className="text-sm text-blue-100">
                        Click to upload image
                      </span>
                      <span className="text-xs text-blue-200">
                        PNG, JPG, GIF (Max 5MB)
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null)
                        setValue('image', undefined)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ''
                        }
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              {errors.image && (
                <p className="text-red-300 text-sm mt-2">{errors.image.message}</p>
              )}
              {errorMessage && (
                <p className="text-red-300 text-sm mt-2">{errorMessage}</p>
              )}
            </div>

            {/* County Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-100">
                County
              </label>
              <CountySelector
                selectedCounties={counties}
                onCountiesChange={(newCounties) =>
                  setValue('counties', newCounties)
                }
              />
              {errors.counties && (
                <p className="text-red-300 text-sm mt-2">
                  {errors.counties.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-100">
                Email
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                {...register('email')}
                className="w-full px-4 py-3 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.email && (
                <p className="text-red-300 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full mt-6 px-8 py-3 rounded-full font-semibold text-blue-900 bg-white hover:bg-gray-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' && (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Subscribing...
                </>
              )}
              {status === 'success' && (
                <>
                  <Check size={18} />
                  Subscribed!
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle size={18} />
                  Try Again
                </>
              )}
              {status === 'idle' && 'Subscribe'}
            </button>

            {/* Success Message */}
            {status === 'success' && (
              <div className="bg-green-500/20 border border-green-300 rounded-lg p-3 text-sm text-green-100">
                ✓ Successfully subscribed! You&apos;ll receive notifications for {counties.join(', ')}.
              </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
              <div className="bg-red-500/20 border border-red-300 rounded-lg p-3 text-sm text-red-100">
                {errorMessage || 'Something went wrong. Please try again.'}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

function X({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
