'use client';

import { useAuth } from '@/context/auth/auth-context';
import { redirect } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';
import { PageLoading } from './page-loading';
import { toast } from 'sonner';
import { SidebarLayout } from './sidebar-layout';

export const NotPublicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { authState, loading } = useAuth();

  useEffect(() => {
    if (!loading && !authState?.authenticated) {
      toast.error('Вы не авторизованы!');
      redirect('/login');
    }
  }, [authState, loading]);

  return <SidebarLayout>{loading ? <PageLoading /> : children}</SidebarLayout>;
};
