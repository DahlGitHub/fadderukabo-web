import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  columns,
  DataTable,
  Authorized,
} from '@/components/studentlist/StudentData';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { TableSkeleton } from '@/components/TableSkeleton';
import { getSession } from 'next-auth/react';

const Studentlist = () => {
  const [data, setData] = useState<Authorized[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'studentdata'), snapshot => {
      const newData = snapshot.docs.map(
        doc =>
          ({
            docId: doc.id,
            ...doc.data(),
          } as Authorized),
      );

      // Sort the data by groups in ascending order
      newData.sort((a, b) => a.group.localeCompare(b.group));

      // Sort the data by status in descending order and then by names in ascending order within each group
      newData.sort((a, b) => {
        if (a.group === b.group) {
          if (a.status === 'faddersjef' && b.status !== 'faddersjef') {
            return -1; // a should come before b
          }
          if (a.status !== 'faddersjef' && b.status === 'faddersjef') {
            return 1; // b should come before a
          }
          return a.name.localeCompare(b.name); // Sort names in ascending order
        }
        return 0;
      });

      setData(newData);
      setIsLoading(false);
    });

    // Detach the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <DashboardLayout>
      <div className="pb-5">
        <h2 className="text-2xl font-bold tracking-tight">Fadderliste</h2>
        <p className="text-muted-foreground">
          Liste over alle faddere og faddersjefer
        </p>
      </div>
      {isLoading ? (
        <TableSkeleton columnCount={3} />
      ) : (
        data && <DataTable columns={columns} data={data} showActions={true} />
      )}
    </DashboardLayout>
  );
};

export default Studentlist;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login', // Redirect to login page
        permanent: false,
      },
    };
  }

  // If the user is authenticated, return the props
  return { props: {} };
}
