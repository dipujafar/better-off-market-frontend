import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OfferList from "./OfferList";

export default function OfferListContainer() {
  return (
    <div>
      {/* ===========================  tabs  ============================= */}
      <Tabs defaultValue="all-offers" className="w-full mt-5">
        <TabsList>
          <TabsTrigger
            value="all-offers"
            className="data-active:bg-primary-color data-active:text-white cursor-pointer px-4 py-2.5 mr-1"
          >
            All offers
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-active:bg-primary-color data-active:text-white cursor-pointer px-4 py-2.5 mr-1"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="counter-offers"
            className="data-active:bg-primary-color data-active:text-white cursor-pointer px-4 py-2.5 mr-1"
          >
            Counter offers
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="data-active:bg-primary-color data-active:text-white cursor-pointer px-4 py-2.5 mr-1"
          >
            Accepted
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-active:bg-primary-color data-active:text-white cursor-pointer px-4 py-2.5 mr-1"
          >
            Rejected
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all-offers" className="w-full">
          <OfferList />
        </TabsContent>
        <TabsContent value="pending">
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
    </div>
  );
}
