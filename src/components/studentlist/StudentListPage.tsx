import { useEffect, useState } from "react";
import { collection, onSnapshot} from "firebase/firestore";
import { db } from "../../../firebase";
import { columns, DataTable, Authorized } from "./StudentData";

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
      <>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
        Here&apos;s a list of your tasks for this month!
        </p>
          </div>
      <div className="py-10">
        <DataTable columns={columns} data={data}  />
      </div>
      </>
    );
  }
