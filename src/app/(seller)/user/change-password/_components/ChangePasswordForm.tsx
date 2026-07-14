'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

// Zod validation schema
const changePasswordSchema = z
  .object({
    previousPassword: z
      .string()
      .min(1, 'Previous password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    retypePassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.retypePassword, {
    message: "Passwords don't match",
    path: ['retypePassword'],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema as any),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Password changed:', data);
      setSubmitMessage({
        type: 'success',
        text: 'Password changed successfully!',
      });
      reset();
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full  p-6 bg-white rounded-lg border border-[#ECEEF0] shadow-[0_10px_30px_0_rgba(15,23,42,0.05)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Lock className="w-6 h-6 text-gray-900" />
        <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Previous Password Field */}
        <div>
          <label className="block text-sm font-medium text-[#594139] mb-2">
            Previous password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register('previousPassword')}
            className="w-full px-4 py-3 bg-[#F2F4F6] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-white transition"
          />
          {errors.previousPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.previousPassword.message}
            </p>
          )}
        </div>

        {/* New Password Field */}
        <div>
          <label className="block text-sm font-medium text-[#594139] mb-2">
            New password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register('newPassword')}
            className="w-full px-4 py-3 bg-[#F2F4F6] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-white transition"
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Retype Password Field */}
        <div>
          <label className="block text-sm font-medium text-[#594139] mb-2">
            Retype password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register('retypePassword')}
            className="w-full px-4 py-3 bg-[#F2F4F6] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-white transition"
          />
          {errors.retypePassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.retypePassword.message}
            </p>
          )}
        </div>

        {/* Submit Message */}
        {submitMessage && (
          <div
            className={`p-3 rounded-lg text-sm ${
              submitMessage.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {submitMessage.text}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-5 bg-primary-color text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
          <Button
            type="button"
            onClick={() => reset()}
            variant="outline"
            className="px-8 py-5 border border-primary-border-color text-[#594139] font-medium rounded-lg hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
