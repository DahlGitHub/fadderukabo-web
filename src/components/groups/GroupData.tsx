"use client"


import {ColumnDef,flexRender,getCoreRowModel,useReactTable,SortingState, getSortedRowModel, VisibilityState} from "@tanstack/react-table"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { MoreHorizontal, Crown, UserCircle  } from "lucide-react"
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import React, { useEffect, useState } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../../../firebase"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import AddGroup from "./AddGroup"


export type Group = {
    docId: string
    title: string
    members: number
    hexValue: string
    authorName: string
    authorEmail: string
    authorPhotoURL: string
  }

  export const columns: ColumnDef<Group>[] = [

    {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
        const group = row.original
        return (
          <div className="flex items-center">
            <span className="ml-2">{group.title}</span>
          </div>
        )
      },
      enableHiding: false,
    },
    {
        accessorKey: "members",
        header: "Members",
        cell: ({ row }) => {
            const group = row.original
            const [memberCount, setMemberCount] = useState(0);
            useEffect(() => {
                const querySnapshot = query(
                  collection(db, "studentdata"),
                  where("group", "==", group.title)
                );
            
                const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
                    setMemberCount(snapshot.size)
                });
    
                return () => {
                    unsubscribe()
                }
            }, [group.title])
            return (
              <div className="flex items-center">
                <span className="ml-2">{memberCount}</span>
              </div>
            )
          }

    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => {
            const group = row.original

   
            return (
              <div className="flex flex-row items-center">
                  
                  <div className="rounded-full w-3 h-3" style={{backgroundColor: group.hexValue }}></div>
                    <span className="ml-2 text-xs ">{group.hexValue}</span>
                
                  
              </div>
            )
          }
        },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => {
          const authorized = row.original
          return (
            <div className="flex items-center">
              <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                <Avatar className="h-6 w-6">
                <AvatarImage src={authorized.authorPhotoURL ?? undefined} alt={authorized.authorName ?? undefined} />
                <AvatarFallback>{authorized.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{authorized.authorName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{authorized.authorEmail}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
              </TooltipProvider>
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
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
      author: false,
    })

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
        <Button variant="outline" className="ml-auto">
        <AddGroup />
        </Button>
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

