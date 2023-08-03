import Image from 'next/image';
import * as React from 'react';

export const FadderSection = () => {
  return (
    <div className="container py-5 pb-5 justify-center relative">
      <div
        aria-hidden="true"
        className="absolute z-0 inset-0 top-60 grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-30"
      >
        <div className="h-60 z-0 bg-gradient-to-br from-primary to-red-400 blur-[106px]"></div>
        <div className="h-40 z-0 bg-gradient-to-r from-red-900 to-orange-200 blur-[106px]"></div>
      </div>
      <div className="flex flex-col md:flex-row z-40">
        <div className="md:w-1/2 my-auto">
          <div className="font-poppins flex flex-col container">
            <span className="font-semibold text-2xl text-red-400">
              Campus Bø
            </span>
            <span className="text-4xl md:text-5xl pb-3 font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Faddere for studenter av studenter. Bli en del av noe større.
            </span>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/Component_115.png?alt=media&token=ac1950f1-2876-4cd2-9d23-957b12265bcc"
            alt={'Fadder'}
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
};
