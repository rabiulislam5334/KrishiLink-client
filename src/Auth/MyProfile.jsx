import React, { useContext, useState } from "react";

// import { toast } from "react-toastify";

import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
// import { toast } from "react-toastify";

const MyProfile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = (e) => {
    e.preventDefault();

    //  Update user profile in Firebase
    updateUser({ displayName: name, photoURL: photo })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photo });
        toast.success("Profile Updated Successfully! 🎉", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
        setEditMode(false);
      })
      .catch((err) => {
        toast.error("Update Failed! Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card  bg-base-300 shadow-xl w-full max-w-md p-6">
        <h1 className="text-center text-2xl font-bold mb-4">My Profile</h1>

        {/*  Profile View Mode */}
        {!editMode && (
          <div className="flex flex-col items-center text-center space-y-3">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User Profile"
                className="w-30 h-30 object-cover rounded-full"
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Default User"
                className="w-24 h-24 rounded-full"
              />
            )}

            <h2 className="text-xl items-center font-semibold">
              Name: {user?.displayName || "No Name"}
            </h2>
            <p className="text-gray-500">
              <span className="text-xl items-center font-semibold">Gmail:</span>{" "}
              {user?.email}
            </p>

            <button
              className="btn btn-neutral mt-3"
              onClick={() => setEditMode(true)}
            >
              Update Profile
            </button>
          </div>
        )}

        {/* Edit Mode */}
        {editMode && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full"
                placeholder="Enter new name"
                required
              />
            </div>

            <div>
              <label className="label">Photo URL</label>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="input w-full"
                placeholder="Enter photo URL"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="btn bg-orange-500 text-white hover:bg-orange-400"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
