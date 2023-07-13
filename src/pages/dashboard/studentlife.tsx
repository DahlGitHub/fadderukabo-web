import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { TableSkeleton } from '@/components/TableSkeleton';
import { DataTable, Life, columns } from '@/components/life/LifeData';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { getSession } from 'next-auth/react';

const Studentlife = () => {
  const [data, setData] = useState<Life[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'lifedata'), snapshot => {
      const newData = snapshot.docs.map(
        doc =>
          ({
            docId: doc.id,
            ...doc.data(),
          } as Life),
      );

      setData(newData);
      setIsLoading(false);
    });

    // Detach the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <DashboardLayout>
      <div className="pb-5">
        <h2 className="text-2xl font-bold tracking-tight">Life</h2>
        <p className="text-muted-foreground">
          List of people in need of medical assistance
        </p>
      </div>
      {isLoading ? (
        <TableSkeleton columnCount={5} />
      ) : (
        data && <DataTable columns={columns} data={data} />
      )}
    </DashboardLayout>
  );
};

export default Studentlife;