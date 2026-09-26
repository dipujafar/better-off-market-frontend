export function PdfViewerSkeleton() {
  return (
    <div className="w-full min-h-[90vh] animate-pulse">
      {/* Page title */}
      <div className="h-6 w-48 bg-gray-200 rounded mb-4" />

      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm min-h-[85vh] flex flex-col">
        {/* Toolbar */}
        <div className="bg-[#2b2f38] flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 bg-gray-500/40 rounded" />
            <div className="h-4 w-40 bg-gray-500/40 rounded" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-6 w-8 bg-gray-500/40 rounded" />
            <div className="h-6 w-14 bg-gray-500/40 rounded" />
            <div className="h-4 w-4 bg-gray-500/40 rounded ml-2" />
            <div className="h-6 w-12 bg-gray-500/40 rounded" />
            <div className="h-4 w-4 bg-gray-500/40 rounded" />
            <div className="h-4 w-4 bg-gray-500/40 rounded ml-3" />
            <div className="h-4 w-4 bg-gray-500/40 rounded" />
            <div className="h-4 w-4 bg-gray-500/40 rounded ml-3" />
            <div className="h-4 w-4 bg-gray-500/40 rounded" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 bg-gray-500/40 rounded" />
            <div className="h-4 w-4 bg-gray-500/40 rounded" />
            <div className="h-4 w-4 bg-gray-500/40 rounded" />
            <div className="h-4 w-4 bg-gray-500/40 rounded" />
          </div>
        </div>

        <div className="flex bg-[#3a3f4b] flex-1">
          {/* Thumbnail sidebar */}
          <div className="w-47.5 shrink-0 px-4 py-5 space-y-6 hidden sm:block">
            <div className="space-y-1.5">
              <div className="h-24 w-full bg-gray-100/90 rounded border-2 border-blue-300" />
              <div className="h-3 w-3 bg-gray-500/40 rounded mx-auto" />
            </div>
            <div className="space-y-1.5">
              <div className="h-24 w-full bg-gray-200/60 rounded" />
              <div className="h-3 w-3 bg-gray-500/40 rounded mx-auto" />
            </div>
          </div>

          {/* Main document area */}
          <div className="flex-1 bg-[#525659] p-6 sm:p-10 flex justify-center">
            <div className="bg-white w-full max-w-2xl rounded-sm p-8 space-y-5 h-fit">
              {/* Logo */}
              <div className="h-6 w-40 bg-gray-200 rounded mx-auto" />

              {/* Title */}
              <div className="h-4 w-64 bg-gray-200 rounded mx-auto mt-6" />

              {/* Paragraph */}
              <div className="space-y-2 pt-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-2/3 bg-gray-200 rounded" />
              </div>

              {/* Section heading */}
              <div className="h-3.5 w-32 bg-gray-300 rounded mt-6" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>

              {/* Section heading */}
              <div className="h-3.5 w-56 bg-gray-300 rounded mt-6" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
              </div>

              {/* Table */}
              <div className="border border-gray-200 rounded mt-6 overflow-hidden">
                <div className="flex justify-between px-4 py-2.5 border-b border-gray-200">
                  <div className="h-3 w-28 bg-gray-200 rounded" />
                  <div className="h-3 w-10 bg-gray-200 rounded" />
                </div>
                <div className="flex justify-between px-4 py-2.5">
                  <div className="h-3 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-8 bg-gray-200 rounded" />
                </div>
              </div>

              {/* More paragraphs */}
              <div className="space-y-2 pt-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-4/5 bg-gray-200 rounded" />
              </div>

              <div className="h-3.5 w-28 bg-gray-300 rounded mt-6" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}