import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import AddAuthorized from "./AddAuthorized";
import Confirmation from "./Confirmation";

const Authorized = () => {
  const [allowedEmails, setAllowedEmails] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllowedEmails = async () => {
      const querySnapshot = await getDocs(collection(db, "allowedEmails"));
      const emails = querySnapshot.docs.map((doc) => doc.data().email);
      setAllowedEmails(emails);
    };

    fetchAllowedEmails();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, "users"), where("email", "in", allowedEmails));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    };

    if (allowedEmails.length > 0) {
      fetchUsers();
    }
  }, [allowedEmails]);

  const handleDeleteEmail = async (email: string) => {
    try {
      const currentUser = auth.currentUser;

      // Check if the current user is deleting their own email
      if (currentUser && currentUser.email === email) {
        console.log("Cannot delete your own email.");
        return;
      }

      // Check if the email is a protected email that should not be deleted
      const protectedEmail = "fadderstyretbo@gmail.com";
      if (email === protectedEmail) {
        console.log(`Cannot delete the protected email: ${protectedEmail}`);
        return;
      }

      const querySnapshot = await getDocs(collection(db, "allowedEmails"));
      const docToDelete = querySnapshot.docs.find((doc) => doc.data().email === email);

      if (docToDelete) {
        await deleteDoc(doc(db, "allowedEmails", docToDelete.id));
        setAllowedEmails((prevEmails) => prevEmails.filter((e) => e !== email));
        console.log(`Email ${email} deleted successfully.`);
      }
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  const listedEmails = allowedEmails.map((email) => {
    const user = users.find((user) => user.email === email);
    if (user) {
      return {
        name: user.displayName,
        email: user.email,
        created: user.created,
        signedIn: user.signedIn,
        photoURL: user.photoURL,
      };
    } else {
      return {
        name: "",
        email: email,
        created: "",
        signedIn: "",
        photoURL: "",
      };
    }
  });

  return (
    <div>
      <AddAuthorized />
      <h2>List of Users with Allowed Emails</h2>
      {listedEmails.length > 0 ? (
        <ul className="text-sm">
          {listedEmails.map((user) => (
            <li key={user.email}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>{user.created}</p>
              <p>{user.signedIn}</p>
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <Confirmation
                onConfirm={() => handleDeleteEmail(user.email)}
                message={`Are you sure you want to delete ${user.email}?`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No emails found.</p>
      )}
    </div>
  );
};

export default Authorized;