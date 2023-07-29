import { AccordionList } from '@/components/AccordionList';
import CarouselList from '@/components/CarouselList';
import FeatureSection from '@/components/FeatureSection';
import { SSNApp } from '@/components/SSNApp';
import { SectionCard } from '@/components/SectionCard';
import Layout from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Calendar, GraduationCap, HelpingHand } from 'lucide-react';
import { useState } from 'react';

// Assuming you have data from the database in the following format
const campusFeatures = [
  {
    title: '39 Studietilbud',
    description:
      'Campus Bø har et bredt utvalg av årstudier, bachelorstudier og masterstudier.',
    icon: (
      <GraduationCap className="text-blue-600" size={24} strokeWidth="1.5" />
    ),
  },
  {
    title: '2200+ Studenter',
    description:
      'Campus Bø består av over 2000 studenter delt på tre fakulteter.',
    icon: <Calendar className="text-blue-600" size={24} strokeWidth="1.5" />,
  },
  {
    title: '10+ Organisasjoner',
    description:
      'Mye liv året rundt for alle studentene med over 10 aktive organisasjoner.',
    icon: <HelpingHand className="text-blue-600" size={24} strokeWidth="1.5" />,
  },
];

const accordionData = [
  {
    category: 'Category 1',
    items: [
      { question: 'Question 1', answer: 'Ja det er mulig [link](https://www.fadderukabo.no) viser deg veien' },
      { question: 'Question 2', answer: 'eee now let add one [more]() and\n\n one moreeee [yay]()' },
    ],
  },
  {
    category: 'Category 2',
    items: [
      { question: 'Question 3', answer: 'Answer 3' },
      { question: 'Question 4', answer: 'Answer 4' },
    ],
  },
  // Add more categories and items as needed
];

export default function Info() {
  return (
    <Layout>
      <SectionCard
        id={'01.'}
        reverse
        title={'Universitetet i Sørøst-Norge'}
        description={
          'Universitetet i Sørøst-Norge har cirka 18000 studenter, og 1.800 årsverk. Det tilbys profesjons- og arbeidslivsretta utdannelse, forskning og formidling av kunnskap med høy internasjonal kvalitet.\n\n Alt av informasjon fra studiestart, emneplan, veiledning til timeplan og kontaktinformasjon finner sted på den offisielle nettsiden til Universitetet i Sørøst-Norge.'
        }
        image={
          'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/usnrektor.jpeg?alt=media&token=996696c9-8135-475a-ad7a-73ed6ee82c3f'
        }
        color="text-blue-600"
      />
      <FeatureSection
        title={'Campus Bø'}
        sectionNumber={'02.'}
        color={'text-blue-600'}
        textColor={'text-slate-900'}
        titleColor={''}
        bgColor={'bg-orange-50'}
        features={campusFeatures}
        iconBgColor={'bg-blue-300/30'}
      />
      <CarouselList />
      <div id="faq">
        <AccordionList accordionData={accordionData} />
      </div>
      <SSNApp />
    </Layout>
  );
}
