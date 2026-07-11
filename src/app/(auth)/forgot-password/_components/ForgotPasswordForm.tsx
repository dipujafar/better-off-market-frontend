"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Zod validation schema
const recoverPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});

type RecoverPasswordFormData = z.infer<typeof recoverPasswordSchema>;

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecoverPasswordFormData>({
    resolver: zodResolver(recoverPasswordSchema as any),
  });

  const onSubmit = async (data: RecoverPasswordFormData) => {
    setIsLoading(true);
    setSuccessMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
    
      router.push("/verify-otp");

      // Handle success
      //   setSuccessMessage(
      //     `Verification code has been sent to ${data.email}. Please check your email.`,
      //   );
      reset();
    } catch (error) {
      console.error("Error sending recovery code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full xl:max-w-4xl md:max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 ">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-900 mb-4">
          Recover Password
        </h1>
        <p className="text-primary-black text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Please provide the email address associated with your account, and
          we&apos;ll send you verification code to reset your password.
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm text-center">{successMessage}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className={`w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none border-primary-black ${
              errors.email
                ? "border-red-500 focus:border-red-600 bg-red-50"
                : "border-gray-300 focus:border-primary-black hover:border-gray-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send Code"
          )}
        </button>
      </form>

      {/* Back to Login Link */}
      <div className="text-center mt-6">
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
