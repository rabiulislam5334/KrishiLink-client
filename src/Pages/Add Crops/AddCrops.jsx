import React, { useState, useContext } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const AddCrops = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerUnit: "",
    unit: "kg",
    quantity: "",
    description: "",
    location: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    const cropData = {
      ...formData,
      owner: {
        ownerEmail: user.email,
        ownerName: user.displayName,
      },
      interests: [],
    };

    fetch("http://localhost:3000/crops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cropData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Crop added successfully!");
        navigate("/my-posts");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Add New Crop</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Crop Name"
          className="input w-full"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Type (Vegetable, Fruit, Grain)"
          className="input w-full"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          name="pricePerUnit"
          type="number"
          placeholder="Price per Unit"
          className="input w-full"
          value={formData.pricePerUnit}
          onChange={handleChange}
          required
        />
        <select
          name="unit"
          className="input w-full"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="kg">kg</option>
          <option value="ton">ton</option>
          <option value="bag">bag</option>
        </select>
        <input
          name="quantity"
          type="number"
          placeholder="Estimated Quantity"
          className="input w-full"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="input w-full"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          className="input w-full"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          className="input w-full"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-neutral w-full mt-2">
          Add Crop
        </button>
      </form>
    </div>
  );
};

export default AddCrops;
