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
// import MyInterests from "../Pages/My Interests/MyInterests";
import MyPost from "../Pages/My posts/Mypost";
import AddCrops from "../Pages/Add Crops/AddCrops";
import MyInterests from "../Pages/My Interests/MyInterests";
import ErrorPage from "../Errorpages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Roots />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/all_crops", element: <AllCrops /> },

      // protected route
      {
        path: "/crops/:id",
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
        path: "/add_crops",
        element: (
          <PrivetRouter>
            <AddCrops />
          </PrivetRouter>
        ),
      },

      {
        path: "/interests",
        element: (
          <PrivetRouter>
            <MyInterests />
          </PrivetRouter>
        ),
      },
      {
        path: "/my_posts",
        element: (
          <PrivetRouter>
            <MyPost />
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
