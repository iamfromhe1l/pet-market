'use client';

import { SidebarLayout } from '@/components/sidebar-layout';
import Link from 'next/link';

export default function Home() {
  return (
    <SidebarLayout>
      <Link href="become-kennel"></Link>
    </SidebarLayout>
  );
}
