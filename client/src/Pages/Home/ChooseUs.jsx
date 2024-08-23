import React from "react";
import a2 from "../../assets/a2.png";

function ChooseUs() {
  return (
    <div className="flex flex-col justify-center items-center pl-16 pr-16 mb-20">
      <div className="">
        <img
          src={a2}
          className="w-32 h-32 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
          alt="Image"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between bg-white">
        {/* Left Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-orange-500 text-xl font-semibold mb-2">
            Why Choose Us?
          </h2>
          <h1 className="text-5xl font-bold mb-20">Plan Your Trip With Us</h1>

          {/* Features List */}
          <div className="space-y-14 ">
            <div className="flex items-start space-x-10">
              <div className="bg-orange-100 p-4 rounded-full">
                <svg
                  className="w-6 h-6 text-orange-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Best Price Guarantee</h3>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-10">
              <div className="bg-orange-100 p-4 rounded-full">
                <svg
                  className="w-6 h-6 text-orange-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Best Price Guarantee</h3>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-10">
              <div className="bg-orange-100 p-4 rounded-full">
                <svg
                  className="w-6 h-6 text-orange-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Best Price Guarantee</h3>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex justify-between mt-20">
            <div className="text-center">
              <h3 className="text-4xl font-bold">14</h3>
              <p className="text-gray-500">Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold">320+</h3>
              <p className="text-gray-500">Distention Collaboration</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold">67+</h3>
              <p className="text-gray-500">Satisfied Customers</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2  md:mt-0">
          <div className="relative shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://img.freepik.com/premium-photo/happy-couple-travel-yacht-ocean-summer-romance-lovely-luxury-holiday-vacation-smile-sunglasses-young-woman-enjoying-champagne-with-boyfriend-sailing-cruise-date-sea_590464-84885.jpg?w=900"
              alt="Plan Your Trip"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
