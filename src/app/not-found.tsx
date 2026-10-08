import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-white to-slate-50 px-6 py-16">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-xl shadow-slate-900/5 sm:px-12">
        <Image
          src="/logo_blue.png"
          alt="Better Off Market"
          width={240}
          height={80}
          className="mx-auto mb-10 h-auto w-48"
        />
        <div className="relative mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-blue-50 text-[#00214C]">
          <span className="absolute text-5xl font-extrabold text-[#00214C]/10">
            404
          </span>
          <SearchX aria-hidden="true" className="relative size-9" />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#00214C]">
          Page not found
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          This property seems to have moved.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600">
          The page you&apos;re looking for isn&apos;t here. Let&apos;s get you
          back to finding your next opportunity.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/home"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#00214C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00336f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00214C]"
          >
            <Home aria-hidden="true" className="size-4" />
            Go to home
          </Link>
          <Link
            href="/properties-list"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00214C]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Browse properties
          </Link>
        </div>
      </section>
    </div>
  );
}
