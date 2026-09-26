"use client";
import PdfViewer from "@/components/shared/pdf-viewer/PdfViewer";
import { Button } from "@/components/ui/button";
import {
  useGetSingleAgreementQuery,
  useSignDocumentMutation,
} from "@/redux/api/agreementApi";
import { useParams, useSearchParams } from "next/navigation";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { PdfViewerSkeleton } from "./PdfViewerSkeleton";
import { toast } from "sonner";
import { errorModification } from "@/lib/errors/errorModification";

export default function AgreementContainer() {
  const { offerId } = useParams();
  const email = useSearchParams().get("email");
  const { data: offerData, isLoading } = useGetSingleAgreementQuery(offerId, {
    skip: !offerId,
  });
  const [signDoc, { isLoading: isSigning }] = useSignDocumentMutation();

  const sigRef = useRef<SignatureCanvas>(null);

  const handleSubmit = async () => {
    if (sigRef.current?.isEmpty())
      return toast.error("Please sign before submitting");

    const signatureImage = sigRef
      .current!.getTrimmedCanvas()
      .toDataURL("image/png");
    void signatureImage;

    try {
      await signDoc({
        offerId,
        data: { email, signatureImage },
      }).unwrap();
      toast.success("Thanks for signing!");
    } catch (error) {
      const errorMessage = errorModification(error);
      toast.error(errorMessage);
    }

    // const res = await signDoc({
    //   offerId,
    //   data: { email, signatureImage },
    // });
    // if (res?.data) {
    //   toast.success("Document signed successfully");
    // }
  };

  if (isLoading)
    return (
      <div className="space-y-8">
        <PdfViewerSkeleton />
        <PdfViewerSkeleton />
      </div>
    );

  return (
    <div>
      <div className="space-y-10">
        <PdfViewer
          pdfUrl={offerData?.data?.agreementMainDoc}
          title="Agreement Document"
        />
        {/* <PdfViewer
          pdfUrl="/ohio_pdf.pdf"
          title="Property Details Agreement Document"
        /> */}
      </div>

      <div className="mt-5 space-y-2">
        <h1 className="text-2xl font-bold text-primary-color">Sign Here</h1>
        <SignatureCanvas
          ref={sigRef}
          canvasProps={{
            // width: 450,
            // height: 150,
            className:
              "border rounded-lg bg-slate-100 border-gray-200 md:w-[500px] w-[300px] h-[150px]",
          }}
        />
        <Button
          className="bg-black rounded"
          onClick={() => sigRef.current?.clear()}
        >
          Clear
        </Button>
        <Button
          disabled={isSigning}
          className="bg-primary-color disabled:bg-gray-400 rounded"
          onClick={handleSubmit}
        >
          Submit Signature {isSigning && "..."}
        </Button>
      </div>
    </div>
  );
}
