import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const GreenArrowButton = ({ link = "#" }) => {
  return (
    <a
      href={link}
      className="inline-block bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors duration-200"
      aria-label="Read more details"
    >
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        ></path>
      </svg>
    </a>
  );
};

const TipCard = ({ tip, index, hoveredIndex, setHoveredIndex }) => {
  const isActive = hoveredIndex === index;

  return (
    <div
      className={`relative h-[450px] rounded-lg overflow-hidden shadow-xl cursor-pointer 
                  transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]
                  ${isActive ? "lg:w-[40%]" : "lg:w-[15%]"} w-full`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* 🔹 Background Image */}
      <img
        src={tip.image}
        alt={tip.title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${
          isActive ? "scale-110" : "scale-100"
        }`}
      />

      {/* 🔹 Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      {/* 🔹 Content */}
      <div
        className={`absolute bottom-0 p-6 text-white w-full transition-all duration-[1000ms]
                    ease-[cubic-bezier(0.22,0.61,0.36,1)]
                    ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
        style={{
          willChange: "opacity, transform",
          transitionDelay: isActive ? "150ms" : "0ms",
        }}
      >
        <h4 className="text-sm font-light text-green-400 mb-1">
          {tip.subtitle}
        </h4>
        <h3 className="text-xl font-bold mb-2 leading-tight">{tip.title}</h3>
        <p className="text-xs text-gray-200 mb-4 leading-relaxed">
          {tip.description}
        </p>
        <GreenArrowButton link={tip.link} />
      </div>

      {/* 🔹 Static Title (Collapsed State) */}
      <div
        className={`absolute bottom-0 left-0 p-6 text-white w-full 
                    transition-opacity duration-500 ease-in-out
                    ${isActive ? "opacity-0" : "opacity-100"}`}
      >
        <h4 className="text-sm font-light text-green-400 mb-1">
          {tip.subtitle}
        </h4>
        <h3 className="text-xl font-bold mb-2 leading-tight">{tip.title}</h3>
      </div>
    </div>
  );
};

const FarmTips = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const tipsData = [
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/project-2-1024x788.jpg",
      title: "Soil Health First",
      subtitle: "Eco and Agriculture",
      description:
        "Focus on natural fertilizers and crop rotation for better yield and sustained soil quality.",
    },
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/project-3-1024x788.jpg",
      title: "Water Management",
      subtitle: "Irrigation Strategies",
      description:
        "Implement drip irrigation systems to conserve water and ensure plants receive consistent moisture.",
    },
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/project-4-1024x788.jpg",
      title: "Pest Control",
      subtitle: "Natural Defenses",
      description:
        "Use integrated pest management (IPM) techniques with biological controls and natural deterrents.",
    },
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/project-9-1024x788.jpg",
      title: "Tractor Maintenance",
      subtitle: "Seasonal Checks",
      description:
        "Ensure machinery is serviced before planting and harvest to prevent costly downtime.serviced before planting and harvest to prevent costly downtime.",
    },
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/project-1-1024x788.jpg",
      title: "Harvest Timing",
      subtitle: "Optimal Freshness",
      description:
        "Harvest leafy greens early in the morning for maximum freshness and nutritional value.",
    },
  ];

  return (
    <section
      className="lg:py-20 hidden lg:block relative overflow-hidden font-inter"
      data-aos="fade-up"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-70"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/95/8a/d5/958ad58048ece99a72f5d34aad470bf1.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="relative z-10 w-11/12 mx-auto">
        <div className="text-center mb-12" data-aos="fade-down">
          <p className="text-sm font-semibold text-green-400 uppercase tracking-widest mb-2">
            EXPLORE PROJECTS
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Recently Farm Tips
          </h2>
        </div>

        {/* 🔹 Cards Container */}
        <div
          className="flex justify-center items-center gap-4 transition-all duration-700"
          data-aos="zoom-in"
        >
          {tipsData.map((tip, index) => (
            <TipCard
              key={index}
              tip={tip}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FarmTips;
