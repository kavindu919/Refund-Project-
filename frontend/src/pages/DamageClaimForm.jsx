import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DamageClaimForm = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null); // Store userId

  const location = useLocation();

  // Extract userId from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userIdParam = params.get("userId");
    if (userIdParam) {
      setUserId(userIdParam);
    }
  }, [location]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("User ID is missing. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("productId", productId);
    formData.append("image", image);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/claims/uploadimage",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("Claim submitted successfully!");
    } catch (error) {
      setMessage("Error submitting claim.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Submit a Damage Claim
        </h2>

        {message && (
          <p className="text-center text-lg font-semibold text-green-600 bg-green-100 p-2 rounded-md">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product ID
            </label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter Product ID"
              required
            />
          </div>

          <div className="relative border-2 border-dashed border-gray-300 p-5 rounded-lg text-center hover:border-blue-500 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-gray-600">Click to upload product image</p>
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover mt-4 rounded-lg shadow-md"
            />
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Issue Details
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="4"
              placeholder="Describe the issue..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Claim
          </button>
        </form>
      </div>
    </div>
  );
};

export default DamageClaimForm;
