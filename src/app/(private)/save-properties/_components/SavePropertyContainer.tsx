"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SaveProperties from "./SaveProperties";
import { useGetFavoritesQuery } from "@/redux/api/favoriteApi";
import Empty from "@/components/ui/empty-data";
import PropertyCardSkeleton from "@/components/skeleton/PropertyCardSkeleton";

const TABS = ["all", "active", "under-contract", "sold"] as const;
type TabValue = (typeof TABS)[number];

export default function SavePropertyContainer() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const queries: Record<string, string | number> = {};

  const { data: saveProperties, isLoading } = useGetFavoritesQuery(queries);

  if (isLoading)
    return (
      <div className="space-y-5">
        <div className="w-full h-10 bg-gray-200 animate-pulse p-2 rounded-md flex gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="w-20 h-full rounded-md bg-gray-300 animate-pulse"> </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:gap-6 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );

  if (!saveProperties?.data?.meta?.total)
    return (
      <Empty
        message="You have no saved properties"
        className="min-h-[calc(100vh-250px)] flex justify-center items-center"
      />
    );

  return (
    <Tabs
      value={activeTab}
      onValueChange={(val) => setActiveTab(val as TabValue)}
      className="w-full mt-5"
    >
      <TabsList className="bg-transparent">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="data-active:bg-primary-color data-active:text-white cursor-pointer px-4 py-2.5 mr-1 capitalize"
          >
            {tab.replace("-", " ")}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex-between border-b border-primary-border-color mb-5" />

      {TABS.map((tab) => (
        <TabsContent key={tab} value={tab} className="w-full">
          <SaveProperties data={saveProperties?.data?.data} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
