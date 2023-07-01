import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

interface DeleteRowProps {
    docId: string;
    collectionName: string;
    message: string;
  }
  
  const DeleteCollection = ({ collectionName, docId, message}: DeleteRowProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const deleteRow = async () => {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
      };
    
      const handleConfirm = () => {
        deleteRow();
      };
    
  
    return (
      <div>
        <Dialog>
            <Button asChild className="h-8 px-2">
          <DialogTrigger onClick={() => setIsOpen(true)}>
            Delete
          </DialogTrigger>
         </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Warning</DialogTitle>
              <DialogDescription>
                {message} 
              </DialogDescription>
              <DialogDescription className="pt-2 text-red-700">
                This action cannot be undone.
              </DialogDescription>
  
            </DialogHeader>
            <div className="flex justify-between mt-4">

              <DialogTrigger onClick={handleConfirm}>Confirm</DialogTrigger>
  
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default DeleteCollection;