import Link from 'next/link';
import { Button } from './ui/button';
import { CountDown } from './CountDown';
import { useEffect, useState } from 'react';
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { ChevronRight } from 'lucide-react';

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
    <div className="container py-5 pb-5 min-h-screen">
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
            <div className='text-center z-10'>
            <Link href="/program">
              <Button variant="default" size={"lg"}>Program <ChevronRight className="inline ml-2 transition-transform hover:scale-110" /></Button>
            </Link>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 container">
          <img
            src={
              'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/usnfadder.jpg?alt=media&token=0c000d64-6a89-46ee-af3f-58e08cd73883'
            }
            className="w-full rounded"
          />
        </div>
      </div>
    </div>
  );
};
