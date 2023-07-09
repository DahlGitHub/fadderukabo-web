import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { DataTable, Group, columns } from '@/components/groups/GroupData';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import { TableSkeleton } from '@/components/TableSkeleton';
import { getSession } from 'next-auth/react';

const groups = () => {
  const [data, setData] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onSnapshot(collection(db, 'groupdata'), snapshot => {
      const fetchedGroups = snapshot.docs.map(doc => ({
        docId: doc.id,
        ...doc.data(),
      })) as Group[];

      // For each fetched group, fetch member count and create a new group object
      // that includes the member count
      const updatedGroups: Group[] = [];

      fetchedGroups.forEach(group => {
        const querySnapshot = query(
          collection(db, 'studentdata'),
          where('group', '==', group.title),
        );

        const unsubscribe = onSnapshot(querySnapshot, snapshot => {
          updatedGroups.push({ ...group, members: snapshot.size });

          // Check if we've updated all groups, if so, set the data state
          if (updatedGroups.length === fetchedGroups.length) {
            setData(updatedGroups);
            setIsLoading(false);
          }
        });

        return () => {
          unsubscribe();
        };
      });
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="pb-5">
        <h2 className="text-2xl font-bold tracking-tight">Groups</h2>
        <p className="text-muted-foreground">
          List of people in need of medical assistance
        </p>
      </div>
      {isLoading ? (
        <TableSkeleton columnCount={4} />
      ) : (
        data && <DataTable columns={columns} data={data} />
      )}
    </DashboardLayout>
  );
};

export default groups;

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

