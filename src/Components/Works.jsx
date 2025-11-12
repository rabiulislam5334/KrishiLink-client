import React from "react";
import {
  FaSeedling, // For Excellent seeds, Growing excellence
  FaHandsHelping, // For Always support farmer
  FaRegGrinBeam, // For Power of regeneration (representing vitality/happiness)
  FaTractor, // For Years of heritage
  FaAppleAlt, // For Fresh farm harvest
  FaLeaf, // For Eco friendly packaging, Premium products
} from "react-icons/fa"; // Importing icons from Font Awesome (Fa)

const Works = () => {
  // You can adjust these details or fetch them from an API
  const features = [
    {
      icon: <FaHandsHelping className="text-green-600 text-4xl mb-4" />,
      title: "Always support farmer",
      description:
        "Farmers strength their soil health while increasing crop yields & profitability.",
    },
    {
      icon: <FaSeedling className="text-green-600 text-4xl mb-4" />,
      title: "Growing excellence",
      description:
        "Providing premium vegetable and soft fruit starter plants with our excellent seeds.",
    },
    {
      icon: <FaRegGrinBeam className="text-green-600 text-4xl mb-4" />,
      title: "Power of regeneration",
      description:
        "Shifting agriculture from being carbon emitter to a powerful carbon sink.",
    },
    {
      icon: <FaSeedling className="text-green-600 text-4xl mb-4" />, // Re-using seedling, or find another if preferred
      title: "Excellent seeds",
      description:
        "We help foster growth for our clients to contribute the agriculture industry's advancement.",
    },
    {
      icon: <FaTractor className="text-green-600 text-4xl mb-4" />,
      title: "Years of heritage!",
      description:
        "Providing premium vegetable and soft fruit starter plants with our excellent seeds.",
    },
    {
      icon: <FaLeaf className="text-green-600 text-4xl mb-4" />, // Re-using leaf
      title: "Premium products",
      description:
        "Farmers strength their soil health while increasing crop yields & profitability.",
    },
    {
      icon: <FaAppleAlt className="text-green-600 text-4xl mb-4" />,
      title: "Fresh farm harvest",
      description:
        "We help foster growth for our clients to contribute the agriculture industry's advancement.",
    },
    {
      icon: <FaLeaf className="text-green-600 text-4xl mb-4" />, // Re-using leaf
      title: "Eco friendly packaging",
      description:
        "Shifting agriculture from being carbon emitter to a powerful carbon sink.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional: Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
            How We Work
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Core Values
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Dedicated to sustainable farming and supporting our community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="flex-shrink-0 mb-4 bg-green-50 p-3 rounded-full">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-1 text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
