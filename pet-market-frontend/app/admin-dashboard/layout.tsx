'use client';

import { Header } from '@/components/header';
import { NotPublicLayout } from '@/components/not-public-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotPublicLayout>
      <>
        <Header />
        {children}
      </>
    </NotPublicLayout>
  );
}
