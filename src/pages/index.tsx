import * as React from 'react';

import Layout from '@/components/layout/Layout';


import { SectionCard } from '@/components/SectionCard';
import { LandingSection } from '@/components/LandingSection';

export default function HomePage() {
  return (
    <Layout>
      <LandingSection />
      <SectionCard
        id={'01.'}
        title={'Fadderuka'}
        description={
          'Velkommen til studiestart, og gratulerer med studieplassen! Alle studenter på Universitetet i Sørøst-Norge er velkommen til å delta i fadderuka. Studenter som blir med på det som skjer i studiestarten øker sjansen for å knytte gode sosiale nettverk, som igjen gir bedre psykisk helse, høyere studiemestring og bedre trivsel.'
        }
        image={
          'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/usnfadder.jpg?alt=media&token=0c000d64-6a89-46ee-af3f-58e08cd73883'
        }
      />
    </Layout>
  );
}
