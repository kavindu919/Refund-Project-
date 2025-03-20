import { useEffect, useState } from "react";

const ClaimsTable = () => {
  const [claims, setClaims] = useState([]);

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Refund Claims</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr className="text-left">
              <th className="p-3 border">User</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Rejection Reason</th>
            </tr>
          </thead>
          <tbody>
            {claims.length > 0 ? (
              claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{claim.user?.name || "N/A"}</td>
                  <td className="p-3 border">{claim.product?.name || "N/A"}</td>
                  <td className="p-3 border">{claim.description}</td>
                  <td className="p-3 border  font-semibold">{claim.status}</td>
                  <td className="p-3 border">
                    {claim.rejectionReason || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-3 border">
                  No claims found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimsTable;
