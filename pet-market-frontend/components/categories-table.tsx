import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Archive, EllipsisVertical, Pencil } from 'lucide-react';
import { Button } from './ui/button';

import { CategoryModel } from '@/api/models/category-model';
import { Badge } from './ui/badge';
import { UpdateCreateCustomCategory } from './update-create-custom-category-dialog';
import { useCategory } from '@/context/category/category-context';
import { toast } from 'sonner';

interface CategoriesTableProps {
  categories: CategoryModel[];
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
}) => {
  const { onRemoveCategory, onSetCategoryState } = useCategory();

  const removeCategory = async (categoryId: string, isSystem: boolean) => {
    const res = await onRemoveCategory!(categoryId, isSystem);

    if (res && res.error) {
      toast.error(res.error);
    } else {
      toast.success('Категория успешно перемещаена в архив');
    }
  };

  return (
    <div className="max-h-[400px] overflow-x-hidden overflow-y-auto">
      <Table>
        <TableHeader className="bg-secondary sticky top-0 z-10 h-16">
          <TableRow>
            <TableHead className="hidden w-[40px] border-r sm:table-cell" />
            <TableHead className="w-[100px] border-r">Название</TableHead>
            <TableHead className="border-r">Породы</TableHead>
            <TableHead className="w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length ? (
            categories.map((category, index) => (
              <TableRow key={category._id}>
                <TableCell className="hidden border-r text-center sm:table-cell">
                  {index + 1}
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="flex flex-wrap gap-x-2 gap-y-1">
                  {category.breeds.map((breed, index) => (
                    <Badge key={index} variant="outline">
                      {breed}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className="w-[40px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Действия</DropdownMenuLabel>
                      {category.isSystem ? null : (
                        <>
                          <UpdateCreateCustomCategory
                            category={category}
                            onUpdateCategory={(newCategory) =>
                              onSetCategoryState!(
                                categories.map((curCategory) =>
                                  curCategory._id === newCategory._id
                                    ? newCategory
                                    : curCategory,
                                ),
                              )
                            }
                          >
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Pencil />
                              Изменить
                            </DropdownMenuItem>
                          </UpdateCreateCustomCategory>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem
                        onSelect={() =>
                          removeCategory(category._id, category.isSystem)
                        }
                      >
                        <Archive /> Отключить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="w-full py-10 text-center">
                У питомника нет категорий...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
