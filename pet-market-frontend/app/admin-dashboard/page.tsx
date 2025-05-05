'use client';

import { UNDEFINDED_ERROR } from '@/api/consts';
import KennelApi from '@/api/kennel/kennel-api';
import { KennelModel } from '@/api/models/kennel-model';
import { KennelsApproveTable } from '@/components/kennels-approve-table';
import { RejectedKennelsTable } from '@/components/rejected-kennels-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getAxiosError } from '@/helpers/catch-error-helpers';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AdminDashboaPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [kennelsForApprove, setKennelsForApprove] = useState<KennelModel[]>([]);
  const [rejectedKennels, setRejectedKennels] = useState<KennelModel[]>([]);

  useEffect(() => {
    const getKennels = async () => {
      setLoading(true);
      try {
        const pendingKennelsData = await KennelApi.getPendingKennels();
        const rejectedKennelsData = await KennelApi.getRejectedKennels();

        setLoading(false);
        setKennelsForApprove(pendingKennelsData);
        setRejectedKennels(rejectedKennelsData);
      } catch (e) {
        const data = getAxiosError<KennelModel[]>(e);

        toast.error(data.error ?? UNDEFINDED_ERROR);
      }
    };

    getKennels();
  }, []);

  const onApproveKennel = (approvedKennel: KennelModel) => {
    setKennelsForApprove(
      kennelsForApprove.filter((kennel) => kennel._id !== approvedKennel._id),
    );
  };

  const onRejectKennel = (rejectedKennel: KennelModel) => {
    setKennelsForApprove(
      kennelsForApprove.filter((kennel) => kennel._id !== rejectedKennel._id),
    );
    setRejectedKennels([...rejectedKennels, rejectedKennel]);
  };

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Заявки на подтверждение питомника</CardTitle>
          <CardDescription>
            Нажмите на питомник, чтобы начать подтверждение
          </CardDescription>
        </CardHeader>
        <CardContent className="mx-6 overflow-hidden rounded-md border px-0">
          {loading ? (
            <Skeleton className="h-40 w-full rounded-md" />
          ) : (
            <KennelsApproveTable
              kennels={kennelsForApprove}
              onApproveKennel={onApproveKennel}
              onRejectKennel={onRejectKennel}
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Отклоненные питомники</CardTitle>
        </CardHeader>
        <CardContent className="mx-6 overflow-hidden rounded-md border px-0">
          {loading ? (
            <Skeleton className="h-40 w-full rounded-md" />
          ) : (
            <RejectedKennelsTable kennels={rejectedKennels} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
