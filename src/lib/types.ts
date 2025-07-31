export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  onSale?: boolean;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  hint?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
