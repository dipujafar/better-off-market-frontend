"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subscriptionFormSchema,
  type SubscriptionFormData,
} from "./schemas";

import { Upload, Loader2, Check, AlertCircle, X } from "lucide-react";
import { CountySelector } from "@/components/shared/county_selector/CountySelector";

export default function SubscriptionForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionFormSchema as any),
    defaultValues: {
      email: "",
      counties: [],
      image: undefined,
    },
  });

  const counties = watch("counties");



  const onSubmit = async (data: SubscriptionFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", {
        email: data.email,
        counties: data.counties,
        hasImage: !!data.image,
        imageSize: data.image?.size,
      });

      setStatus("success");
      reset();

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-95.25 ml-auto w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      

        {/* County Selection */}
        <div>
          <label className="block text-sm font-medium mb-2 text-blue-100  uppercase">
            County
          </label>
          <CountySelector
            selectedCounties={counties}
            onCountiesChange={(newCounties) =>
              setValue("counties", newCounties)
            }
          />
          {errors.counties && (
            <p className="text-red-300 text-sm mt-1">
              {errors.counties.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-blue-100 uppercase">
            Email
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            {...register("email")}
            className="w-full  px-5 py-2.5 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.email && (
            <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="w-40 mt-6 px-8 py-2.5 rounded-full font-semibold text-black bg-white hover:bg-gray-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {status === "loading" && (
            <>
              <Loader2 size={18} className="animate-spin" />
              Subscribing...
            </>
          )}
          {status === "success" && (
            <>
              <Check size={18} />
              Subscribed!
            </>
          )}
          {status === "error" && (
            <>
              <AlertCircle size={18} />
              Try Again
            </>
          )}
          {status === "idle" && "Subscribe"}
        </button>

        {/* Success Message */}
        {status === "success" && (
          <div className="bg-green-500/20 border border-green-300 rounded-lg p-3 text-sm text-green-100">
            ✓ Successfully subscribed! You&apos;ll receive notifications for{" "}
            {counties.join(", ")}.
          </div>
        )}

        {/* Error Message */}
        {status === "error" && (
          <div className="bg-red-500/20 border border-red-300 rounded-lg p-3 text-sm text-red-100">
            {errorMessage || "Something went wrong. Please try again."}
          </div>
        )}
      </form>
    </div>
  );
}
