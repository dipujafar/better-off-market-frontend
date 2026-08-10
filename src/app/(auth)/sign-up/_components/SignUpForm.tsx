"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/images/logo_blue.png";
import Image from "next/image";
import Link from "next/link";
import { useCreateUserMutation } from "@/redux/api/authApi";
import { errorModification } from "@/lib/errors/errorModification";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "@/icons";

// Zod validation schema
const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
    // rememberMe: z.boolean().default(false),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms & Conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    // Cast schema to any to avoid zod version/type incompatibility with @hookform/resolvers
    resolver: zodResolver(signupSchema as any),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      // rememberMe: false,
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: SignupFormData) => {
    const formattedData = {
      name: data.fullName,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await createUser(formattedData).unwrap();
      sessionStorage.setItem("signUpToken", res?.data?.otpToken?.token);
      router.push("/verify-otp?sign_verification");

      setError(null);
    } catch (err) {
      const error = errorModification(err);
      toast.error(error);
      setError(error);
    }
  };

  return (
    <div className="w-full xl:max-w-4xl md:max-w-xl mx-auto rounded-lg bg-white p-8 shadow-lg">
      {/* Logo */}
      <div className="mb-2 text-center">
        <div className="inline-flex flex-col items-center">
          <Image
            src={logo}
            alt="BetterOffMarket Logo"
            width={1200}
            height={1200}
            className="w-32"
          />
        </div>
      </div>

      {/* Title and Subtitle */}
      <h1 className="mb-2 text-center lg:text-3xl md:text-2xl text-xl font-bold text-gray-900">
        You're in the Right Place
      </h1>
      <p className="mb-6 text-center">Create a free account for full access</p>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name Input */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter Full Name"
            {...register("fullName")}
            className="w-full rounded-lg border border-[#3D3D3D] px-4 py-2.5 text-gray-900 placeholder-gray-400 transition focus:border-[#3D3D3D] focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className="w-full rounded-lg border border-[#3D3D3D] px-4 py-2.5 text-gray-900 placeholder-gray-400 transition focus:border-[#3D3D3D] focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input with Show/Hide */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className="w-full rounded-lg border border-[#3D3D3D] px-4 py-2.5 text-gray-900 placeholder-gray-400 transition focus:border-[#3D3D3D] focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Input with Show/Hide */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword")}
              className="w-full rounded-lg border border-[#3D3D3D] px-4 py-2.5 text-gray-900 placeholder-gray-400 transition focus:border-[#3D3D3D] focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Remember Me */}
        {/* <label
          htmlFor="rememberMe"
          className="flex items-center gap-2 text-sm text-gray-700"
        >
          <input
            id="rememberMe"
            type="checkbox"
            {...register("rememberMe")}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 transition focus:ring-blue-500 accent-primary-color"
          />
          Remember me
        </label> */}

        {/* Agree to Terms */}
        <label
          htmlFor="agreeToTerms"
          className="flex mt-2  gap-2 text-sm text-gray-700"
        >
          <input
            id="agreeToTerms"
            type="checkbox"
            {...register("agreeToTerms")}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 transition focus:ring-blue-500 accent-primary-color"
          />
          <span>
            I have read and agree to the BetterOffMarket{" "}
            <Link
              href="/terms-conditions"
              className="text-[#1F4E8B] hover:text-blue-900 font-semibold underline "
            >
              Terms & Conditions
            </Link>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-xs text-red-600">{errors.agreeToTerms.message}</p>
        )}

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading || !agreeToTerms}
          className="w-full rounded-lg bg-gray-900 px-4 py-2.5 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <LoaderIcon className="-ml-1 mr-3" />
              <span className="sr-only">Signing up...</span>
            </span>
          ) : (
            "Sign up"
          )}
        </button>
      </form>

      {/* already have an account */}
      <p className="mt-4 text-center text-sm text-gray-700">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[#0095FF] hover:text-blue-900"
        >
          Sign In
        </Link>
      </p>

      {/* Continue without Sign In */}
      <p className="mt-4 text-center text-sm text-gray-700">
        <Link
          href="/"
          className="font-medium text-[#0095FF] hover:text-blue-900"
        >
          Continue without Sign In
        </Link>
      </p>
    </div>
  );
}
