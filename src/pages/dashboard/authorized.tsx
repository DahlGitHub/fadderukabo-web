import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Authorized from '@/components/authorized/Authorized';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

const authorized = () => {
  return (
    <DashboardLayout>
      <Authorized />
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({})();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(authorized);
