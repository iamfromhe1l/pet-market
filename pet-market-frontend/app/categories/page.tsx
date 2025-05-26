'use client';

import { CategoryModel } from '@/api/models/category-model';
import { CategoryLinkCard } from '@/components/category-link-card';
import { PageLoading } from '@/components/page-loading';
import { Label } from '@/components/ui/label';
import { useCategory } from '@/context/category/category-context';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function CategoriesPage() {
  const { onGetSystemCategories } = useCategory();

  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

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

  return loading ? (
    <PageLoading />
  ) : (
    <div className="grid gap-4">
      <Label className="text-xl font-bold">Системные категории</Label>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryLinkCard
            key={category._id}
            category={category}
            expandedBreeds
          />
        ))}
      </div>
    </div>
  );
}
