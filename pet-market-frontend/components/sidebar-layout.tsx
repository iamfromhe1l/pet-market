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

export const SidebarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { authState } = useAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex flex-1 items-center justify-between px-4">
            <SidebarTrigger className="-ml-1" />
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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
