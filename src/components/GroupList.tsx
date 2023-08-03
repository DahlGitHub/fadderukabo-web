import * as React from 'react';
import { GroupCard } from './GroupCard';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Define the shape of the group data
interface Group {
  title: string;
  hexValue: string;
  url: string;
}

export const GroupList = () => {
  // Specify the type when defining the state
  const [groupData, setGroupData] = useState<Group[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataCollection = collection(db, 'groupdata');
      const dataSnapshot = await getDocs(dataCollection);
      const docs = dataSnapshot.docs.map(doc => doc.data() as Group); // Type cast to Group

      setGroupData(docs);
    };

    fetchData();
  }, []);

  return (
    <div className='py-5'>
      <div className="font-poppins mx-auto md:max-w-3xl container flex flex-col">
        <span className="font-semibold text-2xl text-red-400">03.</span>
        <span className="text-4xl font-bold">Faddergrupper</span>
        <p className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal whitespace-pre-line">
        Faddergrupper for faddere og nye studenter ved tilhørende studier. Finner du ikke en gruppe nøyaktig rettet mot ditt studium, skal det ikke være noe problem å melde seg inn i en annen gruppe.
        </p>
      </div>
      <div className="mx-auto md:max-w-3xl grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
        {groupData.map((group, index) => (
          <GroupCard
            key={index}
            title={group.title}
            color={group.hexValue}
            url={group.url}
          />
        ))}
      </div>
    </div>
  );
};
