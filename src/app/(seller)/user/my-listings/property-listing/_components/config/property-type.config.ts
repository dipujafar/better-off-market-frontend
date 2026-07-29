export const PROPERTY_TYPES = [
  "Residential",
  "Multi-Family",
  "Commercial",
  "Land",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export interface SelectFieldOption {
  label: string;
  value: string;
}

export interface SpecField {
  /** key stored under specifications.<name> */
  name: string;
  label: string;
  type: "number" | "text" | "select";
  placeholder?: string;
  options?: SelectFieldOption[];
  className?: string;
}

export interface SpecRow {
  fields: SpecField[];
}

/** Controls which Basic Information fields are required/shown per property type */
export interface BasicInfoConfig {
  showParcelId: boolean;
  showBuyItNowPrice: boolean;
}

export const BASIC_INFO_CONFIG: Record<PropertyType, BasicInfoConfig> = {
  Residential: { showParcelId: false, showBuyItNowPrice: true },
  "Multi-Family": { showParcelId: true, showBuyItNowPrice: false },
  Commercial: { showParcelId: true, showBuyItNowPrice: false },
  Land: { showParcelId: true, showBuyItNowPrice: false },
};

const selectOpts = (values: string[]): SelectFieldOption[] =>
  values.map((v) => ({ label: v, value: v }));

/**
 * Property Specifications section — rows of fields per property type.
 * An empty array hides the whole section for that type.
 */
export const PROPERTY_SPECIFICATIONS_CONFIG: Record<PropertyType, SpecRow[]> = {
  Residential: [],

  "Multi-Family": [
    {
      fields: [
        {
          name: "totalUnits",
          label: "Total # of Units",
          type: "number",
          placeholder: "8",
          className: "col-span-2",
        },
        {
          name: "separateGasElec",
          label: "Separate Gas & Elec.",
          type: "select",
          options: selectOpts(["Yes", "No"]),
        },
        {
          name: "separateAC",
          label: "Separate A/C",
          type: "select",
          options: selectOpts(["Yes", "No"]),
        },
      ],
    },
    {
      fields: [
        {
          name: "unitBreakdown",
          label: "Unit Breakdown",
          type: "text",
          placeholder: "4 1-bedroom units, 4 2-bedroom units",
          className: "col-span-2",
        },
        {
          name: "separateFurnace",
          label: "Separate Furnace",
          type: "select",
          options: selectOpts(["Yes", "No"]),
        },
        {
          name: "heatPaidBy",
          label: "Heat Paid by",
          type: "select",
          options: selectOpts(["Owner", "Buyer"]),
        },
      ],
    },
    {
      fields: [
        {
          name: "totalRent",
          label: "Total Rent ($)",
          type: "number",
          placeholder: "0.00",
        },
        {
          name: "avgRentPerUnit",
          label: "Avg. Rent/Unit ($)",
          type: "number",
          placeholder: "0.00",
        },
        {
          name: "waterPaidBy",
          label: "Water Paid by",
          type: "select",
          options: selectOpts(["Owner", "Buyer"]),
          className: "col-span-2",
        },
      ],
    },
    {
      fields: [
        {
          name: "garageSpaces",
          label: "Garage Spaces",
          type: "number",
          placeholder: "4",
        },
        {
          name: "parking",
          label: "Parking",
          type: "select",
          options: selectOpts([
            "Driveway",
            "On street",
            "Carport",
            "Assigned",
            "None",
            "Other",
          ]),
        },
        {
          name: "lotSize",
          label: "Lot Size (Acres)",
          type: "number",
          placeholder: "0.25",
        },
        {
          name: "yearBuilt",
          label: "Year Built",
          type: "number",
          placeholder: "1995",
        },
      ],
    },
  ],

  // Fill these in once you share Commercial / Land field lists
  Commercial: [],
  Land: [],
};

export const ROOF_OPTIONS = selectOpts([
  "Shingle",
  "Slate",
  "Tile",
  "Membrane",
  "Other",
]);
export const HEATING_OPTIONS = selectOpts(["Gas", "Electric", "None", "Other"]);
export const COOLING_OPTIONS = selectOpts([
  "Central A/C",
  "Window units",
  "None",
  "Other",
]);
export const WATER_HEATING_OPTIONS = selectOpts([
  "Public",
  "Cistern",
  "Well",
  "None",
  "Other",
]);
export const WATER_OPTIONS = selectOpts([
  "Public",
  "Cistern",
  "Well",
  "None",
  "Other",
]);
export const SEWER_OPTIONS = selectOpts([
  "Public",
  "Septic",
  "Aerobic",
  "None",
  "Other",
]);
export const FOUNDATION_OPTIONS = selectOpts([
  "Block",
  "Poured",
  "Slab",
  "Stone",
  "Other",
]);
export const COUNTY_OPTIONS = selectOpts([
  "Franklin",
  "Hamilton",
  "Cuyahoga",
  "Montgomery",
]);
export const HOA_FREQUENCY_OPTIONS = selectOpts([
  "Monthly",
  "Quarterly",
  "Annually",
]);
export const CLOSING_DATE_OPTIONS = selectOpts(["ASAP", "Specific"]);
