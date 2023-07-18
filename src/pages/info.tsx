import { AccordionList } from '@/components/AccordionList';
import { SectionCard } from '@/components/SectionCard';
import Layout from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';

// Assuming you have data from the database in the following format
const accordionData = [
  {
    category: 'Category 1',
    items: [
      { question: 'Question 1', answer: 'Yaay' },
      { question: 'Question 2', answer: 'eee' },
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
      <AccordionList accordionData={accordionData} />
      <SectionCard
        id={'05.'}
        title={'Student i Sørøst-Norge?'}
        description={
          'Last ned appen "Student Sørøst" for å finne alt av arragamenteter, tilbud, leieforhold, snarveier til Canvas, TimeEdit, Min USN, Sikresiden og mye mer annet!\n\nAppen ble nylig lansert i 2021, og er fortsatt under utvikling! Over 90% av alle studentene ved USN har allerede tatt i bruk av appen.'
        }
        image={
          'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/studentapp.webp?alt=media&token=1f5fbd2a-bd2b-4a2b-9ac1-07eed585438b'
        }
        color="text-gray-600"
      />
      <div className='flex flex-col text-center items-center'>
      <span className="text-2xl font-bold text-gray-900">Last ned Student Sørøst</span>
      <div className='flex flex-row'>
        <a href="https://apps.apple.com/us/app/student-s%C3%B8r%C3%B8st/id1531470703" target="_blank" rel="noopener noreferrer">
            <img className='w-1/2 mx-auto' src="https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/apple.png?alt=media&token=8cfa5355-3bee-4cd8-a55e-8f902f782f13" alt="App Store" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=no.ssn.studentsorost&gl=NO" target="_blank" rel="noopener noreferrer">
            <img className='w-1/2 mx-auto' src="https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/googleplay.png?alt=media&token=55d33494-b487-4e90-8220-3e1239bff309" alt="Google Play" />
        </a>
      </div>
      </div>
    </Layout>
  );
}
