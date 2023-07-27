import { AccordionList } from '@/components/AccordionList';
import CarouselList from '@/components/CarouselList';
import { FadderSection } from '@/components/FadderSection';
import FeatureSection from '@/components/FeatureSection';
import { GroupList } from '@/components/GroupList';
import { SSNApp } from '@/components/SSNApp';
import { SectionCard } from '@/components/SectionCard';
import { TryggFadder } from '@/components/TryggFadder';
import Layout from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Calendar, GraduationCap, HelpingHand } from 'lucide-react';
import { useState } from 'react';

export default function Fadder() {
  return (
    <Layout>
      <FadderSection />
      <TryggFadder />
      <div className='my-5 py-5'>
      <GroupList />
      </div>
    </Layout>
  );
}
