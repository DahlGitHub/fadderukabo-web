import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { columns, DataTable, Group } from "./GroupData";
import AddGroup from "./AddGroup";


export default function StudentListPage() {
  
  const [data, setData] = useState<Group[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'groupdata'), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }) as Group);
      setData(newData);
    });
  
    // Detach the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  

    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data}  />
      </div>
    );
  }
