import Link from 'next/link';
import { Button } from './ui/button';
import { CountDown } from './CountDown';
import { useEffect, useState } from 'react';
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

export const LandingSection = () => {
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    // Fetch the target date from the database.
    const fetchTargetDate = async () => {
      try {
        const docRef = doc(db, 'timerdate', 'timer');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Assuming your target date is stored in a field called 'targetDate'.
          const targetDateFromDB = data.date;
          setTargetDate(targetDateFromDB);
        }
      } catch (error) {
        console.error('Error fetching target date:', error);
      }
    };

    fetchTargetDate();
  }, []);

  const formatTargetDate = (timestamp: Timestamp) => {
    if (!timestamp) return ''; // Return empty string if targetDate is not set

    const startDate = timestamp.toDate();
    const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000); // Adding 7 days to the startDate
    const formattedStartDate = startDate.toLocaleString('nb-NO', {
      day: 'numeric',
    });
    const formattedEndDate = endDate.toLocaleString('nb-NO', {
      day: 'numeric',
      month: 'short',
    });
    const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;

    return formattedDateRange;
  };

  return (
    <div className="container py-5 pb-5 min-h-screen flex justify-center mt-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 top-60 grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-30"
      >
        <div className="h-60 bg-gradient-to-br from-primary to-purple-400 blur-[106px]"></div>
        <div className="h-40 bg-gradient-to-r from-purple-900 to-orange-200 blur-[106px]"></div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="pb-5 container flex flex-col font-poppins">
            <span className="font-semibold text-2xl text-purple-600">
              {targetDate && (
                <span className="font-semibold text-2xl text-purple-600">
                  {formatTargetDate(targetDate)}
                </span>
              )}
            </span>
            <span className="text-5xl font-bold text-gray-900">
              Fadderuka Bø
            </span>
            <div className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal text-center">
              {targetDate && <CountDown targetDate={targetDate} />}
            </div>
            <div className='grid grid-cols-2 gap-5 text-center z-10'>
            <Link href="/program">
              <Button variant="default" className='bg-slate-800 rounded-full tracking-wide' size={"lg"}>PROGRAM</Button>
            </Link>
            <Link href="/fadder#faddergrupper">
              <Button variant="default" className='bg-slate-800 rounded-full tracking-wide' size={"lg"}>GRUPPER</Button>
            </Link>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 container">
          <Image
            src={'https://firebasestorage.googleapis.com/v0/b/usnfadderuka.firebasestorage.app/o/Images%2FStudiestart-illustrasjon-16-9.png_article.png?alt=media&token=ffe48955-309d-47ca-9d3e-c671cce4f1ed'}
            className="w-full rounded" alt={'Studiestart'}
            width={1000}
            height={1000}
            />
        </div>
      </div>
    </div>
  );
};
