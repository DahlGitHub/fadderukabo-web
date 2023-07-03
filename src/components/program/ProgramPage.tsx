import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { DataTable, Program, columns } from './ProgramData';
import AddProgram from './AddProgram';

export default function ProgramPage() {
  const [data, setData] = useState<Program[]>([]);

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
    });

    // Detach the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      <AddProgram />
      <div className="py-2">
        <div className="pb-5">
          <h2 className="text-2xl font-bold tracking-tight">Program</h2>
          <p className="text-muted-foreground">
            List of people in need of medical assistance
          </p>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
