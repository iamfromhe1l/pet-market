import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/components/main-layout';

export const metadata: Metadata = {
  title: 'PetMarket',
  description: 'PetMarket',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
