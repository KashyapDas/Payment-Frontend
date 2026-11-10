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

  const [transactionHistory, settransactionHistory] = useState([]);

  const showBalanceDisplay = useRef();
  const [balanceDetails,setbalanceDetails] = useState([]);

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
    
    async function fetchTransaction(){
      try{
        const response = await axios.post("http://localhost:3000/api/v1/account/transaction-history",{},{withCredentials : true});

        if(response.status === 200){
           settransactionHistory(()=>response.data.result);
        }

      }catch(err){
        navigate("/error");
      }
    }
    fetchTransaction();
    
  },[]);
  
  // remove the show balance display
  const removeBalanceDsiplay = ()=>{
    showBalanceDisplay.current.style.display = "none"; 
  }

  // show the balance in the dashboard
  const addBalanceDisplay = async ()=>{
    const result = await axios.post("http://localhost:3000/api/v1/account/show-balance",{},{withCredentials : true});
    setbalanceDetails(result.data.result[0]);
    showBalanceDisplay.current.style.display = "flex"; 
  }

  return (
    <div className="p-2 mt-2 relative">
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

      {/* Check balance */}
      <div className="w-full flex items-center justify-center mt-4">
        <div className="w-full lg:w-1/2 flex flex-col items-center  rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Your Account
          </p>
          <h3 className="mt-1 text-lg font-bold text-black sm:text-xl">
            Available Balance
          </h3>
          <p className="mt-2 text-sm text-neutral-600 text-center ">
            Check your current balance anytime. Your funds are updated after every transfer.
          </p>

          <button
          onClick={addBalanceDisplay}
            type="button"
            className="w-fit mt-5 rounded-md bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black hover:ring-1 hover:ring-black"
          >
            Check Balance
          </button>

          <p className="mt-3 text-center text-xs text-neutral-500">
            Need help? Contact support any time.
          </p>
        </div>
      </div>

    {/* Show balance */}
     <div ref={showBalanceDisplay} className="fixed inset-0 hidden items-center justify-center bg-black/30">
      <div className="relative w-[90%] max-w-sm rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
        <button
          onClick={removeBalanceDsiplay}
          type="button"
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
        >
          ×
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
            {username[0].toUpperCase()}
          </div>
          <div>
            <p className="text-xs text-neutral-500">Account of</p>
            <p className="text-base font-semibold text-black">{username}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-neutral-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            Current Balance
          </p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight text-black">
            {balanceDetails.balance}
          </p>
        </div>
      </div>
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
        

        {transactionHistory.length === 0 ? "No transaction is done" : transactionHistory.map((elem,index)=><div
  key={elem._id}
  className="flex items-center justify-between gap-3 px-4 py-3.5 transition hover:bg-neutral-50 sm:grid sm:grid-cols-3 sm:px-6 sm:py-4"
>
  {/* Left: avatar + name + date */}
  <div className="flex min-w-0 items-center gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
      {elem.toAccount.username[0].toUpperCase()}
    </div>
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-black sm:text-base">
        {elem.toAccount.username}
      </p>
    </div>
  </div>

  {/* Badge: hidden on mobile, shown in the middle column on larger screens */}
  <span className="hidden sm:block sm:text-center">
    <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
      Sent
    </span>
  </span>

  {/* Right: amount */}
  <div className="shrink-0 text-right">
    <p className="text-sm font-bold text-red-600 sm:text-base">
      - Rs {elem.balanceTransfer}
    </p>
    <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700 sm:hidden">
      Sent
    </span>
  </div>
</div>)}


        

        
      </div>
    </section>

    </div>
  )
}

export default Dashboard
