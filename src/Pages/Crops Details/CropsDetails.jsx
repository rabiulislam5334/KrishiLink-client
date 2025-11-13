import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";

const CropsDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const res = await fetch(
          `https://krishi-link-app-server-i8y3zfe9y-rabuil-islams-projects.vercel.app/crops/${id}`
        );
        const data = await res.json();
        setCrop(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load crop");
      } finally {
        setLoading(false);
      }
    };

    fetchCrop();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!crop) return <p>Crop not found.</p>;

  const isOwner = user?.email === crop.owner.ownerEmail;
  const alreadyInterested = crop.interests.some(
    (i) => i.userEmail === user?.email
  );

  // Send interest
  const handleInterest = async () => {
    const quantityNum = parseInt(quantity);
    if (quantityNum < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    if (alreadyInterested) {
      toast.error("You’ve already sent an interest");
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

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to send interest");
      }

      const data = await res.json();
      toast.success("Interest sent successfully!");

      // Add to local state
      setCrop((prev) => ({
        ...prev,
        interests: [...prev.interests, { ...interest, _id: data.insertedId }],
      }));

      // Reset form
      setQuantity(1);
      setMessage("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Accept/Reject interest (Owner)
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

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update status");
      }

      // Update local state
      setCrop((prev) => ({
        ...prev,
        interests: prev.interests.map((i) =>
          i._id === interestId ? { ...i, status } : i
        ),
        quantity:
          status === "accepted"
            ? prev.quantity -
              prev.interests.find((i) => i._id === interestId).quantity
            : prev.quantity,
      }));

      toast.success(`Interest ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      {/* Crop Info */}
      <h1 className="text-2xl font-bold mb-4">{crop.name}</h1>
      <img
        src={crop.image}
        alt={crop.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <p>
          <strong>Type:</strong> {crop.type}
        </p>
        <p>
          <strong>Price per Unit:</strong> {crop.pricePerUnit} per {crop.unit}
        </p>
        <p>
          <strong>Available Quantity:</strong> {crop.quantity}
        </p>
        <p>
          <strong>Location:</strong> {crop.location}
        </p>
      </div>
      <p className="mb-4">
        <strong>Description:</strong> {crop.description}
      </p>

      {/* Interest Form for Non-owner */}
      {!isOwner && user && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Send Interest</h2>
          <input
            type="number"
            className="input w-full mb-2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
          />
          <input
            type="text"
            className="input w-full mb-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
          <button
            onClick={handleInterest}
            className="btn btn-neutral w-full"
            disabled={alreadyInterested}
          >
            {alreadyInterested ? "Interest Sent" : "Submit Interest"}
          </button>
        </div>
      )}

      {/* Received Interests for Owner */}
      {isOwner && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Received Interests</h2>
          {crop.interests.length > 0 ? (
            <table className="table w-full border">
              <thead>
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
                    <td>{i.quantity}</td>
                    <td>{i.message}</td>
                    <td className="capitalize">{i.status}</td>
                    <td className="flex gap-2">
                      {i.status === "pending" && (
                        <>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() =>
                              handleInterestStatus(i._id, "accepted")
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-sm btn-error"
                            onClick={() =>
                              handleInterestStatus(i._id, "rejected")
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No interests received yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CropsDetails;
