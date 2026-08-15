"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { LoaderIcon } from "@/icons";
import { errorModification } from "@/lib/errors/errorModification";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";

// Zod validation schema
const changePasswordSchema = z
  .object({
    previousPassword: z.string().min(1, "Previous password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    retypePassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.retypePassword, {
    message: "Passwords don't match",
    path: ["retypePassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [showPreviousPassword, setShowPreviousPassword] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema as any),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    const formattedData = {
      oldPassword: data.previousPassword,
      newPassword: data.newPassword,
      confirmPassword: data.retypePassword,
    };

    try {
      await changePassword(formattedData).unwrap();
      toast.success("Successfully changed your password!");
      dispatch(logout());
      router.refresh();
      reset();
    } catch (error) {
      const errorMessage = errorModification(error);
      toast.error(errorMessage);
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
          <div className="relative">
            <input
              type={showPreviousPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("previousPassword")}
              className="w-full px-4 py-3 bg-[#F2F4F6] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-white transition"
            />
            {showPreviousPassword ? (
              <EyeOff
                size={22}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowPreviousPassword(!showPassword)}
              />
            ) : (
              <Eye
                size={22}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowPreviousPassword(!showPassword)}
              />
            )}
          </div>
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("newPassword")}
              className="w-full px-4 py-3 bg-[#F2F4F6] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-white transition"
            />
            {showPassword ? (
              <EyeOff
                size={22}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                size={22}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
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
          <div className="relative">
            <input
              type={showRetypePassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("retypePassword")}
              className="w-full px-4 py-3 bg-[#F2F4F6] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-white transition"
            />
            {showRetypePassword ? (
              <EyeOff
                size={22}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
              />
            ) : (
              <Eye
                size={22}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
              />
            )}
          </div>
          {errors.retypePassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.retypePassword.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="px-8 py-5 bg-primary-color text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span>
                  <LoaderIcon className="animate-spin" />
                </span>
                <span> Saving...</span>
              </div>
            ) : (
              "Save changes"
            )}
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
