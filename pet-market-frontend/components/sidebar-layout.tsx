import React, { PropsWithChildren } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/auth/auth-context';
import { User } from 'lucide-react';
import Link from 'next/link';
import { Separator } from './ui/separator';

export interface SidebarLayoutProps extends PropsWithChildren {
  pageTitle?: string;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  pageTitle = '',
}) => {
  const { authState } = useAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex flex-1 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1 cursor-pointer" />
              <div className="h-4">
                <Separator orientation="vertical" />
              </div>
              <p className="text-sm font-semibold">{pageTitle}</p>
            </div>
            {authState?.authenticated ? null : (
              <Link href="/login">
                <Button className="cursor-pointer">
                  <User />
                  Войти
                </Button>
              </Link>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-4 pt-0">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
