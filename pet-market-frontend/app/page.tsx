'use client';

import { CategoryModel } from '@/api/models/category-model';
import PublicApi from '@/api/public/public-api';
import { StatsData } from '@/api/public/types';
import { CategoryLinkCard } from '@/components/category-link-card';
import { SidebarLayout } from '@/components/sidebar-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useCategory } from '@/context/category/category-context';
import { getAxiosError } from '@/helpers/catch-error-helpers';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const { onGetSystemCategories } = useCategory();

  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [loadingStats, setLoadingStats] = useState<boolean>(true);
  const [stats, setStats] = useState<StatsData>();

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await PublicApi.getStats();

        setStats(data);
        setLoadingStats(false);
      } catch (e: unknown) {
        const res = getAxiosError(e);
        if (res.error) {
          toast.error(res.error);
        }
      }
    };

    onGetSystemCategories!().then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else if (res.data) {
        setCategories(res.data);
        setLoadingCategories(false);
      }
    });

    getStats();
  }, []);
  return (
    <SidebarLayout pageTitle="Главная">
      <div className="flex flex-col gap-12">
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
        <Card>
          <CardHeader>
            <CardTitle>Статистика маркетплейса</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Количество пользователей</CardTitle>
                </CardHeader>
                {loadingStats || !stats?.totalUsers ? (
                  <CardContent>
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                ) : (
                  <CardContent className="text-center text-4xl font-bold">
                    {stats?.totalUsers}
                  </CardContent>
                )}
              </Card>
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Количество питомцев</CardTitle>
                </CardHeader>
                {loadingStats || !stats?.totalPets ? (
                  <CardContent>
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                ) : (
                  <CardContent className="text-center text-4xl font-bold">
                    {stats?.totalPets}
                  </CardContent>
                )}
              </Card>
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Количество питомников</CardTitle>
                </CardHeader>
                {loadingStats || !stats?.totalKennels ? (
                  <CardContent>
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                ) : (
                  <CardContent className="text-center text-4xl font-bold">
                    {stats?.totalKennels}
                  </CardContent>
                )}
              </Card>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Топ категории
              <Link
                href="/categories"
                className="group text-muted-foreground flex items-center gap-1 text-sm font-medium"
              >
                Все
                <ChevronRight className="mr-1 size-4 transition-all group-hover:mr-0 group-hover:ml-1" />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 overflow-x-auto pb-2">
            {loadingCategories ? (
              <Skeleton className="h-36 flex-1 rounded-xl" />
            ) : (
              categories
                .slice(0, 4)
                .map((category) => (
                  <CategoryLinkCard category={category} key={category._id} />
                ))
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
