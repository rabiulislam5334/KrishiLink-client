import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Loader from "../../Components/Loader";

const CropsDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  // AOS animation init
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Fetch crop details
  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const res = await fetch(
          `https://krishi-link-app-server-i8y3zfe9y-rabuil-islams-projects.vercel.app/crops/${id}`
        );
        const data = await res.json();
        setCrop(data);
      } catch (err) {
        Swal.fire("Error!", "Failed to load crop details.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchCrop();
  }, [id]);

  if (loading)
    return (
      <p className="text-center py-10">
        <Loader></Loader>
      </p>
    );
  if (!crop) return <p className="text-center py-10">Crop not found.</p>;

  const isOwner = user?.email === crop.owner?.ownerEmail;
  const alreadyInterested = crop.interests?.some(
    (i) => i.userEmail === user?.email
  );

  // Handle interest
  const handleInterest = async () => {
    const quantityNum = parseInt(quantity);
    if (quantityNum < 1 || quantityNum > crop.quantity) {
      Swal.fire(
        "Invalid!",
        `Quantity must be between 1 and ${crop.quantity}`,
        "warning"
      );
      return;
    }
    if (alreadyInterested) {
      Swal.fire("Oops!", "You’ve already sent an interest.", "info");
      return;
    }

    const interest = {
      cropId: crop._id,
      userEmail: user.email,
      userName: user.displayName,
      quantity: quantityNum,
      message,
      status: "pending",
    };

    try {
      const res = await fetch(
        `https://krishi-link-app-server-i8y3zfe9y-rabuil-islams-projects.vercel.app/crops/${crop._id}/interests`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(interest),
        }
      );

      if (!res.ok) throw new Error("Failed to send interest");

      const data = await res.json();
      Swal.fire("Success!", "Interest sent successfully!", "success");

      setCrop((prev) => ({
        ...prev,
        interests: [...prev.interests, { ...interest, _id: data.insertedId }],
      }));
      setQuantity(1);
      setMessage("");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  // Handle interest accept/reject
  const handleInterestStatus = async (interestId, status) => {
    try {
      const res = await fetch(
        `https://krishi-link-app-server-i8y3zfe9y-rabuil-islams-projects.vercel.app/crops/${crop._id}/interests/${interestId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      const updatedInterests = crop.interests.map((i) =>
        i._id === interestId ? { ...i, status } : i
      );

      setCrop((prev) => ({
        ...prev,
        interests: updatedInterests,
      }));

      Swal.fire("Updated!", `Interest ${status} successfully.`, "success");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <>
      <section>
        {" "}
        <div className="">
          <div
            className="hero h-100"
            style={{
              backgroundImage:
                "url(https://img.freepik.com/premium-photo/agricultural-machinery-field-with-tractor-background_993599-17179.jpg?semt=ais_hybrid&w=740&q=80)",
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold"> Your Crops Details</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-10/12 my-10 mx-auto text-center py-10">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-center mx-auto max-w-6xl"
          data-aos="fade-up"
        >
          {/* Left Side: Image */}
          <div className="relative group  mx-auto" data-aos="zoom-in">
            {crop.quantity <= 0 && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded z-10">
                Sold
              </span>
            )}
            <img
              src={
                crop.image || "https://i.ibb.co/H277Vw5/mango-placeholder.jpg"
              }
              alt={crop.name}
              className="w-full max-w-sm h-[350px] object-cover rounded-xl shadow-lg transform group-hover:scale-105 transition duration-700 ease-out mx-auto"
            />
          </div>

          {/* Right Side: Details */}
          <div data-aos="fade-left" className="mx-auto text-center ">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              {crop.name}
            </h1>
            <div className="flex items-center justify-center gap-2 mb-3 text-yellow-500">
              ★★★★★ <span className="text-gray-500 text-sm">(0 Reviews)</span>
            </div>

            <p className="text-2xl font-bold text-green-700 mb-4">
              ${crop.pricePerUnit} per {crop.unit}
            </p>

            <p className="text-gray-600 leading-relaxed mb-5">
              {crop.description?.slice(0, 150)}...
            </p>

            {!isOwner && user && (
              <div data-aos="fade-up" className="mb-5">
                <h2 className="text-lg font-semibold mb-2 text-green-700">
                  Send Interest
                </h2>
                <div className="flex flex-wrap justify-center gap-3 items-center">
                  <div className="flex border border-gray-300 rounded overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-14 text-center border-x focus:outline-none"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(
                            1,
                            Math.min(
                              crop.quantity,
                              parseInt(e.target.value) || 1
                            )
                          )
                        )
                      }
                      min="1"
                      max={crop.quantity}
                    />
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(crop.quantity, q + 1))
                      }
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleInterest}
                    className={`btn ${
                      alreadyInterested || crop.quantity <= 0
                        ? "btn-disabled"
                        : "bg-green-700 hover:bg-green-800 text-white"
                    }`}
                    disabled={alreadyInterested || crop.quantity <= 0}
                  >
                    {alreadyInterested
                      ? "Interest Sent"
                      : crop.quantity <= 0
                      ? "Out of Stock"
                      : "Submit Interest"}
                  </button>
                </div>

                <input
                  type="text"
                  className="input input-bordered w-full mt-3"
                  placeholder="Message (optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Available: {crop.quantity} {crop.unit}
                </p>
              </div>
            )}

            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <strong>Type:</strong> {crop.type}
              </p>
              <p>
                <strong>Location:</strong> {crop.location}
              </p>
            </div>

            <div className="flex gap-2 justify-center mt-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded hover:bg-green-700 hover:text-white cursor-pointer transition duration-300"
                >
                  <Icon size={14} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16" data-aos="fade-up">
          <div role="tablist" className="tabs tabs-bordered justify-center">
            <a
              role="tab"
              className={`tab text-lg ${
                activeTab === "description" ? "tab-active text-green-700" : ""
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </a>
            <a
              role="tab"
              className={`tab text-lg ${
                activeTab === "info" ? "tab-active text-green-700" : ""
              }`}
              onClick={() => setActiveTab("info")}
            >
              Additional Info
            </a>
            <a
              role="tab"
              className={`tab text-lg ${
                activeTab === "reviews" ? "tab-active text-green-700" : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({crop.interests?.length || 0})
            </a>
          </div>

          <div className="pt-6 pb-12">
            {activeTab === "description" && (
              <p className="text-gray-700 leading-relaxed">
                {crop.description || "No description available."}
              </p>
            )}
            {activeTab === "info" && (
              <p className="text-gray-600">
                This section can include crop nutrition, soil type, or
                harvesting guidelines.
              </p>
            )}
            {activeTab === "reviews" && (
              <p className="text-gray-600">Reviews feature coming soon!</p>
            )}
          </div>
        </div>

        {/* Owner: Interests */}
        {isOwner && (
          <div
            className="mt-8 p-6 border rounded-xl shadow-md bg-white"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              Received Interests
            </h2>
            {crop.interests?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th>Buyer</th>
                      <th>Quantity</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crop.interests.map((i) => (
                      <tr key={i._id}>
                        <td>{i.userName}</td>
                        <td>
                          {i.quantity} {crop.unit}
                        </td>
                        <td>{i.message || "N/A"}</td>
                        <td>
                          <span
                            className={`badge ${
                              i.status === "accepted"
                                ? "badge-success"
                                : i.status === "rejected"
                                ? "badge-error"
                                : "badge-warning"
                            }`}
                          >
                            {i.status}
                          </span>
                        </td>
                        <td>
                          {i.status === "pending" ? (
                            <div className="flex gap-2">
                              <button
                                className="btn btn-xs btn-success"
                                onClick={() =>
                                  handleInterestStatus(i._id, "accepted")
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-xs btn-error"
                                onClick={() =>
                                  handleInterestStatus(i._id, "rejected")
                                }
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">
                              Action Taken
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No interests received yet.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CropsDetails;
