"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-150px)] items-center justify-center bg-linear-to-b from-white to-slate-50 px-6 py-16">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-xl shadow-slate-900/5 sm:px-12">
        <Image
          src="/logo_blue.png"
          alt="Better Off Market"
          width={240}
          height={80}
          priority
          className="mx-auto mb-10 h-auto w-48"
        />
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <AlertTriangle aria-hidden="true" className="size-8" />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#00214C]">
          Something went wrong
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          We hit a small snag.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600">
          The page couldn&apos;t load right now. Please try again, or head back
          to the marketplace.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#00214C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00336f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00214C]"
          >
            <RefreshCw aria-hidden="true" className="size-4" />
            Try again
          </button>
          <Link
            href="/home"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00214C]"
          >
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
