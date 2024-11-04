import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useNavigate } from 'react-router-dom';

function TravelPref() {
  const [destinations, setDestinations] = useState([]);
  const [days, setDays] = useState("");
  const [companion, setCompanion] = useState("");
  const [currentDestination, setCurrentDestination] = useState('');
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let travelPlan={};
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const navigate = useNavigate();

  const handleAddDestination = async () => {
    if (currentDestination.trim()) {
      setDestinations([...destinations, currentDestination.trim()]);
      
      // Record search if user is logged in
      //console.log(typeof(currentDestination.trim()))
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
              destination: currentDestination.trim()
            })
          });
        } catch (error) {
          console.error('Error recording search:', error);
        }
      }
      
      setCurrentDestination('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDestination();
    }
  };

  const generatePrompt = (location, days, companion, budget) => {
    // Create a dynamic template for the number of days
    const generateDaysTemplate = (numDays) => {
      const daysArray = [];
      for (let i = 1; i <= numDays; i++) {
        daysArray.push({
          day: i,
          locations: [
            {
              placeName: "string",
              placeDetails: "string",
              imageUrl: "string",
              coordinates: {
                lat: "number",
                lng: "number"
              },
              ticketPrice: "string",
              timeToSpend: "string",
              bestTimeToVisit: "string"
            }
          ]
        });
      }
      return daysArray;
    };

    // Create the template object with the dynamic days
    const template = {
      packages: Array(3).fill({
        itinerary: {
          days: generateDaysTemplate(parseInt(days)),
          hotels: [
            {
              hotelName: "string",
              address: "string",
              price: "string",
              imageUrl: "string",
              coordinates: {
                lat: "number",
                lng: "number"
              },
              rating: "number",
              description: "string"
            }
          ]
        },
        totalBudget: "string",
        suggestedDuration: "string"
      })
    };

    return `You are a travel planning API that ONLY responds in JSON format.
    Create 3 different travel plans with the following specifications:
    - Location: ${location}
    - Duration: ${days} days
    - Travel Group: ${companion}
    - Budget: ₹${budget}
  
    Respond ONLY with a JSON object matching this exact structure, with no additional text or explanation:
    ${JSON.stringify(template, null, 2)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const promptText = generatePrompt(
        destinations.join(', '),
        days,
        companion,
        budget
      );

      const result = await model.generateContent({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          maxOutputTokens: 8192,
        },
      });

      const response = await result.response;
      const responseText = response.text();
      
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonStr = jsonMatch[0];
          const planJson = JSON.parse(jsonStr);
          travelPlan=planJson
          console.log(planJson);
          navigate('/plan', { state: planJson.packages });
        } else {
          setError("Response was not in the expected JSON format");
        }
      } catch (parseError) {
        console.error("Raw response:", responseText);
        setError("Failed to parse the travel plan response. Please try again.");
      }
    } catch (error) {
      setError(`Error generating travel plan: ${error.message}`);
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center p-8 gap-14">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Tell us your travel preferences</h1>
        <p>Provide some basic information, and our AI will generate a customized itinerary based on your preferences.</p>
      </div>

      <form className="flex flex-col justify-center gap-8 w-full max-w-2xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label className="font-semibold">What is your destination of choice?</label>
          <div className="flex gap-2">
            <input
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              value={currentDestination}
              placeholder="Enter your destination"
              onChange={(e) => setCurrentDestination(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="button"
              onClick={handleAddDestination}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-400"
            >
              Add
            </button>
          </div>
        </div>

        {destinations.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {destinations.map((destination, index) => (
              <li key={index} className="px-3 py-1 bg-orange-100 rounded-full flex items-center gap-2">
                <span>{destination}</span>
                <button
                  type="button"
                  onClick={() => setDestinations(destinations.filter((_, i) => i !== index))}
                  className="text-orange-500 hover:text-orange-700"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-4">
          <label className="font-semibold">How many days are you planning for your trip?</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="number"
            placeholder="Enter no. of days"
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
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-gray-600">
            <span>₹0</span>
            <span>₹1L+</span>
          </div>
          <div className="font-semibold text-gray-800">
            Selected Budget: ₹{budget}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-semibold">Who are you traveling with?</label>
          <div className="flex flex-wrap gap-4">
            {["Me", "Couple", "Family", "Friends"].map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="companion"
                  value={option}
                  checked={companion === option}
                  onChange={(e) => setCompanion(e.target.value)}
                  className="text-orange-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !destinations.length || !days || !companion}
          className="w-full py-2 mt-6 text-white bg-orange-500 rounded-full hover:bg-orange-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
              <span>Generating your travel plan...</span>
            </div>
          ) : (
            "Generate Travel Plan"
          )}
        </button>
      </form>

      {error && (
        <div className="w-full max-w-2xl mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      
    </div>
  );
}

export default TravelPref;