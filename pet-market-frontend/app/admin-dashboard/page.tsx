'use client';

import { UNDEFINDED_ERROR } from '@/api/consts';
import KennelApi from '@/api/kennel/kennel-api';
import { KennelModel } from '@/api/models/kennel-model';
import { KennelsApproveTable } from '@/components/kennels-approve-table';
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

  useEffect(() => {
    const getAppliedKennels = async () => {
      setLoading(true);
      try {
        const data = await KennelApi.getPendingKennels();

        setLoading(false);
        setKennelsForApprove(data);
      } catch (e) {
        const data = getAxiosError<KennelModel[]>(e);

        toast.error(data.error ?? UNDEFINDED_ERROR);
      }
    };

    getAppliedKennels();
  }, []);

  const onApproveKennel = (approvedKennel: KennelModel) => {
    setKennelsForApprove(
      kennelsForApprove.filter((kennel) => kennel._id !== approvedKennel._id),
    );
  };

  return (
    <div className="p-2 sm:p-10">
      <Card className="w-full">
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
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
