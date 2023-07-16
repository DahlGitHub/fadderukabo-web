import React from 'react';
import { Timestamp } from 'firebase/firestore';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from './ui/button';

interface ProgramCardProps {
  title: string;
  date: Timestamp;
  day: Timestamp;
  time: number;
  category: string;
  location: string;
  image: string;
  url: string;
  icon: JSX.Element; 
  color: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  date,
  time,
  day,
  location,
  image,
  url,
  icon,
  color,
}) => {
  const dayDateObject = new Date(day.seconds * 1000);
  const monthDateObject = new Date(date.seconds * 1000);

  const dayDisplay = format(dayDateObject, 'dd');
  const monthDisplay = format(monthDateObject, 'MMM'); //

  return (
    <div>
      <Card
        className={cn('w-[330px] hover:scale-105 trasition-all duration-200')}
      >
        <div className="h-[125px] overflow-hidden rounded mx-2 mt-2">
          <Image
            className="object-cover h-32 w-96 rounded"
            src={image}
            alt={''}
            height={500}
            width={500}
          />
        </div>
        <div className="flex">
          <div className="flex flex items-center justify-center">
            <div className="flex flex-col items-center mx-1 px-1">
              <Button variant="outline" className="text-xl font-semibold p-3">{dayDisplay}</Button>
              <span className="uppercase text-sm font-bold" style={{color: `${color}`}}>{monthDisplay}</span>
            </div>
          </div>
          <div className="flex-3 w-full">
            <CardHeader className="py-1 relative">
              <div className="absolute z-50 top-[-15px] right-5 flex items-center justify-center rounded-full bg-white p-1">
                <span style={{backgroundColor: `${color}` }} className="rounded-full p-1 text-white">
                  {icon}
                </span>
              </div>
              <CardTitle className="text-md balance font-[poppins] uppercase">{title}</CardTitle>
              <CardDescription>
                <span className="mr-2">{time}</span>
                <span>{location}</span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end py-1">
              <span className="uppercase mr-0.5 text-xs">Besøk</span>
              <ArrowUpRight size={16} />
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProgramCard;
