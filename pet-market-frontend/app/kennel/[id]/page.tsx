'use client';

import { Header } from '@/components/header';
import { useKennel } from '@/context/kennel/kennel-context';
import { use } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { kennelState } = useKennel();

  return (
    <div>
      <Header />
      <div className="grid gap-4">
        <p>ID: {id}</p>
      </div>
    </div>
  );
}
