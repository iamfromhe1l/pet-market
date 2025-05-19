import React, { PropsWithChildren, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { SearchPetsParams } from '@/api/pet/types';
import { Button } from './ui/button';
import { CategoryModel } from '@/api/models/category-model';
import { Label } from './ui/label';
import { BaseSelect } from './base-select';
import { SexEnum } from '@/types/pet-types';
import { RotateCcw } from 'lucide-react';
import { BaseTooltip } from './base-tooltip';
import { Input } from './ui/input';
import { MultiSelect } from './ui/multi-select';

interface SearchFiltersSheetProps extends PropsWithChildren {
  filters: SearchPetsParams;
  categories: CategoryModel[];
  onChangeFilters: (filters: SearchPetsParams) => void;
  onSubmitFilters: () => void;
}

export const SearchFiltersSheet: React.FC<SearchFiltersSheetProps> = ({
  children,
  filters,
  categories,
  onChangeFilters,
  onSubmitFilters,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sexSelectItems = [
    { label: 'Неизвестно', value: SexEnum.UNKNOWN },
    { label: 'Мужской', value: SexEnum.MALE },
    { label: 'Женский', value: SexEnum.FEMALE },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Параметры поиска</SheetTitle>
          <SheetDescription>
            Заполните параметры для расширенного поиска
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 px-4">
          <div className="grid gap-2">
            <Label className="flex h-5 items-center">
              Пол
              {filters.sex ? (
                <BaseTooltip text="Сбросить">
                  <RotateCcw
                    className="text-muted-foreground hover:text-foreground size-4 cursor-pointer"
                    onClick={() =>
                      onChangeFilters({ ...filters, sex: undefined })
                    }
                  />
                </BaseTooltip>
              ) : null}
            </Label>
            <BaseSelect
              value={filters.sex as string}
              className="min-h-10 w-full"
              selectTitle="Пол"
              placeholder="Выберите пол"
              items={sexSelectItems}
              setValue={(value) =>
                onChangeFilters({ ...filters, sex: value as SexEnum })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Категории</Label>
            <MultiSelect
              options={categories.map((category) => ({
                label: category.name,
                value: category._id,
              }))}
              defaultValue={filters.categoryId}
              placeholder="Выберите категории"
              onValueChange={(value) =>
                onChangeFilters({
                  ...filters,
                  categoryId: value,
                })
              }
              variant="inverted"
              animation={0}
              maxCount={8}
            />
          </div>
          {filters.categoryId && filters.categoryId.length ? (
            <div className="grid gap-2">
              <Label>Породы</Label>
              <MultiSelect
                options={categories
                  .filter(
                    (category) =>
                      filters.categoryId?.findIndex(
                        (curCategory) => category._id === curCategory,
                      ) !== -1,
                  )
                  .map((category) =>
                    category.breeds.map((breed) => ({
                      label: breed,
                      value: breed,
                    })),
                  )
                  .flat()}
                placeholder="Выберите породы"
                defaultValue={filters.breed}
                onValueChange={(value) =>
                  onChangeFilters({
                    ...filters,
                    breed: value,
                  })
                }
                variant="inverted"
                animation={0}
                maxCount={14}
              />
            </div>
          ) : null}
          <div className="flex gap-4">
            <div className="grid flex-1 gap-2">
              <Label className="flex h-5 items-center">
                Цена от
                {filters.priceMin ? (
                  <BaseTooltip text="Сбросить">
                    <RotateCcw
                      className="text-muted-foreground hover:text-foreground size-4 cursor-pointer"
                      onClick={() =>
                        onChangeFilters({ ...filters, priceMin: undefined })
                      }
                    />
                  </BaseTooltip>
                ) : null}
              </Label>
              <Input
                placeholder="Цена от"
                value={filters.priceMin ?? ''}
                type="number"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  onChangeFilters({
                    ...filters,
                    priceMin: value > 0 ? value : undefined,
                  });
                }}
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Label className="flex h-5 items-center">
                Цена до
                {filters.priceMax ? (
                  <BaseTooltip text="Сбросить">
                    <RotateCcw
                      className="text-muted-foreground hover:text-foreground size-4 cursor-pointer"
                      onClick={() =>
                        onChangeFilters({ ...filters, priceMax: undefined })
                      }
                    />
                  </BaseTooltip>
                ) : null}
              </Label>
              <Input
                placeholder="Цена до"
                value={filters.priceMax ?? ''}
                type="number"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  onChangeFilters({
                    ...filters,
                    priceMax: value > 0 ? value : undefined,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="secondary" onClick={() => onChangeFilters({})}>
            Сбросить
          </Button>
          <Button
            onClick={() => {
              onSubmitFilters();
              setIsOpen(false);
            }}
          >
            Применить фильтры
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
