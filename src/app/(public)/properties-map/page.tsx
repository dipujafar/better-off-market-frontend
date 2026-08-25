import Navbar from "@/components/shared/navbar/Navbar";
import PropertiesInMapContainer from "./_components/PropertiesInMapContainer";
import { SearchParams } from "../properties-list/page";

export const metadata = {
  title: "Properties Map",
  description: "This the official website of Better Off Market",
};

export default async function page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedParams = await searchParams;
  return (
    <div className="lg:space-y-10 space-y-6">
      <Navbar className="pt-10" />
      <PropertiesInMapContainer searchParams={resolvedParams} />
    </div>
  );
}
