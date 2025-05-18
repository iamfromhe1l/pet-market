import { CategoryModel } from '@/api/models/category-model';
import React, { PropsWithChildren } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BaseTooltip } from './base-tooltip';
import { ArchiveRestore, BadgeAlert } from 'lucide-react';
import { Button } from './ui/button';
import { useCategory } from '@/context/category/category-context';

interface CategoriesArchiveDialogProps extends PropsWithChildren {
  categories: CategoryModel[];
}

export const CategoriesArchiveDialog: React.FC<
  CategoriesArchiveDialogProps
> = ({ categories, children }) => {
  const { onRestoreCategory } = useCategory();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Архив категорий</DialogTitle>
          <DialogDescription>
            Все архивированные и отключенные категории питомника
          </DialogDescription>
          <div className="max-h-[600px] overflow-x-auto">
            <div className="grid gap-4">
              {categories.map((category) => (
                <Card key={category._id}>
                  <CardHeader>
                    <div className="flex gap-4">
                      <div className="flex flex-1 flex-col gap-4">
                        <CardTitle className="flex items-center gap-2">
                          {category.name}
                          {category.isSystem ? (
                            <BaseTooltip text="Cистемная категория">
                              <BadgeAlert
                                size={18}
                                className="text-muted-foreground"
                              />
                            </BaseTooltip>
                          ) : null}
                        </CardTitle>
                        <CardDescription className="flex flex-wrap gap-x-2 gap-y-1">
                          {category.breeds.map((breed, index) => (
                            <Badge key={index}>{breed}</Badge>
                          ))}
                        </CardDescription>
                      </div>
                      <BaseTooltip text="Восстановить">
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => onRestoreCategory!(category)}
                        >
                          <ArchiveRestore />
                        </Button>
                      </BaseTooltip>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
