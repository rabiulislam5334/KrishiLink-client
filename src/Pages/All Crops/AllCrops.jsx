import React, { useEffect, useState } from "react";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/crops")
      .then((res) => res.json())
      .then((data) => setCrops(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-5 py-5">
      <h1 className="text-2xl font-semibold mb-4">All Crops</h1>

      <input
        type="text"
        placeholder="Search crops..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full max-w-sm mb-4"
      />

      {filteredCrops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCrops.map((crop) => (
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
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default AllCrops;
