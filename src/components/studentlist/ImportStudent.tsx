import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { toast } from '../ui/use-toast';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Loader2, Plus, Sheet, Upload } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';

type Props = {
  nameValue: string;
  groupValue: string;
};

export const ImportStudent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Props[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      if (fileInput.current) {
        // Clear the file input field and data when dialog is closed
        fileInput.current.value = '';
      }
      setData([]);
    }
  }, [isOpen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        let parsedData = XLSX.utils.sheet_to_json(sheet, {
          header: ['Name', 'Group'],
          range: 1,
        }) as Props[];

        if (Object.keys(parsedData[0]).length === 2) {
          setData(parsedData);
        } else {
          toast({
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
          });
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleUploadToDatabase = async () => {
    setIsUploading(true);
    try {
      const promises = data.map(async row => {
        const docData: Record<string, string> = {};

        // Iterate over the row object
        Object.entries(row).forEach(([key, value]) => {
          if (value !== undefined) {
            docData[key.toLowerCase()] = value as string;
          }
        });

        // Check if all required fields have valid values
        if (Object.keys(docData).length === 2) {
          // Generate a unique document ID for each row
          const docRef = await addDoc(collection(db, 'studentdata'), {
            ...docData,
            status: 'fadder',
            authorName: auth?.currentUser?.displayName,
            authorPhotoURL: auth?.currentUser?.photoURL,
            authorEmail: auth?.currentUser?.email,
          });
          return docRef.id;
        } else {
          throw new Error('Invalid data in the row');
        }
      });

      const documentIds = await Promise.all(promises);

      toast({
        title: 'Data uploaded successfully!',
        description: 'The sheet data has been uploaded to the database.',
      });

      setData([]);
      setIsOpen(false);
      console.log('Document IDs:', documentIds);
    } catch (error) {
      console.error('Error uploading data:', error);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was an error uploading the data to the database.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog>
      <Button asChild variant="outline" className="h-8 px-2 hover:bg-green-700 hover:text-gray-50">
        <DialogTrigger onClick={() => setIsOpen(true)}>
          <Upload size={16} />
        </DialogTrigger>
      </Button>
      {isOpen && (
        <DialogContent>
          <DialogTitle>Import Data</DialogTitle>
          <Input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            ref={fileInput}
          />

          {data.length > 0 ? (
            <ScrollArea className="h-96 rounded-md border p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-5">#</TableHead>
                    {Object.keys(data[0]).map(key => (
                      <TableHead key={key}>{key}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-muted-foreground text-xs">
                        {index + 1}
                      </TableCell>
                      {Object.values(row).map((value, index) => (
                        <TableCell key={index}>{value as string}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div>
              <div className='px-1'>
              <h3 className="text-lg font-bold mb-2">Expected data</h3>
              <p className="text-sm mb-3">
                Please upload an Excel file with the following structure:
              </p>
              </div>
              <div className="rounded-md border flex items-center justify-center">
                <Table>
                  <TableHeader>
                    <TableRow className="text-muted-foreground text-xs">
                      <TableHead>Column A</TableHead>
                      <TableHead>Column B</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Group A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>Group B</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jenny T</TableCell>
                      <TableCell>Group B</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <Button
            variant="outline"
            onClick={handleUploadToDatabase}
            disabled={data.length === 0 || isUploading} // Disable the button during uploading
          >
            {isUploading ? (
              <span className="flex flex-row">
                <Loader2 className="mr-2 animate-spin my-0.5" size={16} />
                Uploading...
              </span>
            ) : (
              <span className='flex flex-row'>
                <Sheet className='mr-2 my-0.5' size={16}/>
                Upload
              </span>
              
            )}
          </Button>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ImportStudent;
