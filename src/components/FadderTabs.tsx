import * as React from 'react';
import { Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const pointsData = [
  {
    value: '1',
    title: 'Rollen som fadder',
    text: 'En fadder ved USN fungerer som en bro mellom de nye studentene og studentmiljøet på campus. Fadderen skal ta imot nye studenter og være med på å gi deg en god start på studiehverdagen.',
    icon: <Heart size={40} />,
    image: 'https://cdn.discordapp.com/attachments/1075240291226890384/1136106171187601408/299775273_5654008931305650_2111197190592147934_n.jpg',
    header: 'Rolle',
  },
  {
    value: '2',
    title: 'Oppgaver som fadder',
    text: 'Some decent text for the second point',
    icon: <Heart size={40} />,
    image: 'https://link-to-second-image.com',
    header: 'Oppgave',
  },
  {
    value: '3',
    title: 'Faddergruppene',
    text: 'Some decent text for the third point',
    icon: <Heart size={40} />,
    image: 'https://link-to-third-image.com',
    header: 'Gruppe',
  },
];

export const FadderTabs = () => {
  const [activeTab, setActiveTab] = React.useState(pointsData[0].value);

  const onTriggerClick = (value: React.SetStateAction<string>) => {
    setActiveTab(value);
  };

  return (
    <div className="container py-5 pb-5 justify-center">
      <div className="flex flex-col font-poppins">
        <span className="font-semibold text-2xl text-red-400">01.</span>
        <span className="text-4xl font-bold text-gray-900">
          Fadderordningen
        </span>
      </div>
      <Tabs defaultValue={pointsData[0].value} className="w-full my-5">
        <TabsList className="flex-row inline-grid gap-x-2 px-4 sm:px-0 xl:gap-x-6">
          <ul className="grid grid-cols-3">
            {pointsData.map((point, index) => (
              <TabsTrigger
                key={index}
                value={point.value}
                onClick={() => onTriggerClick(point.value)}
              >
                <li>
                  <button
                    type="button"
                    className={`group font-poppins text-sm font-semibold w-full flex flex-col items-center ${
                      activeTab === point.value ? 'text-red-400' : ''
                    }`}
                  >
                    <span className="mb-4">
                      <Heart size={40} />
                    </span>
                    <span>{point.header}</span>
                  </button>
                </li>
              </TabsTrigger>
            ))}
          </ul>
        </TabsList>

        {pointsData.map((point, index) => (
          <TabsContent key={index} value={point.value}>
            <div className="flex flex-col md:flex-row mt-10">
              <div className="md:w-1/2">
                <div className="pb-5 container flex flex-col font-poppins">
                  <span className="font-semibold text-xl text-red-400">
                    {point.title}
                  </span>
                  <div className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal whitespace-pre-line">
                    <p>{point.text}</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img className="rounded-lg" src={point.image} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
