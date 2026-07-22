import Navbar from "@/components/shared/navbar/Navbar";
import PropertyContainer from "./_components/PropertyContainer";

export const metadata = {
  title: "Property Details",
  description: "This the official website of Better Off Market",
};

export default function PropertyDetailsPage() {
  return (
    <div>
      <Navbar className="pt-10" />
      <PropertyContainer />;
    </div>
  );
}
