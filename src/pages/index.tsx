import * as React from 'react';

import Layout from '@/components/layout/Layout';


import { SectionCard } from '@/components/SectionCard';
import { LandingSection } from '@/components/LandingSection';
import FeatureSection from '@/components/FeatureSection';
import { Calendar, GraduationCap, HelpingHand } from 'lucide-react';
import { GroupCard } from '@/components/GroupCard';

const fadderukafeatures = [
  {
    title: 'Faddergrupper',
    description: 'Faddergruppe',
    icon: <GraduationCap className='text-purple-600' size={32} stroke-width='1.5' />,
  },
  {
    title: 'Trygg Fadder',
    description: 'T',
    icon: <Calendar className='text-purple-600' size={32} stroke-width='1.5'  />,
  },
  {
    title: 'Fadder',
    description: 'F',
    icon: <HelpingHand className='text-purple-600' size={32} stroke-width='1.5'  />,
  },
];

export default function HomePage() {
  return (
    <Layout>
      <LandingSection />
      <SectionCard
        color="text-purple-600"
        id={'01.'}
        title={'Studiestart'}
        description={
          'Velkommen til studiestart, og gratulerer med studieplassen! Alle studenter på Universitetet i Sørøst-Norge er velkommen til å delta i fadderuka. Studenter som blir med på det som skjer i studiestarten øker sjansen for å knytte gode sosiale nettverk, som igjen gir bedre psykisk helse, høyere studiemestring og bedre trivsel.\n\nFadderstyret ønsker både gamle og nye studenter en oppriktig fin studiestart. En uke fylt med mange gode inntrykk, sosiale settinger, nye venner, og ikke minst en flott studietid!'
        }
        image={
          'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/usnfadder.jpg?alt=media&token=0c000d64-6a89-46ee-af3f-58e08cd73883'
        }
      />
      <div className='bg-gray-800 py-10'>
      <FeatureSection title={'Fadderuka'} sectionNumber={'02.'} color={"text-purple-600"} features={fadderukafeatures} />
    </div>
    <GroupCard />
    <div className='min-h-screen'>
        Hello
    </div>
    </Layout>
  );
}
