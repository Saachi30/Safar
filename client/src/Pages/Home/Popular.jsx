import React, { useState, useEffect } from "react";
import kerala from "../../assets/AIKerala.webp";
import { Users, Clock } from "lucide-react";

function Popular() {
  const [packages, setPackages] = useState({
    firstRow: [],
    secondRow: [],
  });

  const [scrapedData, setScrapedData] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        let allPackages = [];
        let recommendedPackages = [];

        // Fetch recommended packages if access token exists
        if (accessToken) {
          const response = await fetch("http://localhost:5000/api/recommendations", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (data.recommendations) {
            recommendedPackages = data.recommendations;
          }
        }

        // Fetch all packages
        const fallbackResponse = await fetch("http://localhost:5000/api/packages");
        const fallbackData = await fallbackResponse.json();

        if (fallbackData.status === "success") {
          allPackages = fallbackData.packages;
        }

        // Combine recommended packages and all packages
        const combinedPackages = [
          ...recommendedPackages,
          ...allPackages.filter((pkg) => !recommendedPackages.includes(pkg)),
        ];

        // Split into two rows
        const midpoint = Math.ceil(combinedPackages.length / 2);
        setPackages({
          firstRow: combinedPackages.slice(0, midpoint),
          secondRow: combinedPackages.slice(midpoint),
        });
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    const fetchScrapedData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/scrapedData");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data && data.status === "success") {
          setScrapedData(data.items);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching scraped data:", error);
      }
    };

    fetchPackages();
    fetchScrapedData();
  }, []);

  const PackageCard = ({ pkg }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="flex-none w-[250px] relative transition-all duration-300 hover:scale-105 h-[18rem] rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />

        <div
          className={`absolute bottom-0 w-full bg-black bg-opacity-75 text-white transition-all duration-300 ${
            isHovered ? "h-[55%]" : "h-16"
          }`}
        >
          <h3 className="text-lg font-semibold text-center py-4">{pkg.name}</h3>

          <div
            className={`px-4 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mt-1 space-y-1">
              <div className="text-sm font-bold">
                Rs. {pkg.price}
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

  const ScrapedPackageCard = ({ pkg }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="flex-none w-[250px] relative transition-all duration-300 hover:scale-105 h-[18rem] rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={pkg.image || kerala} // Using kerala image as fallback
          alt={pkg.name} 
          className="w-full h-full object-cover" 
        />

        <div
          className={`absolute bottom-0 w-full bg-black bg-opacity-75 text-white transition-all duration-300 ${
            isHovered ? "h-[55%]" : "h-16"
          }`}
        >
          <h3 className="text-lg font-semibold text-center py-4">{pkg.name}</h3>

          <div
            className={`px-4 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mt-1 space-y-1">
              <div className="text-sm font-bold">
                {pkg.price}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm">📍 {pkg.places}</span>
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
              <img className="rounded-full h-[3rem] w-[3rem]" src={kerala} alt="" />
              <h2>{category}</h2>
            </li>
          ))}
        </ul>
      </div>

      {/* Regular Packages Section */}
      <div className="container mx-auto py-10">
        <h2 className="text-4xl font-bold text-center mb-8">
          {localStorage.getItem("accessToken") ? (
            <>Recommended <span className="text-orange-500">Packages</span></>
          ) : (
            <>Our Popular <span className="text-orange-500">Packages</span></>
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

        {/* Scraped Packages Section */}
        {scrapedData && scrapedData.length > 0 && (
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-center mb-8">
              Trending <span className="text-orange-500">Holiday Packages</span>
            </h2>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-6 px-4 min-w-full">
                {scrapedData.map((pkg, index) => (
                  <ScrapedPackageCard key={index} pkg={pkg} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Popular;