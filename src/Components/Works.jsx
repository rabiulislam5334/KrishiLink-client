import React, { useEffect } from "react";
import {
  FaSeedling,
  FaHandsHelping,
  FaRegGrinBeam,
  FaTractor,
  FaAppleAlt,
  FaLeaf,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Works = () => {
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
      icon: <FaSeedling className="text-green-600 text-4xl mb-4" />,
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
      icon: <FaLeaf className="text-green-600 text-4xl mb-4" />,
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
      icon: <FaLeaf className="text-green-600 text-4xl mb-4" />,
      title: "Eco friendly packaging",
      description:
        "Shifting agriculture from being carbon emitter to a powerful carbon sink.",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12" data-aos="fade-up">
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

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border  rounded-lg shadow-sm bg-white hover:scale-105 border-gray-200  transition ease-in-out duration-1000 hover:shadow-xl hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100} // staggered animation
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
