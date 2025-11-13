import React, { useState, useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const AddCrops = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // animate only once
    });
  }, []);

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

    fetch(
      "https://krishi-link-app-server-i8y3zfe9y-rabuil-islams-projects.vercel.app/crops",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cropData),
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("Crop added successfully!");
        navigate("/my_posts");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="">
        <div
          className="hero h-100"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/premium-photo/agricultural-machinery-field-with-tractor-background_993599-17179.jpg?semt=ais_hybrid&w=740&q=80)",
          }}
        >
          <div className="hero-overlay"></div>
          <div
            className="hero-content text-neutral-content text-center"
            data-aos="zoom-in"
          >
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Add Your New Crops</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="hero bg-base-200 min-h-screen">
        <div
          className="hero-content flex-col lg:flex-row"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="relative w-fit" data-aos="zoom-in-right">
            <img
              src="https://7oroofthemes.com/agritec/wp-content/uploads/elementor/thumbs/banner-2-rcg7wsx1098yd5nrpujsbb3cexg1lfvep7eeuq2s28.webp"
              className="w-2xl rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
          </div>

          <div
            className="max-w-2xl mx-auto p-5"
            data-aos="fade-left"
            data-aos-delay="200"
          >
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

              <div className="form-control">
                <select
                  name="type"
                  className="select select-bordered w-full"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Fruit">Fruit</option>
                  <option value="Grain">Grain</option>
                  <option value="Spice">Spice</option>
                  <option value="Flower">Flower</option>
                  <option value="Other">Other</option>
                </select>
              </div>

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

              <div className="form-control">
                <select
                  name="location"
                  className="select select-bordered w-full"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Location</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>

              <input
                name="image"
                placeholder="Image URL"
                className="input w-full"
                value={formData.image}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn bg-green-700 hover:bg-green-600 text-white w-full mt-2"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                Add Crop
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCrops;
