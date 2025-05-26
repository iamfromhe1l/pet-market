'use client';

import { CategoryModel } from '@/api/models/category-model';
import { PageLoading } from '@/components/page-loading';
import { Search } from '@/components/search';
import { SidebarLayout } from '@/components/sidebar-layout';
import { useCategory } from '@/context/category/category-context';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function SearchByCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { onGetSystemCategories } = useCategory();
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onGetSystemCategories!().then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else if (res.data) {
        const category = res.data.find((curCategory) => curCategory._id === id);
        if (category) {
          setCategories([category]);
          setLoading(false);
        } else {
          toast.error('Такой категории не существует');
          router.push('/');
        }
      }
    });
  }, []);

  return (
    <SidebarLayout pageTitle={`Расширенный посик по категории`}>
      {loading ? (
        <PageLoading />
      ) : (
        <Search
          categories={categories}
          defaultFilters={{
            populateKennel: true,
            categoryId: categories.map((category) => category._id),
          }}
        />
      )}
    </SidebarLayout>
  );
}
