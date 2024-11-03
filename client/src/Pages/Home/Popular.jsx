// Updated Popular.jsx
import React, { useState, useEffect } from "react";
import { Users, Clock } from "lucide-react";
import kerala from "../../assets/AIKerala.webp";

function Popular() {
  const [packages, setPackages] = useState({
    firstRow: [],
    secondRow: [],
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          // Fetch recommended packages for logged-in users
          const response = await fetch("http://localhost:5000/api/recommendations", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (data.recommendations) {
            const midpoint = Math.ceil(data.recommendations.length / 2);
            setPackages({
              firstRow: data.recommendations.slice(0, midpoint),
              secondRow: data.recommendations.slice(midpoint),
            });
            return;
          }
        }

        // Fetch regular packages for non-logged in users
        const response = await fetch("http://localhost:5000/api/packages");
        const data = await response.json();
        
        if (data.status === "success") {
          setPackages(data.packages);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const PackageCard = ({ pkg }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="flex-none w-[250px] relative transition-all duration-300 hover:scale-105 h-[22rem] rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />

        <div
          className={`absolute bottom-0 w-full bg-black bg-opacity-75 text-white transition-all duration-300 ${
            isHovered ? "h-[55%]" : "h-16"
          }`}
        >
          <h3 className="text-md font-semibold text-center py-2 px-2">{pkg.name}</h3>

          <div
            className={`px-4 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mt-1 space-y-1">
              <div className="text-sm font-bold">
                {pkg.price}
                <span className="text-sm font-normal">/ Per Person</span>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center space-x-2">
                  <Clock size={20} />
                  <span>{pkg.duration}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>{pkg.groupSize}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">📍 {pkg.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* Categories Section */}
      <div className="relative top-[50%] transform -translate-y-1/2 flex h-15 max-w-[60rem] justify-center items-center bg-gray-50 rounded-full px-8 py-2 shadow-md">
        <ul className="flex flex-row space-x-24 justify-center items-center w-full">
          {["Honeymoon", "Pilgrimage", "Adventure", "Group", "Leisure"].map((category) => (
            <li key={category} className="flex flex-row justify-center items-center space-x-2">
              <img 
                src={kerala}
                alt={category}
                className="rounded-full h-[3rem] w-[3rem]" 
              />
              <h2>{category}</h2>
            </li>
          ))}
        </ul>
      </div>

      {/* Packages Section */}
      <div className="container mx-auto py-10">
        <h2 className="text-4xl font-bold text-center mb-8">
          {localStorage.getItem("accessToken") ? (
            <>Recommended <span className="text-orange-500">Packages</span></>
          ) : (
            <>Popular <span className="text-orange-500">Packages</span></>
          )}
        </h2>

        {packages.firstRow && packages.firstRow.length > 0 && (
          <>
            {/* First Row */}
            <div className="mb-8 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-6 px-4 min-w-full">
                {packages.firstRow.map((pkg, index) => (
                  <PackageCard key={index} pkg={pkg} />
                ))}
              </div>
            </div>

            {/* Second Row */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-6 px-4 min-w-full">
                {packages.secondRow.map((pkg, index) => (
                  <PackageCard key={index} pkg={pkg} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Popular;