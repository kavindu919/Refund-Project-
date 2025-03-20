import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const DamageClaimTable = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/claims/getallclaims")
      .then((response) => {
        setClaims(response.data);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full h-screen mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Damage Claims
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {claims.map((claim) => (
              <tr
                key={claim.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6">{claim.id}</td>
                <td className="py-3 px-6">{claim.user?.name || "N/A"}</td>
                <td className="py-3 px-6">{claim.product?.name || "N/A"}</td>
                <td className="py-3 px-6">{claim.status}</td>
                <td className="py-3 px-6 flex justify-center gap-3">
                  <button className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow">
                    <FiEdit className="text-lg" /> Edit
                  </button>
                  <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow">
                    <FiTrash2 className="text-lg" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DamageClaimTable;
