import React from "react";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FiMail, FiPhone, FiSend } from "react-icons/fi";

const Footer = () => {
  // Define primary colors based on the image:
  const primaryGreen = "#276231";
  const secondaryGreen = "#2D884C";

  return (
    // Main footer container with the background image
    <footer
      className="relative bg-cover mt-20 bg-center bg-no-repeat text-white pt-16"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1661907005604-cec7ffb6a042?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000')",
        backgroundColor: primaryGreen, // Fallback color
      }}
    >
      {/* Dark overlay to ensure text visibility and match the image's dark tone */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Main content area */}
      <div className="relative container mx-auto px-4 md:px-8 lg:px-12 w-full max-w-7xl pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 1. Newsletter Signup Box (The distinct green box on the left) */}
          <div
            className={`lg:w-1/4 p-8 rounded-lg ${secondaryGreen} shadow-xl`}
            style={{ backgroundColor: secondaryGreen }}
          >
            {/* Top green cut-out element (using absolute positioning to approximate the shape) */}
            <div
              className="absolute top-0 left-0 h-16 w-16 bg-white"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
                backgroundColor: secondaryGreen,
              }}
            ></div>

            <div className="flex flex-col justify-between h-full">
              <div className="mb-6">
                <FiMail size={40} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Sign Up To Our Newsletters
                </h3>
                <p className="text-sm">
                  Subscribe to our Newsletter & Event right now to be updated
                </p>
              </div>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address*"
                  className="w-full p-3 rounded-lg text-sm text-black placeholder-black border border-gray-300 focus:ring-0 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg font-semibold transition duration-300"
                  style={{ backgroundColor: "white", color: primaryGreen }}
                >
                  Subscribe →
                </button>
              </form>
            </div>
          </div>

          {/* 2. Main Footer Content (Right Side) */}
          <div className="lg:w-3/4 flex flex-col pt-2">
            {/* Top Contact/Enquiries Row */}
            <div className="flex flex-col sm:flex-row   items-start sm:items-center text-sm mb-12">
              <div className="flex items-center mb-4 sm:mb-0 mr-8">
                <FiSend
                  size={18}
                  className="mr-3"
                  style={{ color: secondaryGreen }}
                />
                <div>
                  <p className="text-gray-400">General enquiries</p>
                  <a
                    href="mailto:support@example.com"
                    className="text-white hover:text-gray-300"
                  >
                    support@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <FiPhone
                  size={18}
                  className="mr-3"
                  style={{ color: secondaryGreen }}
                />
                <div>
                  <p className="text-gray-400">Give us a call</p>
                  <a
                    href="tel:+480045678900"
                    className="text-white hover:text-gray-300"
                  >
                    +4800 45 678 900
                  </a>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            {/* Links and Mission Statement Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Useful Links */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Useful Links</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <a href="#" className="hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Why Choose Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Meet Our Team
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact Us
                    </a>
                  </li>{" "}
                  {/* Added Contact Us */}
                  <li>
                    <a href="#" className="hover:text-white">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>

              {/* Explore */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Explore</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <a href="#" className="hover:text-white">
                      What We Offer
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Latest News
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Project
                    </a>
                  </li>{" "}
                  {/* Added Project */}
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms & Condition
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Agrile Mission */}
              <div className="col-span-2">
                <h4 className="text-xl font-bold mb-4">KrishiLink</h4>{" "}
                {/* The logo/name */}
                <p className="text-sm leading-relaxed text-gray-300 mb-6">
                  We carry out our mission based on the values of impeccable
                  business reputation, social responsibility, respect for human
                  dignity and synergetic and result-oriented partnerships.
                </p>
                {/* Social Icons */}
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    <FaFacebookF size={18} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    <FaTwitter size={18} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    <FaLinkedinIn size={18} />{" "}
                    {/* Using LinkedIn for the 'in' icon */}
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    <FaInstagram size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/20 mt-12 pt-6 text-center text-xs text-gray-400">
          <p>&copy; Copyright 2025 KrishiLink. All rights reserved.</p>
        </div>
      </div>

      {/* Absolute positioning for the farmer image on the right */}
    </footer>
  );
};

export default Footer;
