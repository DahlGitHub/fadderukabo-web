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
import { nb } from 'date-fns/locale';
import Link from 'next/link';

interface ProgramCardProps {
  title: string;
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
  time,
  day,
  location,
  image,
  url,
  icon,
  color,
}) => {
  const dayDateObject = new Date(day.seconds * 1000);
  const dateDisplay = format(dayDateObject, 'EEE, dd. MMM', { locale: nb });

  return (
    <div className="relative">
      <Link href={url} target="_blank">
      <ArrowUpRight className="absolute top-0 right-0 m-2" size={20} />
      <div>
        <Card className={cn('flex flex-row border-none shadow-none hover:bg-slate-100')}>
          <div className="relative w-24 h-24 overflow-hidden rounded m-2">
            <Image
              className="object-cover rounded"
              src={image}
              alt={''}
              fill
            />
          </div>
          <CardHeader className="relative space-y-0">
            <div className="absolute z-50 top-[75px] left-[-25px] flex items-center justify-center rounded-full bg-white p-1">
              <span
                style={{ backgroundColor: `${color}` }}
                className="rounded-full p-1 text-white"
              >
                {icon}
              </span>
            </div>
            <span className="text-xs capitalize mb-5 text-muted-foreground">
              {dateDisplay} - {time}
            </span>
            <CardTitle className="text-md balance font-[poppins] pt-2.5 w-full">
              {title}
            </CardTitle>
            <CardDescription>
              <span>{location}</span>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      </Link>
    </div>
  );
};

export default ProgramCard;
