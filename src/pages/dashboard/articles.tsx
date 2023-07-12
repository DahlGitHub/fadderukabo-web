import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { TableSkeleton } from '@/components/TableSkeleton';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { DataTable, columns, Article } from '@/components/articles/ArticleData';
import { getSession } from 'next-auth/react';

const Article = () => {
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'articledata'), snapshot => {
      const newData = snapshot.docs.map(
        doc =>
          ({
            docId: doc.id,
            ...doc.data(),
          } as Article),
      );

      setData(newData);
      setIsLoading(false);
    });

    // Detach the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <DashboardLayout>
      <div className="pb-5">
        <h2 className="text-2xl font-bold tracking-tight">Article</h2>
        <p className="text-muted-foreground">
          List of people in need of medical assistance
        </p>
      </div>
      {isLoading ? (
        <TableSkeleton columnCount={2} />
      ) : (
        data && <DataTable columns={columns} data={data} />
      )}
    </DashboardLayout>
  );
};

export default Article;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login", // Redirect to login page
        permanent: false,
      },
    };
  }

  // If the user is authenticated, return the props
  return { props: {} };
}