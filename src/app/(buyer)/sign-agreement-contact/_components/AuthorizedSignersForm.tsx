"use client";

import { useState } from "react";
import { User, Send } from "lucide-react";

interface Signer {
  fullName: string;
  email: string;
}

interface AuthorizedSignersProps {
  initialSigners?: Signer[];
  onSubmit?: (signers: Signer[]) => void;
}

export function AuthorizedSignersForm({
  initialSigners = [
    { fullName: "", email: "" },
    { fullName: "", email: "" },
  ],
  onSubmit,
}: AuthorizedSignersProps) {
  const [signers, setSigners] = useState<Signer[]>(initialSigners);

  const updateSigner = (index: number, field: keyof Signer, value: string) => {
    setSigners((prev) =>
      prev.map((signer, i) =>
        i === index ? { ...signer, [field]: value } : signer,
      ),
    );
  };

  const handleSubmit = () => {
    onSubmit?.(signers);
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
                  className="w-full rounded-md border border-primary-border-color bg-white px-3.5 py-2.5 text-sm text-primary-black placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1F4E8B]/20 focus:border-[#1F4E8B]"
                />
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
                  className="w-full rounded-md border border-[#F3B896] bg-white px-3.5 py-2.5 text-sm text-primary-black placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1F4E8B]/20 focus:border-[#1F4E8B]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="inline-flex items-center gap-2 bg-[#0F2A4D] hover:bg-[#0F2A4D]/90 text-white text-sm font-medium px-5 py-3 rounded-lg transition-colors cursor-pointer group"
      >
        Send Contract for Signature
        <Send className="size-4 group-hover:rotate-45 duration-300 transition-all" />
      </button>
    </div>
  );
}
