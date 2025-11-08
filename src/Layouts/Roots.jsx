import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useApp } from "../Hooks/Hook";
import { Outlet, useLocation } from "react-router";
import Navber from "../Components/Navbar";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";

const Root = () => {
  const { loading: appLoading } = useApp();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Page change loader
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Combined loader: either app is loading OR page is changing
  if (appLoading || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={120} color="#4f46e5" />
      </div>
    );
  return (
    <div className="  flex flex-col min-h-screen">
      <header>
        <Navber></Navber>
      </header>
      <main className="flex flex-col min-h-screen">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </main>
      <ToastContainer />

      <footer>
        <Footer></Footer>
      </footer>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Root;
