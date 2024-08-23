import React from "react";
import kerala from ".././../assets/AIKerala.webp";

function Hero() {
  return (
    <div className="relative w-full h-[500px]">
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
        <button className="bg-gradient-to-r from-orange-500 to-gray-700 px-6 py-2 rounded-full shadow-lg">
          Create trip with AI ✨
        </button>
      </div>
      <div className="absolute h-20 justify-center items-center bg-gray-50 rounded-full px-10 py-2 shadow-md">
            <ul className="flex flex-row space-x-24 justify-center items-center">
                <li className="flex flex-row justify-center items-center space-x-2">
                    <img 
                    className="rounded-full h-[3rem] w-[3rem]"
                    src={kerala} alt=""/>
                    <h2>Honeymoon</h2>
                </li>
                <li className="flex flex-row justify-center items-center space-x-2">
                    <img 
                    className="rounded-full h-[3rem] w-[3rem]"
                    src={kerala} alt=""/>
                    <h2>Pilgrimage</h2>
                </li>
                <li className="flex flex-row justify-center items-center space-x-2">
                    <img 
                    className="rounded-full h-[3rem] w-[3rem]"
                    src={kerala} alt=""/>
                    <h2>Adventure</h2>
                </li>
                <li className="flex flex-row justify-center items-center space-x-2">
                    <img 
                    className="rounded-full h-[3rem] w-[3rem]"
                    src={kerala} alt=""/>
                    <h2>Group</h2>
                </li>
                <li className="flex flex-row justify-center items-center space-x-2">
                    <img 
                    className="rounded-full h-[3rem] w-[3rem]"
                    src={kerala} alt=""/>
                    <h2>Leisure</h2>
                </li>
            </ul>
      </div>
    </div>
  );
}

export default Hero;
