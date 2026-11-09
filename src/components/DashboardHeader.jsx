import React from "react";

function DashboardHeader({
  name = "there",
  title = "Dashboard",
  subtitle = "Here's an overview of your account activity.",
  actions = null,
  className = "",
}) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <header
      className={`w-full  bg-white ${className}`}
    >
      <div className=" flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        {/* Left: greeting and title */}
        <div className="min-w-0">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
            {today}
          </span>

          <p className="mt-4 text-sm font-medium text-neutral-500 sm:text-base">
            {greeting}, <span className="text-black">{name}</span>
          </p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-black sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;