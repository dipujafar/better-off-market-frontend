import Navbar from "@/components/shared/navbar/Navbar";
import SendCounterFormContainer from "./_components/send-counter-form-container";
export const metadata = {
  title: "Send Counter Offer",
  description: "Send Counter Offer",
};

export default function SendCounterOfferPage() {
  return (
    <div>
      <Navbar className="pt-10" />
      <SendCounterFormContainer />
    </div>
  );
}
