import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const Authorized = () => {

    const [allowedEmails, setAllowedEmails] = useState<string[]>([]);

    useEffect(() => {
      const fetchAllowedEmails = async () => {
        const querySnapshot = await getDocs(collection(db, "allowedEmails"));
        const emails = querySnapshot.docs.map((doc) => doc.data().email);
        setAllowedEmails(emails);
      };
  
      fetchAllowedEmails();
    }, []);

    return(
        <div>
            <h2>Add listed emails here</h2>
            <ul className="text-[500px]">
            {allowedEmails.map((email) => (
            <li key={email}>{email}</li>
            ))}
            </ul>
        </div>
    )
}

export default Authorized