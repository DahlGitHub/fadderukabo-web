import React, { useState } from 'react';
import { Authorized } from './StudentData';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

interface EditDataProps {
  data: Authorized;
  docId: string;
}

export const EditStudent: React.FC<EditDataProps> = ({ docId, data}) => {
    const [currentData, setCurrentData] = React.useState(data);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await updateDoc(doc(db, 'studentdata', docId), currentData);
        setIsOpen(false);
      };

  return (
    <Dialog>
        <DialogTrigger onClick={() => setIsOpen(true)}>EditThis</DialogTrigger>
        {isOpen && (
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={currentData.name}
              onChange={(e) =>
                setCurrentData({ ...currentData, name: e.target.value })
              }
            />
        <select
          value={currentData.status}
          onChange={(e) =>
            setCurrentData({ ...currentData, status: e.target.value as "fadder" | "faddersjef" })
          }
        >
          <option value="fadder">Fadder</option>
          <option value="faddersjef">Faddersjef</option>
        </select>
            {/* Add more inputs for each field you want to edit */}
            <button type="submit">Save</button>
          </form>
          <DialogTrigger onClick={() => setIsOpen(false)}>Cancel</DialogTrigger>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default EditStudent;