import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { columns, DataTable, Authorized } from "./StudentData";
import AddStudent from "./AddStudent";


export default function StudentListPage() {
  
  const [data, setData] = useState<Authorized[]>([]);
  const [groupOptions, setGroupOptions] = useState<string[]>([]);

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
  


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'groupdata'), (snapshot) => {
      const titles = snapshot.docs.map((doc) => doc.data().title);
      setGroupOptions(titles);
    });

    return () => unsubscribe();
  }, []);

    return (
      <div className="container mx-auto py-10">
        <AddStudent groupOptions={groupOptions} />
        <DataTable columns={columns} data={data}  />
      </div>
    );
  }
