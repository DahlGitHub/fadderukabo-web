import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { TableSkeleton } from '@/components/TableSkeleton';
import { DataTable, Program, columns } from '@/components/program/ProgramData';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { useRouter } from 'next/router';

const Program = () => {
  const [data, setData] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'programdata'), snapshot => {
      const newData = snapshot.docs.map(
        doc =>
          ({
            docId: doc.id,
            ...doc.data(),
          } as Program),
      );

      setData(newData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <DashboardLayout>
      <div className="pb-5">
        <h2 className="text-2xl font-bold tracking-tight">Program</h2>
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

export default Program;
