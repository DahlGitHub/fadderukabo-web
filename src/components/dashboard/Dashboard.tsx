import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserNav } from '../UserNav';
import Page from '../studentlist/StudentListPage';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const username = auth.currentUser?.displayName;
  const { toast } = useToast();
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <Button
        variant="outline"
        onClick={() => {
          console.log('clicked');
          toast({
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
          });
        }}
      >
        Show Toast
      </Button>
      <div>
        Welcome {username} !

      </div>
    </div>
  );
};

export default Dashboard;
