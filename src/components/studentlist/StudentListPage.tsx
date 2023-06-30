import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { columns, DataTable, Authorized } from "./StudentData";
import ImportStudent from "./ImportStudent";


export default function StudentListPage() {
  
  const [data, setData] = useState<Authorized[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'studentdata'), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }) as Authorized);
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
