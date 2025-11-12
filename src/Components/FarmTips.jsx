import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Reusable Green Arrow Button Component
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
        aria-hidden="true"
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

// ✅ Individual Tip Card Component
// ✅ Individual Tip Card Component
const TipCard = ({ tip, index, hoveredIndex, setHoveredIndex }) => {
  const isActive = hoveredIndex === index;

  return (
    <div
      className={`relative h-[450px] rounded-lg overflow-hidden shadow-xl cursor-pointer flex-shrink-0
                  transition-all duration-1000 ease-in-out
                  w-full lg:w-[12.5%] ${
                    isActive ? "lg:w-[40%]" : "lg:w-[12.5%]"
                  }`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* 🔹 Background Image */}
      <img
        src={tip.image}
        alt={tip.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
      />

      {/* 🔹 Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      {/* 🔹 Animated Content (Smooth Transition) */}
      <div
        className={`absolute bottom-0 p-6 text-white w-full transition-all duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
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

      {/* 🔹 Static Title (for collapsed state) */}
      <div
        className={`absolute bottom-0 left-0 p-6 text-white w-full 
                    transition-opacity duration-300 ease-in-out
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

// ✅ Main FarmTips Component
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
      link: "#",
    },
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/project-3-1024x788.jpg",
      title: "Water Management",
      subtitle: "Irrigation Strategies",
      description:
        "Implement drip irrigation systems to conserve water and ensure plants receive consistent moisture.",
      link: "#",
    },
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/project-4-1024x788.jpg",
      title: "Pest Control",
      subtitle: "Natural Defenses",
      description:
        "Use integrated pest management (IPM) techniques with biological controls and natural deterrents.",
      link: "#",
    },
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/project-9-1024x788.jpg",
      title: "Tractor Maintenance",
      subtitle: "Seasonal Checks",
      description:
        "Ensure machinery is serviced before planting and harvest to prevent costly downtime.",
      link: "#",
    },
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/project-1-1024x788.jpg",
      title: "Harvest Timing",
      subtitle: "Optimal Freshness",
      description:
        "Harvest leafy greens early in the morning for maximum freshness and nutritional value.",
      link: "#",
    },
  ];

  return (
    <section
      className="py-20 relative overflow-hidden font-inter"
      data-aos="fade-up"
    >
      {/* Background Overlay */}
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
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <p className="flex items-center justify-center text-sm font-semibold text-green-400 uppercase tracking-widest mb-2">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 2a8 8 0 00-8 8c0 3.866 2.686 7.18 6.32 7.82.5.09.7-.22.7-.5 0-.25-.01-1.09-.01-2.03-2.6.56-3.15-.9-3.15-.9-.5-.87-1.22-1.1-1.22-1.1-.8-.55-.06-.54.04-.53 1.05.08 1.6 1.08 1.6 1.08.93 1.58 2.44 1.12 3.03.85.09-.66.36-1.12.65-1.38-2.32-.26-4.75-1.16-4.75-5.16 0-1.14.4-2.07 1.05-2.8-.1-.26-.45-1.32.1-2.75 0 0 .85-.28 2.78 1.08.8-.23 1.64-.34 2.5-.34.86 0 1.7.11 2.5.34 1.93-1.36 2.78-1.08 2.78-1.08.55 1.43.2 2.49.1 2.75.65.73 1.05 1.66 1.05 2.8 0 4.01-2.43 4.9-4.75 5.16.37.32.7.97.7 1.95 0 1.4-.01 2.56-.01 2.9.0.28.2.59.7.5C17.31 17.18 20 13.866 20 10A8 8 0 0010 2z"
              ></path>
            </svg>
            EXPLORE PROJECTS
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Recently Farm Tips
          </h2>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 gap-6 lg:flex lg:justify-center lg:items-center lg:gap-4"
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
