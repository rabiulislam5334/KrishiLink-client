import React from "react";
import errorimg from "../assets/error-404.png";
// import Navber from "../../Component/Header/Navber";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <>
      <div className="mt-20">
        <img src={errorimg} alt="" className="mx-auto" />
        <div className=" space-y-4 mt-8">
          <h1 className="text-5xl font font-bold text-center">
            Oops, page not found!
          </h1>
          <p className="text-center">
            The page you are looking for is not available.
          </p>
        </div>
        <div className=" flex justify-center my-16">
          <Link
            to={"/"}
            className="btn bg-green-700 hover:bg-green-500 text-xl text-white"
          >
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
