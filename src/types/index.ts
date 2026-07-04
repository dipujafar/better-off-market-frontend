export interface ICategory  {
  id: number;
  title: string;
  listingCount: number;
  image: string;
};


export interface IProperty {
  imageUrl: string;
  timeEstimate: string;
  price: number;
  originalPrice?: number;
  arv?: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}