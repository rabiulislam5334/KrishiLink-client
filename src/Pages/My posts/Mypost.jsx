import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const [myCrops, setMyCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's crops
  const fetchMyCrops = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/crops?ownerEmail=${user.email}`
      );
      const data = await res.json();
      setMyCrops(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCrops();
  }, []);

  // Delete crop
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;
    try {
      await fetch(`http://localhost:3000/crops/${id}`, { method: "DELETE" });
      toast.success("Crop deleted successfully!");
      setMyCrops(myCrops.filter((crop) => crop._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete crop");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">My Posts</h1>
      {myCrops.length === 0 ? (
        <p>No crops added yet.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Price/unit</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myCrops.map((crop) => (
              <tr key={crop._id}>
                <td className="border px-4 py-2">{crop.name}</td>
                <td className="border px-4 py-2">{crop.type}</td>
                <td className="border px-4 py-2">{crop.pricePerUnit}</td>
                <td className="border px-4 py-2">{crop.quantity}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button className="btn btn-sm btn-info">Edit</button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(crop._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPost;
