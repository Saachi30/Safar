import React, { useState } from "react";
import { Link } from "react-router-dom";
import safarLogo from "../../assets/safarLogo.png";
import AuthDialog from "../Home/AuthDialog"; 
import Profile from "../Home/Profile";

function Navbar() {
  const [menu, setMenu] = useState("home");
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [profileOpen, setProfileOpen] = useState(false); // Track profile dropdown state
  
  const handleClickOpen = () => {
    setOpen(true);
    document.body.classList.add('blur-background'); // Add blur to background
  };

  const handleLoginClose = () => {
    setOpen(false);
    document.body.classList.remove('blur-background'); // Remove blur from background
  };
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleLoginClose();
  };

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
  };


  return (
    <div className="flex items-center justify-between p-4 shadow-md">
      <div>
        <img src={safarLogo} alt="Logo" className="h-10" />
      </div>
      <ul className="flex space-x-8">
        <li onClick={() => setMenu("home")}>
          <Link
            to="/"
            className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${menu === "home" ? "text-orange-500" : ""}`}
          >
            Home
          </Link>
          {menu === "home" && <hr className="border-orange-500" />}
        </li>
        <li onClick={() => setMenu("about")}>
          <Link
            to="/"
            className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${menu === "about" ? "text-orange-500" : ""}`}
          >
            About
          </Link>
          {menu === "about" && <hr className="border-orange-500" />}
        </li>
        <li onClick={() => setMenu("packages")}>
          <Link
            to="/"
            className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${menu === "packages" ? "text-orange-500" : ""}`}
          >
            Packages
          </Link>
          {menu === "packages" && <hr className="border-orange-500" />}
        </li>
        <li onClick={() => setMenu("contact")}>
          <Link
            to="/"
            className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${menu === "contact" ? "text-orange-500" : ""}`}
          >
            Contact
          </Link>
          {menu === "contact" && <hr className="border-orange-500" />}
        </li>
      </ul>
      
      {/* // before profile change walaa <div className="flex items-center space-x-4">
        <button
          onClick={handleClickOpen}
          className="px-5 py-1 bg-gray-100 border-2 rounded shadow-xl border-slate-700 hover:bg-orange-500 hover:text-white hover:border-slate-600"
        >
          Log In / Sign Up
        </button> */}

        
        {/* <AuthDialog open={open} handleClose={handleLoginClose} /> */}
        <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 448 512"
              stroke="black"
              strokeWidth={1.5}
              className="w-6 h-6 text-black hover:text-orange-500 hover:cursor-pointer"
              onClick={handleProfileClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"
              />
            </svg>
            {profileOpen && <Profile />}
          </div>
        ) : (
          <button
            onClick={handleClickOpen}
            className="px-5 py-1 bg-gray-100 border-2 rounded shadow-xl border-slate-700 hover:bg-orange-500 hover:text-white hover:border-slate-600"
          >
            Log In / Sign Up
          </button>
        )}
          </div>
      {/* AuthDialog component */}
        <AuthDialog open={open} handleClose={handleLoginClose} onLoginSuccess={handleLoginSuccess} />
      </div>
    
  );
}

export default Navbar;


//purana wala seperate login, sign in 

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import safarLogo from "../../assets/safarLogo.png";
// import Login from "../Home/Login";
// import SignupDialog from "../Home/SignupDialog";
// import AuthDialog from "../Home/AuthDialog"; 

// function Navbar() {
//   const [menu, setMenu] = useState("home");
//   const [open, setOpen] = useState(false); // State for login dialog
//  // const [openS, setOpenS] = useState(false); // State for signup dialog

//   // const handleOpen = () => {
    
//   //   setOpenS(true);
//   // };

//   // const handleClose = () => {
//   //   setOpenS(false);
    
//   // };

//   const handleClickOpen = () => {
    
//     setOpen(true);
//     document.body.classList.add('blur-background'); // Add blur to background
//   };

//   const handleLoginClose = () => {
//     setOpen(false);
//     document.body.classList.remove('blur-background'); // Remove blur from background
    
//   };

//   return (
//     <div className="flex items-center justify-between p-4 shadow-md">
//       <div>
//         <img src={safarLogo} alt="Logo" className="h-10" />
//       </div>
//       <ul className="flex space-x-8">
//         <li onClick={() => setMenu("home")}>
//           <Link
//             to="/"
//             className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${menu === "home" ? "text-orange-500" : ""}`}
//           >
//             Home
//           </Link>
//           {menu === "home" && <hr className="border-orange-500" />}
//         </li>
//         <li onClick={() => setMenu("about")}>
//           <Link
//             to="/"
//             className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${menu === "about" ? "text-orange-500" : ""}`}
//           >
//             About
//           </Link>
//           {menu === "about" && <hr className="border-orange-500" />}
//         </li>
//         <li onClick={() => setMenu("packages")}>
//           <Link
//             to="/"
//             className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${menu === "packages" ? "text-orange-500" : ""}`}
//           >
//             Packages
//           </Link>
//           {menu === "packages" && <hr className="border-orange-500" />}
//         </li>
//         <li onClick={() => setMenu("contact")}>
//           <Link
//             to="/"
//             className={`relative text-black hover:text-orange-500 hover:cursor-pointer font-medium ${menu === "contact" ? "text-orange-500" : ""}`}
//           >
//             Contact
//           </Link>
//           {menu === "contact" && <hr className="border-orange-500" />}
//         </li>
//       </ul>

//       {/* <div className="flex items-center space-x-4">
//         <button onClick={handleClickOpen} className="px-5 py-1 bg-gray-100 border-2 rounded shadow-xl border-slate-700 hover:bg-orange-500 hover:text-white hover:border-slate-600">
//           Log In
//         </button>
//         <Login open={open} handleClose={handleLoginClose} />
        
//         <button onClick={handleOpen} className="px-5 py-1 bg-gray-100 border-2 rounded shadow-xl border-slate-700 hover:bg-orange-500 hover:text-white hover:border-slate-600">
//           Sign Up
//         </button>
//         <SignupDialog open={openS} handleClose={handleClose} />
//       </div> */}
//       <div className="flex items-center space-x-4">
//         {/* Single Button for Login/Sign Up */}
        
        
//         <button
//           onClick={handleClickOpen}
//           className="px-5 py-1 bg-gray-100 border-2 rounded shadow-xl border-slate-700 hover:bg-orange-500 hover:text-white hover:border-slate-600"
//         >
//           Log In / Sign Up
//         </button>

//         {/* AuthDialog component */}
//         <AuthDialog open={open} handleClose={handleLoginClose} />
//       </div>
//     </div>
//   );
// }

// export default Navbar;
