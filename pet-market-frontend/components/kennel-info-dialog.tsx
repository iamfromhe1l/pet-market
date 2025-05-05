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
          <DialogDescription>
            Подробная информация про питомник <b>&quot;{kennel.name}&quot;</b>
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
