  import { Boxes, Building, Cuboid } from "lucide-react";
  import { AreaIcon, BedIcon, ShawarIcon } from "@/icons";
  export const handlePropertiesSpecifications = (propertyType: string, specifications: any) => {
    switch (propertyType) {
      case "Residential":
        return [
          {
            icon: BedIcon,
            value: specifications?.bedrooms,
            suffix: "Beds",
          },
          {
            icon: ShawarIcon,
            value: specifications?.fullBaths,
            suffix: "Baths",
          },
          {
            icon: AreaIcon,
            value: specifications?.sqFootage,
            suffix: "Sq. Ft",
          },
        ];

      case "Multi-Family":
        return [
          {
            icon: Boxes,
            value: specifications?.totalUnits,
            suffix: "Units",
          },
          {
            // icon: ShawarIcon,
            value: `$${specifications?.totalRent}`,
            suffix: "Rent",
          },
          {
            icon: AreaIcon,
            value: specifications?.lotSize,
            suffix: "Acres",
          },
        ];

      case "Commercial":
        return [
          {
            icon: Building,
            value: specifications?.totalBuildings,
            suffix: "Buildings",
          },
          {
            // icon: ShawarIcon,
            value: specifications?.totalUnits,
            suffix: "Units",
          },
          {
            icon: AreaIcon,
            value: specifications?.totalSqFootage,
            suffix: "Sq.Ft",
          },
        ];

      case "Land":
        return [
          {
            icon: Cuboid,
            value: specifications?.lotSize,
            suffix: "Acres",
          },
          {
            icon: BedIcon,
            value: specifications?.totalParcels,
            suffix: "Parcels",
          },
        ];

      default:
        return [
          {
            icon: BedIcon,
            value: specifications?.lotSizeUnit || specifications?.lotSize,
            suffix: "Acres",
          },
          {
            icon: ShawarIcon,
            value: specifications?.totalParcels,
            suffix: "Parcels",
          },
        ];
    }
  };