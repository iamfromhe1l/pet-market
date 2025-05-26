'use client';

import { CategoryModel } from '@/api/models/category-model';
import { KennelModel } from '@/api/models/kennel-model';
import { PetModel } from '@/api/models/pet-model';
import { BaseTooltip } from '@/components/base-tooltip';
import { PageLoading } from '@/components/page-loading';
import { SidebarLayout } from '@/components/sidebar-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth/auth-context';
import { usePet } from '@/context/pet/pet-context';
import { SexEnum } from '@/types/pet-types';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  ChevronRight,
  Mars,
  Plus,
  ShoppingCart,
  Star,
  Venus,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function PetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { onGetPetById } = usePet();
  const { authState } = useAuth();
  const router = useRouter();

  const [pet, setPet] = useState<PetModel>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (authState?.authenticated) {
      onGetPetById!(id).then((res) => {
        console.log(res.data);
        if (res.error) {
          toast.error(res.error);
          router.forward();
        } else if (res.data) {
          setLoading(false);
          setPet(res.data);
        }
      });
    }
  }, [authState?.authenticated]);

  return (
    <SidebarLayout
      pageTitle={`Питомец "${loading ? 'загрузка...' : pet?.title}"`}
    >
      {loading || !pet ? (
        <PageLoading />
      ) : (
        <div className="flex gap-12">
          <div className="flex-1">
            <AspectRatio
              ratio={1}
              className="relative flex-1 overflow-hidden rounded-xl"
            >
              <Image
                src="/avatar.jpg"
                alt="pet-image"
                className="absolute inset-0 h-full w-full object-cover"
                fill
              />
            </AspectRatio>
          </div>
          <div className="flex flex-1 flex-col justify-between rounded-xl border p-6">
            <div className="flex flex-1 flex-col gap-10">
              <div className="grid gap-4">
                <div className="flex">
                  <p className="text-5xl font-black">{pet?.title}</p>
                  <div className="size-6">
                    {pet.sex !== SexEnum.UNKNOWN && pet.sex === SexEnum.MALE ? (
                      <BaseTooltip text="Пол: мужской">
                        <Mars className="text-muted-foreground size-6" />
                      </BaseTooltip>
                    ) : (
                      <BaseTooltip text="Пол: женский">
                        <Venus className="text-muted-foreground size-6" />
                      </BaseTooltip>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Badge className="text-md px-4">
                    {(pet.categoryId as CategoryModel).name}
                  </Badge>
                  <Badge className="text-md px-4" variant="secondary">
                    {pet.breed}
                  </Badge>
                </div>
                <Link
                  href={`/kennel/${(pet.kennel as KennelModel)._id}`}
                  className="group"
                >
                  <Card className="group-hover:bg-muted/20 w-fit py-2 transition-all">
                    <CardContent className="flex items-center gap-4 pr-3 pl-3">
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <div>
                        <p className="">{(pet.kennel as KennelModel).name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            <Star className="text-primary fill-primary size-4" />
                            <Star className="text-primary fill-primary size-4" />
                            <Star className="text-primary fill-primary size-4" />
                            <Star className="text-primary fill-primary size-4" />
                            <Star className="text-foreground/20 size-4" />
                          </div>
                          <p className="text-muted-foreground text-sm underline">
                            4.4
                          </p>
                        </div>
                      </div>
                      <ChevronRight />
                    </CardContent>
                  </Card>
                </Link>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-4">
                  <Label className="text-muted-foreground">Описание:</Label>
                  <p className="text-md font-bold">{pet.description}</p>
                </div>
                {pet.birthDate && (
                  <div className="flex items-center gap-4">
                    <Label className="text-muted-foreground">
                      Дата рождения:
                    </Label>
                    <p className="text-md font-bold">
                      {format(new Date(pet.birthDate), 'PPP', { locale: ru })}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <Label className="text-muted-foreground">Количество:</Label>
                  <p className="text-md font-bold">{pet.count}</p>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <Button size="lg">
                Добавить в корзину <ShoppingCart />
              </Button>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-bold">{pet.price}</p>
                <p>руб.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}
