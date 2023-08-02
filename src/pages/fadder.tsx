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
      <TryggFadder />
      <div className="my-5 py-5">
        <GroupList />
      </div>
    </Layout>
  );
}
