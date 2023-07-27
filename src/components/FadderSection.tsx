import * as React from 'react';
import { Heart } from 'lucide-react';

const pointsData = [
  {
    title: 'Title for first point',
    text: 'Some decent text for the first point',
    icon: <Heart />,
  },
  {
    title: 'Title for second point',
    text: 'Some decent text for the second point',
    icon: <Heart />,
  },
  {
    title: 'Title for third point',
    text: 'Some decent text for the third point',
    icon: <Heart />,
  },
];

export const FadderSection = () => {
  return (
    <div className="container py-5 pb-5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="pb-5 container flex flex-col font-poppins">
            <span className="font-semibold text-2xl text-red-400">01.</span>
            <span className="text-4xl font-bold text-gray-900">Fadder</span>
            <div className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal whitespace-pre-line">
              {pointsData.map((point, index) => (
                <div key={index} className="flex flex-col py-2">
                  <div className="flex items-center">
                    <span className='bg-red-200/40 p-2 m-2 rounded-full mr-5 text-red-500'>{point.icon}</span>
                    <div>
                      <span className="font-semibold">{point.title}</span>
                      <p>{point.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/2 container">
          <img src="" className="w-full rounded" />
        </div>
      </div>
    </div>
  );
};
