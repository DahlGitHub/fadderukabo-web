import Link from 'next/link';
import { Button } from './ui/button';
import { CountDown } from './CountDown';

export const LandingSection = () => {
  return (
    <div className="container py-5 pb-5">
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
              13. - 20. august
            </span>
            <span className="text-5xl font-bold text-gray-900">
              Fadderuka Bø
            </span>
            <p className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal">
              <CountDown />
            </p>
            <Link href="/program" className="z-10">
              <Button variant="default">Program</Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 container">
          <img src={'image'} className="w-full rounded" />
        </div>
      </div>
    </div>
  );
};
