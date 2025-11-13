import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";
import { FiSearch } from "react-icons/fi";
import Loader from "../../Components/Loader";
import AllCropsHero from "../../Components/AllCropsHero";
import ErrorMeassage from "../../Errorpages/ErrorMeassage";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortBy, setSortBy] = useState("latest");
  const [priceLimit, setPriceLimit] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // ✅ Initialize AOS
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  // ✅ Fetch crops
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await fetch(
          "https://krishi-link-app-server-i8y3zfe9y-rabuil-islams-projects.vercel.app/crops"
        );
        console.log("Response:", res);

        const data = await res.json();
        setCrops(data.reverse());
        const max = Math.max(...data.map((c) => Number(c.pricePerUnit || 0)));
        setMaxPrice(max);
        setPriceLimit(max);
      } catch (err) {
        console.error(err);
      } finally {
        // কমপক্ষে ১ সেকেন্ড loader দেখানোর জন্য ছোট delay
        setTimeout(() => setLoading(false), 1000);
      }
    };
    fetchCrops();
  }, []);

  // ✅ Search debounce loader
  useEffect(() => {
    if (search.trim() === "") return;
    setSearchLoading(true);
    const delay = setTimeout(() => {
      setSearchLoading(false);
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);

  // ✅ Filter + Sort logic
  const filtered = useMemo(() => {
    let result = crops.filter(
      (c) =>
        c.name?.toLowerCase().includes(search.toLowerCase()) &&
        Number(c.pricePerUnit) <= Number(priceLimit)
    );

    if (sortBy === "lowToHigh") {
      result.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
    } else if (sortBy === "highToLow") {
      result.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
    }
    return result;
  }, [crops, search, sortBy, priceLimit]);

  // ✅ Loader condition
  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader />
      </div>
    );

  // ✅ Search loader
  if (searchLoading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader size={100} color="#16a34a" />
      </div>
    );

  return (
    <div>
      <section>
        <AllCropsHero></AllCropsHero>
      </section>
      <div className="w-11/12 mx-auto py-10">
        {/* 🔰 Header */}
        <div
          className="text-center space-y-3 mb-8"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <h1 className="text-green-700 text-xl">
            Explore the best crops available for you!
          </h1>
          <h1 className="text-[#1e2939] md:text-5xl font-bold">All Crops</h1>
        </div>

        {/* 🔍 Search + Sort */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8"
          data-aos="fade-up"
        >
          {/* Search Input */}
          <div className="flex items-center border rounded-lg px-3 py-1 w-full md:w-1/3 shadow-sm focus-within:ring-2 focus-within:ring-green-500 transition-all">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search crops..."
              className="ml-2 w-full outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Sort & Price Filter */}
          <div className="flex items-center gap-4 flex-wrap justify-center ">
            <select
              className="select select-bordered"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Max Price:</label>
              <input
                type="range"
                min="0"
                max={maxPrice || 1000}
                value={priceLimit}
                onChange={(e) => setPriceLimit(Number(e.target.value))}
                className="range range-xs"
              />
              <span className="text-sm font-semibold text-green-700">
                ${priceLimit}
              </span>
            </div>
          </div>
        </div>

        {/* 🧮 Total Count */}
        <p className="text-gray-600 mb-5 text-center">
          Showing{" "}
          <span className="font-bold text-green-700">{filtered.length}</span>{" "}
          crops found
        </p>

        {/* 🌾 Crop Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((crop, index) => (
              <div
                key={crop._id}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100"
              >
                <Link to={`/crops/${crop._id}`} className="block h-full">
                  {/* Sale Badge */}
                  {Math.random() > 0.5 && (
                    <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      Sale
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative p-3 bg-gray-50 overflow-hidden">
                    <img
                      src={
                        crop.image?.trim()
                          ? crop.image
                          : "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={crop.name || "Crop"}
                      className="w-full h-48 object-cover mx-auto rounded-lg group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    {/* Sliding Overlay */}
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
                      {crop.name || "Unknown Crop"}
                    </h3>

                    <div className="text-center mb-4 mt-2">
                      <span className="text-green-600 font-extrabold text-2xl">
                        ${crop.pricePerUnit || "N/A"}
                      </span>
                      <p className="text-sm text-gray-500">
                        per {crop.unit || "unit"}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 text-center font-medium">
                      Type:{" "}
                      <span className="text-gray-800">
                        {crop.type || "Unknown"}
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p
              className="col-span-full text-center text-gray-500 py-12 text-lg italic"
              data-aos="fade-up"
            >
              No crops found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCrops;
