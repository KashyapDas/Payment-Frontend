import React, { useState } from "react";

function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search transactions, people or payments...",
  className = "",
}) {
  // Uses the parent's value if provided (controlled), otherwise keeps its own (uncontrolled)
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(currentValue.trim());
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    if (onChange) onChange("");
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`w-full p-4 ${className}`}
    >
      <div className="flex w-full items-center gap-2 rounded-2xl bg-white p-2 shadow-sm transition focus-within:border-black focus-within:shadow-md focus-within:ring-4 focus-within:ring-black/5 sm:gap-3 sm:p-2.5 border border-black">
        {/* Search icon */}
        <div className="flex shrink-0 items-center pl-2 sm:pl-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-neutral-400 sm:h-5 sm:w-5"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </div>

        {/* Input */}
        <input
          type="search"
          name="search"
          aria-label="Search"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm text-black placeholder-neutral-400 outline-none sm:py-3 sm:text-base [&::-webkit-search-cancel-button]:hidden"
        />

        {/* Clear button */}
        {currentValue && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-black/5 hover:text-black sm:h-8 sm:w-8"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-4 w-4"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}

        {/* Divider */}
        <span className="hidden h-6 w-px shrink-0 bg-black/10 sm:block" aria-hidden="true" />

        {/* Submit button */}
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black hover:ring-1 hover:ring-black sm:px-6 sm:py-3"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;