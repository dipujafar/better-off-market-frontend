"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "./schemas";
import { Button } from "@/components/ui/button";
import { useContactUsMutation } from "@/redux/api/contactUsApi";
import { errorModification } from "@/lib/errors/errorModification";
import { toast } from "sonner";

export default function ContactForm() {
  const [sendContact, { isLoading }] = useContactUsMutation();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema as any),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    try {
      await sendContact(data).unwrap();
      toast.success("Message received successfully! We will get back to you soon.");
      form.reset();
    } catch (error) {
      const errMessage = errorModification(error);
      console.error(errMessage);
    }
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="lg:space-y-5 space-y-4 "
    >
      {/* Name and Email Grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-primary-gray text-sm font-semibold mb-2"
          >
            Your name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter  your  name"
            {...form.register("name")}
            className="w-full px-4 py-2 bg-white border border-[#051a0e0a] rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-color"
          />
          {form.formState.errors.name && (
            <p className="text-red-600 text-sm font-semibold mt-1">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-primary-gray text-sm font-semibold mb-2"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter  your  email"
            {...form.register("email")}
            className="w-full px-4 py-2 bg-white border border-[#051a0e0a] rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-color"
          />
          {form.formState.errors.email && (
            <p className="text-red-600 text-sm font-semibold mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-primary-gray text-sm font-semibold mb-2"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Enter  your  subject"
          {...form.register("subject")}
          className="w-full px-4 py-2 bg-white border border-[#051a0e0a] rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-color"
        />
        {form.formState.errors.subject && (
          <p className="text-red-600 text-sm font-semibold mt-1">
            {form.formState.errors.subject.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-primary-gray text-sm font-semibold mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          placeholder="How can we help you?"
          rows={4}
          {...form.register("message")}
          className="w-full px-4 py-2 bg-white border border-[#051a0e0a] rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-color"
        />
        {form.formState.errors.message && (
          <p className="text-red-600 text-sm font-semibold mt-1">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-color hover:bg-primary-color text-white py-6 rounded-full font-bold cursor-pointer "
      >
        {isLoading ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
