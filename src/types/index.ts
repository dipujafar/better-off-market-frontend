export interface ICategory  {
  id: number;
  title: string;
  listingCount: number;
  image: string;
};


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