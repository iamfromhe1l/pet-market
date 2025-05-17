import { KennelModel } from '@/api/models/kennel-model';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import React from 'react';

import { Info } from 'lucide-react';
import { Button } from './ui/button';
import { KennelInfoDialog } from './kennel-info-dialog';

interface RejectedKennelsTableProps {
  kennels: KennelModel[];
}

export const RejectedKennelsTable: React.FC<RejectedKennelsTableProps> = ({
  kennels,
}) => {
  return (
    <div className="max-h-[400px] overflow-x-hidden overflow-y-auto">
      <Table>
        <TableHeader className="bg-secondary sticky top-0 z-10 h-16">
          <TableRow>
            <TableHead className="hidden w-[40px] border-r sm:table-cell" />
            <TableHead className="w-[100px] border-r">Название</TableHead>
            <TableHead className="border-r">Описание</TableHead>
            <TableHead className="w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kennels.length ? (
            kennels.map((kennel, index) => (
              <TableRow key={kennel._id}>
                <TableCell className="hidden border-r text-center sm:table-cell">
                  {index + 1}
                </TableCell>
                <TableCell>{kennel.name}</TableCell>
                <TableCell className="whitespace-normal">
                  {kennel.description}
                </TableCell>
                <TableCell className="w-[40px]">
                  <KennelInfoDialog kennel={kennel}>
                    <Button variant="ghost" className="cursor-pointer">
                      <Info />
                    </Button>
                  </KennelInfoDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="w-full py-10 text-center">
                Пока нет питомников для подтверждения...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
