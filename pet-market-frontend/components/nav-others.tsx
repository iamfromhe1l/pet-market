'use client';

import { Bone, ShieldUser, Star, Store } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useUser } from '@/context/user/user-context';
import { useEffect, useState } from 'react';
import { UserRole } from '@/types/user-types';
import { NavItem } from '@/types/sidebar-types';
import Link from 'next/link';
import { useAuth } from '@/context/auth/auth-context';

export function NavOthers() {
  const { userState } = useUser();
  const { authState } = useAuth();

  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    if (!authState?.authenticated) {
      setNavItems([]);
      return;
    }

    const role = userState?.user?.role;

    if (role === UserRole.ADMIN) {
      setNavItems([
        {
          name: 'Админ панель',
          href: '/admin-dashboard',
          icon: ShieldUser,
        },
      ]);
    } else if (role === UserRole.SELLER) {
      setNavItems([
        {
          name: 'Панель питомника',
          href: '#',
          icon: Store,
        },
        {
          name: 'Мой питомник',
          href: `/kennel/${userState?.user?.kennel}`,
          icon: Bone,
        },
      ]);
    } else if (role === UserRole.USER) {
      setNavItems([
        {
          name: 'Мои отзывы',
          href: '/',
          icon: Star,
        },
      ]);
    }
  }, [userState?.user?.role, authState?.authenticated]);

  return navItems.length ? (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Другое</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.href}>
                {item.icon ? <item.icon /> : null}
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ) : null;
}
