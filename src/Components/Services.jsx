import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import {
  FaLeaf,
  FaTrophy,
  FaStar,
  FaArrowRight,
  FaTractor,
} from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";

const Services = () => {
  const serviceCards = [
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/service-4.jpg",
      icon: <FaTractor className="text-2xl sm:text-3xl text-green-700" />,
      title: "Harvest Concepts",
      description:
        "Why Choose Our Services Lorem ipsum is simply free text used by copytyping.",
      link: "#",
    },
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/service-5.jpg",
      icon: <GiFarmer className="text-2xl sm:text-3xl text-green-700" />,
      title: "Nutrition Solutions",
      description:
        "Why Choose Our Services Lorem ipsum is simply free text used by copytyping.",
      link: "#",
    },
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/service-7.jpg",
      icon: <FaLeaf className="text-2xl sm:text-3xl text-green-700" />,
      title: "Organic Products",
      description:
        "Why Choose Our Services Lorem ipsum is simply free text used by copytyping.",
      link: "#",
    },
    {
      image:
        "https://demo2.themelexus.com/agrile/wp-content/uploads/2024/11/service-2.jpg",
      icon: <FaTrophy className="text-2xl sm:text-3xl text-green-700" />,
      title: "Quality Control",
      description:
        "Why Choose Our Services Lorem ipsum is simply free text used by copytyping.",
      link: "#",
    },
  ];

  const ServiceCard = ({ service }) => (
    <div className="bg-white rounded-xl shadow-lg relative h-full overflow-hidden group">
      {/* Image Section */}
      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-56 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Box */}
      <div className="absolute inset-x-0 bottom-[-25px] sm:bottom-[-80px] bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-xl mx-4 sm:mx-6 transform group-hover:-translate-y-2 transition-transform duration-300">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          {/* Icon */}
          <div className="bg-green-100 p-2 sm:p-3 rounded-full">
            {service.icon}
          </div>
          {/* Arrow Button */}
          <a
            href={service.link}
            className="bg-green-700 hover:bg-green-800 text-white p-2 sm:p-3 rounded-full transition-colors duration-300"
          >
            <FaArrowRight className="text-sm sm:text-base" />
          </a>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 text-center">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 text-center">
          {service.description}
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-16 sm:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ Flex container centered both sides */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12">
          {/* --- Left Section --- */}
          <div className="lg:w-1/3 flex flex-col justify-center text-center lg:text-left">
            <div className="mb-8">
              <p className="flex items-center justify-center lg:justify-start text-sm font-semibold text-green-700 uppercase mb-2">
                <FaLeaf className="mr-2" /> OUR SERVICE
              </p>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1e2939] leading-tight">
                What We Provide
              </h2>
            </div>

            <div className="p-5 sm:p-6 border-l-4 border-green-700 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4">
                <FaTrophy className="text-5xl sm:text-6xl text-green-700" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Best Service
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    National Best Service Awards
                  </p>
                  <div className="flex items-center justify-center sm:justify-start text-yellow-500 text-xs sm:text-sm mt-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <span className="ml-1 sm:ml-2 text-gray-700 font-semibold">
                      5/5 For The Agile Service
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Right Section: Swiper --- */}
          <div className="lg:w-2/3  w-full  flex items-center justify-center">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2, spaceBetween: 30 },
              }}
              className="w-11/12 sm:w-10/12"
            >
              {serviceCards.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center">
                    <div className="pb-24 w-full">
                      <ServiceCard service={service} />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
