import Navbar from "@/components/shared/navbar/Navbar";
import { SellerProfileCard } from "./_components/SellerProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/shared/container/Container";
import SellerListing from "./_components/SellerListing";
import SellerReview from "./_components/SellerReview";

export const metadata = {
  title: "Seller Profile",
  description: "This the official website of Better Off Market",
};

export default function SellerProfile() {
  return (
    <div className="space-y-8">
      <Navbar className="pt-10" />
      <Container>
        <SellerProfileCard />
      </Container>
      <Container>
        <Tabs defaultValue="listings" className="w-full mt-5">
          <TabsList className="bg-transparent.0">
            <TabsTrigger
              value="listings"
              className="data-active:bg-transparent data-active:text-primary-color border-l-0 border-r-0 border-t-0 data-active:border-b-2  data-active:border-primary-color rounded-none cursor-pointer px-4 py-2.5 mr-1"
            >
              Listings (12)
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-active:bg-transparent data-active:text-primary-color border-l-0 border-r-0 border-t-0 data-active:border-b-2  data-active:border-primary-color rounded-none cursor-pointer px-4 py-2.5 mr-1"
            >
              Reviews (24)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="listings" className="w-full">
            <SellerListing />
          </TabsContent>
          <TabsContent value="reviews">
            <SellerReview />
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
