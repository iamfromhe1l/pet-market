'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Header />
      <Link href="become-kennel">
        <Button>Стать питомником</Button>
      </Link>
    </div>
  );
}
