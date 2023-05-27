import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const UserContext = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      // Check if the user's email is in the allowedEmails list
      const userEmail = 'user@example.com'; // Replace with the user's email
      const authorizedEmailsRef = collection(db, 'allowedEmails');
      const authorizedEmailsQuery = query(authorizedEmailsRef, where('email', '==', userEmail));

      getDocs(authorizedEmailsQuery)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // User is not authorized, redirect to a non-authorized page or show an error message
            router.replace('/unauthorized');
          }
        })
        .catch((error) => {
          console.error('Error checking authorized emails:', error);
        });
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default UserContext;