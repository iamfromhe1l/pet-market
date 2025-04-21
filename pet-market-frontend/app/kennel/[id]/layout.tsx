'use client';

import { Header } from '@/components/header';
import { KennelProvider } from '@/context/kennel/kennel-context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <KennelProvider>
      <Header />
      {children}
    </KennelProvider>
  );
}
