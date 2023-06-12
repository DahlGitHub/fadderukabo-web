
import { useState, useEffect } from "react";
import { columns, DataTable, Authorized } from "./StudentData";


function Page() {
    const [data, setData] = useState<Authorized[]>([]);
  
    useEffect(() => {
      async function fetchData() {
        const result = await getData();
        setData(result);
      }
      fetchData();
    }, []);
  
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    );
  }
  
  async function getData(): Promise<Authorized[]> {
    return [
      {
        id: "233138",
        status: "fadder",
        name: "John Doe",
        group: "Dataingeniør",
      },
    ];
  }
  
  export default Page;