import React, { useEffect } from "react";
import { Link } from "react-router"; //
import Aos from "aos";
import "aos/dist/aos.css"; // ✅ AOS এর CSS ইম্পোর্ট

const LatestCrops = ({ crops }) => {
  // ✅ AOS initialize useEffect এর মধ্যে
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="w-11/12 mx-auto max-w-7xl px-4 py-8">
      {/* Section Title */}
      <div
        className="my-10 text-center space-y-5"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <h1 className="text-green-700 text-xl">
          Let’s start your farming journey together!
        </h1>
        <h1 className="text-[#1e2939] md:text-5xl font-bold">Latest Crops</h1>
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {crops?.map((crop, index) => (
          <div
            key={crop._id}
            data-aos="fade-up"
            data-aos-delay={index * 100} // ছোট ডিলে added যাতে staggered animation হয়
            className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100"
          >
            <Link to={`/crops/${crop._id}`} className="block h-full">
              {/* Sale Badge */}
              {Math.random() > 0.5 && (
                <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Sale
                </div>
              )}

              {/* 🍎 Image Section with Sliding Overlay */}
              <div className="relative p-3 bg-gray-50 overflow-hidden">
                <img
                  src={
                    crop?.image && crop.image.trim() !== ""
                      ? crop.image
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={crop?.name || "Crop Image"}
                  className="w-full h-48 object-cover mx-auto rounded-lg group-hover:scale-[1.03] transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Load+Failed";
                  }}
                />
                {/* ✨ Sliding Overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 bg-green-700 bg-opacity-90 transform translate-y-full 
                             group-hover:translate-y-0 transition-transform duration-300 ease-out 
                             flex items-center justify-center z-20 rounded-b-lg text-white font-semibold text-lg"
                >
                  View Details →
                </div>
              </div>

              {/* Card Body */}
              <div className="px-4 pt-4 pb-6 bg-white">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-1">
                  {crop?.name || "Unknown Crop"}
                </h3>

                <div className="text-center mb-4 mt-2">
                  <span className="text-green-600 font-extrabold text-2xl">
                    ${crop?.pricePerUnit || "N/A"}
                  </span>
                  <p className="text-sm text-gray-500">
                    per {crop?.unit || "unit"}
                  </p>
                </div>

                <p className="text-sm text-gray-600 text-center font-medium">
                  Type:{" "}
                  <span className="text-gray-800">
                    {crop?.type || "Unknown"}
                  </span>
                </p>
              </div>
            </Link>
          </div>
        ))}

        {/* 😔 No Crops Found */}
        {(!crops || crops.length === 0) && (
          <p
            className="col-span-full text-center text-gray-500 py-12 text-lg italic"
            data-aos="fade-up"
          >
            No latest crops found. Please check back later.
          </p>
        )}
      </div>

      {/* View All Button */}
      <div
        className="my-10 flex justify-center"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <Link
          to="/all_crops"
          className="btn text-center text-xl font-bold bg-green-700 text-white hover:bg-green-600 transition-colors duration-300"
        >
          View All Crops
        </Link>
      </div>
    </div>
  );
};

export default LatestCrops;
