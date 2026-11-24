import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AuthModal from '@/components/AuthModal';

export const metadata: Metadata = {
  title: 'VEDAYU AMRIT | Rooted in Ayurveda, Inspired by Nature',
  description:
    'VEDAYU AMRIT is a premium Indian Herbal and Ayurvedic brand offering pure botanical powders, churnas, cold-pressed oils, revitalizing juices, and classical Rasayanas.',
  keywords: [
    'VEDAYU AMRIT',
    'Ayurveda',
    'Herbal Products',
    'Ashwagandha',
    'Chyawanprash',
    'Amla Juice',
    'Bhringraj Oil',
    'Organic Powders',
    'Ayurvedic Skin Care',
  ],
  authors: [{ name: 'VEDAYU AMRIT' }],
  icons: {
    icon: '/images/vedayu-amrit-logo.jpg',
  },
  openGraph: {
    title: 'VEDAYU AMRIT | Rooted in Ayurveda, Inspired by Nature',
    description:
      'Explore pure, certified Ayurvedic & herbal products inspired by 5000 years of Vedic traditions.',
    url: 'https://vedayuamrit.com',
    siteName: 'VEDAYU AMRIT',
    images: [
      {
        url: '/images/vedayu-bottles-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'VEDAYU AMRIT Herbal & Ayurvedic Range',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between selection:bg-ayur-gold/30 selection:text-ayur-forest antialiased">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <CartDrawer />
            <WhatsAppButton />
            <AuthModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

