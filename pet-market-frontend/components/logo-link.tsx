import { PawPrint } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

interface LogoLinkProps {
  isSidebarLink?: boolean;
}

const Logo = () => (
  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
    <PawPrint className="size-5" />
  </div>
);

export const LogoLink: React.FC<LogoLinkProps> = ({
  isSidebarLink = false,
}) => {
  const linkProps = {
    href: '/',
    className: 'hover:bg-sidebar-accent rounded-md',
  };
  return (
    <Link {...linkProps}>
      {isSidebarLink ? (
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Logo />
              <div className="grid">
                <span className="text-accent-foreground truncate text-sm font-bold">
                  PetMarket
                </span>
                <span className="truncate text-xs font-light">
                  Маркетплейс питомцев
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2">
          <Logo />
          <p className="text-accent-foreground text-sm font-bold">PetMarket</p>
        </div>
      )}
    </Link>
  );
};
