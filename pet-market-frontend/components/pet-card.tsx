import { PetModel } from '@/api/models/pet-model';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Info, Mars, Pencil, Venus } from 'lucide-react';
import { Badge } from './ui/badge';
import { BaseTooltip } from './base-tooltip';
import { SexEnum } from '@/types/pet-types';
import { PetImageDialog } from './pet-image-dialog';
import { Button } from './ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { UpdateCreatePetDialog } from './update-create-pet-dialog';
import { CategoryModel } from '@/api/models/category-model';

interface PetCardProps {
  pet: PetModel;
  showEditButton?: boolean;
  categories?: CategoryModel[];
}

export const PetCard: React.FC<PetCardProps> = ({
  pet,
  showEditButton = false,
  categories = [],
}) => {
  const category =
    typeof pet.categoryId === 'string' ? undefined : pet.categoryId;

  const kennel = typeof pet.kennel === 'string' ? undefined : pet.kennel;

  return (
    <div className="col-span-1 flex h-96 flex-col gap-2">
      <div className="relative w-full flex-1 overflow-hidden rounded-xl">
        <Link href={`/pet/${pet._id}`}>
          <Image
            src="/avatar.jpg"
            alt="pet-image"
            className="absolute inset-0 h-full w-full object-cover"
            fill
          />
        </Link>
        {pet.count !== 0 ? (
          pet.count === 1 ? null : (
            <BaseTooltip text={`Количество питомцев: ${pet.count}`}>
              <Badge className="absolute right-2 bottom-2 size-6 p-1">
                <Info />
              </Badge>
            </BaseTooltip>
          )
        ) : (
          <Badge className="absolute right-2 bottom-2" variant="destructive">
            Нет в наличии
          </Badge>
        )}
        <PetImageDialog petImageSrc="/avatar.jpg" petName={pet.title}>
          <Button
            className="bg-secondary/50 absolute top-2 right-2 cursor-pointer backdrop-blur-md"
            size="icon"
            variant="secondary"
          >
            <SearchIcon className="size-4" />
          </Button>
        </PetImageDialog>
        {showEditButton && (
          <UpdateCreatePetDialog categories={categories} pet={pet}>
            <Button
              size="icon"
              className="bg-secondary/50 absolute top-2 left-2 cursor-pointer backdrop-blur-md"
              variant="secondary"
            >
              <Pencil />
            </Button>
          </UpdateCreatePetDialog>
        )}
      </div>
      <div className="grid gap-1 px-1">
        <div className="flex">
          <p className="line-clamp-2 text-lg font-semibold">{pet.title}</p>
          <div className="size-4">
            {pet.sex !== SexEnum.UNKNOWN && pet.sex === SexEnum.MALE ? (
              <BaseTooltip text="Пол: мужской">
                <Mars className="text-muted-foreground size-4" />
              </BaseTooltip>
            ) : (
              <BaseTooltip text="Пол: женский">
                <Venus className="text-muted-foreground size-4" />
              </BaseTooltip>
            )}
          </div>
        </div>
        {category && (
          <div className="flex flex-wrap gap-2">
            <Badge>{category.name}</Badge>
            <Badge variant="outline">{pet.breed}</Badge>
          </div>
        )}
        {kennel && (
          <Link
            className="group text-muted-foreground flex items-end gap-0 text-sm underline"
            href={`/kennel/${kennel._id}`}
          >
            {kennel.name}
            <ChevronRight className="size-4 transition-all group-hover:ml-1" />
          </Link>
        )}
        <p className="text-2xl font-bold">
          {pet.price !== 0 ? `${pet.price} руб.` : 'Бесплатно'}
        </p>
      </div>
    </div>
  );
};
