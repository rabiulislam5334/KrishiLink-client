import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const MyInterests = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchMyInterests = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/interests?userEmail=${user.email}`
  //     );
  //     const data = await res.json();
  //     setInterests(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchMyInterests = async () => {
      const res = await fetch(
        `http://localhost:3000/interests?userEmail=${user.email}`
      );
      const data = await res.json();
      setInterests(data);
      setLoading(false);
    };

    fetchMyInterests();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">My Interests</h1>
      {interests.length === 0 ? (
        <p>You haven't sent any interests yet.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Crop Name</th>
              <th className="border px-4 py-2">Owner</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {interests.map((interest) => (
              <tr key={interest._id}>
                <td className="border px-4 py-2">
                  <Link
                    to={`/crops/${interest.cropId}`}
                    className="text-blue-500 underline"
                  >
                    {interest.cropName}
                  </Link>
                </td>
                <td className="border px-4 py-2">{interest.ownerName}</td>
                <td className="border px-4 py-2">{interest.quantity}</td>
                <td className="border px-4 py-2">{interest.message}</td>
                <td className="border px-4 py-2">{interest.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyInterests;
