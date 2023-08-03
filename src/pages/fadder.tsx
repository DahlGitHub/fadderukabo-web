import { FadderSection } from '@/components/FadderSection';
import { FadderTabs } from '@/components/FadderTabs';
import { GroupList } from '@/components/GroupList';
import { TryggFadder } from '@/components/TryggFadder';
import Layout from '@/components/layout/Layout';

export default function Fadder() {
  return (
    <Layout>
      <FadderSection />
      <FadderTabs />
      <div id='trygg-fadder' className='py-6'>
      <TryggFadder />
      </div>
      <div className="my-10 py-10" id='faddergrupper'>
        <GroupList />
      </div>
    </Layout>
  );
}
