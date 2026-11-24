import { Coupon } from '@/types';

export const COUPONS: Coupon[] = [
  {
    code: 'VEDA10',
    discountPercent: 10,
    minOrderValue: 499,
    description: '10% OFF on all orders above ₹499',
    isActive: true,
  },
  {
    code: 'AYUSH20',
    discountPercent: 20,
    minOrderValue: 999,
    description: '20% OFF on herbal wellness orders above ₹999',
    isActive: true,
  },
  {
    code: 'WELCOME100',
    discountFlat: 100,
    minOrderValue: 599,
    description: 'Flat ₹100 OFF for new customers on orders above ₹599',
    isActive: true,
  },
  {
    code: 'FESTIVE15',
    discountPercent: 15,
    minOrderValue: 799,
    description: '15% Festive Ayurvedic discount on orders above ₹799',
    isActive: true,
  },
];

