import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import money from '../assets/money.webp';
import plan from '../assets/plan.jpg';

const Plan = () => {
  const { state: travelPlan } = useLocation();
  const navigate = useNavigate();
  const [packageImages, setPackageImages] = useState({});
  
  const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = { ...packageImages };
      
      for (let i = 0; i < travelPlan.length; i++) {
        try {
          const placeName = travelPlan[i].itinerary?.days?.[0]?.locations?.[0]?.placeName || 'travel destination';
          const response = await fetch(
            `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(placeName)}&image_type=photo&orientation=horizontal&per_page=3`
          );
          const data = await response.json();
          
          // If images found, use the first one, otherwise use a fallback
          if (data.hits && data.hits.length > 0) {
            newImages[i] = data.hits[0].webformatURL;
          } else {
            newImages[i] = "/api/placeholder/800/600";
          }
        } catch (error) {
          console.error('Error fetching image:', error);
          newImages[i] = "/api/placeholder/800/600";
        }
      }
      
      setPackageImages(newImages);
    };

    fetchImages();
  }, [travelPlan]);

  const getPlaceName = (singlePackage) => {
    try {
      return singlePackage.itinerary.days[0].locations[0].placeName || 'Exciting Destination';
    } catch (error) {
      return 'Exciting Destination';
    }
  };

  const handlePackageClick = (singlePackage) => {
    navigate('/itinerary', { state: singlePackage });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Travel Packages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {travelPlan.map((singlePackage, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => handlePackageClick(singlePackage)}
          >
            <div className="relative">
              <img
                src={packageImages[index] || "/api/placeholder/800/600"}
                alt={getPlaceName(singlePackage)}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.src = "/api/placeholder/800/600";
                }}
              />
              <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                {singlePackage.itinerary?.days?.length || 0} Days
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                Plan {index + 1}
              </h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-medium">
                  Price: {singlePackage.itinerary?.hotels?.[0]?.price || 'TBD'}
                </span>
                <img src={money} alt="Price" className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Family Package</span>
                <img src={plan} alt="Plan" className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan;