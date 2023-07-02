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

    // Sort the data by groups in ascending order
    newData.sort((a, b) => a.group.localeCompare(b.group));

    // Sort the data by status in descending order and then by names in ascending order within each group
    newData.sort((a, b) => {
      if (a.group === b.group) {
        if (a.status === "faddersjef" && b.status !== "faddersjef") {
          return -1; // a should come before b
        }
        if (a.status !== "faddersjef" && b.status === "faddersjef") {
          return 1; // b should come before a
        }
        return a.name.localeCompare(b.name); // Sort names in ascending order
      }
      return 0;
    });

      setData(newData);
    });
  
    // Detach the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  

  const formatContentWithLinks = (content: string) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const formattedContent = content.replace(linkRegex, '<a href="$2" class="text-blue-700 underline">$1</a>');
    return formattedContent;
  };
  
  const title = "How much is a ticket";
  const content = "You can find the content [in Olav](https://www.randomurl.com) and also [here](https://www.example.com)";
  
  const formattedContent = formatContentWithLinks(content);

    return (
      <>

      <div className="py-2">
        <div className="pb-5">
        <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
          <h2 className="text-2xl font-bold tracking-tight">Student List</h2>
          <p className="text-muted-foreground">
          List of people in need of medical assistance
          </p>
        </div>
        <DataTable columns={columns} data={data}  />
      </div>
      </>
    );
  }
