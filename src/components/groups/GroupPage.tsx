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
import { columns, DataTable, Group } from './GroupData';
import AddGroup from './AddGroup';

export default function StudentListPage() {
  const [data, setData] = useState<Group[]>([]);

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
          }
        });

        return () => {
          unsubscribe();
        };
      });
    });
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
