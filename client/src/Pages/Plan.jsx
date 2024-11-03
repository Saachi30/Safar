import React from 'react';
import plan from "../assets/plan.jpg";
import money from "../assets/money.webp";
import { useNavigate } from 'react-router-dom';

const Plan = () => {
  const packages = Array(12).fill({
    title: 'PACKAGE 1',
    days: '21 days',
    price: '55,000/-',
    plan: 'Family Plan',
    image1: plan,
    image2: money,
  });
  const navigate = useNavigate();

  const handlePackageClick = () => {
    navigate('/itinerary');
  }

  return (
    <div className="grid grid-cols-3 gap-16 p-4 max-w-6xl mx-auto mt-8 mb-14">
      {packages.map((pkg, index) => (
        <div 
          key={index}
          className="relative rounded-xl overflow-hidden group cursor-pointer h-80 shadow-lg"
          onClick={() => handlePackageClick()}
        >
          <img 
            src={pkg.image1} 
            alt="Travel package"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="h-full flex flex-col justify-center items-start px-6 text-white">
              <h3 className="font-bold text-2xl mb-1">{pkg.title}</h3>
              <div className="flex items-center gap-12 mb-1">
                <span className="text-lg">{pkg.days}</span>
                <div className="flex items-center gap-1">
                  <img 
                    src={pkg.image2}
                    alt="price icon"
                    className="w-12 h-12"
                  />
                  <span className="text-lg">{pkg.price}</span>
                </div>
              </div>
              <p className="font-bold text-lg">{pkg.plan}</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
            <p className="font-bold text-lg">{pkg.plan}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plan;