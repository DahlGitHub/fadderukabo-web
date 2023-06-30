import { Table } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { StudentFacetedFilter, groupSelections } from "./StudentFacetedFilter"
import AddStudent from "./AddStudent"
import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../../firebase"

interface StudentToolbarProps<TData> {
    table: Table<TData>
  }

export function StudentToolbar<TData>({ table }: StudentToolbarProps<TData>) {

    const [groupOptions, setGroupOptions] = useState<string[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'groupdata'), (snapshot) => {
          const titles = snapshot.docs.map((doc) => doc.data().title);
          setGroupOptions(titles);
        });
    
        return () => unsubscribe();
      }, []);

    return (
        <div className="flex items-center py-4">
            <Input
                placeholder="Search name..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
                {table.getColumn("group") && (
                <StudentFacetedFilter
                column={table.getColumn("group")}
                title="Groups"
                options={groupSelections}
                />
            )}
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
            <Button className="border">
                <AddStudent groupOptions={groupOptions} />
            </Button>

            
        </div>
    )

}
