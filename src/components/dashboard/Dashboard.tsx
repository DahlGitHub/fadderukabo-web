import { auth } from "../../../firebase";

const Dashboard = () => {

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <div>
        Welcome {auth.currentUser?.displayName}!
        The dashboard is still in development. <span className='text-4xl'>Also Nati sucks.</span>
      </div>
    </div>
  );
};

export default Dashboard;
