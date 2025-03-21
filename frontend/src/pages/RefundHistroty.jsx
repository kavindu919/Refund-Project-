import { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ClaimsTable = () => {
  const [claims, setClaims] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchClaims = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const res = await fetch(
          `http://localhost:4000/api/claims/user/${userId}`
        );
        const data = await res.json();
        setClaims(data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    fetchClaims();
  }, []);

  const handleRequestRefund = () => {
    navigate.push("/claimpage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-7xl h-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          User Refund Claims
        </h2>
        <div className="overflow-x-auto max-h-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left border">User</th>
                <th className="py-3 px-6 text-left border">Product</th>
                <th className="py-3 px-6 text-left border">Description</th>
                <th className="py-3 px-6 text-left border">Status</th>
                <th className="py-3 px-6 text-left border">Rejection Reason</th>
                <th className="py-3 px-6 text-center border">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {claims.length > 0 ? (
                claims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-6">{claim.user?.name || "N/A"}</td>
                    <td className="py-3 px-6">
                      {claim.product?.name || "N/A"}
                    </td>
                    <td className="py-3 px-6">{claim.description}</td>
                    <td className="py-3 px-6 font-semibold">{claim.status}</td>
                    <td className="py-3 px-6">
                      {claim.rejectionReason || "N/A"}
                    </td>
                    <td className="py-3 px-6 flex items-center justify-center gap-3">
                      <a
                        href="/claimpage"
                        className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow"
                      >
                        <AiOutlineReload size={18} /> Request Refund
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3 px-6 border">
                    No claims found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClaimsTable;
