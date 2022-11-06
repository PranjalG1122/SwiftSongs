import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav
        className="flex justify-between items-center h-16 bg-white text-black fixed min-h-[75px] top-0 right-0 left-0 shadow-sm font-mono"
        role="navigation"
      >
        <a href="/" className="pl-8">
          Logo
        </a>
        <div className="px-4 cursor-pointer md:hidden">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
        <div className="pr-8 md:block hidden">
          <a href="/" className="p-4">
            Home
          </a>
          <a href="/about" className="p-4">
            About
          </a>
          <a href="/contact" className="p-4">
            Contact
          </a>
          <a href="/signin" className="p-4">
            Sign In
          </a>
        </div>
      </nav>
    </div>
  );
}
