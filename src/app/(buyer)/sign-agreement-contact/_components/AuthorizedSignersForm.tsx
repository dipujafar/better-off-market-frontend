"use client";

import { useState } from "react";
import { User, Send, Loader } from "lucide-react";
import {
  useAddBuyerAuthorizationMutation,
  useAddSellerAuthorizationMutation,
} from "@/redux/api/agreementApi";
import { useRouter, useSearchParams } from "next/navigation";
import { errorModification } from "@/lib/errors/errorModification";
import { toast } from "sonner";

interface Signer {
  fullName: string;
  email: string;
}

interface SignerErrors {
  fullName?: string;
  email?: string;
}

interface AuthorizedSignersProps {
  initialSigners?: Signer[];
  onSubmit?: (signers: Signer[]) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthorizedSignersForm({
  initialSigners = [
    { fullName: "", email: "" },
    { fullName: "", email: "" },
  ],
  onSubmit,
}: AuthorizedSignersProps) {
  const [signers, setSigners] = useState<Signer[]>(initialSigners);
  const [errors, setErrors] = useState<SignerErrors[]>([{}, {}]);
  const [addSellerAuthorizedSigner, { isLoading }] =
    useAddSellerAuthorizationMutation();
  const [addBuyerAuthorizedSigner, { isLoading: isLoadingBuyer }] =
    useAddBuyerAuthorizationMutation();
  const actionBy = useSearchParams().get("actionBy");
  const offerId = useSearchParams().get("offerId");
  const router = useRouter();

  const updateSigner = (index: number, field: keyof Signer, value: string) => {
    setSigners((prev) =>
      prev.map((signer, i) =>
        i === index ? { ...signer, [field]: value } : signer,
      ),
    );
    // Clear that field's error as soon as the user edits it
    setErrors((prev) =>
      prev.map((err, i) =>
        i === index ? { ...err, [field]: undefined } : err,
      ),
    );
  };

  const isSignerEmpty = (signer: Signer) =>
    !signer.fullName.trim() && !signer.email.trim();

  const validate = (): boolean => {
    const nextErrors: SignerErrors[] = signers.map((signer, index) => {
      const isRequired = index === 0; // first signer always required
      const isPartiallyFilled =
        !isRequired && (signer.fullName.trim() || signer.email.trim());

      // Second signer left completely blank -> valid, nothing to check
      if (!isRequired && isSignerEmpty(signer)) return {};

      const fieldErrors: SignerErrors = {};

      if (isRequired || isPartiallyFilled) {
        if (!signer.fullName.trim()) {
          fieldErrors.fullName = "Full name is required";
        }
        if (!signer.email.trim()) {
          fieldErrors.email = "Email address is required";
        } else if (!EMAIL_REGEX.test(signer.email.trim())) {
          fieldErrors.email = "Enter a valid email address";
        }
      }

      return fieldErrors;
    });

    setErrors(nextErrors);
    return nextErrors.every((err) => !err.fullName && !err.email);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formattedData = signers.map((signer) => ({
      name: signer.fullName,
      email: signer.email,
    }));

    toast.loading(
      "Please wait without reload. Document are getting ready and send to authorized signers email.",
      { id: "sendingDoc" },
    );
    try {
      if (actionBy === "buyer") {
        await addBuyerAuthorizedSigner({
          offerId,
          data: formattedData,
        }).unwrap();
        router.replace(`/my-offer`);
      } else {
        await addSellerAuthorizedSigner({
          offerId,
          data: formattedData,
        }).unwrap();
        router.replace(`/user/offers-received`);
      }
      toast.success(
        "Authorized signers added successfully! They received an email with legal documents.", {
          id: "sendingDoc",
        }
      );
    } catch (err) {
      const error = errorModification(err);
      toast.error(error, { id: "sendingDoc" });
    }

    // Only send signers that actually have data — drops a fully-empty
    // optional second signer from the payload rather than sending {fullName: "", email: ""}
    const filledSigners = signers.filter((s) => !isSignerEmpty(s));
    onSubmit?.(filledSigners);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg border border-primary-border-color shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] md:p-8 p-5">
      <h2 className="md:text-3xl text-2xl font-semibold text-primary-black mb-2">
        Authorized Signers
      </h2>
      <p className="text-[#505F76] text-base mb-6">
        Please provide the information for those authorized to sign the legal
        documentation.
      </p>

      <div className="space-y-4 mb-6">
        {signers.map((signer, index) => (
          <div
            key={index}
            className="rounded-md bg-[#F2F4F6] border border-primary-border-color/50 p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <User className="size-4 text-primary-color" />
              <span className="text-sm font-medium tracking-wide text-[#594139] uppercase">
                Authorized Signer #{index + 1}
                {index === 0 ? (
                  <span className="text-red-500"> *</span>
                ) : (
                  <span className="normal-case text-[#9CA3AF] font-normal">
                    {" "}
                    (optional)
                  </span>
                )}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#594139] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={signer.fullName}
                  onChange={(e) =>
                    updateSigner(index, "fullName", e.target.value)
                  }
                  placeholder={
                    index === 0 ? "e.g. Johnathan Doe" : "e.g. Jane Smith"
                  }
                  className={`w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-primary-black placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1F4E8B]/20 focus:border-[#1F4E8B] ${
                    errors[index]?.fullName
                      ? "border-red-400"
                      : "border-primary-border-color"
                  }`}
                />
                {errors[index]?.fullName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[index].fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-black mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={signer.email}
                  onChange={(e) => updateSigner(index, "email", e.target.value)}
                  placeholder={
                    index === 0 ? "john@example.com" : "jane@example.com"
                  }
                  className={`w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-primary-black placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1F4E8B]/20 focus:border-[#1F4E8B] ${
                    errors[index]?.email ? "border-red-400" : "border-[#F3B896]"
                  }`}
                />
                {errors[index]?.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[index].email}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || isLoadingBuyer}
        className="inline-flex items-center gap-2 bg-[#0F2A4D] hover:bg-[#0F2A4D]/90 text-white text-sm font-medium px-5 py-3 rounded-lg transition-colors cursor-pointer group disabled:cursor-not-allowed disabled:opacity-70"
      >
        Send Contract for Signature
        {isLoading || isLoadingBuyer ? (
          <Loader className="size-4 animate-spin group-hover:rotate-45 duration-300 transition-all" />
        ) : (
          <Send className="size-4 group-hover:rotate-45 duration-300 transition-all" />
        )}
      </button>
    </div>
  );
}
