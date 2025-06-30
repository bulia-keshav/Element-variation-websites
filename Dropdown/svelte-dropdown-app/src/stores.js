import { writable } from 'svelte/store';

export const cart = writable([]);
export const lastOrder = writable({ items: [], total: 0 });
export const currentFilter = writable('featured');
export const currentPage = writable('products');

export const products = {
    // Featured Products (shown initially)
    headphones: { name: 'Wireless Headphones', price: 89, rating: '4.2', category: 'electronics', description: 'Bluetooth noise-canceling headphones', gender: 'women', subcategory: 'electronics', brand: 'headphones' },
    smartwatch: { name: 'Smart Fitness Watch', price: 199, rating: '4.4', category: 'electronics', description: 'Track your fitness and health metrics', gender: 'women', subcategory: 'electronics', brand: 'smartwatch' },
    tshirt: { name: 'Cotton T-Shirt', price: 25, rating: '4.0', category: 'clothing', description: 'Comfortable 100% cotton t-shirt', gender: 'men', subcategory: 'clothing', brand: 'tshirts' },
    plant: { name: 'Indoor Plant Set', price: 45, rating: '4.5', category: 'home', description: 'Set of 3 air-purifying plants', gender: 'home', subcategory: 'garden', brand: 'plants' },
    candle: { name: 'Scented Candles Pack', price: 32, rating: '4.2', category: 'home', description: 'Pack of 4 aromatherapy candles', gender: 'home', subcategory: 'decor', brand: 'candles' },
    
    // Nike Products (only visible through dropdown)
    nike_air_max_90: { name: 'Nike Air Max 90', price: 110, rating: '4.6', category: 'shoes', description: 'Classic Air Max with visible air cushioning', gender: 'men', subcategory: 'shoes', brand: 'nike' },
    nike_air_max_pro: { name: 'Nike Air Max Pro', price: 95, rating: '4.5', category: 'shoes', description: 'Professional running shoes with advanced cushioning', gender: 'men', subcategory: 'shoes', brand: 'nike' },
    nike_air_max_270: { name: 'Nike Air Max 270', price: 130, rating: '4.7', category: 'shoes', description: 'Lifestyle shoes with maximum Air unit', gender: 'men', subcategory: 'shoes', brand: 'nike' },
    nike_women_air_max: { name: 'Nike Women Air Max', price: 105, rating: '4.4', category: 'shoes', description: 'Stylish women\'s Air Max sneakers', gender: 'women', subcategory: 'shoes', brand: 'nike' },
    
    // Other brand products
    adidas_ultraboost: { name: 'Adidas Ultraboost', price: 180, rating: '4.7', category: 'shoes', description: 'Premium running shoes with boost technology', gender: 'men', subcategory: 'shoes', brand: 'adidas' },
    adidas_women: { name: 'Adidas Women Sneakers', price: 140, rating: '4.3', category: 'shoes', description: 'Comfortable women\'s sneakers', gender: 'women', subcategory: 'shoes', brand: 'adidas' },
    jeans: { name: 'Denim Jeans', price: 65, rating: '4.3', category: 'clothing', description: 'Classic fit blue denim jeans', gender: 'men', subcategory: 'clothing', brand: 'jeans' }
};
