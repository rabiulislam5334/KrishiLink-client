import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const [myCrops, setMyCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editCrop, setEditCrop] = useState(null);

  const cropsPerPage = 10;

  // Fetch user's crops
  const fetchMyCrops = async () => {
    try {
      const res = await fetch(`http://localhost:3000/my-crops/${user.email}`);

      const data = await res.json();
      setMyCrops(data.reverse()); // newest first
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCrops();
  }, []);

  // Pagination logic
  const indexOfLastCrop = currentPage * cropsPerPage;
  const indexOfFirstCrop = indexOfLastCrop - cropsPerPage;
  const currentCrops = myCrops.slice(indexOfFirstCrop, indexOfLastCrop);
  const totalPages = Math.ceil(myCrops.length / cropsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Delete crop
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your crop!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/crops/${id}`, {
          method: "DELETE",
        });
        setMyCrops(myCrops.filter((crop) => crop._id !== id));
        Swal.fire("Deleted!", "Crop has been removed.", "success");
      } catch (error) {
        console.log(error);
        Swal.fire("Error!", "Failed to delete crop.", "error");
      }
    }
  };

  // Edit
  const handleEdit = (crop) => {
    setEditCrop(crop);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      name: form.name.value,
      pricePerUnit: form.pricePerUnit.value,
      quantity: form.quantity.value,
    };

    try {
      const res = await fetch(`http://localhost:3000/crops/${editCrop._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();
      if (result.modifiedCount > 0) {
        toast.success("Crop updated successfully!");
        fetchMyCrops();
        setEditCrop(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed!");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-11/12 mx-auto my-20 p-4">
      <h1 className="text-xl font-bold mb-4 text-center">My Posts</h1>

      {myCrops.length === 0 ? (
        <p className="text-center">No crops added yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-3 py-2 border">Name</th>
                <th className="px-3 py-2 border">Type</th>
                <th className="px-3 py-2 border">Price/unit</th>
                <th className="px-3 py-2 border">Quantity</th>
                <th className="px-3 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCrops.map((crop) => (
                <tr key={crop._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border whitespace-nowrap">
                    {crop.name}
                  </td>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    {crop.type}
                  </td>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    {crop.pricePerUnit}
                  </td>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    {crop.quantity}
                  </td>
                  <td className="px-3 py-2 border whitespace-nowrap flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(crop)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(crop._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`mx-1 my-1 px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editCrop && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2">
          <div className="bg-white rounded-lg p-5 w-full max-w-sm mx-auto">
            <h2 className="text-lg font-bold mb-4 text-center">Edit Crop</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editCrop.name}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium">Price/unit</label>
                <input
                  type="number"
                  name="pricePerUnit"
                  defaultValue={editCrop.pricePerUnit}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={editCrop.quantity}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditCrop(null)}
                  className="btn btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPost;
