import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import bg1 from "../assets/h1-banner3.jpg";
import bg2 from "../assets/h1-banner4.jpg";

const Choose = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Only animate once
    });
  }, []);

  return (
    <section className="py-16 px-4 bg-white w-11/12 mx-auto max-w-7xl">
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-green-800 mb-4 flex items-center justify-center gap-2">
          <span className="text-lg">🍃</span>
          WHY CHOOSE US
        </h2>
        <div className="text-5xl font-extrabold text-gray-800 mb-6">
          We Are Different
          <br />
          <span className="text-4xl">From Other Farming</span>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We have 15 years of agriculture & eco farming experience globally,
          work with professionals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
        {/* Left Column */}
        <div className="space-y-8" data-aos="fade-right">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">🌱</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Sustainable & Regenerative Agriculture
              </h3>
              <p className="text-gray-600">
                Solution for small and large businesses voluptatem accusantium
                doloremque laudantium
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">🥬</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Organic Agriculture & Food Production
              </h3>
              <p className="text-gray-600">
                Solution for small and large businesses voluptatem accusantium
                doloremque laudantium
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-semibold text-gray-800">
                ✅ 100% Naturally
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                🚚 Home Delivery Service
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                ⚙️ High tech Processing
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                ⭐ Best Quality Product
              </p>
            </div>
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300">
            Explore More →
          </button>
        </div>

        {/* Right Column */}
        <div
          className="relative w-full h-[550px] md:h-[650px] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl"
          data-aos="fade-left"
        >
          <div className="absolute top-0 left-0 w-32 h-32 hidden sm:block opacity-20">
            <div className="grid grid-cols-5 gap-1.5 p-2">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-green-500 rounded-full" />
              ))}
            </div>
          </div>

          <div className="absolute top-0 right-0 w-full h-full sm:w-[85%] sm:h-[90%] md:w-[90%] md:h-[80%] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={bg1}
              alt="Tractor working in a large field during sunset"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-[80%] h-[55%] sm:w-[50%] sm:h-[65%] md:w-[45%] md:h-[70%] rounded-3xl overflow-hidden shadow-2xl z-10 -translate-x-4 md:-translate-x-8">
            <img
              src={bg2}
              alt="Close-up of a field at sunset"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bottom-[0%] right-0 transform translate-x-4 md:translate-x-8 bg-white p-6 md:p-8 rounded-3xl shadow-2xl z-20 w-[60%] sm:w-[45%] md:w-[50%] max-w-[250px] border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="flex flex-col items-center mb-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mb-1">
                  <span className="text-sm text-yellow-900">☀️</span>
                </div>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">🌾</span>
                </div>
              </div>
              <p className="text-4xl md:text-5xl font-extrabold text-green-700 leading-none">
                26+
              </p>
              <p className="mt-2 text-sm md:text-base font-medium text-gray-700">
                Growth Tons of Harvest
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Choose;
