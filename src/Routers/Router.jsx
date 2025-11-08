// import { createBrowserRouter } from "react-router";
// import Root from "../Loyout/Root";
// import Home from "../Pages/Home";
// import Allcourse from "../Pages/Allcourse";
// import SingleCourse from "../Pages/SingleCourse";
// import AuthLayout from "../Loyout/AuthLayout";
// import Loging from "../Pages/Loging";
// import Registration from "../Pages/Registration";
// import PrivetRouter from "./PrivetRouter";
// // import Loader from "../Components/Loader";
// import ForgotPassword from "../Pages/ForgotPassword";
// import MyProfile from "../Pages/MyProfile";
// import ErrorPage from "../Pages/ErrorPage";

import { createBrowserRouter } from "react-router";
import Roots from "../Layouts/Roots";
import Home from "../Pages/Home/Home";
import AllCrops from "../Pages/All Crops/AllCrops";
import CropsDetails from "../Pages/Crops Details/CropsDetails";
import PrivetRouter from "./PrivetRouter";
import MyProfile from "../Auth/MyProfile";
import ForgotPassword from "../Auth/ForgotPassword";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/all_crops", element: <AllCrops /> },

      // protected route
      {
        path: "/crops_details/:id",
        element: (
          <PrivetRouter>
            <CropsDetails />
          </PrivetRouter>
        ),
      },

      {
        path: "/my_profile",
        element: (
          <PrivetRouter>
            <MyProfile />
          </PrivetRouter>
        ),
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      // Auth layout
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "registration", element: <Registration /> },
        ],
      },
    ],
  },
]);
