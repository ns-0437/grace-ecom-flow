
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Premium wireless headphones with industry-leading noise cancellation, crystal-clear audio, and up to 30 hours of battery life. Perfect for travel, work, or relaxation.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
    category: 'electronics',
    rating: 4.8,
    reviews: 1254,
    stock: 25,
    features: ['Active Noise Cancellation', 'Wireless', '30-hour battery life', 'Voice Assistant Support'],
    colors: ['Black', 'Silver', 'Blue'],
  },
  {
    id: '2',
    name: 'Smart Watch Series 5',
    description: 'The ultimate smart watch with health monitoring, GPS, and a beautiful always-on retina display. Track your fitness, receive notifications, and more.',
    price: 399.99,
    salePrice: 349.99,
    sale: true,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000',
    category: 'electronics',
    rating: 4.7,
    reviews: 987,
    stock: 42,
    features: ['Heart rate monitor', 'GPS', 'Water resistant', 'Always-on display'],
    colors: ['Black', 'White', 'Rose Gold'],
    sizes: ['40mm', '44mm'],
  },
  {
    id: '3',
    name: 'Premium Cotton T-Shirt',
    description: 'Soft, comfortable, and durable premium cotton t-shirt. Perfect for everyday wear with a modern fit and timeless design.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000',
    category: 'clothing',
    rating: 4.5,
    reviews: 651,
    stock: 200,
    features: ['100% Premium Cotton', 'Pre-shrunk', 'Machine washable', 'Eco-friendly dyes'],
    new: true,
    colors: ['Black', 'White', 'Navy', 'Grey', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable and supportive office chair with adjustable height, lumbar support, and breathable mesh back. Perfect for long working hours.',
    price: 249.99,
    salePrice: 199.99,
    sale: true,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1000',
    category: 'home',
    rating: 4.6,
    reviews: 427,
    stock: 15,
    features: ['Adjustable height', 'Lumbar support', 'Breathable mesh', '360° swivel'],
    colors: ['Black', 'Grey'],
  },
  {
    id: '5',
    name: 'Ultra HD 4K Smart TV - 55"',
    description: 'Stunning 4K resolution with HDR and smart features. Access all your favorite streaming services and enjoy incredible picture quality.',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000',
    category: 'electronics',
    rating: 4.7,
    reviews: 815,
    stock: 10,
    features: ['4K Ultra HD', 'HDR', 'Smart TV', 'Voice control'],
    new: true,
  },
  {
    id: '6',
    name: 'Professional Running Shoes',
    description: 'Lightweight, responsive running shoes designed for performance and comfort. Perfect for daily runs or marathon training.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000',
    category: 'sports',
    rating: 4.6,
    reviews: 538,
    stock: 75,
    features: ['Responsive cushioning', 'Breathable mesh', 'Durable outsole', 'Lightweight design'],
    colors: ['Black/Red', 'Blue/White', 'Grey/Green'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
  },
  {
    id: '7',
    name: 'Non-Stick Cookware Set',
    description: 'Complete 10-piece cookware set with durable non-stick coating. Includes pans, pots, and lids for all your cooking needs.',
    price: 199.99,
    salePrice: 149.99,
    sale: true,
    image: 'https://images.unsplash.com/photo-1585837073804-7d3d6137c2d1?q=80&w=1000',
    category: 'home',
    rating: 4.4,
    reviews: 325,
    stock: 18,
    features: ['Non-stick coating', 'Dishwasher safe', 'Heat-resistant handles', 'Oven safe up to 400°F'],
  },
  {
    id: '8',
    name: 'Classic Leather Jacket',
    description: 'Timeless leather jacket with premium construction. Features a soft lining, multiple pockets, and a flattering cut.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000',
    category: 'clothing',
    rating: 4.9,
    reviews: 178,
    stock: 7,
    features: ['Genuine leather', 'Zippered pockets', 'Quilted lining', 'Classic design'],
    colors: ['Black', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
  }
];
