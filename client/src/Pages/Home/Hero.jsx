import React from "react";
import kerala from ".././../assets/AIKerala.webp";
import { Link } from "react-router-dom";

function Hero() {




  return (
    <div className="flex justify-center relative w-full h-[500px]">
      <img
        className="w-full h-[500px] object-fit brightness-75 opacity-90"
        src={kerala}
        alt="Landing Page Kerala"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-4">Safar begins here.....</h1>
        <div className="flex items-center bg-white rounded-full w-[400px] pl-4 shadow-lg mb-4">
          <input
            type="text"
            placeholder="Enter Your Dream Destination"
            className="flex-grow outline-none text-gray-700"
          />
          <button className="bg-orange-500 text-white px-4 py-2 rounded-full">
            Search
          </button>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <button className="bg-gradient-to-r from-orange-500 to-gray-700 text-white font-bold px-6 py-2 rounded-full shadow-lg">
          <Link 
          to="travelpref"
          >Create trip with AI ✨</Link>
        </button>
      </div>
      
    

    </div>
  );
}

export default Hero;
