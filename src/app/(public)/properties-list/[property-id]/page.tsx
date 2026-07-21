import Navbar from "@/components/shared/navbar/Navbar";
import PropertyContainer from "./_components/PropertyContainer";

export default function PropertyDetailsPage() {
  return (
    <div>
      <Navbar className="pt-10" />
      <PropertyContainer />;
    </div>
  );
}
