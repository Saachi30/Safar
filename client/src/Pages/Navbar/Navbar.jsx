import React, { useState } from "react";
import { Link } from "react-router-dom";
import safarLogo from "../../assets/safarLogo.png";

function Navbar() {
  const [menu, setMenu] = useState("home");
  return (
    <div className="flex justify-between items-center p-4 shadow-md">
      <div>
        <img src={safarLogo} alt="Logo" className="h-10" />
      </div>
      <ul className="flex space-x-8">
        <li
          onClick={() => {
            setMenu("home");
          }}
        >
          <Link
            to="/"
            className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${
              menu === "home" ? "text-orange-500" : ""
            }`}
          >
            Home
          </Link>
          {menu === "home" ? <hr className="border-orange-500" /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("about");
          }}
        >
          <Link
            to="/"
            className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${
              menu === "About" ? "text-orange-500" : ""
            }`}
          >
            About
          </Link>
          {menu === "about" ? <hr className="border-orange-500" /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("packages");
          }}
        >
          <Link
            to="/"
            className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${
              menu === "packages" ? "text-orange-500" : ""
            }`}
          >
            Packages
          </Link>
          {menu === "packages" ? <hr className="border-orange-500" /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("contact");
          }}
        >
          <Link
            to="/"
            className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${
              menu === "contact" ? "text-orange-500" : ""
            }`}
          >
            Contact
          </Link>
          {menu === "contact" ? <hr className="border-orange-500" /> : <></>}
        </li>
      </ul>

      <div className="flex space-x-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 448 512"
          stroke="black"
          strokeWidth={1.5}
          className="w-6 h-6 text-black hover:text-orange-500 hover:cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 448 512"
          stroke="black"
          strokeWidth={1.5}
          className="w-6 h-6 text-black hover:text-orange-500 hover:cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Navbar;
