import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
// import { AuthContext } from "../Provider/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const Registration = () => {
  const { createUser, setUser, updateUser, googleLogin } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();
  const [viewpassword, setPassword] = useState(false);

  const handleReg = (e) => {
    e.preventDefault();
    setError("");
    setPassError("");
    setNameError("");

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    //  Name Validation
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    }

    //  Password Validation
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passRegex.test(password)) {
      setPassError(
        "Password must have 1 uppercase, 1 lowercase letter, and be at least 6 characters long"
      );
      return;
    }

    //  Create User
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateUser({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Your Registration successful!");
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            setUser(user);
            navigate("/");
          });
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  //  Google Login Handler
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Your Registration successful!");
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };
  const showPassword = (e) => {
    e.preventDefault();
    setPassword(!viewpassword);
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="card bg-base-100 w-full  py-6 ">
        <h1 className="text-center font-semibold text-xl mb-4">
          Register Your Account
        </h1>

        <div className="card-body">
          <form onSubmit={handleReg}>
            <fieldset className="fieldset">
              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Enter your name"
                required
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

              {/* Photo URL */}
              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="input"
                placeholder="Photo URL (optional)"
              />

              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />

              {/* Password */}
              <label className="label">Password</label>
              <div className=" relative">
                <input
                  type={viewpassword ? "text" : "password"}
                  className="input input-bordered w-full pr-12"
                  placeholder="Password"
                  name="password"
                />
                <button
                  onClick={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 "
                >
                  {viewpassword ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </button>
              </div>
              {passError && <p className="text-red-500 text-sm">{passError}</p>}

              {/* Terms */}
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" required className="checkbox" />
                <span className="text-sm">Accept Terms & Conditions</span>
              </div>

              {/* Error */}
              {error && <p className="text-red-500 mt-2">{error}</p>}

              {/* Register Button */}
              <button type="submit" className="btn btn-neutral mt-4 w-full">
                Register
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

              {/* Login Link */}
              <p className="my-3 text-center text-sm">
                Already Have An Account?{" "}
                <Link to="/auth/login" className="text-blue-500 font-semibold">
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
