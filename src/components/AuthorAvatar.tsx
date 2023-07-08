import React from 'react';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface AuthorColumnProps {
  authorName: string;
  authorEmail: string;
  authorPhotoURL: string;
  updatedAt: number;
}

const AuthorColumn: React.FC<AuthorColumnProps> = ({
  authorName,
  authorEmail,
  authorPhotoURL,
  updatedAt,
}) => {
  const formattedDate = format(updatedAt, 'dd. MMM yyyy');

  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={authorPhotoURL ?? undefined}
                alt={authorName ?? undefined}
              />
              <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{authorName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {authorEmail}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {formattedDate}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AuthorColumn;
