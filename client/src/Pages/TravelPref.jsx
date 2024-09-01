import React, { useState } from 'react';
import Loading from 'react-simple-loading';

function TravelPref() {
  const [destinations, setDestinations] = useState([]);
  const [days, setDays] = useState("");
  const [companion, setCompanion] = useState("");
  const [currentDestination, setCurrentDestination] = useState('');
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(false); // State to track loading

  const handleAddDestination = () => {
    if (currentDestination.trim()) {
      setDestinations([...destinations, currentDestination.trim()]);
      setCurrentDestination('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDestination();
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    try {
      const response = await fetch('http://127.0.0.1:8000/travel-plan/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          location: destinations.join(', '),
          days: days,
          companion: companion,
          budget: budget,
        }),
      });

      const data = await response.json();
      console.log(data.response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-8 gap-14'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold'>Tell us your travel preferences</h1>
        <p>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      </div>

      <form
        className='flex flex-col justify-center gap-8'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className='flex flex-col gap-4'>
          <label className='font-semibold'>What is your destination of choice?</label>
          <input
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
            type='text'
            value={currentDestination}
            placeholder='Enter your destination'
            onChange={(e) => setCurrentDestination(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        {destinations.length > 0 && (
          <ul className='flex flex-col gap-2'>
            {destinations.map((destination, index) => (
              <li key={index} className='flex items-center justify-between p-2 bg-gray-100 rounded-md'>
                {destination}
              </li>
            ))}
          </ul>
        )}

        <div className='flex flex-col gap-4'>
          <label className='font-semibold'>How many days are you planning for your trip?</label>
          <input
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
            type='text'
            placeholder='Enter no. of days'
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-semibold">What is your budget?</label>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <div className="flex justify-between mt-2 text-gray-600">
            <span>₹0</span>
            <span>₹1L+</span>
          </div>
          <div className="font-semibold text-gray-800">
            Selected Budget: ₹{budget}
          </div>
        </div>

        <div className='flex flex-col justify-center gap-4'>
          <label className='font-semibold'>Who do you plan on travelling with on your next adventure?</label>
          <div className="flex gap-4">
            <input
              type="radio"
              id="me"
              name="companion"
              value="Me"
              checked={companion === "Me"}
              onChange={(e) => setCompanion(e.target.value)}
            />
            <label htmlFor="me">Me</label>
            <input
              type="radio"
              id="couple"
              name="companion"
              value="Couple"
              checked={companion === "Couple"}
              onChange={(e) => setCompanion(e.target.value)}
            />
            <label htmlFor="couple">Couple</label>
            <input
              type="radio"
              id="family"
              name="companion"
              value="Family"
              checked={companion === "Family"}
              onChange={(e) => setCompanion(e.target.value)}
            />
            <label htmlFor="family">Family</label>
            <input
              type="radio"
              id="friends"
              name="companion"
              value="Friends"
              checked={companion === "Friends"}
              onChange={(e) => setCompanion(e.target.value)}
            />
            <label htmlFor="friends">Friends</label>
          </div>
        </div>

        <button
          className='w-full py-2 mt-10 text-white bg-orange-500 rounded-full hover:bg-orange-400'
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <Loading color="#fff" size="16px" />
            </div>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
}

export default TravelPref;
