"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Check } from "lucide-react";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { LoaderIcon } from "@/icons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { errorModification } from "@/lib/errors/errorModification";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPass, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();

  const formResolver = zodResolver(resetPasswordSchema as any);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormValues>({
    resolver: formResolver,
    mode: "onBlur",
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const formattedData = {
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    };
    try {
      const res = await resetPass(formattedData).unwrap();
      sessionStorage.removeItem("resetPasswordToken");
      toast.success("Successfully reset your password! Please login.");
      router.replace("/login");
      reset();
    } catch (error) {
      const errorMessage = errorModification(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full xl:max-w-4xl md:max-w-xl mx-auto rounded-2xl bg-white p-8 shadow-2xl">
      {/* Header */}
      <h1 className="mb-2 text-center lg:text-3xl md:text-2xl text-xl font-bold text-gray-900">
        Reset Password
      </h1>
      <p className="mb-6 md:text-base text-sm text-center text-gray-600">
        Set your new password to continue
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Set Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Password
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-[#3D3D3D] px-4 py-2.5 text-gray-900 placeholder-gray-400 transition focus:border-[#3D3D3D] focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors hover:text-gray-900"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-[#3D3D3D] px-4 py-2.5 text-gray-900 placeholder-gray-400 transition focus:border-[#3D3D3D] focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors hover:text-gray-900"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-gray-900 py-2.5 font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <LoaderIcon className="-ml-1 mr-3" />
              <span className="sr-only">Resetting password...</span>
            </span>
          ) : (
            "Reset password"
          )}
        </button>
      </form>
    </div>
  );
}
