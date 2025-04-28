'use client';

import { CategoryModel } from '@/api/models/category-model';
import { BaseTooltip } from '@/components/base-tooltip';
import { Categories } from '@/components/categories';
import { KennelInfoDialog } from '@/components/kennel-info-dialog';
import { PageLoading } from '@/components/page-loading';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { KENNEL_STATUS } from '@/consts/kennel-consts';
import { useKennel } from '@/context/kennel/kennel-context';
import { Info } from 'lucide-react';
import { use, useEffect } from 'react';
import { toast } from 'sonner';

const categories: CategoryModel[] = [
  { name: 'Собаки' },
  { name: 'Грызуны' },
  { name: 'Рыбы' },
];

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { kennelState, onGetKennel, loading } = useKennel();

  useEffect(() => {
    const getKennel = async () => {
      const res = await onGetKennel!(id);

      if (res && res.error) {
        toast.error(res.error);
      }
    };

    getKennel();
  }, []);

  return loading || !kennelState?.kennel ? (
    <PageLoading />
  ) : (
    <Card className="py-4">
      <CardHeader className="flex justify-between gap-0">
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-md" />
          <div className="flex-1">
            <CardTitle>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-black">{kennelState.kennel.name}</p>
                <BaseTooltip
                  text={KENNEL_STATUS[kennelState.kennel.status].title}
                >
                  <>{KENNEL_STATUS[kennelState.kennel.status].icon}</>
                </BaseTooltip>
              </div>
            </CardTitle>
            <CardDescription>
              {kennelState?.kennel?.description}
            </CardDescription>
          </div>
        </div>
        <KennelInfoDialog kennel={kennelState.kennel}>
          <Button variant="outline" size="icon" className="cursor-pointer">
            <Info />
          </Button>
        </KennelInfoDialog>
      </CardHeader>
      <CardContent>
        <Categories categories={categories} />
      </CardContent>
    </Card>
  );
}
