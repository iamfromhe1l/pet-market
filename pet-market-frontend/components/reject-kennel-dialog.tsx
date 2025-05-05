import { UNDEFINDED_ERROR } from '@/api/consts';
import KennelApi from '@/api/kennel/kennel-api';
import { KennelModel } from '@/api/models/kennel-model';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getAxiosError } from '@/helpers/catch-error-helpers';
import { X } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';
import { Textarea } from './ui/textarea';
import { KennelStatusEnum } from '@/types/kennel-types';

interface RejectKennelDialogProps extends PropsWithChildren {
  kennel: KennelModel;
  onRejectKennel: (approvedKennel: KennelModel) => void;
}

export const RejectKennelDialog: React.FC<RejectKennelDialogProps> = ({
  children,
  kennel,
  onRejectKennel,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');

  const rejectKennel = async () => {
    setLoading(true);
    try {
      await KennelApi.rejectKennel(kennel._id, {
        adminMessage: reason,
        status: KennelStatusEnum.REJECTED,
      });

      onRejectKennel(kennel);
      setIsOpen(false);
    } catch (e) {
      const data = getAxiosError<KennelModel[]>(e);

      toast.error(data.error ?? UNDEFINDED_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left">Отклонение питомника</DialogTitle>
          <DialogDescription className="text-left">
            Вы уверены, что хотите отклонить заявку питомника
            <Link
              href={`kennel/${kennel._id}`}
              className="font-bold underline underline-offset-4"
            >
              {' '}
              &quot;{kennel.name}&quot;
            </Link>
            ?
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Напишите причину отклонения заявки"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <DialogFooter className="flex-row gap-4">
          <Button
            variant="secondary"
            className="flex-1 cursor-pointer"
            disabled={loading}
            onClick={() => setIsOpen(false)}
          >
            Отменить
          </Button>
          <Button
            variant="destructive"
            className="flex-1 cursor-pointer"
            onClick={rejectKennel}
            disabled={loading}
          >
            Отклонить
            <X className="ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
