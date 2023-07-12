import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  AuthAction,
  withAuthUser,
  withAuthUserSSR,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import FaqPage from '@/components/faq/FaqPage';
import { getSession } from 'next-auth/react';

const Questions = () => {
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

export default Questions;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login", // Redirect to login page
        permanent: false,
      },
    };
  }

  // If the user is authenticated, return the props
  return { props: {} };
}