import { useEffect, useState } from "react";
import { collection, getDocs, where, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { columns, DataTable, Authorized } from "./AuthorizedData";
import AddAuthorized from "../AddAuthorized";

export default function Page() {
    const [users, setUsers] = useState<Authorized[]>([]);
    const [allowedEmails, setAllowedEmails] = useState<string[]>([]);
  

    useEffect(() => {
      const fetchUsers = async (emails: string[]) => {
        const usersSnapshot = await getDocs(query(collection(db, "users"), where("email", "in", emails)));
        const usersData = usersSnapshot.docs.map((doc) => doc.data() as Authorized);
        setUsers(usersData);
      };
  
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "allowedEmails"));
          const allowedEmailsData = querySnapshot.docs.map((doc) => doc.data().email);
          setAllowedEmails(allowedEmailsData);
          await fetchUsers(allowedEmailsData);
  
          const unsubscribe = onSnapshot(collection(db, "allowedEmails"), (snapshot) => {
            const updatedEmails = snapshot.docs.map((doc) => doc.data().email);
            setAllowedEmails(updatedEmails);
            fetchUsers(updatedEmails);
          });
  
          return () => {
            unsubscribe();
          };
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);

    // Map all emails in allowedEmails and check if each exists in users
const listedEmails = allowedEmails.map((email) => {
  const user = users.find((user) => user.email === email);
  if (user) {
    return user; // Display the user data if it exists
  } else {
    return {
      id: email,
      photoURL: "https://www.gstatic.com/identity/boq/profilepicturepicker/photo_silhouette_e02a5f5deb3ffc173119a01bc9575490.png",
      displayName: "Invalid name",
      email: email,
      created: 9999999999999999,
      signedIn: 9999999999999999,
    };
  }
});


  return (
    <div className="container mx-auto py-10">
        <AddAuthorized />
        <DataTable columns={columns} data={listedEmails} />
    </div>
  );
}