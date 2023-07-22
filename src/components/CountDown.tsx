import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';

interface CountDownProps {
  targetDate: Timestamp; // Use Firestore's Timestamp type
}

export const CountDown = ({ targetDate }: CountDownProps) => {
  // Helper function to calculate remaining time based on the target date.
  const getRemainingTime = (targetDate: Timestamp) => {
    const currentTime = Date.now();
    const targetTime = targetDate.toMillis(); // Convert Firestore Timestamp to milliseconds
    const timeDifference = targetTime - currentTime;

    // Calculate days, hours, minutes, and seconds from the time difference.
    const days = Math.max(
      Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
      0,
    );
    const hours = Math.max(
      Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      0,
    );
    const minutes = Math.max(
      Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
      0,
    );
    const seconds = Math.max(
      Math.floor((timeDifference % (1000 * 60)) / 1000),
      0,
    );

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [remainingTime, setRemainingTime] = useState(
    getRemainingTime(targetDate),
  );

  useEffect(() => {
    // Update the remaining time every second.
    const timer = setInterval(() => {
      setRemainingTime(getRemainingTime(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Check if the remaining time is zero (target date has passed)
  const isTargetDatePassed =
    remainingTime.days === 0 &&
    remainingTime.hours === 0 &&
    remainingTime.minutes === 0 &&
    remainingTime.seconds === 0;

  // If target date has passed, return "0:0:0:0"
  if (isTargetDatePassed) {
    return (
      <div>
        <div className="flex flex-row justify-between space-x-10 my-10">
        <div>
          <span className="text-4xl font-bold">0</span>
          <p className="text-sm">Dager</p>
        </div>
        <div>
          <span className="text-4xl font-bold">0</span>
          <p className="text-sm">Timer</p>
        </div>
        <div>
          <span className="text-4xl font-bold">0</span>
          <p className="text-sm">Minutter</p>
        </div>
        <div>
          <span className="text-4xl font-bold">0</span>
          <p className="text-sm">Sekunder</p>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-10">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold">{remainingTime.days}</span>
          <p className="text-sm">Dager</p>
        </div>
        <div className="flex flex-col items-center"> 
          <span className="text-5xl font-bold">{remainingTime.hours}</span>
          <p className="text-sm">Timer</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold">{remainingTime.minutes}</span>
          <p className="text-sm">Minutter</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold">{remainingTime.seconds}</span>
          <p className="text-sm">Sekunder</p>
        </div>
      </div>
    </div>
  );
};
