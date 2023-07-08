'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  VisibilityState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal, ArrowUpDown, Eye } from 'lucide-react';
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
import moment from 'moment';
import Confirmation from '../Confirmation';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import React, { useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import AddAuthorized from './AddAuthorized';
import { useSession } from 'next-auth/react';
import { toast } from '../ui/use-toast';

export type Authorized = {
  id: string;
  image: string;
  name: string;
  email: string;
  createdAt: number;
};

const handleDeleteEmail = async (email: string): Promise<void> => {
  try {

    // Check if the email is a protected email that should not be deleted
    const protectedEmail = 'fadderstyretbo@gmail.com';
    if (email === protectedEmail) {
      toast({
        title: 'Permission denied',
        description: `Cannot delete protected email (${protectedEmail})`,
        variant: "destructive"
      });
      return;
    }

    const querySnapshot = await getDocs(collection(db, 'allowedEmails'));
    const docToDelete = querySnapshot.docs.find(
      doc => doc.data().email === email,
    );

    if (docToDelete) {
      await deleteDoc(doc(db, 'allowedEmails', docToDelete.id));
    }
  } catch (error) {
    console.error('Error deleting email:', error);
  }
};


export const columns: ColumnDef<Authorized>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const authorized = row.original;
      return (
        <div className="flex items-center">
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarImage
              src={authorized.image}
              alt={authorized.name}
            />
            <AvatarFallback>{authorized.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="ml-2">{authorized.name}</span>
        </div>
      );
    },
    enableHiding: false,
  },

  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      const created = row.getValue('createdAt');
      const date = moment(created as number);

      return (
        <div className="flex items-center">
          <span>{date.format('MMM D, YYYY')}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              
              
              <Confirmation
                onConfirm={() => handleDeleteEmail(row.getValue('email'))}
                message={`Are you sure you want to delete ${row.getValue(
                  'email',
                )}?`}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-end py-4 space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 px-2">
              <Eye size={16} />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter(column => column.getCanHide())
            .map(column => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <AddAuthorized />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
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
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
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
    </div>
  );
}
