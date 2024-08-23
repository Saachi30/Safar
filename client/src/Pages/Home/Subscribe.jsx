import React from "react";
import s1 from "../../assets/s1.png";
import s2 from "../../assets/s2.png";

function Subscribe() {
  return (
    <div className="flex flex-row justify-center items-center mb-20">
      <img
        src={s1}
        className="w-40 h-40 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
      />
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="font-bold text-3xl mb-10 ">
          <span className="flex flex-col justify-center items-center">
            <h1>Subscribe To Get Latest</h1>
            <h1>News About Us</h1>
          </span>
        </div>
        <div className="mb-10">
          <span  className="flex flex-col justify-center items-center">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            </p>
            <p>eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </span>
        </div>
        <div className="flex items-center bg-orange-200 rounded-xl w-[800px] pl-10 pr-4 py-2 shadow-lg mb-4">
          <input
            className="bg-orange-200 flex-grow outline-none text-white placeholder-white"
            type="text"
            placeholder="Enter Your Email"
          />
          <button className="bg-orange-500 text-white px-4 py-2 rounded-xl">
            Subscribe
          </button>
        </div>
      </div>
      <img
        src={s2}
        className="w-40 h-40 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
      />
    </div>
  );
}

export default Subscribe;
