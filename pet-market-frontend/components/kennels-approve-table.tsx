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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { X, Check, EllipsisVertical, Ban, Info } from 'lucide-react';
import { Button } from './ui/button';
import { KennelInfoDialog } from './kennel-info-dialog';
import { RejectKennelDialog } from './reject-kennel-dialog';

interface KennelsApproveTableProps {
  kennels: KennelModel[];
  onApproveKennel: (approvedKennel: KennelModel) => void;
  onRejectKennel: (rejectedKennel: KennelModel) => void;
}

export const KennelsApproveTable: React.FC<KennelsApproveTableProps> = ({
  kennels,
  onApproveKennel,
  onRejectKennel,
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Действия</DropdownMenuLabel>
                      <KennelInfoDialog kennel={kennel}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Info />
                          Информация
                        </DropdownMenuItem>
                      </KennelInfoDialog>
                      <DropdownMenuSeparator />
                      <ApproveKennelDialog
                        kennel={kennel}
                        onApproveKennel={onApproveKennel}
                      >
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Check />
                          Подтвердить
                        </DropdownMenuItem>
                      </ApproveKennelDialog>
                      <RejectKennelDialog
                        kennel={kennel}
                        onRejectKennel={onRejectKennel}
                      >
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <X />
                          Отклонить
                        </DropdownMenuItem>
                      </RejectKennelDialog>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Ban />
                        Забанить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
