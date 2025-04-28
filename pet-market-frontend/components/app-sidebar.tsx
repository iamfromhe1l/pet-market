'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  Package,
  PieChart,
  Settings2,
  ShieldUser,
  SquareTerminal,
  Star,
  Store,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { LogoLink } from './logo-link';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Главная',
      url: '/',
      icon: Home,
      isActive: true,
      items: [
        {
          title: 'Расширенный поиск',
          url: '#',
        },
        {
          title: 'Питомники',
          url: '#',
        },
        {
          title: 'Категории',
          url: '#',
        },
      ],
    },
    {
      title: 'Заказы',
      url: '#',
      icon: Package,
      items: [
        {
          title: 'История',
          url: '#',
        },
      ],
    },
    {
      title: 'Настройки',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Главная',
          url: '#',
        },
        {
          title: 'Аккаунт',
          url: '#',
        },
        {
          title: 'Заказы',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Отзывы',
      url: '#',
      icon: Star,
    },
    {
      name: 'Админ панель',
      url: '#',
      icon: ShieldUser,
    },
    {
      name: 'Панель питомника',
      url: '#',
      icon: Store,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoLink isSidebarLink />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
