'use client';

import { NotPublicLayout } from '@/components/not-public-layout';
import { SidebarLayout } from '@/components/sidebar-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotPublicLayout>
      <SidebarLayout>{children}</SidebarLayout>
    </NotPublicLayout>
  );
}
