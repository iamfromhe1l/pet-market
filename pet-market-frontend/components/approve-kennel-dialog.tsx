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
import { Ban, Check } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

interface ApproveKennelDialogProps extends PropsWithChildren {
  kennel: KennelModel;
  onApproveKennel: (approvedKennel: KennelModel) => void;
}

export const ApproveKennelDialog: React.FC<ApproveKennelDialogProps> = ({
  children,
  kennel,
  onApproveKennel,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const approveKennel = async () => {
    setLoading(true);
    try {
      await KennelApi.approveKennel(kennel._id);

      onApproveKennel(kennel);
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
          <DialogTitle className="text-left">
            Подтверждение питомника
          </DialogTitle>
          <DialogDescription className="text-left">
            Вы уверены, что хотите подтвердить питомник
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
        <DialogFooter className="flex-row gap-4">
          <Button
            variant="destructive"
            className="flex-1 cursor-pointer"
            disabled={loading}
          >
            Отклонить
            <Ban className="ml-2" />
          </Button>
          <Button
            className="flex-1 cursor-pointer"
            onClick={approveKennel}
            disabled={loading}
          >
            Подтвердить
            <Check className="ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
