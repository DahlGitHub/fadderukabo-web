"use client"

import {ColumnDef,flexRender,getCoreRowModel,useReactTable,SortingState, getSortedRowModel, VisibilityState, ColumnFiltersState, getFilteredRowModel, getFacetedRowModel, getFacetedUniqueValues} from "@tanstack/react-table"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { MoreHorizontal, Crown, UserCircle, SortAsc, ArrowUpDown, CaseSensitive, AlertTriangle  } from "lucide-react"
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import React, { useEffect, useState } from "react"
import EditStudent from "./EditStudent"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../../firebase"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { StudentToolbar } from "./StudentToolbar"
import DeleteRow from "../DeleteRow"


export type Authorized = {
    docId: string
    status: "fadder" | "faddersjef"
    name: string
    group: string
    authorName: string
    authorEmail: string
    authorPhotoURL: string
  }

  interface GroupData {
    title: string;
    hexValue: string;
  }

  const GroupCell: React.FC<{ row: any }> = ({ row }) => {
  const [groupData, setGroupData] = useState<GroupData[]>([]);
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "groupdata"), (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data() as GroupData);
        setGroupData(data);

      });
  
      return () => {
        unsubscribe();
      };
    }, []);


    const authorized = row.original;
    const matchedGroup = groupData.find((group) => group.title === authorized.group);
    const hexValue = matchedGroup ? matchedGroup.hexValue : undefined;
    const groupTitle = matchedGroup ? matchedGroup.title : authorized.group;

    const renderContent = () => {
      if (hexValue) {
        return (
          <>
            <div className="mr-2 rounded-full w-3 h-3" style={{ backgroundColor: hexValue }} />
            <span>{groupTitle}</span>
          </>
        );
      } else {
        return (
          <>
            <CaseSensitive className="text-gray-500 w-5 h-5" />
          </>
        );
      }
    };
  
    return <div className="flex flex-row items-center">{renderContent()}</div>;


  };

  export const columns: ColumnDef<Authorized>[] = [
    
    {
    accessorKey: "name",
    header: ({ column}) => {
      return (
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const data = row.original
        return (
          <div className="flex items-center">
            <span>{data.status == "faddersjef" ? <Crown className="h-4 w-4" /> : <UserCircle className="h-4 w-4 text-gray-500" /> }</span>
            <span className="ml-2">{data.name}</span>
            
          </div>
        )
      },
      enableHiding: false,
    },
    
    {
      accessorKey: "group",
      header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Group
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: GroupCell,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      enableSorting: true,

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
              <DropdownMenuContent align="end" className="space-y-1">
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
              <DropdownMenuItem asChild>
                    
                    <DeleteRow 
                      docId={row.original.docId} 
                      collectionName={"studentdata"} 
                      message={`Are you sure you want to delete ${row.getValue("name")}?`} />
 
                </DropdownMenuItem>              
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
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    )
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
    })
   

    return (
      <div>
        <StudentToolbar table={table} />
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

