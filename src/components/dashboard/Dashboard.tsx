import { auth } from "../../../firebase";
import { Button } from "../ui/button";

const Dashboard = () => {

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <div>
        Welcome {auth.currentUser?.displayName}!
        <div>
          <Button onClick={() => auth.signOut()}>Sign out</Button>
        </div>
        The dashboard is still in development.
      </div>
    </div>
  );
};

export default Dashboard;
