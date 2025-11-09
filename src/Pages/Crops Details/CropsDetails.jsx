import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
// import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const CropsDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/crops/${id}`)
      .then((res) => res.json())
      .then((data) => setCrop(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!crop) return <p>Loading...</p>;

  const isOwner = user?.email === crop.owner.ownerEmail;
  const alreadyInterested = crop.interests.some(
    (i) => i.userEmail === user?.email
  );

  const handleInterest = () => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    if (alreadyInterested) {
      toast.error("You’ve already sent an interest");
      return;
    }

    const interest = {
      _id: new Date().getTime().toString(),
      cropId: crop._id,
      userEmail: user.email,
      userName: user.displayName,
      quantity,
      message,
      status: "pending",
    };

    fetch(`http://localhost:3000/crops/${crop._id}/interests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(interest),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Interest sent successfully!");
        setCrop((prev) => ({
          ...prev,
          interests: [...prev.interests, interest],
        }));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">{crop.name}</h1>
      <img
        src={crop.image}
        alt={crop.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p>Type: {crop.type}</p>
      <p>
        Price per Unit: {crop.pricePerUnit} per {crop.unit}
      </p>
      <p>Available Quantity: {crop.quantity}</p>
      <p>Location: {crop.location}</p>
      <p>Description: {crop.description}</p>

      {!isOwner && user && (
        <div className="mt-4">
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
          <button onClick={handleInterest} className="btn btn-neutral w-full">
            Submit Interest
          </button>
        </div>
      )}

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
                </tr>
              </thead>
              <tbody>
                {crop.interests.map((i) => (
                  <tr key={i._id}>
                    <td>{i.userName}</td>
                    <td>{i.quantity}</td>
                    <td>{i.message}</td>
                    <td>{i.status}</td>
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
