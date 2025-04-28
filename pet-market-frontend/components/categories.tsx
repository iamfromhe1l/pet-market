import { CategoryModel } from '@/api/models/category-model';
import Image from 'next/image';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface CategoriesProps {
  categories: CategoryModel[];
}

export const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category, index) => (
        <Card key={index} className="relative h-60 gap-0 overflow-hidden p-0">
          <CardContent className="relative flex-1 rounded-t-md p-0">
            <Image
              src={category.imageUrl ?? '/login-cat.jpg'}
              className="inset-0 h-full w-full object-cover"
              alt="auth-cat"
              quality={100}
              fill
            />
          </CardContent>
          <CardHeader className="bg-foreground/50 absolute bottom-0 flex w-full justify-start rounded-sm py-4 backdrop-blur-xl">
            <CardTitle className="text-background font-black">
              {category.name}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
