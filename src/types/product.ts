
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  features?: string[];
  sale?: boolean;
  salePrice?: number;
  new?: boolean;
  colors?: string[];
  sizes?: string[];
}
