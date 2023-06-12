import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";


const AddAuthorized = () => {
    const [email, setEmail] = useState('');
  
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
  
      const handleAddEmail = async () => {
        try {
          // Check if the email already exists in the collection
          const querySnapshot = await getDocs(query(collection(db, 'allowedEmails'), where('email', '==', email)));
      
          if (querySnapshot.empty) {
            // Email doesn't exist, add it to the collection
            const docRef = await addDoc(collection(db, 'allowedEmails'), { email });
            setEmail('');
            console.log('Email added with ID: ', docRef.id);
          } else {
            setEmail('');
            console.log('Email already exists.');
          }
        } catch (error) {
          console.error('Error adding email:', error);
        }
      };
  
    return (
      <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <h2>Add Authorized Email</h2>
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
          />
          <button onClick={handleAddEmail}>Add Email</button>
        </div>
      </div>
    );
  };
  
  export default AddAuthorized;
