import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../Components/Loader";

const MyInterests = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyInterests = async () => {
      try {
        const res = await fetch(
          `https://krishi-link-app-server-i8y3zfe9y-rabuil-islams-projects.vercel.app/my-interests/${user.email}`
        );
        const data = await res.json();
        setInterests(data);
      } catch (error) {
        console.error("Failed to fetch interests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchMyInterests();
  }, [user]);

  if (loading) return <Loader></Loader>;

  return (
    <div className="w-11/12 md:mt-30 mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
        My Interests
      </h1>

      {interests.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t sent any interests yet.
        </p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-md">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-green-100 text-gray-700">
              <tr>
                <th className="border px-3 py-2">Crop Name</th>
                <th className="border px-3 py-2">Owner</th>
                <th className="border px-3 py-2">Quantity</th>
                <th className="border px-3 py-2">Message</th>
                <th className="border px-3 py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {interests.map((interest) => (
                <tr
                  key={interest._id}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="border px-3 py-2 text-blue-600 underline">
                    <Link to={`/crops/${interest.cropId}`}>
                      {interest.cropName || "Unknown Crop"}
                    </Link>
                  </td>
                  <td className="border px-3 py-2">{interest.ownerName}</td>
                  <td className="border px-3 py-2">{interest.quantity}</td>
                  <td className="border px-3 py-2 text-gray-600">
                    {interest.message || "—"}
                  </td>
                  <td
                    className={`border px-3 py-2 capitalize font-medium ${
                      interest.status === "pending"
                        ? "text-yellow-600"
                        : interest.status === "accepted"
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {interest.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyInterests;
