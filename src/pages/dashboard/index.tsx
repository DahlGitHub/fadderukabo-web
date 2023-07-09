import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { getSession } from 'next-auth/react';

const index = () => {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

export default index;

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
