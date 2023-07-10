import React from 'react';
import { Timestamp } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface ProgramCardProps {
  title: string;
  date: Timestamp;
  time: number;
  category: string;
  location: string;
  image: string;
  url: string;
}

const ProgramCard = () => {
  const link =
    'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/Images%2FD1IqkoJhEZ8LY0qHU3uy?alt=media&token=10b1afa0-2700-49eb-8993-0d82f4a71e4c';

  const link2 =
    'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/Images%2Frsz_6460246e1f0b7.png?alt=media&token=0231a0d5-8f46-412e-ac8b-49c18108941b';

  return (
    <div>
      <Card
        className={cn('w-[280px] hover:scale-105 trasition-all duration-200')}
      >
        <div className="h-[125px] overflow-hidden">
          <Image
            className="object-cover h-32 w-96 rounded-t-lg"
            src={link}
            alt={'none'}
            height={500}
            width={500}
          />
        </div>
        <div className="flex">
          <div className="flex flex items-center justify-center">
            <div className="flex flex-col items-center px-2">
              <p className="text-xl font-semibold">18</p>
              <p className="uppercase text-xs">Aug</p>
            </div>
          </div>
          <div className="flex-3">
            <CardHeader className="py-1">
              <CardTitle className="text-xl balance">
                International Grillparty
              </CardTitle>
              <CardDescription>
                <span className="mr-2">10:00</span>
                <span>Campus</span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end py-1">
              <span className="uppercase mr-0.5 text-sm">Besøk</span>
              <ArrowUpRight size={16} />
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProgramCard;
