'use client'

import Layout from '@/components/layout/Layout';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import SignInAccont from '@/components/auth/SignInAccount';

export default function login () {

  return (
  <Layout>
    <SignInAccont />
  </Layout>
  )
}


