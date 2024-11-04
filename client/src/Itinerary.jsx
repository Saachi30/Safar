import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Clock, Phone, Mail, ChevronRight } from 'lucide-react';

const Itinerary = () => {
  const { state: travelPlan } = useLocation();
  const [locationImage, setLocationImage] = useState("/api/placeholder/800/600");
  const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

  useEffect(() => {
    const fetchLocationImage = async () => {
      try {
        const placeName = travelPlan.itinerary?.days[0]?.locations[0]?.placeName || 'travel destination';
        const response = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(placeName)}&image_type=photo&orientation=horizontal&category=travel&per_page=3`
        );
        const data = await response.json();
        
        if (data.hits && data.hits.length > 0) {
          setLocationImage(data.hits[0].largeImageURL);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchLocationImage();
  }, [travelPlan]);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 mt-10">
      {/* Header Section with Image and Sidebar */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Main Image */}
        <div className="relative w-full md:w-2/3 h-64 rounded-lg overflow-hidden">
          <img
            src={locationImage}
            alt={travelPlan.itinerary?.days[0]?.locations[0]?.placeName || 'Travel Destination'}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/api/placeholder/800/600";
            }}
          />
        </div>

        {/* Rest of the component remains the same */}
        {/* Sidebar Info */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Duration: {travelPlan.suggestedDuration}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-sm">
                Places to Visit: {travelPlan.itinerary.days.flatMap((day) => day.locations.map((loc) => loc.placeName)).join(', ')}
              </span>
            </div>

            {/* Package Includes Icons */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Package Includes</h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs">Hotel</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs">Sightseeing</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs">Transfer</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs">Meal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Box */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-medium mb-3">Need Help?</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">Call us: 011-43030303 | 4313133</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Mail us: Holidays@easemytrip.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['Overview', 'Day-wise Itinerary', 'Inclusion/Exclusion', 'Additional Info'].map((tab) => (
          <button
            key={tab}
            className="px-4 py-4 rounded-xl font-bold text-blue-950 text-sm hover:bg-orange-300 shadow-lg"
            style={{ backgroundColor: '#FF9F6B' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-white p-3 rounded-lg" style={{ backgroundColor: '#FF8D4E' }}>
          Package Overview
        </h2>
        <p className="text-gray-600">
          Experience the beauty of {travelPlan.itinerary.days[0].locations[0].placeName} with our carefully curated package. Explore pristine beaches, ancient temples, and vibrant culture across {travelPlan.suggestedDuration}.
        </p>
      </div>

      {/* Day-wise Itinerary */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 text-white p-3 rounded-t-lg" style={{ backgroundColor: '#FF8D4E' }}>
          Day-wise Itinerary
        </h2>
        {travelPlan.itinerary.days.map((dayInfo, index) => (
          <div key={index} className="border-b last:border-b-0">
            <div className="text-white p-4 rounded-t-lg flex items-center gap-4" style={{ backgroundColor: '#FF8D4E' }}>
              <div className="bg-orange-500 rounded-full p-3 h-12 w-12 flex items-center justify-center">
                <span className="font-bold">Day</span>
                <span className="font-bold ml-1">{dayInfo.day}</span>
              </div>
              <h3 className="text-lg font-medium">{dayInfo.locations.map((location) => location.placeName).join(', ')}</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-4 text-gray-600">
                {dayInfo.locations.map((location, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-gray-500" />
                    <div>
                      <h4 className="font-medium">{location.placeName}</h4>
                      <p>{location.placeDetails}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Ticket Price: {location.ticketPrice}</span>
                        <span className="text-sm text-gray-500">Time to Spend: {location.timeToSpend}</span>
                        <span className="text-sm text-gray-500">Best Time to Visit: {location.bestTimeToVisit}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Inclusion/Exclusion */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-green-800">Inclusions</h3>
          <ul className="space-y-2">
            {travelPlan.itinerary.hotels.map((hotel, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-700">
                  {hotel.hotelName} - {hotel.address}, {hotel.price} per night
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-red-800">Exclusions</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span className="text-sm text-gray-700">Any other expenses which are not mentioned at the included section</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span className="text-sm text-gray-700">Extra PCR Tests as per the airline requirement on departure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span className="text-sm text-gray-700">Entrances to the sightseeing points not included unless specifically mentioned in the itinerary</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span className="text-sm text-gray-700">Early check in or late checkout charges</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span className="text-sm text-gray-700">Usage of vehicle beyond the given route drives after 08:00 PM</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;