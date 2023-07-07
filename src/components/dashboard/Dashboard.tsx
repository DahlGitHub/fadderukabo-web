import { auth } from '../../../firebase';


const Dashboard = () => {
  const username = auth.currentUser?.displayName;

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <div>
        Welcome {username} !
        The dashboard is still in development. <span className='text-4xl'>Also Nati sucks.</span>
      </div>
    </div>
  );
};

export default Dashboard;
