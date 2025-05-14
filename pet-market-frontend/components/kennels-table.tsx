'use client';

import * as React from 'react';
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  Ban,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  MoreHorizontal,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { KennelModel } from '@/api/models/kennel-model';
import { KennelInfoDialog } from './kennel-info-dialog';
import { RejectKennelDialog } from './reject-kennel-dialog';
import { BaseTooltip } from './base-tooltip';
import { KENNEL_STATUS } from '@/consts/kennel-consts';

const getCommonPinningStyles = (
  column: Column<KennelModel>,
): React.CSSProperties => {
  const isPinned = column.getIsPinned();

  return {
    boxShadow:
      isPinned === 'left'
        ? '-4px 0 4px -4px var(--border) inset'
        : isPinned === 'right'
          ? '4px 0 4px -4px var(--border) inset'
          : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};
interface KennelsTableProps {
  kennels: KennelModel[];
}

export const KennelsTable: React.FC<KennelsTableProps> = ({ kennels }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<KennelModel>[] = [
    {
      accessorKey: 'name',
      enableHiding: false,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Название
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="pl-4">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'description',
      header: 'Описание',
      cell: ({ row }) => (
        <div className="min-w-[400px] whitespace-normal">
          {row.getValue('description')}
        </div>
      ),
    },
    {
      accessorKey: 'address',
      header: 'Адрес',
      cell: ({ row }) => (
        <div className="min-w-[300px] whitespace-normal">
          {row.getValue('address')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: '',
      size: 40,
      enableResizing: false,
      cell: ({ row }) => (
        <BaseTooltip text={KENNEL_STATUS[row.original.status].title}>
          <>{KENNEL_STATUS[row.original.status].icon}</>
        </BaseTooltip>
      ),
    },
    {
      id: 'actions',
      maxSize: 40,
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <KennelInfoDialog kennel={row.original}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Info />
                Информация
              </DropdownMenuItem>
            </KennelInfoDialog>
            <DropdownMenuSeparator />

            <RejectKennelDialog
              kennel={row.original}
              onRejectKennel={() => null}
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
      ),
    },
  ];

  const table = useReactTable({
    data: kennels,
    initialState: {
      columnPinning: {
        left: ['name'],
        right: ['status', 'actions'],
      },
    },
    columns,
    onSortingChange: setSorting,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Посик по названию"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Колонны <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-card"
                      style={{ ...getCommonPinningStyles(header.column) }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="bg-card"
                      style={{ ...getCommonPinningStyles(cell.column) }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
