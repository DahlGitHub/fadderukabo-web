import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
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

const authorized = () => {
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
  }, []);

  // Map all emails in allowedEmails and check if each exists in users
  const listedEmails = allowedEmails.map(email => {
    const user = users.find(user => user.email === email);
    if (user) {
      return user; // Display the user data if it exists
    } else {
      return {
        id: email,
        photoURL:
          'https://www.gstatic.com/identity/boq/profilepicturepicker/photo_silhouette_e02a5f5deb3ffc173119a01bc9575490.png',
        displayName: 'Invalid name',
        email: email,
        created: 9999999999999999,
        signedIn: 9999999999999999,
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
      <DataTable columns={columns} data={listedEmails} />
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({})();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(authorized);
