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
import { collection, getDocs } from 'firebase/firestore';
import { Calendar, GraduationCap, HelpingHand } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { type } from 'os';

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

// Define the structure of a single FAQ item
interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

// Define the structure of a single accordion item
interface AccordionItem {
  category: string;
  items: FAQItem[];
}

interface CarouselCardProps {
  title: string;
  image: string;
  url: string;
  type: string;
}

export default function Student() {
  const [accordionData, setAccordionData] = useState<AccordionItem[]>([]);
  const [carouselData, setCarouselData] = useState<CarouselCardProps[]>([]);
  const [carouselDataStudentLife, setCarouselDataStudentLife] = useState<CarouselCardProps[]>([]);

  useEffect(() => {
    const fetchAccordionData = async () => {
      const data: AccordionItem[] = [];
      const querySnapshot = await getDocs(collection(db, 'faqdata'));

      querySnapshot.forEach(doc => {
        const item = doc.data() as FAQItem;
        const categoryIndex = data.findIndex(
          categoryItem => categoryItem.category === item.category,
        );

        if (categoryIndex === -1) {
          data.push({ category: item.category, items: [item] });
        } else {
          data[categoryIndex].items.push(item);
        }
      });

      setAccordionData(data);
    };

    const fetchCarouselData = async () => {
      const data: CarouselCardProps[] = [];
      const querySnapshot = await getDocs(collection(db, 'lifedata'));

      querySnapshot.forEach(doc => {
        const item = doc.data() as CarouselCardProps;
        if (item.type === 'Organisasjon') {
          data.push(item);
        }
      });

      setCarouselData(data);
    };

    const fetchCarouselDataStudentLife = async () => {
      const data: CarouselCardProps[] = [];
      const querySnapshot = await getDocs(collection(db, 'lifedata'));
  
      querySnapshot.forEach((doc) => {
        const item = doc.data() as CarouselCardProps;
        if(item.type === "Studentmiljø") {
          data.push(item);
        }
      });
  
      setCarouselDataStudentLife(data);
    };

    fetchAccordionData();
    fetchCarouselData();
    fetchCarouselDataStudentLife();
  }, []);

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
        color="text-blue-400"
      />
      <div className='container py-6' id='organisasjoner'>
      <CarouselList cards={carouselData} number={'02.'} title={'Studentorg.'} />
      </div>
      <FeatureSection
        title={'Campus Bø'}
        sectionNumber={'03.'}
        color={'text-blue-400'}
        textColor={'text-slate-900'}
        titleColor={''}
        bgColor={'bg-orange-50'}
        features={campusFeatures}
        iconBgColor={'bg-blue-300/30'}
      />
      
      
      <div id="faq">
        <AccordionList accordionData={accordionData} />
      </div>
      <div className='container py-6' id='studentlivet'>
      <CarouselList cards={carouselDataStudentLife} number={'05.'} title={'Studentlivet'} />
      </div>
      <div id='appen'>
      <SSNApp />
      </div>
      
    </Layout>
  );
}
