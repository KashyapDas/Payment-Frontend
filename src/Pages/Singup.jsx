import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const inputClass =
  "w-full rounded-md border border-black/20 px-3 py-2 text-sm text-black placeholder-neutral-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/20";

export default function Signup() {

  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const [usernameError, setUsernameError] = useState(""); 
  const [emailError, setEmailError] = useState(""); 
  const [passwordError, setPasswordError] = useState(""); 

  const [userExits, setUserExists] = useState("");

  const navigate = useNavigate();

  // make the call to BE and check if the user exist or not
  const submitData = async (username, email, password)=>{
    try{
        const result = await axios.post(
        "http://localhost:3000/api/v1/user/signup",      // URL
        {
            username :  username,
            email : email,
            password : password
        }, {withCredentials : true});
        if(!result){
          console.log("Missmatch issue");
        }
        if(result.status === 200){
          setUserExists("");
          navigate("/dashboard", { state: { username: result.data.username } });
        }
    }catch(error){
      if(error.response){
        const {status} = error.response;
        switch (status) {
          case 409:
            setUserExists("Username or email already exists");
            break;
          case 400:
            navigate("/signup");
            break;
          case 401:
            navigate("/signup");
            break;
          case 500:
            navigate("/signup");
            break;
          default:
            navigate("/signup");
            break;
        }
      }
    }
    
  }

  const handleSignUp = async () => {
    const name = username.current.value.trim();
    const mail = email.current.value.trim();
    const pass = password.current.value;

    const newUsernameError = name === "" ? "Username is required" : "";
    const newEmailError = mail === "" ? "Email is required" : "";
    const newPasswordError = pass.trim() === "" ? "Password is required" : "";

    setUsernameError(newUsernameError);
    setEmailError(newEmailError);
    setPasswordError(newPasswordError);

    // block the request if any field has an error
    if (newUsernameError || newEmailError || newPasswordError) {
      return;
    }

    await submitData(username.current.value, email.current.value, password.current.value);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-white text-black">
      {/* Navbar */}
      <header className="border-b border-black/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="text-lg font-bold tracking-tight">
            PayNest
          </h1>
          <NavLink
            to="/signin"
            className="rounded-md border border-black px-3 py-1.5 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            Login
          </NavLink>
        </nav>
      </header>

      {/* Form section */}
      <main className="flex flex-1 items-center justify-center px-4 py-6 sm:px-6">
        <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Create your account
            </h1>
            <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
              Fill in the details below to get started.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {/* Username */}
            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-medium">
                Username
              </label>
              <input
                ref={username}
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                className={inputClass}
              />
              <p className="h-4 pt-0.5 text-xs font-medium leading-none text-red-500" >{usernameError}</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                ref={email}
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={inputClass}
              />
              <p className="h-4 pt-0.5 text-xs font-medium leading-none text-red-500">{emailError}</p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium">
                Password
              </label>
              <input
                ref={password}
                id="password"
                name="password"
                type="text"
                placeholder="At least 8 characters"
                className={inputClass}
              />
              <p className="h-4 pt-0.5 text-xs font-medium leading-none text-red-500">{passwordError}</p>
            </div>

            {/* Submit */}
            <button
              onClick={()=>handleSignUp()}
              type="button"
              className="w-full cursor-pointer rounded-md bg-black px-6 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-black hover:ring-1 hover:ring-black"
            >
              Create Account
            </button>
            <p className="text-center text-xs font-semibold sm:text-sm text-red-500">{userExits}</p>

            <p className="text-center text-xs text-neutral-700 sm:text-sm">
              Already created an account?{" "}
              <NavLink
                to="/signin"
                className="font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Go to Sign In
              </NavLink>
            </p>

            {/* Fixed-height status slot */}
            <div className="flex h-9 items-center justify-center" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-4 py-3 text-center text-xs text-neutral-600 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} PayNest. All rights reserved.
        </div>
      </footer>
    </div>
  );
}