import React, { use } from "react";

import { Navigate } from "react-router";
// import Loding from "../Pages/Loding";
import { useLocation } from "react-router";

import { AuthContext } from "../Provider/AuthProvider";
import Loader from "../Components/Loader";

const PrivetRouter = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loader></Loader>;
  }
  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>;
};

export default PrivetRouter;
