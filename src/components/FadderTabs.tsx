import * as React from 'react';
import { HeartHandshake, ShieldCheck, Users2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const pointsData = [
  {
    value: '1',
    title: 'Din Guide på Campus',
    text: 'En fadder ved Universitetet i Sørøst-Norge er en nøkkelperson i å bygge bro mellom nye studenter og campusets studentmiljø. Deres hovedrolle er å gi en hjelpende hånd til nye studenter, og sikre at de har en jevn og behagelig overgang til studentlivet.',
    icon: <HeartHandshake size={32} strokeWidth={1.5} />,
    image:
      'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/Component%201(16)(1).png?alt=media&token=d5111f17-706e-447d-889b-2c624f846226',
    header: 'Rolle',
  },
  {
    value: '2',
    title: 'En Knallstart på Studietiden',
    text: 'Begynnelsen på studietiden kan være litt overveldende, men det er her din fadder kommer inn. Deres oppgave er å gjøre overgangen til studentlivet så glatt som mulig. Fra dag én vil fadderen din introdusere deg for campus, dele verdifulle tips og sikre at du føler deg hjemme i ditt nye miljø.',
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    image:
      'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/Component%201(17)(1).png?alt=media&token=1ac1d297-9d2d-4b26-b335-feec1f0d640a',
    header: 'Oppgave',
  },
  {
    value: '3',
    title: 'Din Billett til Fellesskapet',
    text: 'Et robust sosialt nettverk er avgjørende for en berikende studieopplevelse. Ved å være en del av en faddergruppe, vil du ikke bare bli kjent med dine medstudenter, men du vil også ha en innebygd støttegruppe gjennom hele studietiden. Du vil finne faddergrupper spesielt rettet mot ditt studieprogram nedenfor.',
    icon: <Users2 size={32} strokeWidth={1.5} />,
    image:
      'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/Component%201(18)(1).png?alt=media&token=7c2077c2-2c7b-43ed-868e-a44faa40c335',
    header: 'Gruppe',
  },
];

export const FadderTabs = () => {
  const [activeTab, setActiveTab] = React.useState(pointsData[0].value);

  const onTriggerClick = (value: React.SetStateAction<string>) => {
    setActiveTab(value);
  };

  return (
    <div className="container py-5 pb-5">
      <div className="flex flex-col font-poppins items-center">
        <span className="font-semibold text-2xl text-red-400">01.</span>
        <span className="text-4xl font-bold text-gray-900">
          Fadderordningen
        </span>
      </div>
      <Tabs defaultValue={pointsData[0].value} className="w-full my-5">
        <div className="flex justify-center mx-auto">
          <TabsList className="inline-grid grid">
            <ul className="grid grid-cols-3">
              {pointsData.map((point, index) => (
                <TabsTrigger
                  key={index}
                  value={point.value}
                  onClick={() => onTriggerClick(point.value)}
                >
                  
                    <div
                      className={`group font-poppins text-sm font-semibold w-full flex flex-col justify-center items-center ${
                        activeTab === point.value ? 'text-red-400' : 'hover:text-gray-600'
                      }`}
                    >
                      <span className="mb-4">
                        {point.icon}
                      </span>
                      <span>{point.header}</span>
                    </div>
                 
                </TabsTrigger>
              ))}
            </ul>
          </TabsList>
        </div>

        {pointsData.map((point, index) => (
          <TabsContent key={index} value={point.value}>
            <div className="flex flex-col md:flex-row mt-10 max-w-5xl mx-auto items-center">
              <div className="md:w-1/2">
                <img className="rounded-lg" src={point.image} />
              </div>
              <div className="md:w-1/2">
                <div className="pb-5 container flex flex-col font-poppins">
                  <span className="font-semibold text-2xl text-red-400 uppercase">
                    {point.title}
                  </span>
                  <div className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal whitespace-pre-line">
                    <p>{point.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
