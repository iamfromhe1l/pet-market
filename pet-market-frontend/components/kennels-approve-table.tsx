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
import { ApproveKennelDialog } from './approve-kennel-dialog';

interface KennelsApproveTableProps {
  kennels: KennelModel[];
  onApproveKennel: (approvedKennel: KennelModel) => void;
}

export const KennelsApproveTable: React.FC<KennelsApproveTableProps> = ({
  kennels,
  onApproveKennel,
}) => {
  return (
    <div className="max-h-[400px] overflow-auto">
      <Table>
        <TableHeader className="bg-secondary sticky top-0 z-10 h-16">
          <TableRow>
            <TableHead className="hidden w-[40px] border-r sm:table-cell" />
            <TableHead className="w-[100px] border-r">Название</TableHead>
            <TableHead className="border-r">Описание</TableHead>
            <TableHead>Адрес</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kennels.length ? (
            kennels.map((kennel, index) => (
              <ApproveKennelDialog
                key={index}
                kennel={kennel}
                onApproveKennel={onApproveKennel}
              >
                <TableRow className="cursor-pointer">
                  <TableCell className="hidden border-r sm:table-cell">
                    {index + 1}
                  </TableCell>
                  <TableCell className="border-r">{kennel.name}</TableCell>
                  <TableCell className="border-r whitespace-normal">
                    {kennel.description}
                  </TableCell>
                  <TableCell>{kennel.address}</TableCell>
                </TableRow>
              </ApproveKennelDialog>
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
