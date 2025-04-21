'use client';

import { Header } from '@/components/header';
import { useKennel } from '@/context/kennel/kennel-context';
import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
import { toast } from 'sonner';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { kennelState, onGetKennel, loading } = useKennel();
  const router = useRouter();

  useEffect(() => {
    const getKennel = async () => {
      const res = await onGetKennel!(id);

      if (res && res.error) {
        toast.error(res.error);
        router.replace('/');
      }
    };

    getKennel();
  }, []);

  return (
    <div className="grid gap-4">
      <p>ID: {id}</p>
      <p>Name: {kennelState?.kennel?.name}</p>
      <p>Description: {kennelState?.kennel?.description}</p>
      <p>Address: {kennelState?.kennel?.address}</p>
      <p>Status: {kennelState?.kennel?.status}</p>
    </div>
  );
}
