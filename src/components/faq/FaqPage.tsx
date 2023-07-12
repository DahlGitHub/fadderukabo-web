import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { columns, DataTable, Faq } from './FaqData';

export default function StudentListPage() {
  const [data, setData] = useState<Faq[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'faqdata'), snapshot => {
      const newData = snapshot.docs.map(
        doc =>
          ({
            docId: doc.id,
            ...doc.data(),
          } as Faq),
      );

      setData(newData);
    });

    // Detach the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="py-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
