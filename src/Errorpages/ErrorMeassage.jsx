import React from "react";
import errorImg from "../assets/App-Error.png";
import { Link } from "react-router";
const ErrorMeassage = () => {
  return (
    <div>
      <div>
        <div className="mt-20">
          <img src={errorImg} alt="" className="mx-auto" />
          <div className=" space-y-4 mt-8">
            <h1 className="text-5xl font font-bold text-center">
              OPPS!! APP NOT FOUND
            </h1>
            <p className="text-center">
              The App you are requesting is not found on our system. please try
              another apps
            </p>
          </div>
          <div className=" flex justify-center my-16">
            <Link
              to={"/"}
              className="btn bg-green-700 hover:bg-green-500  text-xl text-white"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMeassage;
