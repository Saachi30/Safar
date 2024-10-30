import React from "react";
import kerala from ".././../assets/AIKerala.webp";
import { Link } from "react-router-dom";
import { useState } from "react";

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        await fetch('http://localhost:5000/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            destination: searchQuery
          })
        });
      } catch (error) {
        console.error('Error recording search:', error);
      }
    }
  };

  return (
    <div className="flex justify-center relative w-full h-[500px]">
      <img
        className="w-full h-[500px] object-fit brightness-75 opacity-90"
        src={kerala}
        alt="Landing Page Kerala"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="mb-4 text-4xl font-bold">Safar begins here.....</h1>
        <div className="flex items-center bg-white rounded-full w-[400px] pl-4 shadow-lg mb-4">
          <input
            type="text"
            placeholder="Enter Your Dream Destination"
            className="flex-grow text-gray-700 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-4 py-2 text-white bg-orange-500 rounded-full">
            Search
          </button>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <button className="sticky top-0 px-6 py-2 font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-orange-500 to-gray-700">
          <Link 
          to="travelpref"
          >Create trip with AI ✨</Link>
        </button>
      </div>
      
    

    </div>
  );
}

export default Hero;
