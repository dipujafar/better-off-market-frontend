import Navbar from "@/components/shared/navbar/Navbar";
import PropertyListingContainer from "./_components/PropertyListingContainer";
import SectionTitle from "@/components/shared/titles/SectionTitle";

export default function PropertyListingPage() {
  const sectionTitleData = {
    title: "Create new listing",
    description:
      "Provide detailed information to attract high-quality buyers and investors.",
  };
  return (
    <div className="space-y-4">
      <SectionTitle data={sectionTitleData} />
      <PropertyListingContainer />
    </div>
  );
}
