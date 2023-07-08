import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import React from 'react';

interface ConfirmationProps {
  onConfirm: () => void;
  message: string;
}

const Confirmation = React.forwardRef<HTMLDivElement, ConfirmationProps>(
  ({ onConfirm, message }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleConfirm = () => {
      onConfirm();
      setIsOpen(false);
    };

    return (
      <div>
        <Dialog>
          <Button
            asChild
            variant="ghost"
            className="h-8 w-full px-2 hover:bg-red-500 hover:text-gray-50"
          >
            <DialogTrigger onClick={() => setIsOpen(true)}>
              <Trash2 size={16} className="mr-2" />
              <div className="text-start w-full">Delete</div>
            </DialogTrigger>
          </Button>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>{message}</DialogDescription>
              <DialogDescription className="pt-2">
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-between mt-4">
              <DialogTrigger onClick={() => setIsOpen(false)}>
                Cancel
              </DialogTrigger>
              <DialogTrigger onClick={handleConfirm}>Confirm</DialogTrigger>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
);

export default Confirmation;
