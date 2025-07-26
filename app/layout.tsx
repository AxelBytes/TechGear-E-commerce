import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ChatWidget } from '@/components/support/ChatWidget'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { Suspense } from 'react'
import { PageLoading } from '@/components/ui/loading'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'TechGear - Tu Destino Tecnológico',
  description: 'Descubre la mejor tecnología con TechGear. Productos de calidad, precios competitivos y servicio excepcional.',
  keywords: 'tecnología, smartphones, laptops, tablets, accesorios, techgear',
  authors: [{ name: 'TechGear Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'TechGear - Tu Destino Tecnológico',
    description: 'Descubre la mejor tecnología con TechGear',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            <Suspense fallback={<PageLoading />}>
              {children}
            </Suspense>
          </main>
          <Footer />
          <CartDrawer />
          <ChatWidget />
          <Toaster 
            position="top-right" 
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
