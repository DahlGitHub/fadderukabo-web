import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';

interface TableHeaderProps {
  columnCount: number;
}

export const TableSkeleton: React.FC<TableHeaderProps> = ({ columnCount }) => {
  const columnWidths = ['100px', '75px', '50px']; // Array of three different column widths

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between py-4">
        <Button variant="outline" className="h-8 w-40 px-2" disabled>
          <Skeleton className="w-[100%] h-[20px] rounded-full" />
        </Button>
        <div className='flex space-x-2'>
        <Button variant="outline" className="h-8 w-8 px-2" disabled>
          <Skeleton className="w-[100%] h-[20px] rounded-full" />
        </Button>
        <Button variant="outline" className="h-8 w-8 px-2" disabled>
          <Skeleton className="w-[100%] h-[20px] rounded-full" />
        </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columnCount }, (_, index) => (
                <TableHead
                  key={index}
                  style={{ width: columnWidths[index % columnWidths.length] }}
                >
                  <Skeleton className="w-[50%] h-[20px] rounded-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 3 }, (_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columnCount }, (_, columnIndex) => (
                  <TableCell key={columnIndex}>
                    <Skeleton className="w-[30%] h-[20px] rounded-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
