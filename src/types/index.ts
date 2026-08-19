export interface ICategory {
  id: number;
  title: string;
  listingCount: number;
  image: string;
}

export interface IProperty {
  id: number;
  imageUrl: string;
  timeEstimate: string;
  price: number;
  originalPrice?: number;
  arv?: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  propertyType?: string;
}

export interface Conversation {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
  online?: boolean;
}

export interface ChatContact {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  propertyType: string; // e.g. "3bd house"
  city: string;
  county: string;
}

export interface ChatMessage {
  id: string;
  sender: "me" | "them";
  content: string;
  time: string; // e.g. "10:22 AM"
}

export interface ChatThread {
  contact: ChatContact;
  dateLabel: string; // e.g. "JUNE 14, 2024"
  messages: ChatMessage[];
}

export interface IDocument {
  _id: string;
  name: string;
  size: string;
  updated: string;
  url: string;
}

export interface ILocation {
  type: "Point";
  coordinates: [number, number];
}

export interface IOpenHouse {
  date?: string;
  startTime?: string;
  endTime?: string;
}

// ================================================= backend response =================================================

export interface IPropertyResponse {
  _id: string;
  seller: string;
  status: "Pending" | "Active" | "Under Contact" | "Sold" | "Rejected";

  propertyType: string;
  useType?: string;
  useTypeOther?: string;

  // Ownership
  ownership: "own" | "assignable";
  assignableContractFile?: IDocument;

  location: ILocation;

  // Basic Information
  streetAddress: string;
  state: string;
  city: string;
  zipCode: string;
  county: string;
  parcelIds?: string;
  listingPrice: number;
  buyItNowPrice?: number;
  oldListingPrice?: number;
  arv?: number;
  marketingDescription: string;
  utilities?: string;

  // Property Specifications — dynamic, keyed by SpecField.name
  specifications: Record<string, string | number>;

  // Major Components & Ages
  roofMaterial?: string;
  roofMaterialOther?: string;
  roofAge?: number;
  heatingSystem?: string;
  heatingSystemOther?: string;
  heatingAge?: number;
  cooling?: string;
  coolingOther?: string;
  coolingAge?: number;
  waterHeating?: string;
  waterHeatingOther?: string;
  waterHeatingAge?: number;
  water?: string;
  waterOther?: string;
  sewer?: string;
  sewerOther?: string;
  foundation?: string;
  foundationOther?: string;
  otherUpdates?: string;

  // HOA
  hasHoa: "yes" | "no";
  hoaAmount?: number;
  hoaFrequency?: "Monthly" | "Quarterly" | "Annually";
  hoaIncludes?: string;

  // Closing
  titleCompany?: string;
  closingDate: string;

  // Files (S3 URLs after upload middleware)
  photos: string[];
  documents?: IDocument[];

  isDeleted: boolean;

  // utils properties
  totalViews: number;
  totalSaved: number;
  totalOffers: number;
  totalRsvp: number;

  openHouse: IOpenHouse;

  // Usually present from Mongoose timestamps, add if your schema has `timestamps: true`
  createdAt: string;
  updatedAt: string;
}

export interface ISavePropertiesResponse {
  _id: string;
  user: string;
  property: IPropertyResponse;
  createdAt: string;
  updatedAt: string;
}

export interface IMetaData {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}
