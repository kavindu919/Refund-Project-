import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const DamageClaimTable = () => {
  const [claims, setClaims] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [status, setStatus] = useState("");
  const [rejectionReason, setRejectionReason] = useState(""); // State for rejection reason

  // Fetch claims
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/claims/getallclaims")
      .then((response) => {
        setClaims(response.data);
      });
  }, []);

  // Handle opening the modal
  const openModal = (claim) => {
    setSelectedClaim(claim);
    setStatus(claim.status);
    setRejectionReason(""); // Reset rejection reason when opening the modal
    setIsModalOpen(true);
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Handle rejection reason change
  const handleRejectionReasonChange = (e) => {
    setRejectionReason(e.target.value);
  };

  // Handle status update
  const updateStatus = () => {
    const updateData = { status };
    if (status === "rejected" && rejectionReason) {
      updateData.rejectionReason = rejectionReason; // Add rejection reason if status is "rejected"
    }

    axios
      .post(
        `http://localhost:4000/api/claims/${selectedClaim.userId}`,
        updateData
      )
      .then((response) => {
        setClaims((prevClaims) =>
          prevClaims.map((claim) =>
            claim.id === selectedClaim.id ? { ...claim, status } : claim
          )
        );
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  // Open image in new window
  const openImageInNewWindow = (imagePath) => {
    window.open(imagePath, "_blank");
  };

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
              <th className="py-3 px-6 text-left">Image</th>
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
                <td className="py-3 px-6">
                  <img
                    src={`http://localhost:4000${claim.image}`} // Assuming the image URL is relative
                    alt="Claim"
                    className="w-16 h-16 object-cover cursor-pointer"
                    onClick={() =>
                      openImageInNewWindow(
                        `http://localhost:4000${claim.image}`
                      )
                    }
                  />
                </td>
                <td className="py-3 px-6">{claim.status}</td>
                <td className="py-3 px-6 flex justify-center gap-3">
                  <button
                    className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow"
                    onClick={() => openModal(claim)}
                  >
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Status</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={handleStatusChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Conditionally render the rejection reason text area */}
            {status === "rejected" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rejection Reason
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={handleRejectionReasonChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Please provide the reason for rejection"
                />
              </div>
            )}

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={updateStatus}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DamageClaimTable;
