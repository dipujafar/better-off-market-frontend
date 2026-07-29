import Navbar from "@/components/shared/navbar/Navbar";
import SavePropertyContainer from "./_components/SavePropertyContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/shared/container/Container";

export const metadata = {
  title: "Save Properties",
  description: "This the official website of Better Off Market",
};
export default function SavePropertiesPage() {
  return (
    <div className="space-y-8">
      <Navbar className="pt-10" />
      <Container>
        <Tabs defaultValue="all" className="w-full mt-5">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="all"
              className="data-active:bg-primary-color data-active:text-white cursor-pointer px-4 py-2.5 mr-1"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-active:bg-primary-color data-active:text-white cursor-pointer px-4 py-2.5 mr-1"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="under-contract"
              className="data-active:bg-primary-color data-active:text-white cursor-pointer px-4 py-2.5 mr-1"
            >
              Under Contract
            </TabsTrigger>
            <TabsTrigger
              value="sold"
              className="data-active:bg-primary-color data-active:text-white cursor-pointer px-4 py-2.5 mr-1"
            >
              Sold
            </TabsTrigger>
          </TabsList>
          <div className="flex-between  border-b border-primary-border-color mb-5"></div>
          <TabsContent value="all" className="w-full">
            <SavePropertyContainer />
          </TabsContent>
          <TabsContent value="active">
            <SavePropertyContainer />
          </TabsContent>
          <TabsContent value="under-contract">
            <SavePropertyContainer />
          </TabsContent>
          <TabsContent value="sold">
            <SavePropertyContainer />
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
