// components/skeleton/TermsContentSkeleton.tsx
export default function TermsContentSkeleton() {
  return (
    <div className=" space-y-6 px-4 py-6 text-center animate-pulse">
      <ParagraphSkeleton lines={5} />
      <ParagraphSkeleton lines={5} />

      {/* Numbered list block */}
      <div className="space-y-4 text-left">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="h-4 w-4 shrink-0 rounded bg-gray-200 mt-1" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-4/5 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      <ParagraphSkeleton lines={5} />
    </div>
  );
}

function ParagraphSkeleton({ lines }: { lines: number }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`mx-auto h-4 rounded bg-gray-200 ${
            i === lines - 1 ? "w-1/3" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}
