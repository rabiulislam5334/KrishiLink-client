import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const { signIn, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [viewpassword, setPassword] = useState(false);

  // --- Email/Password Login Handler ---
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        // Optionally, save or verify user in MongoDB
        const userData = {
          email,
          name: res.user.displayName || "User",
          image: res.user.photoURL || "",
        };
        fetch(
          "https://krishi-link-app-server-i8y3zfe9y-rabuil-islams-projects.vercel.app/users",
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userData),
          }
        )
          .then((res) => res.json())
          .then((data) =>
            console.log("MongoDB User ID:", data.userId || data.insertedId)
          );

        toast.success("Sign-In successful!");
        setError("");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  // --- Google Login Handler ---
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        // Save or verify user in MongoDB
        fetch(
          "https://krishi-link-app-server-i8y3zfe9y-rabuil-islams-projects.vercel.app/users",
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newUser),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("MongoDB User ID:", data.userId || data.insertedId);
            toast.success("Login successful!");
            navigate(location.state?.from || "/");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  };

  const showPassword = (e) => {
    e.preventDefault();
    setPassword(!viewpassword);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm py-6">
        <h1 className="text-center font-semibold text-xl mb-4">
          Login to your account
        </h1>

        <form onSubmit={handleSignIn} className="card-body">
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={viewpassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                placeholder="Password"
                name="password"
              />
              <button
                onClick={showPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {viewpassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </button>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() =>
                  navigate("/auth/forgot-password", {
                    state: { email: emailInput },
                  })
                }
                className="link link-hover text-sm text-blue-500"
              >
                Forgot password?
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button type="submit" className="btn btn-neutral mt-4 w-full">
              Login
            </button>

            <div>
              <h1 className="text-xl font-bold text-center text-orange-500">
                Or
              </h1>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn bg-orange-200 text-black hover:bg-orange-400 mt-2 w-full"
            >
              <FcGoogle size={20} /> Continue with Google
            </button>

            <p className="my-3 text-center text-sm">
              Don’t Have An Account?{" "}
              <Link
                to="/auth/registration"
                className="text-blue-500 font-semibold"
              >
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
