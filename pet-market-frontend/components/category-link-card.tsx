import { CategoryModel } from '@/api/models/category-model';
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ChevronRight, Ellipsis } from 'lucide-react';
import Link from 'next/link';

interface CategoryLinkCardProps {
  category: CategoryModel;
  expandedBreeds?: boolean;
}

export const CategoryLinkCard: React.FC<CategoryLinkCardProps> = ({
  category,
  expandedBreeds = false,
}) => {
  return (
    <Link
      className="min-w-64 xl:flex-1"
      href={`/search/category/${category._id}`}
    >
      <Card className="group relative">
        <CardHeader>
          <CardTitle>{category.name}</CardTitle>
          <CardDescription className="flex flex-wrap gap-x-2 gap-y-1">
            {(expandedBreeds
              ? category.breeds
              : category.breeds.slice(0, 4)
            ).map((breed) => (
              <Badge key={breed}>{breed}</Badge>
            ))}
            {!expandedBreeds && category.breeds.length > 4 && (
              <Badge variant="secondary">
                <Ellipsis />
              </Badge>
            )}
          </CardDescription>
        </CardHeader>
        <ChevronRight className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100" />
      </Card>
    </Link>
  );
};
