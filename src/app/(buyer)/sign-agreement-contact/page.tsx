"use client";
import Navbar from "@/components/shared/navbar/Navbar";
import Container from "@/components/shared/container/Container";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { AuthorizedSignersForm } from "./_components/AuthorizedSignersForm";

const PdfViewer = dynamic(
  () => import("@/components/shared/pdf-viewer/PdfViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-75 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-sm text-slate-500">
        Loading agreement PDF...
      </div>
    ),
  },
);

// export const metadata = {
//   title: "Sign Agreement",
//   description: "Sign the agreement for the accepted offer.",
// };

export default function SignAgreementPage() {
  const sigRef = useRef<SignatureCanvas>(null);

  const handleSubmit = async () => {
    if (sigRef.current?.isEmpty())
      return alert("Please sign before submitting");

    const signatureImage = sigRef
      .current!.getTrimmedCanvas()
      .toDataURL("image/png");
    void signatureImage;

    // const res = await fetch(`/api/v1/agreements/${agreementId}/documents/${documentOrder}/sign`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    //   body: JSON.stringify({ signatureImage }),
    // });
  };

  return (
    <div>
      <Navbar className="pt-10" />
      <Container className="mt-10 mb-4">
        {/* <div className="flex flex-col justify-center items-center mt-10 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M17.2 29.2L31.3 15.1L28.5 12.3L17.2 23.6L11.5 17.9L8.7 20.7L17.2 29.2ZM20 40C17.2333 40 14.6333 39.475 12.2 38.425C9.76667 37.375 7.65 35.95 5.85 34.15C4.05 32.35 2.625 30.2333 1.575 27.8C0.525 25.3667 0 22.7667 0 20C0 17.2333 0.525 14.6333 1.575 12.2C2.625 9.76667 4.05 7.65 5.85 5.85C7.65 4.05 9.76667 2.625 12.2 1.575C14.6333 0.525 17.2333 0 20 0C22.7667 0 25.3667 0.525 27.8 1.575C30.2333 2.625 32.35 4.05 34.15 5.85C35.95 7.65 37.375 9.76667 38.425 12.2C39.475 14.6333 40 17.2333 40 20C40 22.7667 39.475 25.3667 38.425 27.8C37.375 30.2333 35.95 32.35 34.15 34.15C32.35 35.95 30.2333 37.375 27.8 38.425C25.3667 39.475 22.7667 40 20 40Z"
              fill="#00214C"
            />
          </svg>

          <div className="text-center space-y-1">
            <h3 className="text-3xl font-bold text-primary-black">
              Congratulations!
            </h3>
            <p className="text-[#505F76] text-lg">
              The offer has been accepted.
            </p>
          </div>
        </div> */}

        {/* <AuthorizedSignersForm/> */}
        <div  className="space-y-10">
          <PdfViewer
            pdfUrl="pdf.pdf"
            title="Agreement Document"
          />
          <PdfViewer
            pdfUrl="/ohio_pdf.pdf"
            title="Property Details Agreement Document"
          />
        </div>

        <div className="mt-5 space-y-2">
          <h1 className="text-2xl font-bold text-primary-color">Sign Here</h1>
          <SignatureCanvas
            ref={sigRef}
            canvasProps={{
              // width: 450,
              // height: 150,
              className: "border rounded-lg bg-slate-100 border-gray-200 md:w-[500px] w-[300px] h-[150px]",
            }}
            
          />
          <Button
            className="bg-black rounded"
            onClick={() => sigRef.current?.clear()}
          >
            Clear
          </Button>
          <Button className="bg-primary-color rounded" onClick={handleSubmit}>
            Submit Signature
          </Button>
        </div>
      </Container>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// interface PdfViewerProps {
//   pdfUrl?: string;
//   title?: string;
//   pageWidth?: number;
//   maxHeight?: string;
//   className?: string;
// }

// export default function PdfViewer({
//   pdfUrl = "/agreement_pdf.pdf",
//   title = "Agreement PDF",
//   pageWidth = 720,
//   maxHeight = "75vh",
//   className = "",
// }: PdfViewerProps) {
//   const [numPages, setNumPages] = useState(0);
//   const [pdfError, setPdfError] = useState<string | null>(null);

//   useEffect(() => {
//     setNumPages(0);
//     setPdfError(null);
//   }, [pdfUrl]);

//   const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//     setPdfError(null);
//   };

//   const handleDocumentLoadError = (error: Error) => {
//     console.error("PDF load error:", error);
//     setPdfError("Unable to load the agreement PDF.");
//   };

//   return (
//     <div className={className}>
//       <div className="mb-4 flex items-center justify-between">
//         <div className="text-sm font-medium text-slate-700">{title}</div>

//         {numPages > 0 ? (
//           <span className="text-sm text-slate-600">{numPages} pages</span>
//         ) : null}
//       </div>

//       <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm sm:p-6">
//         {pdfError ? (
//           <div className="flex min-h-[500px] items-center justify-center p-6 text-center text-sm text-red-600">
//             {pdfError}
//           </div>
//         ) : (
//           <div
//             className="overflow-y-auto bg-[#f3f4f6] p-2 sm:p-4"
//             style={{ maxHeight }}
//           >
//             <div className="mx-auto flex w-full max-w-[820px] flex-col items-center gap-5">
//               <Document
//                 file={pdfUrl}
//                 onLoadSuccess={handleDocumentLoadSuccess}
//                 onLoadError={handleDocumentLoadError}
//                 loading={
//                   <div className="flex min-h-[60vh] items-center justify-center text-sm text-slate-500">
//                     Loading agreement PDF...
//                   </div>
//                 }
//                 error={
//                   <div className="flex min-h-[60vh] items-center justify-center text-sm text-red-600">
//                     Unable to load agreement PDF.
//                   </div>
//                 }
//               >
//                 {Array.from({ length: numPages }, (_, index) => (
//                   <div
//                     key={`${pdfUrl}-${index + 1}`}
//                     className="w-full rounded-md bg-white shadow-sm ring-1 ring-slate-200"
//                   >
//                     <Page
//                       pageNumber={index + 1}
//                       width={pageWidth}
//                       renderTextLayer={true}
//                       renderAnnotationLayer={true}
//                     />
//                   </div>
//                 ))}
//               </Document>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
