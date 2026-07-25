"use client";
import Container from "@/components/shared/container/Container";
import { PropertiesInMap } from "./PropertiesInMap";
import { useState } from "react";
import FilterOptions from "@/components/shared/utils/FilterOptions";
import PropertiesList from "./PropertiesList";

export default function PropertiesInMapContainer() {
  const [selectedProperty, setSelectedProperty] = useState<any>();
  return (
    <Container className="flex relative">
      <div className="flex-1 ">
        <FilterOptions layout="horizontal" />
        <PropertiesInMap
          properties={[
            { id: 1, price: 310000, lat: 23.8103, lng: 90.4125 },
            { id: 2, price: 450000, lat: 23.8145, lng: 90.4152 },
            { id: 3, price: 310000, lat: 23.8123, lng: 90.4125 },
            { id: 4, price: 310000, lat: 23.8153, lng: 90.4125 },
          ]}
          onMarkerClick={(p) => setSelectedProperty(p)}
        />
      </div>
      <div className="absolute -top-2 right-0 lg:relative">
        <PropertiesList id={selectedProperty?.id ?? ""} />
      </div>
    </Container>
  );
}
