'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Coupon } from '@/types';
import { COUPONS } from '@/data/coupons';

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'timeline'>) => Order;
  getOrderById: (orderIdOrNumber: string) => Order | undefined;
  updateOrderStatus: (orderNumber: string, status: Order['status']) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING_FEE = 49;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('va_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('va_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('va_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        // Initial sample orders for tracking demo
        const initialSampleOrders: Order[] = [
          {
            id: 'ord-101',
            orderNumber: 'VA-849201',
            date: '10 Nov 2026, 04:30 PM',
            items: [
              {
                product: {
                  id: 'va-01',
                  name: 'Pure Ashwagandha Powder',
                  slug: 'ashwagandha-powder',
                  category: 'Ayurvedic Health Products',
                  categorySlug: 'ayurvedic-products',
                  tagline: 'Stress Relief, Vitality & Deep Restful Sleep',
                  price: 349,
                  mrp: 499,
                  rating: 4.9,
                  reviewCount: 328,
                  inStock: true,
                  stockCount: 140,
                  image: '/images/vedayu-bottles-hero.jpg',
                  images: ['/images/vedayu-bottles-hero.jpg'],
                  sizeWeight: '200g',
                  dosageForm: 'Powder',
                  dosha: ['Vata', 'Kapha'],
                  benefits: ['Relieves stress', 'Boosts stamina'],
                  ingredients: [{ name: 'Ashwagandha Root Extract', percentage: '100%' }],
                  usageInstructions: '1 tsp with warm milk.',
                  description: 'Organic Ashwagandha powder.',
                  highlights: ['Organic', 'GMP'],
                  certifications: ['GMP', 'AYUSH'],
                },
                quantity: 2,
              },
              {
                product: {
                  id: 'va-22',
                  name: 'Pure Kannauj Gulab Jal',
                  slug: 'rose-water',
                  category: 'Skin Care Products',
                  categorySlug: 'skin-care',
                  tagline: '100% Hydro-Distilled Kannauj Desi Gulab Mist',
                  price: 249,
                  mrp: 325,
                  rating: 5.0,
                  reviewCount: 430,
                  inStock: true,
                  stockCount: 230,
                  image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
                  images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'],
                  sizeWeight: '200ml',
                  dosageForm: 'Mist',
                  dosha: ['Pitta'],
                  benefits: ['Pore tightening', 'Hydrating'],
                  ingredients: [{ name: 'Steam Distilled Rose Water', percentage: '100%' }],
                  usageInstructions: 'Mist directly over face.',
                  description: 'Pure Kannauj Rose Water.',
                  highlights: ['Traditional Deg Bhapka', 'Pure'],
                  certifications: ['GMP', 'AYUSH'],
                },
                quantity: 1,
              },
            ],
            subtotal: 947,
            discount: 95,
            shipping: 0,
            total: 852,
            paymentMethod: 'upi',
            paymentStatus: 'Paid',
            status: 'Shipped',
            customer: {
              fullName: 'Aarav Sharma',
              email: 'aarav.sharma@example.com',
              phone: '+91 98765 43210',
              address: 'Flat 402, Lotus Residency, Indiranagar',
              city: 'Bengaluru',
              state: 'Karnataka',
              pincode: '560038',
            },
            trackingId: 'DELHIVERY-77492109',
            estimatedDelivery: '13 Nov 2026',
            timeline: [
              { status: 'Order Placed', timestamp: '10 Nov 2026, 04:30 PM', description: 'Order confirmed and payment verified via UPI', completed: true },
              { status: 'Packed', timestamp: '11 Nov 2026, 09:15 AM', description: 'Items verified, sealed with tamper-proof Vedic seal', completed: true },
              { status: 'Shipped', timestamp: '11 Nov 2026, 11:30 AM', description: 'Dispatched via Express Courier from Haridwar Hub', completed: true },
              { status: 'Out for Delivery', timestamp: 'Pending', description: 'Assigned to delivery courier', completed: false },
              { status: 'Delivered', timestamp: 'Pending', description: 'Package safely delivered to your doorstep', completed: false },
            ],
          },
        ];
        setOrders(initialSampleOrders);
        localStorage.setItem('va_orders', JSON.stringify(initialSampleOrders));
      }
    } catch (e) {
      console.error('Error hydrating cart/orders:', e);
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('va_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem('va_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Save orders changes
  useEffect(() => {
    try {
      localStorage.setItem('va_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let discount = 0;
  if (appliedCoupon) {
    if (subtotal < appliedCoupon.minOrderValue) {
      // Coupon invalid due to subtotal drop
      setAppliedCoupon(null);
      setCouponError(`Minimum order value of ₹${appliedCoupon.minOrderValue} required.`);
    } else if (appliedCoupon.discountPercent) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountFlat) {
      discount = Math.min(appliedCoupon.discountFlat, subtotal);
    }
  }

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shipping);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const applyCoupon = (code: string): boolean => {
    const formattedCode = code.trim().toUpperCase();
    const found = COUPONS.find(
      (c) => c.code === formattedCode && c.isActive
    );

    if (!found) {
      setCouponError('Invalid coupon code. Try VEDA10 or AYUSH20');
      return false;
    }

    if (subtotal < found.minOrderValue) {
      setCouponError(`Coupon valid only on orders above ₹${found.minOrderValue}`);
      return false;
    }

    setAppliedCoupon(found);
    setCouponError(null);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const placeOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'timeline'>
  ): Order => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `VA-${randomNum}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      trackingId: `DELHIVERY-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      timeline: [
        {
          status: 'Order Placed',
          timestamp: 'Just Now',
          description: `Order received with ${orderData.paymentMethod.toUpperCase()} payment`,
          completed: true,
        },
        {
          status: 'Confirmed',
          timestamp: 'Immediate',
          description: 'Verified with inventory dispatch warehouse',
          completed: true,
        },
        {
          status: 'Packed',
          timestamp: 'Expected within 12 hrs',
          description: 'Will be sealed with eco-friendly Ayurvedic seal',
          completed: false,
        },
        {
          status: 'Shipped',
          timestamp: 'Expected in 24 hrs',
          description: 'Handoff to premium courier partner',
          completed: false,
        },
        {
          status: 'Out for Delivery',
          timestamp: 'Expected in 3-4 days',
          description: 'Local delivery courier on the way',
          completed: false,
        },
        {
          status: 'Delivered',
          timestamp: 'Expected in 4 days',
          description: 'Safe contactless doorstep delivery',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderIdOrNumber: string): Order | undefined => {
    const cleanSearch = orderIdOrNumber.trim().toUpperCase();
    return orders.find(
      (o) =>
        o.orderNumber.toUpperCase() === cleanSearch ||
        o.id === cleanSearch ||
        o.customer.phone.replace(/\D/g, '').includes(cleanSearch.replace(/\D/g, ''))
    );
  };

  const updateOrderStatus = (orderNumber: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.orderNumber === orderNumber) {
          const updatedTimeline = ord.timeline.map((step) => {
            if (step.status === status) {
              return { ...step, completed: true, timestamp: 'Updated Just Now' };
            }
            return step;
          });
          return { ...ord, status, timeline: updatedTimeline };
        }
        return ord;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        shipping,
        total,
        itemCount,
        orders,
        placeOrder,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

