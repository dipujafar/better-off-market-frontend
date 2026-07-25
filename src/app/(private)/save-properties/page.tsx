import Navbar from "@/components/shared/navbar/Navbar";
import SavePropertyContainer from "./_components/SavePropertyContainer";

export const metadata = {
  title: "Save Properties",
  description: "This the official website of Better Off Market",
};
export default function SavePropertiesPage() {
  return (
    <div className="space-y-8">
      <Navbar className="pt-10" />
      <SavePropertyContainer />
    </div>
  );
}
