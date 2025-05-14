'use client';

import { UNDEFINDED_ERROR } from '@/api/consts';
import KennelApi from '@/api/kennel/kennel-api';
import { KennelModel } from '@/api/models/kennel-model';
import { KennelsApproveTable } from '@/components/kennels-approve-table';
import { KennelsTable } from '@/components/kennels-table';
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
  const [approvedKennels, setApprovedKennels] = useState<KennelModel[]>([]);

  useEffect(() => {
    const getKennels = async () => {
      setLoading(true);
      try {
        const pendingKennelsData = await KennelApi.getPendingKennels();
        const rejectedKennelsData = await KennelApi.getRejectedKennels();
        const approvedKennelsData = await KennelApi.getApprovedKennels();

        setLoading(false);
        setKennelsForApprove(pendingKennelsData);
        setRejectedKennels(rejectedKennelsData);
        setApprovedKennels(approvedKennelsData);
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
    setApprovedKennels([...approvedKennels, approvedKennel]);
  };

  const onRejectKennel = (rejectedKennel: KennelModel) => {
    setKennelsForApprove(
      kennelsForApprove.filter((kennel) => kennel._id !== rejectedKennel._id),
    );
    setRejectedKennels([...rejectedKennels, rejectedKennel]);
  };

  const onRejectKennel = (rejectedKennel: KennelModel) => {
    setKennelsForApprove(
      kennelsForApprove.filter((kennel) => kennel._id !== rejectedKennel._id),
    );
    setRejectedKennels([...rejectedKennels, rejectedKennel]);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Подтвержденные питомники</CardTitle>
            <CardDescription>
              Количество подтвержденных питомников
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {loading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <p className="text-6xl font-semibold">{approvedKennels.length}</p>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Заявки</CardTitle>
            <CardDescription>
              Количество заявок на подтверждение питомника
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {loading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <p className="text-6xl font-semibold">
                {kennelsForApprove.length}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className="max-w-full gap-1">
        <CardHeader>
          <CardTitle>Все питомники</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-96 w-full rounded-md" />
          ) : (
            <KennelsTable
              kennels={[
                ...approvedKennels,
                ...kennelsForApprove,
                ...rejectedKennels,
              ]}
            />
          )}
        </CardContent>
      </Card>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>Заявки на подтверждение питомника</CardTitle>
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
      <Card className="gap-4">
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
