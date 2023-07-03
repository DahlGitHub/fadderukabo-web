import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import GroupPage from '@/components/groups/GroupPage';

const groups = () => {
  return (
    <DashboardLayout>
      <GroupPage />
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({})();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(groups);
