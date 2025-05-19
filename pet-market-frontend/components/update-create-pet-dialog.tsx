import { PetModel } from '@/api/models/pet-model';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { PetSchema } from '@/zod/pet-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryModel } from '@/api/models/category-model';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { CalendarIcon, Plus, Save, X } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { BaseSelect } from './base-select';
import { usePet } from '@/context/pet/pet-context';
import { CreateUpdatePetParams } from '@/api/pet/types';
import { toast } from 'sonner';
import { SexEnum } from '@/types/pet-types';

interface UpdateCreatePetDialogProps extends PropsWithChildren {
  pet?: PetModel;
  categories: CategoryModel[];
  onCreateNewPet?: () => void;
}

export const UpdateCreatePetDialog: React.FC<UpdateCreatePetDialogProps> = ({
  pet,
  categories,
  children,
  onCreateNewPet,
}) => {
  const { onCreatePet, onUpdatePet } = usePet();

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryModel | undefined
  >(undefined);

  const form = useForm<z.infer<typeof PetSchema>>({
    resolver: zodResolver(PetSchema),
    defaultValues: {
      title: pet?.title ?? '',
      breed: pet?.breed,
      description: pet?.description,
      birthDate: pet?.birthDate ? new Date(pet.birthDate) : undefined,
      categoryId: pet?.categoryId
        ? (pet.categoryId as CategoryModel)._id
        : undefined,
      price: pet?.price,
      count: pet?.count,
      sex: pet?.sex,
    },
  });

  const onSubmit = async (data: z.infer<typeof PetSchema>) => {
    setLoading(true);

    const res = pet
      ? await onUpdatePet!(pet._id, data as CreateUpdatePetParams)
      : await onCreatePet!(data as CreateUpdatePetParams);

    if (res && res.error) {
      toast.error(res.error);
    } else if (res.data) {
      if (pet) {
        toast.success('Питомец успешно изменен');
      } else {
        onCreateNewPet();
        toast.success('Питомец успешно добавлен');
      }

      setSelectedCategory(undefined);
      setIsOpen(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (pet && isOpen) {
      form.setValue('title', pet.title);
      form.setValue('breed', pet.breed);
      form.setValue('description', pet.description);
      form.setValue('price', pet.price);
      form.setValue('count', pet.count);
      form.setValue('sex', pet.sex);

      const categoryId = (pet.categoryId as CategoryModel)._id;
      form.setValue('categoryId', categoryId);
      setSelectedCategory(
        categories.find((category) => category._id === categoryId),
      );

      if (pet.birthDate) {
        form.setValue('birthDate', new Date(pet.birthDate));
      }
    }
  }, [isOpen]);

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-screen md:min-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {pet ? `Изменение питомца "${pet.title}"` : 'Создание питомца'}
          </DialogTitle>
          <DialogDescription>
            Заполните необходимые данные для
            {pet ? ' изменения ' : ' создания '} питомца
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Название питомца</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    id="title"
                    type="text"
                    placeholder="Ввдеите название питомца"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Количество</FormLabel>
                  <FormControl>
                    <Input
                      disabled={field.disabled || loading}
                      id="count"
                      type="number"
                      placeholder="Введите количество питомцев"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      onBlur={field.onBlur}
                      ref={field.onBlur}
                      name={field.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Пол</FormLabel>
                  <FormControl>
                    <BaseSelect
                      disabled={loading}
                      className="w-full"
                      selectTitle="Пол"
                      placeholder="Выберите пол"
                      value={field.value}
                      setValue={(value) => field.onChange(value)}
                      items={[
                        { label: 'Неизвестно', value: SexEnum.UNKNOWN },
                        { label: 'Мужской', value: SexEnum.MALE },
                        { label: 'Женский', value: SexEnum.FEMALE },
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание питомца</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    id="description"
                    placeholder="Ввдеите описание питомца"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Стоимость</FormLabel>
                  <FormControl>
                    <Input
                      disabled={field.disabled || loading}
                      id="price"
                      type="number"
                      placeholder="Введите стоимость питомца"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      onBlur={field.onBlur}
                      ref={field.onBlur}
                      name={field.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Дата рождения</FormLabel>
                  <FormControl>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={loading}
                          variant={'outline'}
                          className={cn(
                            'flex-1 justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon />
                          {field.value ? (
                            format(field.value, 'PPP', { locale: ru })
                          ) : (
                            <span>Выберите дату</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Категория</FormLabel>
                  <FormControl>
                    <BaseSelect
                      className="w-full"
                      selectTitle="Категория"
                      placeholder="Выберите категорию"
                      value={field.value}
                      disabled={loading}
                      setValue={(value) => {
                        setSelectedCategory(
                          categories.find((category) => category._id === value),
                        );
                        field.onChange(value);
                      }}
                      items={categories
                        .filter((category) => !category.isDisabled)
                        .map((category) => ({
                          label: category.name,
                          value: category._id,
                        }))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Порода</FormLabel>
                  <FormControl>
                    <BaseSelect
                      disabled={!selectedCategory || loading}
                      className="w-full"
                      selectTitle="Порода"
                      placeholder="Выберите породу"
                      value={field.value}
                      setValue={(value) => field.onChange(value)}
                      items={
                        selectedCategory?.breeds.map((breed) => ({
                          label: breed,
                          value: breed,
                        })) ?? []
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            {pet ? (
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
        </Form>
      </DialogContent>
    </Dialog>
  );
};
