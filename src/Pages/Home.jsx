import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <header className="border-b border-black/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="text-xl font-bold tracking-tight">
            PayNest
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <NavLink
              to="/signin"
              className="rounded-md border border-black px-3 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white sm:px-4"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black hover:ring-1 hover:ring-black sm:px-4"
            >
              Create Account
            </NavLink>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="text-center lg:text-left">
          <span className="inline-block rounded-full border border-black px-3 py-1 text-xs font-medium uppercase tracking-wider">
            Fast. Secure. Simple.
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Send, receive and manage money in seconds.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg lg:mx-0">
            PayNest makes everyday payments effortless. Pay friends, split bills,
            and track every transaction from one clean, secure dashboard.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <NavLink
              to="/signup"
              className="w-full rounded-md bg-black px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-black hover:ring-1 hover:ring-black sm:w-auto"
            >
              Create Account
            </NavLink>
            <NavLink
              to="/signin"
              className="w-full rounded-md border border-black px-6 py-3 text-center text-base font-semibold text-black transition hover:bg-black hover:text-white sm:w-auto"
            >
              Login
            </NavLink>
          </div>
          <p className="mt-4 text-sm text-neutral-600">
            No hidden fees. Set up in under 2 minutes.
          </p>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl border border-black" aria-hidden="true" />
          <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl bg-neutral-100">
            <img src="https://i.pinimg.com/1200x/49/7e/8f/497e8f6cb9f4f7efe5fe24955757e3f8.jpg" alt="image not found" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to move money
            </h2>
            <p className="mt-4 text-neutral-700">
              Built for individuals and small teams who want payments that just work.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Instant Transfers",
                text: "Send money to anyone in seconds, any time of day.",
              },
              {
                title: "Bank-Level Security",
                text: "Two-factor login and encrypted transactions keep your funds safe.",
              },
              {
                title: "Smart Tracking",
                text: "See every payment, bill and balance in one organized view.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-black"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-black text-white">
                  <span className="text-lg font-bold">{item.title.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section id="signup" className="border-t border-black/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start paying smarter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-700">
            Join thousands of people who already use PayNest every day.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <NavLink
              to="/signup"
              className="w-full rounded-md bg-black px-6 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-black hover:ring-1 hover:ring-black sm:w-auto"
            >
              Create Account
            </NavLink>
            <NavLink
              to="/signin"
              id="login"
              className="w-full rounded-md border border-black px-6 py-3 text-base font-semibold text-black transition hover:bg-black hover:text-white sm:w-auto"
            >
              Login
            </NavLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-neutral-600 sm:flex-row sm:px-6 lg:px-8">
          <span className="font-semibold text-black">PayNest</span>
          <span>© {new Date().getFullYear()} PayNest. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}


export default Home;