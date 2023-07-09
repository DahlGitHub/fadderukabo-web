import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  Authorized,
  DataTable,
  columns,
} from '@/components/authorized/AuthorizedData';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { TableSkeleton } from '@/components/TableSkeleton';
import { getSession } from 'next-auth/react';

const authorized = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Authorized[]>([]);
  const [allowedEmails, setAllowedEmails] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async (emails: string[]) => {
      const usersSnapshot = await getDocs(
        query(collection(db, 'users'), where('email', 'in', emails)),
      );
      const usersData = usersSnapshot.docs.map(doc => doc.data() as Authorized);
      setUsers(usersData);
    };

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'allowedEmails'));
        const allowedEmailsData = querySnapshot.docs.map(
          doc => doc.data().email,
        );
        setAllowedEmails(allowedEmailsData);
        await fetchUsers(allowedEmailsData);

        const unsubscribe = onSnapshot(
          collection(db, 'allowedEmails'),
          snapshot => {
            const updatedEmails = snapshot.docs.map(doc => doc.data().email);
            setAllowedEmails(updatedEmails);
            fetchUsers(updatedEmails);
          },
        );

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
    setIsLoading(false);
  }, []);

  // Map all emails in allowedEmails and check if each exists in users
  const listedEmails = allowedEmails.map(email => {
    const user = users.find(user => user.email === email);
    if (user) {
      return user; // Display the user data if it exists
    } else {
      return {
        id: email,
        image:
          'https://www.gstatic.com/identity/boq/profilepicturepicker/photo_silhouette_e02a5f5deb3ffc173119a01bc9575490.png',
        name: 'Invalid name',
        email: email,
        createdAt: 9999999999999999,
      };
    }
  });

  return (
    <DashboardLayout>
      <div className="pb-5">
        <h2 className="text-2xl font-bold tracking-tight">Authorized</h2>
        <p className="text-muted-foreground">
          List of people with access to the dashboard
        </p>
      </div>
      {isLoading ? (
        <TableSkeleton columnCount={3} />
      ) : (
        listedEmails && <DataTable columns={columns} data={listedEmails} />
      )}
    </DashboardLayout>
  );
};

export default authorized;

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