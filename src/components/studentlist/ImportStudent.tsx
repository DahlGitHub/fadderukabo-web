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
  } from "@/components/ui/table"
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger} from '../ui/dialog';
import { Plus, Upload } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';

type Props = {
    nameValue: string;
    groupValue: string;
}

export const ImportStudent = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<Props[]>([])
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
          reader.onload = (e) => {
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
                description: "There was a problem with your request.",
              });
            }
          };
          reader.readAsBinaryString(file);
        } 
      };

      const handleUploadToDatabase = async () => {
        try {
          const promises = data.map(async (row) => {
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
          console.log('Document IDs:', documentIds);
        } catch (error) {
          console.error('Error uploading data:', error);
          toast({
            title: 'Uh oh! Something went wrong.',
            description: 'There was an error uploading the data to the database.',
          });
        }

      };

  return (

        <Dialog>
        <Button asChild variant="outline" className="h-8 px-2">
        <DialogTrigger onClick={() => setIsOpen(true)}><Upload size={16}/></DialogTrigger>
        </Button>
        {isOpen && (
        <DialogContent>

<Input 
  type="file" 
  accept=".xlsx, .xls" 
  onChange={handleFileUpload}
  ref={fileInput} 
/>

{data.length > 0 && (
<ScrollArea className="h-96 rounded-md border p-4">
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-5">#</TableHead>
        {Object.keys(data[0]).map((key) => (
        <TableHead key={key}>{key}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    
    <TableBody>
        
        {data.map((row, index) => (

            <TableRow key={index}>
                <TableCell className='text-muted-foreground text-xs'>{index + 1}</TableCell>
                {Object.values(row).map((value, index) => (
                    <TableCell key={index}>{value as string}</TableCell>
                ))}
            </TableRow>
         
        ))}
        
    </TableBody>
    
    </Table>
</ScrollArea>
)}
<Button variant="outline" onClick={handleUploadToDatabase}>Upload</Button>
</DialogContent>
)}
</Dialog>

  );
}

export default ImportStudent;