import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  AuthAction,
  withAuthUser,
  withAuthUserSSR,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import FaqPage from '@/components/faq/FaqPage';

const questions = () => {
  return (
    <DashboardLayout>
      <div className="pb-5">
        <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
        <p className="text-muted-foreground">
          List of people in need of medical assistance
        </p>
      </div>
      <FaqPage />
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({})();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(questions);
