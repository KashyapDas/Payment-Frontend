import React from "react";
import { NavLink } from "react-router-dom";

const inputClass =
  "w-full rounded-md border border-black/20 px-3 py-2 text-sm text-black placeholder-neutral-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/20";

export default function Signin() {
  return (
    <div className="flex min-h-dvh flex-col bg-white text-black">
      {/* Navbar */}
      <header className="border-b border-black/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="text-lg font-bold tracking-tight">
            PayNest
          </a>
          <NavLink
            to="/signup"
            className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white hover:text-black hover:ring-1 hover:ring-black"
          >
            Create Account
          </NavLink>
        </nav>
      </header>

      {/* Form section */}
      <main className="flex flex-1 items-center justify-center px-4 py-6 sm:px-6">
        <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
              Sign in to your PayNest account.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="you@example.com"
                className={inputClass}
              />
              <p className="h-4 pt-0.5 text-xs font-medium leading-none text-black" />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <a
                  href="#forgot"
                  className="text-xs font-medium text-neutral-600 underline underline-offset-4 hover:text-black"
                >
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="text"
                placeholder="Enter your password"
                className={inputClass}
              />
              <p className="h-4 pt-0.5 text-xs font-medium leading-none text-black" />
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full cursor-pointer rounded-md bg-black px-6 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-black hover:ring-1 hover:ring-black"
            >
              Sign In
            </button>

            <p className="text-center text-xs text-neutral-700 sm:text-sm">
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Create one
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