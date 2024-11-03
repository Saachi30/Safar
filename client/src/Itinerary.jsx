import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const dummyData = {
  duration: "5 Nights & 6 Days",
  places: "Bali",
  phoneNumber: "011-43030303 | 4313133",
  email: "Holidays@easemytrip.com",
  overview: "Experience the beauty of Bali with our carefully curated package. Explore pristine beaches, ancient temples, and vibrant culture across 6 amazing days.",
  days: [
    {
      day: 1,
      description: "Arrive in Bali and transfer to your luxury resort. Enjoy welcome drinks and evening at leisure exploring the nearby beach area. Optional sunset viewing at Tanah Lot Temple."
    },
    {
      day: 2,
      description: "Full day Kintamani Volcano tour with traditional dance performances and local cuisine exploration. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus commodi nulla quas fuga quia reiciendis eos. Libero sit adipisci doloribus cumque nemo omnis et, unde eveniet. Quidem minus maiores maxime." 
    },
    {
        day: 3,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus commodi nulla quas fuga quia reiciendis eos. Libero sit adipisci doloribus cumque nemo omnis et, unde eveniet. Quidem minus maiores maxime."
    }
  ],
  inclusions: [
    "05 Nights accommodation at Ricata Bali Resort and Spa / Similar 4* hotel",
    "Daily breakfast (except day 01)",
    "Full Day Kintamani Volcano Tour",
    "Water Sport at Tanjung Benoa Beach (PACKAGE A) with Uluwatu Temple",
    "Tanah Lot Sunset Tour",
    "All Tours and Transfers Pvt Basis"
  ],
  exclusions: [
    "Any other expenses which are not mentioned at the included section",
    "Extra PCR Tests as per the airline requirement on departure",
    "Entrances to the sightseeing points not included unless specifically mentioned in the itinerary",
    "Early check in or late checkout charges",
    "Usage of vehicle beyond the given route drives after 08:00 PM"
  ]
};

const Itinerary = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 mt-10">
      {/* Header Section with Image and Sidebar */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Main Image */}
        <div className="relative w-full md:w-2/3 h-64 rounded-lg overflow-hidden">
          <img
            src="https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itcgrandgoa-goa/images/overview/headmast-desktop/beach-experience.png"
            alt="Bali landscape"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sidebar Info */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Duration: {dummyData.duration}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Places to Visit: {dummyData.places}</span>
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
                <span className="text-sm">Call us: {dummyData.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Mail us: {dummyData.email}</span>
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


      {/* Rest of the content remains the same */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-white p-3 rounded-lg"
            style={{backgroundColor: '#FF8D4E'}}>
          Package Overview
        </h2>
        <p className="text-gray-600">{dummyData.overview}</p>
      </div>

      {dummyData.days.map((dayInfo) => (
        <div key={dayInfo.day} className="bg-white rounded-lg shadow-sm mb-4">
          <div className=" text-white p-4 rounded-t-lg flex items-center gap-4"
                style={{backgroundColor: '#FF8D4E'}}
          >
            <div className="bg-orange-500 rounded-full p-3 h-12 w-12 flex items-center justify-center">
              <span className="font-bold">Day</span>
              <span className="font-bold ml-1">{dayInfo.day}</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600">{dayInfo.description}</p>
          </div>
        </div>
      ))}

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-green-800">Inclusions</h3>
          <ul className="space-y-2">
            {dummyData.inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-red-800">Exclusions</h3>
          <ul className="space-y-2">
            {dummyData.exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;