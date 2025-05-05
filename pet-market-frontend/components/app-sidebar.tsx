'use client';

import {
  AlignLeft,
  Bone,
  Home,
  Package,
  Search,
  Settings2,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavOthers } from '@/components/nav-others';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { LogoLink } from './logo-link';
import { ComponentProps } from 'react';
        
const data = {
  navMain: [
    {
      title: 'Главная',
      url: '/',
      icon: Home,
      isActive: true,
      items: [
        {
          name: 'Главная',
          icon: Home,
          href: '/',
        },
        {
          name: 'Расширенный поиск',
          icon: Search,
          href: '/search',
        },
        {
          name: 'Питомники',
          icon: Bone,
          href: '/all-kennels',
        },
        {
          name: 'Категории',
          icon: AlignLeft,
          href: '/categories',
        },
      ],
    },
    {
      title: 'Заказы',
      url: '#',
      icon: Package,
      items: [
        {
          name: 'Все заказы',
          icon: Package,
          href: '#',
        },
      ],
    },
    {
      title: 'Настройки',
      url: '#',
      icon: Settings2,
      items: [
        {
          name: 'Главная',
          href: '#',
        },
        {
          name: 'Аккаунт',
          href: '#',
        },
        {
          name: 'Заказы',
          href: '#',
        },
      ],
    },
  ],
  projects: [],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoLink isSidebarLink />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavOthers />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
