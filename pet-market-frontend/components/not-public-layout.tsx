'use client';

import { useAuth } from '@/context/auth/auth-context';
import { redirect } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';
import { PageLoading } from './page-loading';
import { toast } from 'sonner';
import { SidebarLayout, SidebarLayoutProps } from './sidebar-layout';

interface NotPublicLayoutProps extends PropsWithChildren {
  sidebarProps?: SidebarLayoutProps;
}

export const NotPublicLayout: React.FC<NotPublicLayoutProps> = ({
  children,
  sidebarProps,
}) => {
  const { authState, loading } = useAuth();

  useEffect(() => {
    if (!loading && !authState?.authenticated) {
      toast.error('Вы не авторизованы!');
      redirect('/login');
    }
  }, [authState, loading]);

  return (
    <SidebarLayout {...sidebarProps}>
      {loading ? <PageLoading /> : children}
    </SidebarLayout>
  );
};
