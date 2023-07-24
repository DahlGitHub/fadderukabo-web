import * as React from 'react';

import Layout from '@/components/layout/Layout';

import { SectionCard } from '@/components/SectionCard';
import { LandingSection } from '@/components/LandingSection';
import FeatureSection from '@/components/FeatureSection';
import { Calendar, GraduationCap, HelpingHand } from 'lucide-react';
import { GroupCard } from '@/components/GroupCard';
import Testimonials from '@/components/Testimonials';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const fadderukafeatures = [
  {
    title: 'Faddere',
    description: 'Campus med mange faddere, alle fadderne gleder seg til å møte dere!',
    icon: (
      <GraduationCap className="text-gray-100" size={24} strokeWidth="1.5" />
    ),
  },
  {
    title: 'Trygg Fadder',
    description: 'Aktiviteter på dagen og kvelden, vi ønsker en uke for alle.',
    icon: <Calendar className="text-gray-100" size={24} strokeWidth="1.5" />,
  },
  {
    title: 'Faddergrupper',
    description: 'Faddergruppene dekker mange studier, alt fra års-, bachelor- og masterstudier.',
    icon: (
      <HelpingHand className="text-gray-100" size={24} strokeWidth="1.5" />
    ),
  },
];

interface TestimonialData {
  docId: string;
  name: string;
  major: string;
  color: string;
  message: string;
}

export default function HomePage() {
  const [testimonialsData, setTestimonialsData] = React.useState<
    TestimonialData[]
  >([]);
  const [faddereCount, setFaddereCount] = useState(0);
  const [programDataCount, setProgramDataCount] = useState(0);
  const [groupDataCount, setGroupDataCount] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'testimonials'));
        const testimonials = querySnapshot.docs.map(
          doc => doc.data() as TestimonialData,
        );
        setTestimonialsData(testimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    const fetchFaddereCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'studentdata'));
        setFaddereCount(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching faddere count:', error);
      }
    };

    const fetchProgramDataCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'programdata'));
        setProgramDataCount(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching programdata count:', error);
      }
    };

    const fetchGroupDataCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'groupdata'));
        setGroupDataCount(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching groupdata count:', error);
      }
    };

    fetchTestimonials();
    fetchFaddereCount();
    fetchProgramDataCount();
    fetchGroupDataCount();
  }, []);

  fadderukafeatures[0].title = `${faddereCount} Faddere`;
  fadderukafeatures[1].title = `${programDataCount} Arrangementer`;
  fadderukafeatures[2].title = `${groupDataCount} Faddergrupper`;

  return (
    <Layout>
      <div className='bg-gradiant-to-b from-white to-slate-100'>
      <LandingSection />
      </div>
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
      <div className="py-10">
        <FeatureSection
          title={'Fadderuka'}
          sectionNumber={'02.'}
          color={'text-purple-600'}
          features={fadderukafeatures}
          bgColor="bg-slate-800"
          textColor={'text-slate-400'}
          titleColor={'text-slate-200'}
          iconBgColor='bg-purple-600/40'
        />
      </div>

      <Testimonials testimonials={testimonialsData} />
    </Layout>
  );
}
