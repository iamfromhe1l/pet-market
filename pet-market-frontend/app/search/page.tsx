'use client';

import { CategoryModel } from '@/api/models/category-model';
import { PageLoading } from '@/components/page-loading';
import { Search } from '@/components/search';
import { SidebarLayout } from '@/components/sidebar-layout';
import { useCategory } from '@/context/category/category-context';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function SearchPage() {
  const { onGetSystemCategories } = useCategory();

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onGetSystemCategories!().then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else if (res.data) {
        setCategories(res.data);
        setLoading(false);
      }
    });
  }, []);

  return (
    <SidebarLayout pageTitle="Расширенный посик">
      {loading ? (
        <PageLoading />
      ) : (
        <Search
          categories={categories}
          defaultFilters={{ populateKennel: true }}
        />
      )}
    </SidebarLayout>
  );
}
