import type { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Maroon Tee',
    description: 'A timeless crewneck t-shirt made from 100% premium cotton. Perfect for any occasion, offering both comfort and style.',
    price: 25.00,
    image: 'https://placehold.co/600x800',
    hint: 'maroon shirt',
    category: 'T-Shirts',
    rating: {
      rate: 4.5,
      count: 120,
    },
  },
  {
    id: '2',
    name: 'Beige Linen Trousers',
    description: 'Lightweight and breathable linen trousers, ideal for warm weather. Features a relaxed fit and a versatile beige color.',
    price: 75.00,
    image: 'https://placehold.co/600x800',
    hint: 'beige trousers',
    category: 'Trousers',
    rating: {
      rate: 4.8,
      count: 95,
    },
  },
  {
    id: '3',
    name: 'Mustard Yellow Hoodie',
    description: 'A vibrant and cozy hoodie in a striking mustard yellow. Made from a soft cotton blend with a fleece interior.',
    price: 60.00,
    image: 'https://placehold.co/600x800',
    hint: 'yellow hoodie',
    category: 'Hoodies',
    rating: {
      rate: 4.7,
      count: 250,
    },
  },
  {
    id: '4',
    name: 'Elegant Silk Scarf',
    description: 'A luxurious silk scarf with a subtle pattern. The perfect accessory to elevate any outfit.',
    price: 45.00,
    image: 'https://placehold.co/600x800',
    hint: 'silk scarf',
    category: 'Accessories',
    rating: {
      rate: 4.9,
      count: 78,
    },
  },
  {
    id: '5',
    name: 'Denim Jacket',
    description: 'A classic denim jacket with a modern fit. Versatile and durable, it\'s a wardrobe essential.',
    price: 90.00,
    image: 'https://placehold.co/600x800',
    hint: 'denim jacket',
    category: 'Jackets',
    rating: {
      rate: 4.6,
      count: 310,
    },
  },
  {
    id: '6',
    name: 'Leather Belt',
    description: 'A high-quality genuine leather belt with a timeless buckle. Available in black and brown.',
    price: 40.00,
    image: 'https://placehold.co/600x800',
    hint: 'leather belt',
    category: 'Accessories',
    rating: {
      rate: 4.8,
      count: 150,
    },
  },
  {
    id: '7',
    name: 'Crewneck Sweatshirt',
    description: 'A comfortable and stylish sweatshirt for everyday wear. Made from a soft, durable cotton blend.',
    price: 55.00,
    image: 'https://placehold.co/600x800',
    hint: 'gray sweatshirt',
    category: 'Hoodies',
    rating: {
      rate: 4.7,
      count: 180,
    },
  },
  {
    id: '8',
    name: 'Polo Shirt',
    description: 'A classic polo shirt crafted from breathable pique cotton. Features a two-button placket and ribbed collar.',
    price: 35.00,
    image: 'https://placehold.co/600x800',
    hint: 'polo shirt',
    category: 'T-Shirts',
    rating: {
      rate: 4.5,
      count: 220,
    },
  },
];
