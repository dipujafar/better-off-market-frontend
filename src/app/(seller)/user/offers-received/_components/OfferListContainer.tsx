import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OfferList from "./OfferList";

export default function OfferListContainer() {
  return (
    <Tabs defaultValue="all-offers" className="w-full mt-5">
      <TabsList>
        <TabsTrigger
          value="all-offers"
          className="data-active:bg-primary-color rounded-full data-active:text-white cursor-pointer px-4 py-3.5 mr-1"
        >
          All offers
        </TabsTrigger>
        <TabsTrigger
          value="new"
          className="data-active:bg-primary-color rounded-full data-active:text-white cursor-pointer px-4 py-3.5 mr-1"
        >
          New
        </TabsTrigger>
        <TabsTrigger
          value="counter-offers"
          className="data-active:bg-primary-color rounded-full data-active:text-white cursor-pointer px-4 py-3.5 mr-1"
        >
          Counter offers
        </TabsTrigger>
        <TabsTrigger
          value="accepted"
          className="data-active:bg-primary-color rounded-full data-active:text-white cursor-pointer px-4 py-3.5 mr-1"
        >
          Accepted
        </TabsTrigger>
        <TabsTrigger
          value="rejected"
         className="data-active:bg-primary-color rounded-full data-active:text-white cursor-pointer px-4 py-3.5 mr-1"
        >
          Rejected
        </TabsTrigger>
      </TabsList>
      <div className="pt-1 mb-4 border-b border-b-primary-border-color"></div>
      <TabsContent value="all-offers" className="w-full">
        <OfferList />
      </TabsContent>
      <TabsContent value="new">
        <OfferList />
      </TabsContent>
      <TabsContent value="counter-offers">
        <OfferList />
      </TabsContent>
      <TabsContent value="accepted">
        <OfferList />
      </TabsContent>
      <TabsContent value="rejected">
        <OfferList />
      </TabsContent>
    </Tabs>
  );
}
