'use client';

import { CategoryModel } from '@/api/models/category-model';
import { BaseTooltip } from '@/components/base-tooltip';
import { BecomeKennelForm } from '@/components/become-kennel-form';
import { CategoriesArchiveDialog } from '@/components/categories-archive-dialog';
import { CategoriesTable } from '@/components/categories-table';
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
import { UpdateCreateCustomCategory } from '@/components/update-create-custom-category-dialog';
import { useCategory } from '@/context/category/category-context';
import { useKennel } from '@/context/kennel/kennel-context';
import { useUser } from '@/context/user/user-context';
import { Archive, Pencil, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function KennelDashboardPage() {
  const { onGetKennel, kennelState, loading } = useKennel();
  const { userState } = useUser();
  const {
    categoryState,
    onGetKennelCategories,
    onGetSystemCategories,
    loading: loadingCategories,
  } = useCategory();
  const router = useRouter();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [systemCategories, setSystemCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    if (!userState?.user?.kennelId) {
      toast.error('Вы не являетесь продавцом!');
      router.push('/');
    } else {
      onGetKennel!(userState?.user?.kennelId);
      onGetKennelCategories!(userState.user.kennelId);
      onGetSystemCategories!().then((res) => {
        setSystemCategories(res.data ?? []);
      });
    }
  }, []);

  return loading ? (
    <PageLoading />
  ) : (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>Основания информация питомника</CardDescription>
            </div>
            {isEdit ? null : (
              <BaseTooltip text="Редактировать">
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  size="icon"
                  onClick={() => setIsEdit(true)}
                >
                  <Pencil />
                </Button>
              </BaseTooltip>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <BecomeKennelForm
            kennel={kennelState?.kennel}
            isEdit={isEdit}
            onCancel={() => setIsEdit(false)}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Категории</CardTitle>
              <CardDescription>Все категории вашего питомника</CardDescription>
            </div>
            <div className="flex gap-2">
              <UpdateCreateCustomCategory>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  size="icon"
                >
                  <Plus />
                </Button>
              </UpdateCreateCustomCategory>
              <CategoriesArchiveDialog
                categories={[
                  ...systemCategories.filter(
                    (category) =>
                      categoryState?.categories.findIndex(
                        (curCategory) => curCategory._id === category._id,
                      ) === -1,
                  ),
                  ...(categoryState?.categories.filter(
                    (category) => category.isDisabled,
                  ) ?? []),
                ]}
              >
                <Button
                  className="cursor-pointer"
                  size="icon"
                  variant="outline"
                >
                  <Archive />
                </Button>
              </CategoriesArchiveDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mx-6 overflow-hidden rounded-md border px-0">
          {loadingCategories ? (
            <Skeleton className="h-40 w-full rounded-md" />
          ) : (
            <CategoriesTable
              categories={
                categoryState?.categories.filter(
                  (category) => !category.isDisabled,
                ) ?? []
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
