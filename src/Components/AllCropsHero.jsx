import React from "react";

const AllCropsHero = () => {
  return (
    <div className="">
      <div
        className="hero h-100"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/agricultural-machinery-field-with-tractor-background_993599-17179.jpg?semt=ais_hybrid&w=740&q=80)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Select Your Crops</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCropsHero;
