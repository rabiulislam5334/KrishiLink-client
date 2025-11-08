import React, { use, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const Navber = () => {
  const { user, logOut } = use(AuthContext);
  const [theme, setTheme] = useState("light");
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // Logout handler
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Sign-out successful!", {
          style: {
            border: "1px solid #f97316",
            padding: "12px 16px",
            color: "#333",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#f97316",
            secondary: "#FFFAEE",
          },
        });
      })
      .catch((error) => console.log(error));
  };

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const link = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-orange-500 border-b-2 border-orange-500 font-semibold"
              : "hover:text-orange-500 hover:border-b-2 hover:border-orange-500"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/my_profile"
          className={({ isActive }) =>
            isActive
              ? "text-orange-500 border-b-2 border-orange-500 font-semibold"
              : "hover:text-orange-500 hover:border-b-2 hover:border-orange-500"
          }
        >
          My Profile
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all_crops"
          className={({ isActive }) =>
            isActive
              ? "text-orange-500 border-b-2 border-orange-500 font-semibold"
              : "hover:text-orange-500 hover:border-b-2 hover:border-orange-500"
          }
        >
          All Crops
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="w-11/12 mx-auto">
        <div className="navbar">
          {/* Left side */}
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {link}
              </ul>
            </div>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link to="/">
                <img
                  src="https://cdn.worldvectorlogo.com/logos/gskill.svg"
                  alt="Logo"
                  className="w-20 h-20"
                />
              </Link>
              <h1 className="text-xl font-bold">Skill Swap</h1>
            </div>
          </div>

          {/* Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu gap-4 text-lg menu-horizontal px-1">{link}</ul>
          </div>

          {/* Right side */}
          <div className="navbar-end gap-5 items-center relative" ref={menuRef}>
            {user && (
              <div className="relative">
                {/* Avatar */}
                <img
                  className="w-12 h-12 rounded-full border-2 border-green-500 cursor-pointer object-cover"
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="User Avatar"
                  onClick={() => setOpenMenu(!openMenu)}
                />

                {/* Dropdown */}
                {openMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-base-100 shadow-xl rounded-xl p-4 z-50 border border-gray-200 animate-fade-in">
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={
                          user?.photoURL
                            ? user.photoURL
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="avatar"
                        className="w-16 h-16 rounded-full border-2 border-orange-500 mb-2"
                      />
                      <h3 className="font-semibold text-lg">
                        {user?.displayName}
                      </h3>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <div className="divider my-2"></div>

                    <Link
                      to="/my_profile"
                      className="btn btn-sm w-full mb-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold"
                    >
                      View Profile
                    </Link>

                    <button
                      onClick={toggleTheme}
                      className="btn btn-sm w-full mb-2 border border-gray-400"
                    >
                      Toggle {theme === "light" ? "Dark" : "Light"} Mode
                    </button>

                    <button
                      onClick={handleLogOut}
                      className="btn btn-sm w-full bg-red-500 hover:bg-red-600 text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {!user && (
              <Link
                to="/auth/login"
                className="btn hover:bg-orange-400 bg-orange-500 text-white font-bold text-lg rounded-xl"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
