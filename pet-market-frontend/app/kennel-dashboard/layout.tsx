'use client';

import { NotPublicLayout } from '@/components/not-public-layout';
import { CategoryProvider } from '@/context/category/category-context';
import { KennelProvider } from '@/context/kennel/kennel-context';
import React from 'react';

export default function KennelDashboardPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotPublicLayout sidebarProps={{ pageTitle: 'Админ-панель питомника' }}>
      <CategoryProvider>
        <KennelProvider>{children}</KennelProvider>
      </CategoryProvider>
    </NotPublicLayout>
  );
}
