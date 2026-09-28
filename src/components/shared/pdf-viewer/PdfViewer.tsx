"use client";

interface PdfViewerProps {
  pdfUrl?: string;
  title?: string;
  maxHeight?: string;
  className?: string;
}

export default function PdfViewer({
  pdfUrl = "",
  title = "Agreement PDF",
  maxHeight = "85vh",
  className = "",
}: PdfViewerProps) {
  const safeUrl = pdfUrl ;

  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-medium text-primary-color">{title}</div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm sm:p-6">
        <div
          className="overflow-hidden rounded-lg border border-slate-200 bg-white"
          style={{ maxHeight }}
        >
          <iframe
            src={safeUrl}
            title={title}
            className="block w-full border-0"
            style={{ height: maxHeight, width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}