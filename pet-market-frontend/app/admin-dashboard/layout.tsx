'use client';

import { NotPublicLayout } from '@/components/not-public-layout';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NotPublicLayout>{children}</NotPublicLayout>;
}
