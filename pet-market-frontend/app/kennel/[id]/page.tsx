'use client';

import { BaseTooltip } from '@/components/base-tooltip';
import { KennelInfoDialog } from '@/components/kennel-info-dialog';
import { PageLoading } from '@/components/page-loading';
import { Search } from '@/components/search';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { KENNEL_STATUS } from '@/consts/kennel-consts';
import { useAuth } from '@/context/auth/auth-context';
import { useCategory } from '@/context/category/category-context';
import { useKennel } from '@/context/kennel/kennel-context';

import { Info } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { authState } = useAuth();
  const { kennelState, onGetKennel, loading } = useKennel();
  const { categoryState, onGetKennelCategories } = useCategory();

  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

  useEffect(() => {
    const getKennel = async () => {
      const res = await onGetKennel!(id);

      if (res && res.error) {
        toast.error(res.error);
      }
    };
    if (authState?.authenticated) {
      getKennel();
      onGetKennelCategories!(id).then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else if (res.data) {
          setLoadingCategories(false);
        }
      });
    }
  }, [authState?.authenticated]);

  return loading || !kennelState?.kennel ? (
    <PageLoading />
  ) : (
    <div className="grid gap-4">
      <Card className="py-4">
        <CardHeader className="flex justify-between gap-0">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-md" />
            <div className="flex-1">
              <CardTitle>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-black">
                    {kennelState.kennel.name}
                  </p>
                  <BaseTooltip
                    text={KENNEL_STATUS[kennelState.kennel.status].title}
                  >
                    {KENNEL_STATUS[kennelState.kennel.status].icon}
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
      </Card>
      {loadingCategories ? (
        <div className="grid gap-4">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      ) : (
        <Search
          categories={categoryState?.categories ?? []}
          defaultFilters={{
            kennelId: id,
          }}
        />
      )}
    </div>
  );
}
