"use client";
import PdfViewer from "@/components/shared/pdf-viewer/PdfViewer";
import { Button } from "@/components/ui/button";
import {
  useGetSingleAgreementQuery,
  useSignDocumentMutation,
} from "@/redux/api/agreementApi";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { PdfViewerSkeleton } from "./PdfViewerSkeleton";
import { toast } from "sonner";
import { errorModification } from "@/lib/errors/errorModification";
import { IAgreement } from "@/types";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const isReadySigned = (agreement: IAgreement, email: string, role: string) => {
  if (role === "buyer") {
    return agreement.buyerAuthorizeSigner.some(
      (signer) => signer.email === email && signer.isSigned,
    );
  } else {
    return agreement.sellerAuthorizeSigner.some((signer) => signer.isSigned);
  }
};

export default function AgreementContainer() {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isRedDoc, setIsRedDoc] = useState(false);
  const { offerId } = useParams();
  const email = useSearchParams().get("email");
  const user = useSearchParams().get("user");
  const {
    data: offerData,
    isFetching,
    isLoading,
  } = useGetSingleAgreementQuery(offerId, {
    skip: !offerId,
  });
  const [signDoc, { isLoading: isSigning }] = useSignDocumentMutation();
  const router = useRouter();

  const sigRef = useRef<SignatureCanvas>(null);

  const handleSubmit = async () => {
    if (sigRef.current?.isEmpty())
      return toast.error("Please sign before submitting");

    if (!offerId && !user) {
      return toast.error(
        "Something went wrong! please go back to your received email and enter again.",
      );
    }

    toast.loading("Please wait without reload. Document signing in progress.", {
      id: "signing",
    });
    const signatureImage = sigRef
      .current!.getTrimmedCanvas()
      .toDataURL("image/png");
    void signatureImage;

    try {
      await signDoc({
        offerId,
        data: { email, signatureImage, role: user },
      }).unwrap();
      // toast.success("Document signed successfully", { id: "signing" });
      setOpenSuccessModal(true);
      router.refresh();
    } catch (error) {
      const errorMessage = errorModification(error);
      toast.error(errorMessage, { id: "signing" });
    }

    // const res = await signDoc({
    //   offerId,
    //   data: { email, signatureImage },
    // });
    // if (res?.data) {
    //   toast.success("Document signed successfully");
    // }
  };

  if (isLoading || isFetching)
    return (
      <div className="space-y-8">
        <PdfViewerSkeleton />
        <PdfViewerSkeleton />
      </div>
    );

  return (
    <div>
      <div className="space-y-10">
        {user === "buyer" && (
          <PdfViewer
            pdfUrl={offerData?.data?.agreementMainDoc}
            title="Platform Agreement Document"
          />
        )}
        <PdfViewer
          pdfUrl={offerData?.data?.propertyAgreementDoc}
          title="Property Details Agreement Document"
        />
        {/* <PdfViewer
          pdfUrl="/ohio_pdf.pdf"
          title="Property Details Agreement Document"
        /> */}
      </div>

      <div
        className={cn(
          "mt-5 space-y-2",
          isReadySigned(offerData?.data, email as string, user as string) &&
            "hidden",
        )}
      >
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
        <label
          htmlFor="redDoc"
          className="flex mt-2  gap-2 text-sm text-gray-700 ml-1"
        >
          <input
            id="redDoc"
            type="checkbox"
            checked={isRedDoc}
            onChange={(e) => setIsRedDoc(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 transition focus:ring-blue-500 accent-primary-color"
          />
          <span>I have carefully read documents and agree to sign.</span>
        </label>
        <Button
          className="bg-black rounded cursor-pointer"
          onClick={() => sigRef.current?.clear()}
        >
          Clear
        </Button>
        <Button
          disabled={isSigning || !isRedDoc}
          className="bg-primary-color disabled:bg-primary-color/80 rounded cursor-pointer ml-1"
          onClick={handleSubmit}
        >
          Submit Signature {isSigning && "..."}
        </Button>
      </div>
    </div>
  );
}

export function AlertDialogDemo({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Congratulations!</AlertDialogTitle>
          <AlertDialogDescription>
            You have successfully signed the document. Once every authorizer
            will sign the document then you will get email with completed
            document
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary-color hover:bg-primary-color/80">Got it</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
