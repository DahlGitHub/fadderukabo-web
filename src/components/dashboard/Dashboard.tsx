import { useSession } from 'next-auth/react';


const Dashboard = () => {

  const session = useSession();
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <div>
        Welcome {session.data?.user?.name} !
        The dashboard is still in development. <span className='text-4xl'>Also Nati sucks.</span>
      </div>
    </div>
  );
};

export default Dashboard;
