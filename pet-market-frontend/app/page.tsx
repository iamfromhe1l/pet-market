'use client';

import { SidebarLayout } from '@/components/sidebar-layout';
import Image from 'next/image';

export default function Home() {
  return (
    <SidebarLayout pageTitle="Главная">
      <div className="flex flex-col">
        <div className="bg-muted relative h-96 w-full overflow-hidden rounded-xl">
          <Image
            src="/home.jpg"
            className="absolute inset-0 h-full w-full object-cover"
            alt="auth-cat"
            quality={100}
            fill
          />
          <div className="absolute top-8 right-6 md:right-10">
            <h1 className="text-6xl font-black text-white">PetMarket</h1>
            <p className="text-xl text-white">Маркетплейс питомцев</p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
