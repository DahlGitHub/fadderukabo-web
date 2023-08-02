import * as React from 'react';

export const FadderSection = () => {
  return (
    <div className="container py-5 pb-5 justify-center relative">
      <div
        aria-hidden="true"
        className="absolute z-10 inset-0 top-60 grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-30"
      >
        <div className="h-60 z-10 bg-gradient-to-br from-primary to-red-400 blur-[106px]"></div>
        <div className="h-40 z-10 bg-gradient-to-r from-red-900 to-orange-200 blur-[106px]"></div>
      </div>
      <div className="flex flex-col md:flex-row z-50">
        <div className="md:w-1/2">
            <div>Title</div>
        </div>
        <div className="md:w-1/2">
          <img src="https://cdn.discordapp.com/attachments/1075240291226890384/1136097503436079194/Component_115.png" />
        </div>
      </div>
    </div>
  );
};
