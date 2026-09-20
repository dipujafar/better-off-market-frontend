"use client";

interface PdfViewerProps {
  pdfUrl?: string;
  title?: string;
  pageWidth?: number;
  maxHeight?: string;
  className?: string;
}

export default function PdfViewer({
  pdfUrl = "/pdf.pdf",
  title = "Agreement PDF",
  pageWidth = 720,
  maxHeight = "75vh",
  className = "",
}: PdfViewerProps) {
  const safeUrl = pdfUrl || "/pdf.pdf";

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
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