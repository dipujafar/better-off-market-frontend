"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Camera, SquarePen } from "lucide-react";

// Zod validation schema
const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.string().min(1, "Location is required"),
  company: z.string().optional().default(""),
  bio: z.string().optional().default(""),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
  defaultData?: Partial<ProfileFormData>;
  defaultImage?: string;
  onSubmit?: (data: ProfileFormData, image: File | null) => Promise<void>;
}

export default function ProfileEditForm({
  defaultData = {
    firstName: "James",
    lastName: "Butler",
    email: "james.b@example.com",
    phone: "+1 (555) 000-0000",
    location: "City, State",
    company: "",
    bio: "",
  },
  defaultImage = "/user_profile.jpg",
  onSubmit,
}: ProfileEditFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(defaultImage);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema as any),
    defaultValues: defaultData as ProfileFormData,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be less than 5MB");
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(data, selectedImage);
      } else {
        // Default behavior: log the data
        console.log("Form data:", data);
        console.log("Image file:", selectedImage);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save changes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setImagePreview(defaultImage);
    setSelectedImage(null);
  };

  const fullName = `${defaultData.firstName} ${defaultData.lastName}`;

  return (
    <div className="w-full  bg-white rounded-lg space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-4 p-6 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] border border-[#ECEEF0] rounded-xl">
        <div className="relative">
          <div className="size-24 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={imagePreview}
              alt={fullName}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => document.getElementById("image-input")?.click()}
            className="absolute -bottom-1 -right-1 bg-primary-color hover:bg-slate-800 text-white rounded-full p-2 transition-colors"
            title="Change profile image"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            aria-label="Upload profile image"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-primary-black">{fullName}</h2>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-6 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] border border-[#ECEEF0] rounded-xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 text-slate-900">
            <SquarePen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-primary-black">
            Edit personal information
          </h3>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First name
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                className={`w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors ${
                  errors.firstName ? "border-red-500" : "border-gray-100"
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                className={`w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors ${
                  errors.lastName ? "border-red-500" : "border-gray-100"
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors ${
                errors.email ? "border-red-500" : "border-gray-100"
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              className={`w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors ${
                errors.phone ? "border-red-500" : "border-gray-100"
              }`}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              {...register("location")}
              className={`w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors ${
                errors.location ? "border-red-500" : "border-gray-100"
              }`}
              placeholder="City, State"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Company
            </label>
            <input
              id="company"
              type="text"
              {...register("company")}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
              placeholder="Enter company Name"
            />
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Bio
            </label>
            <textarea
              id="bio"
              {...register("bio")}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors resize-none"
              rows={4}
              placeholder="Enter a short bio about yourself and/or your company"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-2 bg-primary-color hover:bg-slate-800 disabled:bg-slate-600 text-white font-medium rounded-md transition-colors cursor-pointer"
            >
              {isLoading ? "Saving..." : "Save changes"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-8 py-2 bg-white hover:bg-gray-50 disabled:bg-gray-100 text-primary-black font-medium border border-primary-border-color rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
