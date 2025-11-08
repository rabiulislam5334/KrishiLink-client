import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

// import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
// import withReactContent from "sweetalert2-react-content";
const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleReset = (e) => {
    e.preventDefault();
    resetPassword(email)
      .then(() => {
        Swal.fire({
          title: "Check your Gmail!",
          text: "A password reset link has been sent to your email.",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Open Gmail",
          cancelButtonText: "Later",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "https://mail.google.com/";
          }
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm py-6 shadow-2xl">
        <h1 className="text-center font-semibold text-xl mb-4">
          Reset Your Password
        </h1>
        <form onSubmit={handleReset} className="card-body">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
