import { useEffect, useState } from "react";
import { collection, getDocs, where, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { columns, DataTable, Authorized } from "./AuthorizedData";
import AddAuthorized from "../AddAuthorized";

export default function Page() {
    const [users, setUsers] = useState<Authorized[]>([]);
    const [allowedEmails, setAllowedEmails] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchAllowedEmails = async () => {
        const querySnapshot = await getDocs(collection(db, "allowedEmails"));
        const emails = querySnapshot.docs.map((doc) => doc.data().email);
        setAllowedEmails(emails);
      };
  
      fetchAllowedEmails();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const q = query(collection(db, "users"), where("email", "in", allowedEmails));
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const result = querySnapshot.docs.map((doc) => doc.data() as Authorized);
            setUsers(result);
          });
  
          return () => {
            // Unsubscribe from the real-time updates when the component unmounts
            unsubscribe();
          };
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [allowedEmails]);


  return (
    <div className="container mx-auto py-10">
        <AddAuthorized />
        <DataTable columns={columns} data={users} />
    </div>
  );
}