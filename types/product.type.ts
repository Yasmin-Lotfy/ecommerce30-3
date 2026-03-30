export interface ProductI {
  brand: BrandI;
  category: BrandI;
  createdAt: string;
  description: string;
  id: string;
  imageCover: string;
  images: string[];
  price: number;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  slug: string;
  sold: number;
  subcategory: BrandI;
  title: string;
  updatedAt: string;
  _id: string;
}

interface BrandI {
  image: string;
  name: string;
  slug: string;
  _id: string;
}
