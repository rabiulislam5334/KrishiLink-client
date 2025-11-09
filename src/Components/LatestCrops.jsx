import React from "react";

const LatestCrops = ({ crops }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {crops.map((crop) => (
        <div
          key={crop._id}
          className="border p-3 rounded shadow hover:shadow-lg transition"
        >
          <img
            src={crop.image}
            alt={crop.name}
            className="h-40 w-full object-cover rounded mb-2"
          />
          <h3 className="text-lg font-semibold">{crop.name}</h3>
          <p>Type: {crop.type}</p>
          <p>
            Price: {crop.pricePerUnit} per {crop.unit}
          </p>
          <a
            href={`/crops/${crop._id}`}
            className="text-blue-500 underline mt-2 inline-block"
          >
            View Details
          </a>
        </div>
      ))}
      {crops.length === 0 && <p>No crops found.</p>}
    </div>
  );
};

export default LatestCrops;
