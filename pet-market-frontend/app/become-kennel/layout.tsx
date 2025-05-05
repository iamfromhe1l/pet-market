'use client';

import { NotPublicLayout } from '@/components/not-public-layout';
import { PageLoading } from '@/components/page-loading';
import { useAuth } from '@/context/auth/auth-context';
import { KennelProvider } from '@/context/kennel/kennel-context';
import { useUser } from '@/context/user/user-context';
import { UserRole } from '@/types/user-types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userState } = useUser();
  const { authState } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (authState?.authenticated && userState?.user) {
      const role = userState.user.role;
      if (role === UserRole.USER) {
        setLoading(false);
      } else {
        toast.error(
          role === UserRole.SELLER
            ? 'У вас уже есть питомник'
            : 'Админ не может создавать питомники',
        );
        router.push('/');
      }
    }
  }, [authState?.authenticated]);

  return (
    <NotPublicLayout>
      {loading ? <PageLoading /> : <KennelProvider>{children}</KennelProvider>}
    </NotPublicLayout>
  );
}
