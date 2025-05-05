'use client';

import { SidebarLayout } from '@/components/sidebar-layout';
import { KennelProvider } from '@/context/kennel/kennel-context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <KennelProvider>
      <SidebarLayout>{children}</SidebarLayout>
    </KennelProvider>
  );
}
