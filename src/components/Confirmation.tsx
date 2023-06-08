import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { useState } from "react";

interface ConfirmationProps {
    onConfirm: () => void;
    message: string;
  }
  
  const Confirmation = ({ onConfirm, message }: ConfirmationProps) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleConfirm = () => {
      onConfirm();
      setIsOpen(false);
    };
  
    return (
      <div>
        <Dialog>
          <DialogTrigger onClick={() => setIsOpen(true)}>Delete</DialogTrigger>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                <p>{message}</p>
                
                </DialogDescription>
                <DialogDescription className="pt-2">
                    <p>This action cannot be undone.</p>
                </DialogDescription>

            </DialogHeader>
            <div className="flex justify-between mt-4">
            <DialogTrigger onClick={() => setIsOpen(false)}>Cancel</DialogTrigger>
            <DialogTrigger onClick={handleConfirm}>Confirm</DialogTrigger>

            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default Confirmation;