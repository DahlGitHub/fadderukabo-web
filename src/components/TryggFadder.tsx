import { ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

export const TryggFadder = () => {
  return (
    <div className="bg-gray-50">
      <div className="container py-10 my-10">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 container items-center">
            <div className='w-40 h-40 bg-red-400 flex mx-auto'>
              <img
                src={
                  'https://cdn.discordapp.com/attachments/1075240291226890384/1134073886389059624/tryggfadder.png'
                }
                width={125}
                height={125}
                className="w-full rounded"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="pb-5 container flex flex-col font-poppins">
              <span className="font-semibold text-2xl text-gray-800">02.</span>
              <span className="text-4xl font-bold text-red-400">
                TRYGG FADDER
              </span>
              <p className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal whitespace-pre-line">
                For Universitetet i Sørøst-Norge er det viktig å sikre at våre
                ansatte, studenter og besøkende ferdes trygt og har et godt
                arbeids- og studiemiljø. På sikresiden.no får du opplæring og
                råd om hva du kan gjøre forebyggende og i krisesituasjoner.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="rounded-full bg-slate-800" size={'lg'}>
            <span className="font-poppins">SIKRESIDEN.NO</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
