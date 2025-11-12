import React, { useEffect, useState } from "react";
import LatestCrops from "../../Components/LatestCrops";
import HeroSlider from "../../Components/Herosection";
import Choose from "../../Components/Choose";
import Works from "../../Components/Works";
import News from "../../Components/News";
import Services from "../../Components/Services";
// import CropCard from "../../Components/LatestCrops";
// import LatestCrops from "../components/LatestCrops";

const HomePage = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/crops")
      .then((res) => res.json())
      .then((data) => {
        // Sort by _id descending (latest first) and take 6
        const latest = data
          .sort((a, b) => b._id.localeCompare(a._id))
          .slice(0, 6);
        setCrops(latest);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {/* Hero Slider Section */}
      <HeroSlider></HeroSlider>
      <Choose></Choose>

      {/* Latest Crops Section */}
      <section className=" px-5">
        <h2 className="text-2xl font-semibold mb-4"></h2>
        <div>
          <LatestCrops crops={crops} />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="">
        <Works></Works>
      </section>

      {/* Agro News Section */}
      <section>
        <News></News>
      </section>
      <section>
        <Services></Services>
      </section>

      {/* Extra Section */}
      <section className="mt-10 px-5 py-5 bg-green-50">
        <h2 className="text-2xl font-semibold mb-4">Farm Tips</h2>
        <p>Learn new farming techniques to boost productivity...</p>
      </section>
    </div>
  );
};

export default HomePage;
