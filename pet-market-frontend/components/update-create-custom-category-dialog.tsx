import { CategoryModel } from '@/api/models/category-model';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogFooter,
  DialogHeader,
} from './ui/dialog';
import { Button } from './ui/button';
import { Plus, Save, X } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySchema } from '@/zod/category-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { BaseTooltip } from './base-tooltip';
import { CreateBreedDialog } from './create-breed-dialog';
import { useCategory } from '@/context/category/category-context';
import { toast } from 'sonner';

interface UpdateCreateCustomCategoryProps extends PropsWithChildren {
  category?: CategoryModel;
}

export const UpdateCreateCustomCategory: React.FC<
  UpdateCreateCustomCategoryProps
> = ({ children, category }) => {
  const { onUpdateCustomCategory, onCreateCustomCategory } = useCategory();

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category?.name ?? '',
      breeds: category?.breeds ?? [],
    },
  });

  useEffect(() => {
    if (category && isOpen) {
      form.setValue('name', category.name);
      form.setValue('breeds', category.breeds);
    }
  }, [isOpen]);

  const onSubmit = async (data: z.infer<typeof CategorySchema>) => {
    setLoading(true);

    const res = category
      ? await onUpdateCustomCategory!(category._id, data)
      : await onCreateCustomCategory!(data);

    if (res && res.error) {
      toast.error(res.error);
    } else if (res.data) {
      if (category) {
        toast.success('Категория успешно изменена');
      } else {
        toast.success('Категория успешно добавлена');
      }

      setIsOpen(false);
    }

    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category
              ? `Изменени категории "${category.name}"`
              : 'Создание категории'}
          </DialogTitle>
          <DialogDescription>
            Заполните необходимые данные для
            {category ? ' изменения ' : ' создания '}
            категории
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название категории</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      id="name"
                      type="text"
                      placeholder="Ввдеите название категории"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Породы</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                      {field.value.map((breed, index) => (
                        <Badge key={index}>
                          {breed}
                          <BaseTooltip text="Удалить породу">
                            <Button
                              variant="ghost"
                              disabled={loading}
                              className="size-0 cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                field.onChange(
                                  field.value.filter(
                                    (cueBreed) => cueBreed !== breed,
                                  ),
                                );
                              }}
                            >
                              <X />
                            </Button>
                          </BaseTooltip>
                        </Badge>
                      ))}
                      <CreateBreedDialog
                        onSubmit={(breed) => {
                          form.setValue('breeds', [
                            ...form.getValues().breeds,
                            breed,
                          ]);
                        }}
                      >
                        <Button
                          variant="secondary"
                          className="h-1 cursor-pointer p-3"
                          disabled={loading}
                        >
                          <Plus />
                        </Button>
                      </CreateBreedDialog>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {category ? (
                <div className="flex gap-2">
                  <Button
                    className="cursor-pointer"
                    disabled={loading}
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                    }}
                  >
                    Отменить <X />
                  </Button>
                  <Button
                    className="cursor-pointer"
                    disabled={loading}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Сохранить <Save />
                  </Button>
                </div>
              ) : (
                <Button
                  className="cursor-pointer"
                  disabled={loading}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Создать
                  <Plus />
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
