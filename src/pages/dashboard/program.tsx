import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  AuthAction,
  withAuthUser,
  withAuthUserSSR,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import ProgramPage from '@/components/program/ProgramPage';

const program = () => {
  return (
    <DashboardLayout>
      <ProgramPage />
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({})();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(program);
