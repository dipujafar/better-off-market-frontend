import { Button } from "@/components/ui/button";

interface FormFooterProps {
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function FormFooter({ onCancel, isSubmitting }: FormFooterProps) {
  return (
    <div className="flex items-center justify-end gap-4 border-t border-border pt-6">
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        disabled={isSubmitting}
        className="lg:px-10 px-6 py-4 lg:py-5 cursor-pointer shadow-md"
      >
        Cancel
      </Button>
      {/* <Button size={"lg"} type="submit" disabled={isSubmitting} className="bg-primary-color lg:px-10 px-6 py-4 lg:py-5 cursor-pointer shadow-md">
        {isSubmitting ? "Reviewing..." : "Review offer"}
      </Button> */}

      <Button
        size={"lg"}
        disabled={isSubmitting}
        className="bg-primary-color lg:px-10 px-6 py-4 lg:py-5 cursor-pointer shadow-md"
      >
        {isSubmitting ? "Reviewing..." : "Review offer"}
      </Button>
    </div>
  );
}
