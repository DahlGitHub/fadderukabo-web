import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { columns, DataTable, Faq } from './FaqData';
import AddFaq from './AddFaq';

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
    <div className="container mx-auto py-10">
        <AddFaq />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
