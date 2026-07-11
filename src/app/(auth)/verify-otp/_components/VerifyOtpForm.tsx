"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyOTpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [codeInputs, setCodeInputs] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newInputs = [...codeInputs];
    newInputs[index] = value;

    setCodeInputs(newInputs);
    setError("");

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `code-${index + 1}`,
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !codeInputs[index] && index > 0) {
      const prevInput = document.getElementById(
        `code-${index - 1}`,
      ) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = codeInputs.join("");

    if (fullCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    router.push("/reset-password");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCodeInputs(["", "", "", "", "", ""]);
      setError("");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full xl:max-w-4xl md:max-w-xl mx-auto rounded-2xl bg-white p-8 shadow-xl">
      <form onSubmit={handleSubmit} className="text-center">
        <h1 className="mb-3 lg:text-3xl md:text-2xl text-xl font-bold text-primary-black">
          Recover Password
        </h1>
        <p className="mb-4 text-primary-black max-w-xl mx-auto">
          Please provide the email address associated with your account, and
          we&apos;ll send you verification code to reset your password.
        </p>

        <div className="mb-8">
          <div className="flex justify-center gap-2">
            {codeInputs.map((value, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
             
                className="size-14 rounded-full border border-primary-black text-center text-xl font-semibold transition-colors focus:border-primary-black focus:outline-none hover:border-gray-400"
              />
            ))}
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-gray-900 py-2.5 font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Verifying...
            </span>
          ) : (
            "Verify Code"
          )}
        </button>

      </form>
    </div>
  );
}
