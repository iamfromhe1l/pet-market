import { KennelModel } from '@/api/models/kennel-model';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import React, { PropsWithChildren } from 'react';
import { KENNEL_STATUS } from '@/consts/kennel-consts';
import { Label } from './ui/label';
import Link from 'next/link';

interface KennelInfoDialogProps extends PropsWithChildren {
  kennel: KennelModel;
}

export const KennelInfoDialog: React.FC<KennelInfoDialogProps> = ({
  kennel,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-[500px]">
        <DialogHeader>
          <DialogTitle>Подробная информация</DialogTitle>
          <DialogDescription className="flex gap-2">
            Подробная информация про питомник{' '}
            <Link className="flex underline" href={`/kennel/${kennel._id}`}>
              &quot;{kennel.name}&quot;
            </Link>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-1">
            <Label>Название</Label>
            <p className="text-lg font-bold">{kennel.name}</p>
          </div>
          <div className="grid gap-1">
            <Label>Описание</Label>
            <p className="text-muted-foreground">{kennel.description}</p>
          </div>
          <div className="flex gap-4">
            <div className="grid flex-1 gap-1">
              <Label>Адрес</Label>
              <p className="text-muted-foreground">{kennel.address}</p>
            </div>
            <div className="grid flex-1 gap-1">
              <Label>Статус</Label>
              <p className="text-muted-foreground">
                {KENNEL_STATUS[kennel.status].title}
              </p>
            </div>
          </div>
          {kennel.adminMessage ? (
            <div className="grid gap-1">
              <Label>Причина отклонения заявки</Label>
              <p className="text-muted-foreground">{kennel.adminMessage}</p>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
