import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Dashboard = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  const searchInput = useRef("");
  const [searchData, setSearchData] = useState([]);
  const debounceTimer = useRef(null);

  const [transactionHistory, settransactionHistory] = useState(false);

  const handleSearch = async (inputVal)=>{
    try{
      // get the input value
      const getBulkData = await axios.get("http://localhost:3000/api/v1/user/bulk",{
        params : {filter : inputVal},
        withCredentials : true
      });
      setSearchData(()=>getBulkData.data.user);
    }catch(error){
        navigate("/error")
    }
  }
  // done debouncing
  const onSearchChange = () => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      await handleSearch(searchInput.current.value.trim());
    }, 500);
  };
  
  const navigateToPayNow = (clientId, clientUsername)=>{
    navigate("/sendmoney", { state: { info : {
      id : clientId,
      username : clientUsername,
      ownUsername : username
    } } });
  }

  useEffect(()=>{
    console.log("transaction history");
  },[]);
  
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
      <div className="w-full flex flex-col items-center justify-center relative p-2 h-fit">
          <input ref={searchInput} onChange={onSearchChange} type="text" placeholder="search by username" className="border border-black p-2 w-full lg:w-1/2 font-semibold rounded-[7px]" />

          {searchData.length != 0 ? <div className="w-full lg:w-1/2 absolute top-15 left-1/2 translate-x-[-50%]  min-h-[5vh] flex flex-col items-center justify-center gap-y-3">
              {searchData.map((elem, index)=><li key={elem._id} className="list-none border border-black w-full flex items-center justify-between p-2 bg-[#E5E5E5] rounded-[7px]">
                <span>{elem.username}</span>
                <button onClick={()=>navigateToPayNow(elem._id, elem.username)} className="bg-black text-white font-sm p-2 rounded-[7px] cursor-pointer">Pay Now</button>
              </li>)}
          </div> : ""}

      </div>


      {/* want to see the history */}
    <section className="w-full px-4 py-6 sm:px-6">
      <h2 className="mb-4 text-xl font-bold tracking-tight text-black sm:text-2xl">
        Transaction History
      </h2>

      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
        {/* Header row */}
        <div className="grid grid-cols-3 border-b border-black/10 bg-neutral-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-600 sm:px-6">
          <span>Name</span>
          <span className="text-center">Type</span>
          <span className="text-right">Amount</span>
        </div>

        {/* Row */}
        <div className="grid grid-cols-3 items-center border-b border-black/5 px-4 py-4 text-sm sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
              K
            </div>
            <div>
              <p className="font-semibold text-black">Kevin</p>
              <p className="text-xs text-neutral-500">10 Nov 2026</p>
            </div>
          </div>
          <span className="text-center">
            <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
              Sent
            </span>
          </span>
          <span className="text-right font-semibold text-red-600">- Rs 500</span>
        </div>

        <div className="grid grid-cols-3 items-center px-4 py-4 text-sm sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
              A
            </div>
            <div>
              <p className="font-semibold text-black">Ankit</p>
              <p className="text-xs text-neutral-500">09 Nov 2026</p>
            </div>
          </div>
          <span className="text-center">
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
              Received
            </span>
          </span>
          <span className="text-right font-semibold text-green-600">+ Rs 1,200</span>
        </div>
      </div>
    </section>

    </div>
  )
}

export default Dashboard
