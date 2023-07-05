import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { columns, DataTable, Authorized } from './StudentData';

export default function StudentListPage() {
  const [data, setData] = useState<Authorized[]>([]);

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
    });

    // Detach the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Fadderliste</h2>
          <p className="text-muted-foreground">
            Liste over alle faddere og faddersjefer
          </p>
        </div>
        <DataTable columns={columns} data={data} showActions={true} showFunctions={true} />
      </div>
    </>
  );
}
