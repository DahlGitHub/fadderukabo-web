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
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
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
import { auth, db } from '../../../firebase';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export type Authorized = {
  id: string;
  photoURL: string;
  displayName: string;
  email: string;
  created: number;
  signedIn: number;
};

const handleDeleteEmail = async (email: string): Promise<void> => {
  try {
    const currentUser = auth.currentUser;

    // Check if the current user is deleting their own email
    if (currentUser && currentUser.email === email) {
      console.log('Cannot delete your own email.');
      return;
    }

    // Check if the email is a protected email that should not be deleted
    const protectedEmail = 'fadderstyretbo@gmail.com';
    if (email === protectedEmail) {
      console.log(`Cannot delete the protected email: ${protectedEmail}`);
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
              src={authorized.photoURL}
              alt={authorized.displayName}
            />
            <AvatarFallback>{authorized.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="ml-2">{authorized.displayName}</span>
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
    accessorKey: 'created',
    header: 'Created',
    cell: ({ row }) => {
      const created = row.getValue('created');
      const date = moment(created as number);

      return (
        <div className="flex items-center">
          <span>{date.format('MMM D, YYYY')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'signedIn',
    header: 'Last signed in',
    cell: ({ row }) => {
      const signedIn = row.getValue('signedIn');
      const date = moment(signedIn as number);

      return (
        <div className="flex items-center">
          <span>{date.fromNow()}</span>
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
            {/*
                           <DropdownMenuItem
                    onClick={() => handleDeleteEmail(row.getValue("email"))}>
                        Delete
                </DropdownMenuItem>
                 */}
            <DropdownMenuItem asChild>
              <Confirmation
                onConfirm={() => handleDeleteEmail(row.getValue('email'))}
                message={`Are you sure you want to delete ${row.getValue(
                  'email',
                )}?`}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns
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
