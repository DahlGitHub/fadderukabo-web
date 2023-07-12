import React from 'react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface ProgramListProps {
  title: string;
  time: number;
  location: string;
  url: string;
  category: string;
}

const ProgramList: React.FC<ProgramListProps> = ({
  title,
  time,
  location,
  url,
  category,
}) => {
  return (
    <div>
      <div className="flex flex-row gap-6 items-center">
        <p className="w-20 text-lg font-normal text-gray-500 text-right dark:text-gray-400 ">
          {time}
        </p>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <a href="#" className="hover:underline">
              {title}
            </a>
          </h3>
        </div>
      </div>
      <Separator orientation="horizontal" className='my-2'></Separator>
    </div>
  );
};

export default ProgramList;
