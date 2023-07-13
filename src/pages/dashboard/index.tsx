'use client'

import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GetServerSideProps } from 'next';
import { auth } from '../../../firebase';
import router, { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import useAuth from '@/components/auth/useAuth';

const Index = () => {

  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

export default Index;



