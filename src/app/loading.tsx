import Image from "next/image";

export default function Loading() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-linear-to-b from-white to-slate-50 px-6"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex size-60 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-spin rounded-full border-2 border-[#00214C]/15 border-t-[#00214C]"
        />
        <Image
          src="/logo_blue.png"
          alt="Better Off Market"
          width={240}
          height={80}
          priority
          className="h-auto w-48"
        />
      </div>
    </div>
  );
}
