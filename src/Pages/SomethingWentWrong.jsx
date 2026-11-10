import { useNavigate } from "react-router-dom";

function SomethingWentWrong({ message = "Something went wrong" }) {

  const navigate = useNavigate();


  return (
    <div className="flex flex-col min-h-dvh items-center justify-center bg-white px-4 text-black">
      <div className="w-full max-w-sm rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white">
          !
        </div>
        <h2 className="mt-4 text-xl font-bold text-red-700">Oops!</h2>
        <p className="mt-2 text-sm text-neutral-700">{message}</p>
        
      </div>
      <p onClick={()=>navigate("/dashboard")} className="mt-5 text-sm bg-black text-white inline p-2 rounded-[7px] cursor-pointer">Go Home</p>
    </div>
  );
}


export default SomethingWentWrong;