import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
// import { AuthContext } from "../Provider/AuthProvider";
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

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        toast.success("Sign-In successful!");
        setError("");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Sign-In successful!");
        navigate(location.state?.from || "/");
      })
      .catch((err) => setError(err.message));
  };

  const handleForgotPassword = () => {
    navigate("/auth/forgot-password", { state: { email: emailInput } });
  };
  const showPassword = (e) => {
    e.preventDefault();
    setPassword(!viewpassword);
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="card bg-base-100 w-full max-w-sm py-6 ">
        <h1 className="text-center font-semibold text-xl mb-4">
          Login to your account
        </h1>

        <form onSubmit={handleSignIn} className="card-body">
          <fieldset className="fieldset">
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

            <label className="label">Password</label>

            <div className="  relative">
              <input
                type={viewpassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                placeholder="Password"
                name="password"
              />
              <button
                onClick={showPassword}
                className=" absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
                onClick={handleForgotPassword}
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
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn  bg-orange-200 text-black hover:bg-orange-400 mt-2 w-full"
            >
              <FcGoogle size={20}></FcGoogle> Continue with Google
            </button>

            <p className="my-3 text-center text-sm">
              Don’t Have An Account?{" "}
              <Link to="/auth/registration" className="text-blue-500">
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
