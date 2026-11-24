export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  subCategory?: string;
  tagline: string;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  images: string[];
  sizeWeight: string;
  dosageForm: string; // e.g. "Powder", "Juice", "Capsule", "Oil", "Cream", "Seeds"
  dosha: string[]; // e.g. ["Vata", "Pitta", "Kapha"]
  benefits: string[];
  ingredients: { name: string; percentage?: string; purpose?: string }[];
  usageInstructions: string;
  description: string;
  highlights: string[];
  certifications: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  featuredHerbs: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string[];
  tags: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'razorpay' | 'cod' | 'upi';
  paymentStatus: 'Paid' | 'Pending' | 'COD Confirmed';
  status: 'Order Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  trackingId?: string;
  estimatedDelivery?: string;
  timeline: {
    status: string;
    timestamp: string;
    description: string;
    completed: boolean;
  }[];
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFlat?: number;
  minOrderValue: number;
  description: string;
  isActive: boolean;
}

