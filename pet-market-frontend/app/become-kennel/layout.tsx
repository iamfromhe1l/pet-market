'use client';

import { NotPublicLayout } from '@/components/not-public-layout';
import { KennelProvider } from '@/context/kennel/kennel-context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotPublicLayout>
      <KennelProvider>{children}</KennelProvider>
    </NotPublicLayout>
  );
}
