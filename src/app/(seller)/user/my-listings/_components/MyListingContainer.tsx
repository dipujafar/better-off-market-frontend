import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListingList from "./ListingList";

export default function MyListingContainer() {
  return (
    <div>
      <Tabs defaultValue="all" className="w-full mt-5">
        <TabsList>
          <TabsTrigger
            value="all"
            className="data-active:bg-transparent data-active:text-primary-color border-l-0 border-r-0 border-t-0 data-active:border-b-2  data-active:border-primary-color rounded-none cursor-pointer px-4 py-2.5 mr-1"
          >
            All (12)
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="data-active:bg-transparent data-active:text-primary-color border-l-0 border-r-0 border-t-0 data-active:border-b-2  data-active:border-primary-color rounded-none cursor-pointer px-4 py-2.5 mr-1"
          >
            Active (8)
          </TabsTrigger>
          <TabsTrigger
            value="pending"
             className="data-active:bg-transparent data-active:text-primary-color border-l-0 border-r-0 border-t-0 data-active:border-b-2  data-active:border-primary-color rounded-none cursor-pointer px-4 py-2.5 mr-1"
          >
            Pending approval (2)
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
             className="data-active:bg-transparent data-active:text-primary-color border-l-0 border-r-0 border-t-0 data-active:border-b-2  data-active:border-primary-color rounded-none cursor-pointer px-4 py-2.5 mr-1"
          >
            Rejected (2)
          </TabsTrigger>
          <TabsTrigger
            value="sold"
             className="data-active:bg-transparent data-active:text-primary-color border-l-0 border-r-0 border-t-0 data-active:border-b-2  data-active:border-primary-color rounded-none cursor-pointer px-4 py-2.5 mr-1"
          >
            Sold (1)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="w-full">
          <ListingList />
        </TabsContent>
        <TabsContent value="active">
          <ListingList />
        </TabsContent>
        <TabsContent value="pending">
          <ListingList />
        </TabsContent>
        <TabsContent value="rejected">
          <ListingList />
        </TabsContent>
        <TabsContent value="sold">
          <ListingList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
