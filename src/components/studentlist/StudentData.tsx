"use client"


import {ColumnDef,flexRender,getCoreRowModel,useReactTable,SortingState, getSortedRowModel, VisibilityState} from "@tanstack/react-table"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { MoreHorizontal, Crown, UserCircle  } from "lucide-react"
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import React, { useEffect, useState } from "react"
import EditStudent from "./EditStudent"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../../firebase"


export type Authorized = {
    docId: string
    status: "fadder" | "faddersjef"
    name: string
    group: string
  }

  interface GroupData {
    title: string;
    hexValue: string;
  }

  export const columns: ColumnDef<Authorized>[] = [

    {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
        const authorized = row.original
        return (
          <div className="flex items-center">
            <span>{authorized.status == "faddersjef" ? <Crown className="h-4 w-4" /> : <UserCircle className="h-4 w-4" /> }</span>
            <span className="ml-2">{authorized.name}</span>
          </div>
        )
      },
      enableHiding: false,
    },
 
    {
    accessorKey: "group",
    header: "Group",
    cell: ({ row }) => {
        const authorized = row.original
        
        const [groupData, setGroupData] = useState<GroupData[]>([]);

        useEffect(() => {
          const unsubscribe = onSnapshot(collection(db, 'groupdata'), (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data() as GroupData);
            setGroupData(data);
          });
    
          return () => {
            unsubscribe();
          };
        }, []);

        const matchedGroup = groupData.find((group) => group.title === authorized.group);
        const hexValue = matchedGroup ? matchedGroup.hexValue : '#000000';

        return (
          <div className="flex flex-row items-center">
              
              <div className="rounded-full w-3 h-3" style={{backgroundColor: hexValue }}></div>
              <span className="ml-2">{authorized.group}</span>
              
          </div>
        )
      }
    },
    {
        id: "actions",
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
                {
                /*
                           <DropdownMenuItem
                    onClick={() => handleDeleteEmail(row.getValue("email"))}>
                        Delete
                </DropdownMenuItem>
                 */   
                }
              <DropdownMenuItem asChild>
                <EditStudent data={row.original} docId={row.original.docId} />
              </DropdownMenuItem>                
              <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
  ]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]

}

export function DataTable<TData, TValue>({
    columns,
    data,
   
  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

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
    })
   

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
              .filter(
                (column) => column.getCanHide()
              )
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
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
    
      <div className="rounded-md border">
        
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      </div>
    )
  }

