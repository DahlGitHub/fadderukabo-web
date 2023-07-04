import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  AuthAction,
  withAuthUser,
  withAuthUserSSR,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import ProgramPage from '@/components/program/ProgramPage';
import FaqPage from '@/components/faq/FaqPage';

const questions = () => {
  return (
    <DashboardLayout>
      <FaqPage />
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({})();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(questions);
