import axios from "axios";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SendMoney() {

  const location = useLocation();
  const navigate = useNavigate();
  const info = location.state?.info;

  const amount = useRef(null);

  const [isMoney, setisMoney] = useState(true);

  const [moneyTransferSuccessfully, setmoneyTransferSuccessfully] = useState(false);

  const transferMoney = async ()=>{
    try{
      const moneyTransfer = await axios.post("http://localhost:3000/api/v1/account/money-transaction",{
          toAccount : info.id,
          amount : Number(amount.current.value)
      },{withCredentials : true}) 

      if(moneyTransfer.status === 200){
        setmoneyTransferSuccessfully(true);
        setTimeout(()=>{
          navigate("/dashboard", {state : {username : info.ownUsername}});
        },1000)
      }
      else if(moneyTransfer.status === 201){
        setisMoney(()=>false);
      }
    }catch(error){
      if(error.response){
        switch(error.response.status){
          case 400 : 
            navigate("/error");
            break;
          case 500 :
            navigate("/error");
            break;
          default : 
            navigate("/error");
        }
      }
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-white px-4 text-black relative">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 p-6 shadow-sm">
        <h2 className="text-center text-2xl font-bold">Send Money</h2>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
            {info.username[0].toUpperCase()}
          </div>
          <p className="text-lg font-semibold">{info.username}</p>
        </div>

        <div className="mt-6">
          <label htmlFor="amount" className="mb-1 block text-sm font-medium">
            Amount (in Rs)
          </label>
          <input
            ref={amount}
            id="amount"
            type="number"
            min="1"
            placeholder="Enter amount"
            className="w-full rounded-md border border-black/20 px-3 py-2 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/20"
          />
        </div>

        <button
          onClick={transferMoney}
          type="button"
          className="mt-6 w-full rounded-md bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black hover:ring-1 hover:ring-black"
        >
          Initiate Transfer
        </button>
        <p className="text-red-500 font-semibold w-full text-center mt-2">{isMoney ? "" : "Insufficient Money"}</p>
      </div>


      {/* Money Success Div */}
      {moneyTransferSuccessfully ? <div className="absolute left-1/2 top-1/2 w-full h-[50vh] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-green-200 bg-green-50 p-6 text-center shadow-lg flex flex-col items-center justify-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
        ✓
      </div>
      <h2 className="mt-4 text-xl font-bold text-green-700">Success</h2>
      <p className="mt-2 text-sm text-neutral-700">Money send to {info.username}</p>
    </div> : ""}

    </div>
  );
}