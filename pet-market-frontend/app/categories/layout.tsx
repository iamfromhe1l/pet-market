'use client';

import { SidebarLayout } from '@/components/sidebar-layout';
import React from 'react';

export default function CategoriesPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarLayout pageTitle="Все категории">{children}</SidebarLayout>;
}
