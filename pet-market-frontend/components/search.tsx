'use client';

import { CategoryModel } from '@/api/models/category-model';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Loader2, Settings2 } from 'lucide-react';
import { SearchFiltersSheet } from './search-filters-sheet';
import { PaginationInfo, SearchPetsParams } from '@/api/pet/types';
import { usePet } from '@/context/pet/pet-context';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { PetCard } from './pet-card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { Badge } from './ui/badge';
import { SEX_NAME } from '@/consts/sex-consts';
import { Separator } from './ui/separator';

interface SearchParams {
  categories: CategoryModel[];
  defaultFilters?: SearchPetsParams;
  showEditButton?: boolean;
}

export const Search: React.FC<SearchParams> = ({
  categories,
  defaultFilters = {},
  showEditButton = false,
}) => {
  const { onSearchPets, petState } = usePet();

  const [filters, setFilters] = useState<SearchPetsParams>(defaultFilters);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    page: 1,
    limit: 1,
    total: 1,
  });
  const [pagesCount, setPagesCount] = useState<number>(1);

  const search = async (page?: number) => {
    setLoading(true);
    const res = await onSearchPets!({ ...filters, page: page ?? filters.page });

    if (res.error) {
      toast.error(res.error);
    } else if (res.data) {
      setPagesCount(Math.floor(res.data.total / res.data.limit) + 1);
      setPaginationInfo({
        total: res.data.total,
        page: res.data.page,
        limit: res.data.limit,
      });
    }
    setLoading(false);
  };

  const debouncedSearch = useDebouncedCallback(search, 300);

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="grid gap-4">
      <Card className="p-2">
        <CardContent className="flex flex-col gap-2 px-1">
          <div className="flex gap-2">
            <div className="relative flex w-full items-center">
              <Input
                value={filters.text ?? ''}
                onChange={(e) => {
                  setFilters({ ...filters, text: e.target.value });
                  debouncedSearch();
                }}
                placeholder="Поиск"
                className="flex-1 placeholder:text-sm"
              />
              {loading && (
                <Loader2 className="text-muted-foreground absolute right-2 size-5 animate-spin" />
              )}
            </div>
            <SearchFiltersSheet
              filters={filters}
              categories={categories}
              onChangeFilters={setFilters}
              onSubmitFilters={search}
            >
              <Button disabled={loading}>
                <Settings2 />
              </Button>
            </SearchFiltersSheet>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filters.sex && (
              <>
                <Badge variant="outline">{SEX_NAME[filters.sex]}</Badge>
                <Separator orientation="vertical" className="max-h-4" />
              </>
            )}
            {filters.categoryId && (
              <>
                {filters.categoryId.map((category) => (
                  <Badge key={category}>
                    {
                      categories.find(
                        (curCategory) => category === curCategory._id,
                      )?.name
                    }
                  </Badge>
                ))}
                <Separator orientation="vertical" className="max-h-4" />
              </>
            )}
            {filters.breed && (
              <>
                {filters.breed.map((breed) => (
                  <Badge variant="secondary" key={breed}>
                    {breed}
                  </Badge>
                ))}
                <Separator orientation="vertical" className="max-h-4" />
              </>
            )}
            {filters.priceMin && (
              <>
                <p className="text-sm">
                  от <b>{filters.priceMin}</b> руб.
                </p>
                <Separator orientation="vertical" className="max-h-4" />
              </>
            )}
            {filters.priceMax && (
              <p className="text-sm">
                до <b>{filters.priceMax}</b> руб.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {(petState?.pets ?? []).map((pet) => (
          <PetCard
            key={pet._id}
            pet={pet}
            categories={categories}
            showEditButton={showEditButton}
          />
        ))}
      </div>
      {!petState?.pets.length && (
        <div className="flex h-96 items-center justify-center">
          <p className="text-muted-foreground text-lg">Ничего не найдено...</p>
        </div>
      )}
      <Pagination>
        <PaginationContent>
          {paginationInfo.page !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (!filters.page) return;
                  const page = filters.page - 1;
                  setFilters({ ...filters, page });
                  search(page);
                }}
              />
            </PaginationItem>
          )}
          {paginationInfo.page > 3 && <PaginationEllipsis />}
          {Array.from(
            { length: 5 },
            (_, index) => index - 2 + paginationInfo.page,
          ).map(
            (index) =>
              index > 0 &&
              index <= pagesCount && (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={index === paginationInfo.page}
                    onClick={() => {
                      if (index !== paginationInfo.page) {
                        setFilters({ ...filters, page: index });
                        search(index);
                      }
                    }}
                  >
                    {index}
                  </PaginationLink>
                </PaginationItem>
              ),
          )}
          {pagesCount - paginationInfo.page > 2 && <PaginationEllipsis />}
          {paginationInfo.page !== pagesCount && (
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (!filters.page) return;
                  const page = filters.page + 1;
                  setFilters({ ...filters, page });
                  search(page);
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
