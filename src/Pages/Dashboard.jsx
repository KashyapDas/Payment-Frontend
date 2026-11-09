import { useLocation } from "react-router-dom";


const Dashboard = () => {

  const location = useLocation();
  const username = location.state?.username;
  
  return (
    <div className="p-2 mt-2">
      {/* dashboard greetings */}
       <div className="space-y-1 px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-black sm:text-4xl">
          Welcome back, {username}
        </h1>
        <h3 className="text-xs font-medium text-neutral-600 lg:text-md">
          Here's what's happening with your account today.
        </h3>
      </div>

      {/* search bar */}



    </div>
  )
}

export default Dashboard
