'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal, ArrowUpDown, ImagePlus, LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';

import { Timestamp } from 'firebase/firestore/lite';
import DeleteRow from '../DeleteRow';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge } from '../ui/badge';
import EditProgram from './EditProgram';
import { ProgramToolbar } from './ProgramToolbar';
import AuthorAvatar from '../AuthorAvatar';

export type Program = {
  docId: string;
  title: string;
  date: Timestamp;
  time: number;
  category: string;
  location: string;
  image: string;
  url: string;
  authorName: string;
  authorEmail: string;
  authorPhotoURL: string;
  updatedAt: number;
};

export const columns: ColumnDef<Program>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col items-start">
          <span>{data.title}</span>
          <span className="text-muted-foreground text-xs">{data.location}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      const formattedDate = moment(data.date.seconds * 1000).format('D. MMM');
      return (
        <div className="flex flex-col items-start">
          <span>{formattedDate}</span>
          <span className="text-muted-foreground text-xs">
            {row.original.time}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className="ml-2" size={16} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center">
          <Badge className="text-xs bg-purple-700">{data.category}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'url',
    header: 'Event URL',
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center">
          <Link className="text-blue-700 underline" href={data.url}>
            <LinkIcon size={16} />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger>
              <ImagePlus size={16} />
            </PopoverTrigger>
            <PopoverContent>
              <Image
                className="rounded"
                src={data.image}
                width={150}
                height={50}
                alt="Picture"
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },

  {
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => {
      const data = row.original;
      return (
        <AuthorAvatar
          authorName={data.authorName}
          authorEmail={data.authorEmail}
          authorPhotoURL={data.authorPhotoURL}
          updatedAt={data.updatedAt}
        />
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
          <DropdownMenuContent align="end" className="space-y-1">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            {/*
                           <DropdownMenuItem
                    onClick={() => handleDeleteEmail(row.getValue("email"))}>
                        Delete
                </DropdownMenuItem>
                 */}

            <DropdownMenuItem asChild>
              <EditProgram data={row.original} docId={row.original.docId} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteRow
                docId={row.original.docId}
                collectionName={'programdata'}
                message={`Are you sure you want to delete ${row.getValue(
                  'title',
                )}?`}
                imageUrl={row.getValue('image')}
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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      author: false,
    });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection: true,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
  });

  return (
    <div>
      <ProgramToolbar table={table} />
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
